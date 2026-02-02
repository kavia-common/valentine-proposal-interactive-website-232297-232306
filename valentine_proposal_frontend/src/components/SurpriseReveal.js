import React, { useEffect, useMemo, useState } from "react";

/**
 * Surprise reveal:
 * - celebratory message
 * - subtle confetti burst (CSS-based, no extra deps)
 * - replay button
 */

// PUBLIC_INTERFACE
function SurpriseReveal({ headline, message, onReplay }) {
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const [confettiOn, setConfettiOn] = useState(!reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    // Turn off confetti after a short celebratory burst.
    const t = window.setTimeout(() => setConfettiOn(false), 1600);
    return () => window.clearTimeout(t);
  }, [reducedMotion]);

  const pieces = useMemo(() => {
    // Deterministic-ish pieces for stable UI; enough for a burst without being overwhelming.
    return new Array(18).fill(0).map((_, idx) => ({
      id: idx,
      left: (idx * 100) / 18,
      delay: (idx % 6) * 0.05,
      dur: 0.9 + (idx % 4) * 0.15,
    }));
  }, []);

  return (
    <section className="vp-step vp-reveal" aria-label="Surprise reveal screen">
      <div className="vp-reveal__center">
        <div className="vp-revealCard">
          <div className="vp-revealCard__iconRow" aria-hidden="true">
            <span className="vp-heartIcon">♥</span>
            <span className="vp-heartIcon vp-heartIcon--accent">♥</span>
            <span className="vp-heartIcon">♥</span>
          </div>

          <h2 className="vp-title">{headline}</h2>
          <p className="vp-text">{message}</p>

          <div className="vp-actions">
            <button
              type="button"
              className="vp-btn vp-btn--primary vp-btn--lg"
              onClick={onReplay}
              aria-label="Replay from start"
            >
              Replay
            </button>
          </div>

          <div className="vp-subtext">
            {/* TODO: Add your own surprise details here (date idea, time, inside joke). */}
            Tip: Add a date plan, a photo, or a fun detail to make it extra special.
          </div>

          {confettiOn ? (
            <div className="vp-confetti" aria-hidden="true">
              {pieces.map((p) => (
                <span
                  key={p.id}
                  className={`vp-confetti__piece vp-confetti__piece--${p.id % 5}`}
                  style={{
                    left: `${p.left}%`,
                    animationDelay: `${p.delay}s`,
                    animationDuration: `${p.dur}s`,
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default SurpriseReveal;
