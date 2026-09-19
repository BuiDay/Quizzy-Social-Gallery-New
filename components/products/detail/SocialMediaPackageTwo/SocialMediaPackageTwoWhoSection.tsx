"use client";

import { useEffect, useRef } from "react";

const items = [
  {
    no: "01",
    title: "BẠN MỚI BẮT ĐẦU\nLÀM SOCIAL MEDIA",
    desc:
      "Đã có project để làm nhưng chưa có sẵn Proposal, Audit hay Report.",
    featured: false,
  },
  {
    no: "02",
    title: "FREELANCER\nCHUYÊN NGHIỆP",
    desc:
      "Muốn tự pitching, báo giá và trình bày cách làm rõ ràng hơn thay vì mỗi lần có client lại phải làm mọi thứ từ đầu.",
    featured: true,
  },
  {
    no: "03",
    title: "SOCIAL MEDIA\nINTERN / EXECUTIVE",
    desc:
      "Đã có kiến thức Social Media nhưng vẫn còn loay hoay khi làm Proposal, Audit và báo cáo cho client.",
    featured: false,
  },
];

export function SocialMediaPackageTwoWhoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const stepRefs = useRef<
    (HTMLSpanElement | null)[]
  >([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    let frameId = 0;

    let currentX = 0;
    let targetX = 0;

    const isDesktop = () =>
      window.innerWidth > 880;

    const clamp = (
      value: number,
      min: number,
      max: number,
    ) =>
      Math.min(
        Math.max(value, min),
        max,
      );

    /* =========================================
       CALCULATE TARGET POSITION
       ========================================= */

    const updateTarget = () => {
      if (!isDesktop()) {
        targetX = 0;
        return;
      }

      const viewportHeight =
        window.innerHeight;

      const scrollableHeight = Math.max(
        section.offsetHeight -
          viewportHeight,
        1,
      );

      const rect =
        section.getBoundingClientRect();

      const progress = clamp(
        -rect.top / scrollableHeight,
        0,
        1,
      );

      const maxTranslate = Math.max(
        track.scrollWidth -
          window.innerWidth,
        0,
      );

      targetX =
        -progress * maxTranslate;

      /* STEP INDICATOR */

      const stepCount =
        stepRefs.current.length;

      const active = Math.min(
        stepCount - 1,
        Math.round(
          progress *
            (stepCount - 1),
        ),
      );

      stepRefs.current.forEach(
        (step, index) => {
          step?.classList.toggle(
            "is-active",
            index === active,
          );
        },
      );
    };

    /* =========================================
       SMOOTH LERP
       ========================================= */

    const animate = () => {
      if (!isDesktop()) {
        currentX = 0;
        targetX = 0;

        track.style.transform =
          "none";
      } else {
        /*
          0.11 = smooth nhưng vẫn bám scroll.
          Nếu muốn nhanh hơn: 0.14–0.16
          Nếu muốn mềm hơn: 0.08–0.1
        */

        const ease = 0.11;

        currentX +=
          (targetX - currentX) *
          ease;

        if (
          Math.abs(
            targetX - currentX,
          ) < 0.1
        ) {
          currentX = targetX;
        }

        track.style.transform =
          `translate3d(${currentX}px, 0, 0)`;
      }

      frameId =
        window.requestAnimationFrame(
          animate,
        );
    };

    const handleScroll = () => {
      updateTarget();
    };

    const handleResize = () => {
      updateTarget();

      if (!isDesktop()) {
        currentX = 0;
        targetX = 0;

        track.style.transform =
          "none";
      }
    };

    /* INITIAL POSITION */

    updateTarget();

    currentX = targetX;

    track.style.transform =
      isDesktop()
        ? `translate3d(${currentX}px, 0, 0)`
        : "none";

    frameId =
      window.requestAnimationFrame(
        animate,
      );

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      window.cancelAnimationFrame(
        frameId,
      );

      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="smpkg2-who"
      id="smpkg2-who"
    >
      <div className="smpkg2-who__pin">

        {/* ===================================
            TOP TITLE
            =================================== */}

        <div className="smpkg2-who__topline">
          <h2 className="smpkg2-who__title">
            PACKAGE NÀY PHÙ HỢP VỚI AI?
          </h2>

          <div
            className="smpkg2-who__steps"
            aria-hidden="true"
          >
            {[
              "01",
              "02",
              "03",
              "END",
            ].map(
              (step, index) => (
                <span
                  key={step}
                  ref={(el) => {
                    stepRefs.current[
                      index
                    ] = el;
                  }}
                  className={`smpkg2-who__step ${
                    index === 0
                      ? "is-active"
                      : ""
                  }`}
                >
                  {step}
                </span>
              ),
            )}
          </div>
        </div>

        {/* ===================================
            HORIZONTAL TRACK
            =================================== */}

        <div
          ref={trackRef}
          className="smpkg2-who__track"
        >
          {items.map(
            (item, index) => (
              <article
                key={item.no}
                className={`smpkg2-who__card ${
                  item.featured
                    ? "is-featured"
                    : ""
                }`}
              >
                <div className="smpkg2-who__no">
                  {item.no}
                </div>

                <div className="smpkg2-who__body">
                  <h3 className="smpkg2-who__card-title">
                    {item.title
                      .split("\n")
                      .map(
                        (
                          line,
                          lineIndex,
                        ) => (
                          <span
                            key={
                              lineIndex
                            }
                          >
                            {line}

                            {lineIndex !==
                              item.title.split(
                                "\n",
                              ).length -
                                1 && (
                              <br />
                            )}
                          </span>
                        ),
                      )}
                  </h3>

                  <p className="smpkg2-who__card-desc">
                    {item.desc}
                  </p>
                </div>
              </article>
            ),
          )}

          {/* =================================
              FINAL LIME CARD
              ================================= */}

          <article className="smpkg2-who__card smpkg2-who__card--end">
            <div className="smpkg2-who__end-star">
              ✳
            </div>

            <p className="smpkg2-who__end-text">
              Nếu bạn đang ở một
              trong những giai đoạn
              này thì mình nghĩ{" "}
              <span>
                Package 02
              </span>{" "}
              sẽ giúp bạn có một bộ
              workflow rõ ràng hơn
              khi làm việc với client.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}