"use client";

import { ClerkProvider as OriginalClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ReactNode } from "react";
import { useIsDarkMode } from "../../../hooks/useIsDarkMode";

function ClerkProvider({ children }: { children: ReactNode }) {
  const isDarkMode = useIsDarkMode();
  return (
    <OriginalClerkProvider
      appearance={isDarkMode ? { baseTheme: dark } : undefined}
    >
      {children}
    </OriginalClerkProvider>
  );
}

export default ClerkProvider;
