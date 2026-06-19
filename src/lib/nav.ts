import {
  Calendar,
  LayoutDashboard,
  Palette,
  Plus,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
};

export const mainNavItems: NavItem[] = [
  {
    id: "calendar",
    label: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    id: "brand",
    label: "Brand Hub",
    href: "/brand",
    icon: Palette,
    disabled: true,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    disabled: true,
  },
];

export type ContextNavItem = {
  id: string;
  label: string;
  href?: string;
  disabled?: boolean;
};

export type ContextNavSection = {
  id: string;
  title: string;
  items: ContextNavItem[];
};

export const contextNavBySection: Record<string, ContextNavSection> = {
  calendar: {
    id: "calendar",
    title: "Calendar",
    items: [],
  },
  brand: {
    id: "brand",
    title: "Brand Hub",
    items: [
      { id: "guidelines", label: "Guidelines", disabled: true },
      { id: "logos", label: "Logos", disabled: true },
      { id: "colors", label: "Colors", disabled: true },
      { id: "fonts", label: "Fonts", disabled: true },
      { id: "voice", label: "Brand voice", disabled: true },
    ],
  },
  dashboard: {
    id: "dashboard",
    title: "Dashboard",
    items: [
      { id: "momentum", label: "Momentum", disabled: true },
      { id: "upcoming", label: "Upcoming", disabled: true },
    ],
  },
};

export const createAction = {
  label: "Create",
  icon: Plus,
};
