"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <NuqsAdapter>
        <TooltipProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              classNames: {
                toast:
                  "border border-border bg-panel text-foreground shadow-float",
              },
            }}
          />
        </TooltipProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
}
