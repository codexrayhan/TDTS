import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

const languages = ["English", "বাংলা", "Español", "Français", "हिन्दी"];

export function Footer() {
  const [lang, setLang] = useState("English");
  const [open, setOpen] = useState(false);

  return (
    <footer className="border-t border-border-secondary bg-surface-bg px-6 py-4">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          Copyright © 2026 TDTS
        </p>

        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <a href="/privacy" className="hover:text-foreground hover:underline">
            Privacy policy
          </a>
          <a href="/terms" className="hover:text-foreground hover:underline">
            Terms
          </a>
          <a href="/impressum" className="hover:text-foreground hover:underline">
            Impressum
          </a>

          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1 hover:text-foreground"
            >
              <Globe className="h-3.5 w-3.5" />
              {lang}
              <ChevronDown className="h-3 w-3" />
            </button>

            {open && (
              <ul className="absolute bottom-full right-0 mb-2 w-32 rounded-lg border border-border-secondary bg-surface-bg py-1 shadow-lg">
                {languages.map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => { setLang(l); setOpen(false); }}
                      className="block w-full px-3 py-1.5 text-left text-xs hover:bg-bg-faint"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}