"use client";
import { useIsDarkMode } from "@/hooks/useIsDarkMode";
import { ClerkProvider as OriginalClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ReactNode } from "react";

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
