"use client";

import { useHotkeys } from "react-hotkeys-hook";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Calendar, LayoutDashboard, Palette, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type CommandMenuProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function CommandMenu({ open: controlledOpen, onOpenChange }: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const router = useRouter();

  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  useHotkeys("mod+k", (e) => {
    e.preventDefault();
    setOpen(!open);
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const runCommand = useCallback(
    (command: () => void) => {
      setOpen(false);
      command();
    },
    [setOpen],
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search content, events, brand assets…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/calendar"))}
          >
            <Calendar />
            Calendar
          </CommandItem>
          <CommandItem disabled>
            <Palette />
            Brand Hub
            <span className="ml-auto text-xs text-muted-foreground">
              Coming soon
            </span>
          </CommandItem>
          <CommandItem disabled>
            <LayoutDashboard />
            Dashboard
            <span className="ml-auto text-xs text-muted-foreground">
              Coming soon
            </span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem disabled>
            <Plus />
            Create content
            <span className="ml-auto text-xs text-muted-foreground">
              Coming soon
            </span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
