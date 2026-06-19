/** Shared easing for collapsibles, sidebars, and other animated UI. */
export const MOTION_EASE = [0.4, 0, 0.2, 1] as const;

export const MOTION_DURATION = {
  fast: 0.22,
  normal: 0.28,
  slow: 0.32,
} as const;

export const motionTransition = (duration = MOTION_DURATION.normal) => ({
  duration,
  ease: MOTION_EASE,
});
