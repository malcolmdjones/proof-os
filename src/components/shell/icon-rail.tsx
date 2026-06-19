"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ProfileButton } from "@/components/proof/profile-button";
import { ThemeToggle } from "@/components/proof/theme-toggle";
import { createAction, mainNavItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function IconRail() {
  const pathname = usePathname();
  const CreateIcon = createAction.icon;

  return (
    <aside className="flex h-full w-[76px] shrink-0 flex-col items-center bg-sidebar py-3">
      <button
        type="button"
        disabled
        aria-label={createAction.label}
        className="mb-4 flex w-14 flex-col items-center gap-1 rounded-xl py-2 transition-colors hover:bg-sidebar-accent disabled:opacity-50"
      >
        <span className="flex size-9 items-center justify-center rounded-xl bg-proof-yellow text-proof-black">
          <CreateIcon className="size-4" strokeWidth={2.5} />
        </span>
        <span className="text-[10px] font-medium leading-none text-muted-foreground">
          Create
        </span>
      </button>

      <nav className="flex flex-1 flex-col items-center gap-0.5">
        {mainNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.disabled ? "#" : item.href}
              aria-disabled={item.disabled}
              className={cn(
                "flex w-14 flex-col items-center gap-1 rounded-xl py-2 transition-all",
                isActive
                  ? "bg-panel text-foreground shadow-sm"
                  : "text-muted-foreground hover:scale-[1.02] hover:bg-sidebar-accent hover:text-foreground",
                item.disabled && "pointer-events-none opacity-40",
              )}
              onClick={(e) => item.disabled && e.preventDefault()}
            >
              <Icon
                className="size-[18px]"
                strokeWidth={isActive ? 2.25 : 2}
              />
              <span className="max-w-full truncate px-0.5 text-center text-[10px] font-medium leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col items-center gap-1">
        <ThemeToggle />
        <ProfileButton />
      </div>
    </aside>
  );
}
