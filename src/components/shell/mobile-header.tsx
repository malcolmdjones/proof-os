"use client";

import Link from "next/link";

import { Logo } from "@/components/proof/logo";
import { ProfileButton } from "@/components/proof/profile-button";
import { ThemeToggle } from "@/components/proof/theme-toggle";

export function MobileHeader() {
  return (
    <header className="shrink-0 bg-sidebar px-4 pb-3 pt-3 md:hidden">
      <div className="flex items-center justify-between">
        <Link href="/calendar" className="flex items-center">
          <Logo variant="icon" width={28} height={28} />
        </Link>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}
