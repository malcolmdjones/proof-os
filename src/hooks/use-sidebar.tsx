"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type SidebarContextValue = {
  contextCollapsed: boolean;
  toggleContextCollapsed: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

const STORAGE_KEY = "proof-os-context-sidebar-collapsed";

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [contextCollapsed, setContextCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      setContextCollapsed(stored === "true");
    }
  }, []);

  const toggleContextCollapsed = useCallback(() => {
    setContextCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  return (
    <SidebarContext.Provider
      value={{ contextCollapsed, toggleContextCollapsed }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return ctx;
}
