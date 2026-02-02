/**
 * Animation / confetti tuning constants.
 *
 * Tweak points:
 * - Durations/easing: adjust ANIM.*
 * - Confetti density: adjust CONFETTI.*
 * - Heart drift count: adjust HEARTS.*
 */

// PUBLIC_INTERFACE
export const ANIM = {
  /** Default easing used across micro-interactions. */
  easing: "cubic-bezier(.2,.8,.2,1)",
  /** Landing collage float/tilt cycle duration. */
  landingFloatMs: 5200,
  /** Start button shimmer loop duration. */
  startShimmerMs: 1800,
  /** Quick whoosh trail duration for No-dodge. */
  whooshMs: 260,
  /** Small hover burst duration on Yes. */
  yesHoverBurstMs: 700,
  /** Reveal initial burst duration. */
  revealBurstMs: 900,
  /** Reveal drizzle duration (keep ~2s). */
  revealDrizzleMs: 2000,
  /** Floating heart emoji drift duration. */
  revealHeartsMs: 2200,
};

export const CONFETTI = {
  /**
   * Total pieces = burstCount + drizzleCount.
   * Keep modest to remain CPU/GPU-friendly.
   */
  burstCount: 26,
  drizzleCount: 20,
};

export const HEARTS = {
  /** Number of floating heart emojis on reveal. */
  revealCount: 7,
};
