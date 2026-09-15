"use client";

import * as React from "react";
import { useTheme } from "@figma/astraui";
import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster(props: ToasterProps) {
  const { theme } = useTheme();
  return (
    <Sonner
      theme={(theme === "dark" ? "dark" : "light") as ToasterProps["theme"]}
      className="toaster group"
      style={{
        "--normal-bg": "var(--surface-bg)",
        "--normal-text": "var(--foreground)",
        "--normal-border": "var(--border-primary)",
      } as React.CSSProperties}
      {...props}
    />
  );
}

export { Toaster };
