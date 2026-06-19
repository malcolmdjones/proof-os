/** Framer Motion box-shadow strings — use CSS vars so dark mode stays in sync. */
export const brutalMotionShadow = {
  rest: "2px 2px 0 0 var(--color-brutal-shadow)",
  hover: "1px 1px 0 0 var(--color-brutal-shadow)",
  pressed: "0px 0px 0 0 var(--color-brutal-shadow)",
  brutal: "4px 4px 0 0 var(--color-brutal-shadow)",
} as const;
