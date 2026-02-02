import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

import couple01 from "./assets/couple-01.jpeg";
import couple02 from "./assets/couple-02.jpeg";
import couple03 from "./assets/couple-03.jpeg";
import couple04 from "./assets/couple-04.jpeg";
import couple05 from "./assets/couple-05.jpeg";
import couple06 from "./assets/couple-06.jpeg";
import couple07 from "./assets/couple-07.jpeg";

import Landing from "./components/Landing";
import PlayfulQuestion from "./components/PlayfulQuestion";
import SurpriseReveal from "./components/SurpriseReveal";

/**
 * Simple 3-step flow:
 * 1) Landing: photo collage + intro message + Start
 * 2) Playful question: "Will you be my Valentine?" with mischievous No
 * 3) Reveal: celebration + confetti + replay
 *
 * Customization notes are in the component files and below.
 */

// PUBLIC_INTERFACE
function App() {
  /** "landing" | "question" | "reveal" */
  const [step, setStep] = useState("landing");

  const photos = useMemo(
    () => [
      {
        src: couple01,
        alt: "Couple photo 1",
        caption: "Us — memory #1",
      },
      {
        src: couple02,
        alt: "Couple photo 2",
        caption: "Us — memory #2",
      },
      {
        src: couple03,
        alt: "Couple photo 3",
        caption: "Us — memory #3",
      },
      {
        src: couple04,
        alt: "Couple photo 4",
        caption: "Us — memory #4",
      },
      {
        src: couple05,
        alt: "Couple photo 5",
        caption: "Us — memory #5",
      },
      {
        src: couple06,
        alt: "Couple photo 6",
        caption: "Us — memory #6",
      },
      {
        src: couple07,
        alt: "Couple photo 7",
        caption: "Us — memory #7",
      },
    ],
    []
  );

  // Ensure focus starts at the main card when step changes for better keyboard UX.
  useEffect(() => {
    const el = document.getElementById("vp-card");
    if (el) el.focus();
  }, [step]);

  // PUBLIC_INTERFACE
  const reset = () => setStep("landing");

  return (
    <div className="vp-app">
      <div className="vp-bg" aria-hidden="true" />
      <main className="vp-shell" aria-label="Valentine proposal app">
        <div className="vp-card" id="vp-card" tabIndex={-1}>
          <header className="vp-header">
            <div className="vp-brand" aria-label="Ocean Professional theme header">
              <span className="vp-brand__dot" aria-hidden="true" />
              <div className="vp-brand__text">
                <div className="vp-brand__title">A Little Valentine Moment</div>
                <div className="vp-brand__subtitle">Made with love & mischief</div>
              </div>
            </div>

            <div className="vp-progress" aria-label="Progress">
              <span
                className={`vp-progress__pill ${step === "landing" ? "is-active" : ""}`}
                aria-current={step === "landing" ? "step" : undefined}
              >
                1
              </span>
              <span
                className={`vp-progress__pill ${step === "question" ? "is-active" : ""}`}
                aria-current={step === "question" ? "step" : undefined}
              >
                2
              </span>
              <span
                className={`vp-progress__pill ${step === "reveal" ? "is-active" : ""}`}
                aria-current={step === "reveal" ? "step" : undefined}
              >
                3
              </span>
            </div>
          </header>

          {step === "landing" && (
            <Landing
              photos={photos}
              onStart={() => setStep("question")}
              title="Hi my love"
              message={
                // TODO: Replace with your personal message.
                "I’ve been thinking about how lucky I am that we found each other. I made a tiny little page just for us… and one important question."
              }
            />
          )}

          {step === "question" && (
            <PlayfulQuestion
              question="Will you be my Valentine?"
              onYes={() => setStep("reveal")}
              onBack={() => setStep("landing")}
            />
          )}

          {step === "reveal" && (
            <SurpriseReveal
              headline="Yay! You said YES!"
              message={
                // TODO: Customize the reveal message.
                "Get ready for extra cuddles, surprise snacks, and a very official Valentine date. I love you."
              }
              onReplay={reset}
            />
          )}

          <footer className="vp-footer">
            <div className="vp-footer__hint">
              Tip: You can replace photos in <code>src/assets/</code> and edit the messages in{" "}
              <code>src/App.js</code>.
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;

/**
 * README (quick, in-code):
 * - Replace images: put your photos in src/assets and update imports at top of this file.
 * - Replace text: edit the `message` strings for Landing and SurpriseReveal above.
 * - Tweak the “No” behavior: see src/components/PlayfulQuestion.js (search for TODO No behavior).
 */
