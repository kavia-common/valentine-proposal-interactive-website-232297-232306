import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Playful Question screen:
 * - Has Yes and No actions
 * - No is mischievous: it relocates within a bounded area when you try to hover/focus it
 * - Includes a subtle micro-animation (floating hearts) that respects reduced motion
 */

// PUBLIC_INTERFACE
function PlayfulQuestion({ question, onYes, onBack }) {
  const arenaRef = useRef(null);
  const noBtnRef = useRef(null);

  const [noPos, setNoPos] = useState({ x: 60, y: 40 }); // percent-based within arena
  const [noDodges, setNoDodges] = useState(0);
  const [spark, setSpark] = useState(false);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const randomizeNoPosition = useCallback(() => {
    // TODO No behavior: tweak these values for more/less “evasiveness”.
    // Larger ranges and smaller margins = more movement.
    const nextX = clamp(10 + Math.random() * 80, 6, 94);
    const nextY = clamp(10 + Math.random() * 70, 8, 92);
    setNoPos({ x: nextX, y: nextY });
    setNoDodges((d) => d + 1);
  }, []);

  // If the No button gets focus (keyboard), dodge once to keep the playful effect,
  // but do not trap keyboard users: they can still tab away and press Yes easily.
  useEffect(() => {
    const btn = noBtnRef.current;
    if (!btn) return;

    const onFocus = () => {
      if (!reducedMotion) randomizeNoPosition();
    };

    btn.addEventListener("focus", onFocus);
    return () => btn.removeEventListener("focus", onFocus);
  }, [randomizeNoPosition, reducedMotion]);

  // PUBLIC_INTERFACE
  const handleYes = () => {
    // A tiny celebratory pulse before moving on.
    if (!reducedMotion) {
      setSpark(true);
      window.setTimeout(() => {
        setSpark(false);
        onYes();
      }, 260);
      return;
    }
    onYes();
  };

  return (
    <section className="vp-step vp-question" aria-label="Question screen">
      <div className="vp-question__top">
        <button type="button" className="vp-btn vp-btn--ghost" onClick={onBack} aria-label="Back to landing">
          ← Back
        </button>
      </div>

      <div className="vp-question__center">
        <div className={`vp-questionCard ${spark ? "is-spark" : ""}`}>
          <div className="vp-questionCard__hearts" aria-hidden="true">
            <span className="vp-floatHeart vp-floatHeart--1">♥</span>
            <span className="vp-floatHeart vp-floatHeart--2">♥</span>
            <span className="vp-floatHeart vp-floatHeart--3">♥</span>
          </div>

          <h2 className="vp-title vp-title--sm">{question}</h2>
          <p className="vp-text vp-text--muted">
            Say yes and unlock a tiny surprise. (The “No” button is… shy.)
          </p>

          <div className="vp-arena" ref={arenaRef} aria-label="Answer area">
            <div className="vp-arena__yes">
              <button
                type="button"
                className="vp-btn vp-btn--primary vp-btn--lg"
                onClick={handleYes}
                aria-label="Yes, I will be your Valentine"
              >
                Yes
              </button>
            </div>

            <div
              className="vp-arena__no"
              style={{
                left: `${noPos.x}%`,
                top: `${noPos.y}%`,
              }}
            >
              <button
                ref={noBtnRef}
                type="button"
                className="vp-btn vp-btn--secondary"
                onMouseEnter={() => {
                  if (!reducedMotion) randomizeNoPosition();
                }}
                onPointerEnter={() => {
                  if (!reducedMotion) randomizeNoPosition();
                }}
                onClick={() => {
                  // If user manages to click No, we keep it playful: dodge again and show a hint.
                  if (!reducedMotion) randomizeNoPosition();
                }}
                aria-label="No (mischievous button)"
              >
                No
              </button>
            </div>
          </div>

          <div className="vp-questionCard__meta" aria-live="polite">
            {noDodges > 0 ? (
              <span className="vp-badge" aria-label="No button dodges">
                Dodged {noDodges} time{noDodges === 1 ? "" : "s"}
              </span>
            ) : (
              <span className="vp-badge vp-badge--hint">Try to click “No”</span>
            )}
          </div>

          <div className="vp-subtext">
            Accessibility note: use Tab to reach “Yes” quickly; “No” may move but does not block navigation.
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlayfulQuestion;
