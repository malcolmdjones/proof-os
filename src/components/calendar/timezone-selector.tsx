"use client";

import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTimezone } from "@/hooks/use-timezone";
import {
  COMMON_TIMEZONES,
  formatTimezoneLabel,
  formatTimezoneOffset,
} from "@/lib/timezone";

export function TimezoneSelector() {
  const { timezone, setTimezone, offsetLabel } = useTimezone();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-end gap-0.5 px-1 py-2 text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          title={formatTimezoneLabel(timezone)}
        >
          <span className="truncate">{offsetLabel}</span>
          <ChevronDown className="size-3 shrink-0 opacity-50" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-72 w-56 overflow-y-auto">
        <DropdownMenuLabel>Time zone</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={timezone} onValueChange={setTimezone}>
          {COMMON_TIMEZONES.map((tz) => (
            <DropdownMenuRadioItem key={tz.id} value={tz.id}>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span>{tz.label}</span>
                <span className="text-[10px] text-muted-foreground">
                  {formatTimezoneOffset(tz.id)} · {tz.id.replace(/_/g, " ")}
                </span>
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
