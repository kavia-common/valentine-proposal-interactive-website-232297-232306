import React, { useEffect, useId, useState } from "react";

/**
 * Landing screen with photo collage/carousel and an intro message.
 * Photos are local assets so the app works completely frontend-only.
 */

// PUBLIC_INTERFACE
function Landing({ photos, onStart, title, message }) {
  const carouselId = useId();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Keep active index in bounds if the photo list changes.
    if (!Array.isArray(photos) || photos.length === 0) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex((i) => Math.max(0, Math.min(i, photos.length - 1)));
  }, [photos]);

  const hasPhotos = Array.isArray(photos) && photos.length > 0;
  const active = hasPhotos ? photos[activeIndex] : null;

  // PUBLIC_INTERFACE
  const goPrev = () => {
    if (!hasPhotos) return;
    setActiveIndex((i) => (i - 1 + photos.length) % photos.length);
  };

  // PUBLIC_INTERFACE
  const goNext = () => {
    if (!hasPhotos) return;
    setActiveIndex((i) => (i + 1) % photos.length);
  };

  return (
    <section className="vp-step vp-landing" aria-label="Landing screen">
      <div className="vp-landing__media">
        <div className="vp-mediaCard" aria-label="Couple photos">
          <div className="vp-mediaCard__top">
            <div className="vp-mediaCard__label">Our little collage</div>
            <div className="vp-mediaCard__note">
              {/* TODO: Replace placeholder images in src/assets with your real photos. */}
              Replace photos in <code>src/assets</code>.
            </div>
          </div>

          <div className="vp-collage" aria-label="Photo collage">
            {hasPhotos ? (
              photos.slice(0, 3).map((p, idx) => (
                <figure key={`${p.alt}-${idx}`} className={`vp-collage__item vp-collage__item--${idx + 1}`}>
                  <img className="vp-collage__img" src={p.src} alt={p.alt} loading="lazy" />
                </figure>
              ))
            ) : (
              <div className="vp-dropzone" role="img" aria-label="Photo drop-zone placeholder">
                <div className="vp-dropzone__title">Photo area</div>
                <div className="vp-dropzone__text">
                  Add 2–3 images under <code>src/assets</code> and import them in <code>src/App.js</code>.
                </div>
              </div>
            )}
          </div>

          <div className="vp-carousel" aria-label="Carousel preview">
            <div className="vp-carousel__row" id={carouselId}>
              <button
                type="button"
                className="vp-iconBtn"
                onClick={goPrev}
                aria-label="Previous photo"
                disabled={!hasPhotos}
              >
                ‹
              </button>

              <div className="vp-carousel__frame" aria-live="polite">
                {active ? (
                  <>
                    <img className="vp-carousel__img" src={active.src} alt={active.alt} loading="lazy" />
                    <div className="vp-carousel__caption">{active.caption}</div>
                  </>
                ) : (
                  <div className="vp-carousel__empty">Add photos to preview here.</div>
                )}
              </div>

              <button
                type="button"
                className="vp-iconBtn"
                onClick={goNext}
                aria-label="Next photo"
                disabled={!hasPhotos}
              >
                ›
              </button>
            </div>

            <div className="vp-dots" aria-label="Carousel dots">
              {hasPhotos
                ? photos.map((p, idx) => (
                    <button
                      key={`${p.alt}-dot-${idx}`}
                      type="button"
                      className={`vp-dot ${idx === activeIndex ? "is-active" : ""}`}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Show photo ${idx + 1}`}
                      aria-pressed={idx === activeIndex}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>

      <div className="vp-landing__content">
        <h1 className="vp-title">{title}</h1>
        <p className="vp-text">{message}</p>

        <div className="vp-actions" aria-label="Landing actions">
          <button type="button" className="vp-btn vp-btn--primary vp-btn--lg" onClick={onStart} aria-label="Start">
            Start
          </button>
          <div className="vp-subtext">
            (Keyboard friendly: Tab to buttons, Enter/Space to activate.)
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
