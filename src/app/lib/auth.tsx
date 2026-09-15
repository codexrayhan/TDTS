import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { isMockMode, loginRequest, logoutRequest, signupRequest, type AuthUser } from "./api";

const TOKEN_KEY = "tdts-token";
const USER_KEY = "tdts-user";

type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  login: (email: string, password: string, demoRole?: AuthUser["role"]) => Promise<AuthUser>;
  signup: (payload: { name: string; email: string; password: string; role: AuthUser["role"] }) => Promise<AuthUser>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function tokenExpired(token: string) {
  if (!token || token === "demo-token") return false;
  try {
    const [, payload] = token.split(".");
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const parsed = JSON.parse(window.atob(normalized)) as { exp?: number };
    return typeof parsed.exp === "number" && parsed.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

function initialAuth() {
  if (typeof window === "undefined") return { token: null, user: null };
  const token = window.localStorage.getItem(TOKEN_KEY);
  const rawUser = window.localStorage.getItem(USER_KEY);
  if (!token || (!isMockMode() && tokenExpired(token))) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    return { token: null, user: null };
  }
  try {
    return { token, user: rawUser ? JSON.parse(rawUser) as AuthUser : null };
  } catch {
    return { token, user: null };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialAuth);

  const persist = useCallback((token: string, user: AuthUser) => {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    setState({ token, user });
    return user;
  }, []);

  const login = useCallback(async (email: string, password: string, demoRole: AuthUser["role"] = "admin") => {
    const response = await loginRequest(email, password, demoRole);
    return persist(response.token, response.user);
  }, [persist]);

  const signup = useCallback(async (payload: { name: string; email: string; password: string; role: AuthUser["role"] }) => {
    const response = await signupRequest(payload);
    return persist(response.token, response.user);
  }, [persist]);

  const logout = useCallback(async () => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    setState({ token: null, user: null });
    try { await logoutRequest(); } catch { /* local logout must still succeed */ }
  }, []);

  const value = useMemo(() => ({ ...state, login, signup, logout }), [state, login, signup, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
