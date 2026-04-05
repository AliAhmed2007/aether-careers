"use client";

import { ClerkProvider as OriginalClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ReactNode } from "react";
import { useTheme } from "next-themes";

function ClerkProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <OriginalClerkProvider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
        variables: {
          // Force Clerk to use your raw OKLCH string
          colorBackground: "var(--card)",
          colorText: "var(--foreground)",
          colorInputBackground: "var(--input)",
          colorBorder: "var(--border)",
        },
        elements: {
          // This removes Clerk's default dark-mode shadows and gradients
          card: "!bg-card !shadow-none border border-border rounded-2xl overflow-hidden",

          // This is the specific inner container for the "Account" page
          navbar: "!bg-sidebar !bg-none border-r border-border",
          scrollBox: "!bg-card !bg-none",

          // Controls the outer dimming effect
          modalBackdrop: "!bg-background/80 backdrop-blur-md",
        },
      }}
    >
      {children}
    </OriginalClerkProvider>
  );
}

export default ClerkProvider;
