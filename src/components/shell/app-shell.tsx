"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { CalendarShellHeader } from "@/components/calendar/calendar-shell-header";
import { CommandMenu } from "@/components/shell/command-menu";
import { ContextSidebar } from "@/components/shell/context-sidebar";
import { IconRail } from "@/components/shell/icon-rail";
import { MobileHeader } from "@/components/shell/mobile-header";
import { MobileNav } from "@/components/shell/mobile-nav";
import { SearchBar } from "@/components/shell/search-bar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

function CalendarHeaderFallback() {
  return <div className="h-12 shrink-0" />;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false);
  const pathname = usePathname();
  const isCalendar = pathname.startsWith("/calendar");

  return (
    <>
      <div className="flex h-dvh overflow-hidden bg-sidebar">
        <div className="hidden shrink-0 md:flex">
          <SidebarProvider>
            <IconRail />
            <ContextSidebar />
          </SidebarProvider>
        </div>

        <div className="flex min-w-0 flex-1 flex-col bg-sidebar">
          {!isCalendar && <MobileHeader />}

          {!isCalendar && (
            <header className="hidden shrink-0 justify-center px-5 py-4 md:flex">
              <SearchBar
                onClick={() => setCommandOpen(true)}
                className="max-w-md"
              />
            </header>
          )}

          {isCalendar && (
            <header className="hidden shrink-0 px-4 py-3 md:block">
              <Suspense fallback={<CalendarHeaderFallback />}>
                <CalendarShellHeader />
              </Suspense>
            </header>
          )}

          {isCalendar && (
            <div className="shrink-0 border-b border-sidebar-border px-3 py-2 md:hidden">
              <Suspense fallback={<CalendarHeaderFallback />}>
                <CalendarShellHeader />
              </Suspense>
            </div>
          )}

          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col",
              isCalendar ? "md:px-3 md:pb-3" : "md:px-4 md:pb-4",
            )}
          >
            <div
              className={cn(
                "flex min-h-0 flex-1 flex-col overflow-hidden border bg-panel shadow-float",
                "border-black/[0.06] dark:border-white/[0.08]",
                "rounded-t-[24px] md:rounded-2xl",
              )}
            >
              {isCalendar ? (
                <main className="flex h-full min-h-0 flex-col overflow-hidden pb-20 md:pb-0">
                  {children}
                </main>
              ) : (
                <ScrollArea className="flex-1">
                  <main className="px-5 py-6 pb-28 md:px-8 md:py-8 md:pb-8">
                    {children}
                  </main>
                </ScrollArea>
              )}
            </div>
          </div>
        </div>
      </div>

      <MobileNav />
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
