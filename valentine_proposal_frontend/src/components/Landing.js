import React, { useEffect, useId, useMemo, useState } from "react";
import { LANDING_MEDIA } from "../animationConfig";

/**
 * Landing screen with photo collage/carousel and an intro message.
 * Photos are local assets so the app works completely frontend-only.
 *
 * Image fitting controls:
 * - fitMode: "cover" | "contain" (default: "cover")
 * - focalX: "left" | "center" | "right" (default: "center")
 * - focalY: "top" | "center" | "bottom" (default: "center")
 * - aspect: "auto" | "4:3" | "16:9" | "1:1" (default: "auto")
 */

// PUBLIC_INTERFACE
function Landing({
  photos,
  onStart,
  title,
  message,
  fitMode = LANDING_MEDIA.fitMode,
  focalX = LANDING_MEDIA.focalX,
  focalY = LANDING_MEDIA.focalY,
  aspect = LANDING_MEDIA.aspect,
}) {
  const carouselId = useId();
  const [activeIndex, setActiveIndex] = useState(0);

  const mediaClasses = useMemo(() => {
    const normFit = fitMode === "contain" ? "contain" : "cover";
    const normX = ["left", "center", "right"].includes(focalX) ? focalX : "center";
    const normY = ["top", "center", "bottom"].includes(focalY) ? focalY : "center";

    const fitClass = normFit === "contain" ? "vp-fitContain" : "vp-fitCover";

    const aspectClass =
      aspect === "4:3"
        ? "vp-aspect4x3"
        : aspect === "16:9"
          ? "vp-aspect16x9"
          : aspect === "1:1"
            ? "vp-aspect1x1"
            : "vp-aspectAuto";

    // Use combined focal classes so X+Y can be set precisely.
    const focalMap = {
      left: { top: "vp-focalYXLeftTop", center: "vp-focalYXLeftCenter", bottom: "vp-focalYXLeftBottom" },
      center: {
        top: "vp-focalYXCenterTop",
        center: "vp-focalYXCenterCenter",
        bottom: "vp-focalYXCenterBottom",
      },
      right: { top: "vp-focalYXRightTop", center: "vp-focalYXRightCenter", bottom: "vp-focalYXRightBottom" },
    };

    const focalClass = focalMap[normX]?.[normY] ?? "vp-focalYXCenterCenter";

    return {
      fitClass,
      focalClass,
      aspectClass,
    };
  }, [aspect, fitMode, focalX, focalY]);

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
        <div className="vp-mediaCard vp-landingMediaCard" aria-label="Couple photos">
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
                <figure
                  key={`${p.alt}-${idx}`}
                  className={`vp-collage__item vp-collage__item--${idx + 1} vp-mediaFrame ${mediaClasses.aspectClass} vp-mediaFrame--roundedMd`}
                >
                  <img
                    className={`vp-collage__img vp-mediaFrame__img ${mediaClasses.fitClass} ${mediaClasses.focalClass}`}
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                  />
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
                    <div className={`vp-mediaFrame ${mediaClasses.aspectClass} vp-mediaFrame--roundedSm`}>
                      <img
                        /*
                          Slider behavior: always show full image without cropping.
                          We intentionally DO NOT change collage behavior; collage continues
                          to follow the Landing-level fit/focal/aspect controls.
                        */
                        className="vp-carousel__img vp-mediaFrame__img vp-fitContain vp-focalYXCenterCenter"
                        src={active.src}
                        alt={active.alt}
                        loading="lazy"
                      />
                    </div>
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
          <button
            type="button"
            className="vp-btn vp-btn--primary vp-btn--lg vp-btn--shimmer"
            onClick={onStart}
            aria-label="Start"
          >
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
