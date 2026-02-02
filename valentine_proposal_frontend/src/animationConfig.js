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

/**
 * Landing image rendering defaults (collage + carousel).
 * This is intentionally not animation-related, but is kept here as a simple
 * "tunable config" location alongside other UI tuning constants.
 */
// PUBLIC_INTERFACE
export const LANDING_MEDIA = {
  /**
   * How the images should fit inside their frames.
   * - "cover": fills the frame and crops overflow (default, best for collage)
   * - "contain": shows the full image (may letterbox)
   */
  fitMode: "cover",

  /**
   * Focal alignment, mapped to CSS object-position.
   * Accepts: "left" | "center" | "right" and "top" | "center" | "bottom".
   */
  focalX: "center",
  focalY: "center",

  /**
   * Frame aspect ratio utility.
   * Supported values: "auto" | "4:3" | "16:9" | "1:1"
   */
  aspect: "auto",
};
