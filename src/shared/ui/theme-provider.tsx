"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Known upstream false positive: next-themes injects an inline <script> during
// SSR (which runs correctly), but React logs a dev-only warning about it.
// Suppress just that one message in development to keep the console clean.
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag")
    ) {
      return;
    }
    originalError(...args);
  };
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
