import React, { useEffect, useMemo, useState } from "react";
import { ANIM, CONFETTI, HEARTS } from "../animationConfig";

/**
 * Surprise reveal:
 * - celebratory message
 * - richer confetti: initial burst + short drizzle (~2s)
 * - a few floating heart emojis that drift and fade
 * - replay button + "Replay celebration" toggle
 *
 * Accessibility:
 * - Respects prefers-reduced-motion (disables animations automatically)
 * - Announces the reveal via an aria-live region
 */

// PUBLIC_INTERFACE
function SurpriseReveal({ headline, message, onReplay }) {
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const [celebrateKey, setCelebrateKey] = useState(0);
  const [confettiOn, setConfettiOn] = useState(!reducedMotion);
  const [drizzleOn, setDrizzleOn] = useState(!reducedMotion);
  const [floatHeartsOn, setFloatHeartsOn] = useState(!reducedMotion);

  // Replay the celebration without leaving the screen.
  // PUBLIC_INTERFACE
  const replayCelebration = () => {
    if (reducedMotion) return;
    setCelebrateKey((k) => k + 1);
  };

  useEffect(() => {
    if (reducedMotion) return;

    // Timeline:
    // - Burst: quick and punchy
    // - Drizzle: short follow-up to feel richer (~2s)
    // - Hearts: drift/fade
    setConfettiOn(true);
    setDrizzleOn(true);
    setFloatHeartsOn(true);

    const tBurstOff = window.setTimeout(() => setConfettiOn(false), ANIM.revealBurstMs);
    const tDrizzleOff = window.setTimeout(() => setDrizzleOn(false), ANIM.revealDrizzleMs);
    const tHeartsOff = window.setTimeout(() => setFloatHeartsOn(false), ANIM.revealHeartsMs);

    return () => {
      window.clearTimeout(tBurstOff);
      window.clearTimeout(tDrizzleOff);
      window.clearTimeout(tHeartsOff);
    };
  }, [reducedMotion, celebrateKey]);

  const burstPieces = useMemo(() => {
    // Tweak density in src/animationConfig.js (CONFETTI.burstCount)
    return new Array(CONFETTI.burstCount).fill(0).map((_, idx) => ({
      id: `b-${idx}`,
      left: (idx * 100) / CONFETTI.burstCount,
      delay: (idx % 7) * 0.03,
      dur: 0.85 + (idx % 4) * 0.12,
      drift: (idx % 2 === 0 ? -1 : 1) * (8 + (idx % 5) * 5),
    }));
  }, []);

  const drizzlePieces = useMemo(() => {
    // Tweak density in src/animationConfig.js (CONFETTI.drizzleCount)
    return new Array(CONFETTI.drizzleCount).fill(0).map((_, idx) => ({
      id: `d-${idx}`,
      left: (idx * 100) / CONFETTI.drizzleCount,
      delay: 0.15 + (idx % 10) * 0.08,
      dur: 1.35 + (idx % 5) * 0.12,
      drift: (idx % 2 === 0 ? -1 : 1) * (4 + (idx % 6) * 4),
    }));
  }, []);

  const floatingHearts = useMemo(() => {
    // Tweak count in src/animationConfig.js (HEARTS.revealCount)
    const emojis = ["💙", "💛", "💙", "💛", "💙", "💛", "💙"];
    return new Array(HEARTS.revealCount).fill(0).map((_, idx) => ({
      id: `h-${idx}`,
      left: 10 + (idx * 80) / Math.max(1, HEARTS.revealCount - 1),
      delay: (idx % 5) * 0.08,
      emoji: emojis[idx % emojis.length],
      size: 18 + (idx % 3) * 5,
      drift: (idx % 2 === 0 ? -1 : 1) * (14 + (idx % 4) * 6),
    }));
  }, []);

  return (
    <section className="vp-step vp-reveal" aria-label="Surprise reveal screen">
      <div className="vp-reveal__center">
        <div className="vp-revealCard">
          {/* Screen reader announcement of the reveal state. */}
          <div className="vp-srLive" aria-live="polite">
            {headline}
          </div>

          <div className="vp-revealCard__iconRow" aria-hidden="true">
            <span className="vp-heartIcon">♥</span>
            <span className="vp-heartIcon vp-heartIcon--accent">♥</span>
            <span className="vp-heartIcon">♥</span>
          </div>

          <h2 className="vp-title">{headline}</h2>
          <p className="vp-text">{message}</p>

          <div className="vp-actions">
            <button type="button" className="vp-btn vp-btn--primary vp-btn--lg" onClick={onReplay} aria-label="Replay from start">
              Replay
            </button>

            <button
              type="button"
              className="vp-btn vp-btn--ghost"
              onClick={replayCelebration}
              aria-label="Replay celebration effects"
              disabled={reducedMotion}
              title={reducedMotion ? "Animations disabled due to reduced-motion preference" : "Replay the celebration"}
            >
              Replay celebration
            </button>
          </div>

          <div className="vp-subtext">
            {/* TODO: Add your own surprise details here (date idea, time, inside joke). */}
            Tip: Add a date plan, a photo, or a fun detail to make it extra special.
          </div>

          {/* Layers (kept small & CSS-based for performance). */}
          {!reducedMotion && (confettiOn || drizzleOn) ? (
            <div className="vp-confetti vp-confetti--rich" aria-hidden="true" key={`confetti-${celebrateKey}`}>
              {confettiOn
                ? burstPieces.map((p, i) => (
                    <span
                      key={p.id}
                      className={`vp-confetti__piece vp-confetti__piece--${i % 5} vp-confetti__piece--burst`}
                      style={{
                        left: `${p.left}%`,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.dur}s`,
                        ["--drift"]: `${p.drift}px`,
                      }}
                    />
                  ))
                : null}

              {drizzleOn
                ? drizzlePieces.map((p, i) => (
                    <span
                      key={p.id}
                      className={`vp-confetti__piece vp-confetti__piece--${i % 5} vp-confetti__piece--drizzle`}
                      style={{
                        left: `${p.left}%`,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.dur}s`,
                        ["--drift"]: `${p.drift}px`,
                      }}
                    />
                  ))
                : null}
            </div>
          ) : null}

          {!reducedMotion && floatHeartsOn ? (
            <div className="vp-revealHearts" aria-hidden="true" key={`hearts-${celebrateKey}`}>
              {floatingHearts.map((h) => (
                <span
                  key={h.id}
                  className="vp-revealHearts__heart"
                  style={{
                    left: `${h.left}%`,
                    animationDelay: `${h.delay}s`,
                    fontSize: `${h.size}px`,
                    ["--drift"]: `${h.drift}px`,
                  }}
                >
                  {h.emoji}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default SurpriseReveal;
