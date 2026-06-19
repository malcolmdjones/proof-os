"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainNavItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-border bg-panel px-2 py-2 md:hidden">
      {mainNavItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.id}
            href={item.disabled ? "#" : item.href}
            aria-disabled={item.disabled}
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px]",
              isActive ? "font-medium text-foreground" : "text-muted-foreground",
              item.disabled && "pointer-events-none opacity-40",
            )}
            onClick={(e) => item.disabled && e.preventDefault()}
          >
            <span
              className={cn(
                "flex size-8 items-center justify-center rounded-xl transition-colors",
                isActive && "bg-sidebar-accent",
              )}
            >
              <Icon className="size-4" />
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
