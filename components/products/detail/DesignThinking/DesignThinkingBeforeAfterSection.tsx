
"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

export function DesignThinkingBeforeAfterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState(50);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.12,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const compareStyle = {
    "--dth-compare-position": `${position}%`,
    "--dth-compare-clip": `${100 - position}%`,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      className={`dth-before-after ${
        isVisible ? "is-visible" : ""
      }`}
      id="design-thinking-before-after"
    >
      <div className="dth-before-after-inner">

        {/* ==================================================
            HEADING
            ================================================== */}

        <h2 className="dth-before-after-title">
          Một Social Post{" "}
          <span className="dth-before-after-highlight">
            rõ ràng
          </span>
          ,{" "}
          <span className="dth-before-after-highlight">
            đúng nhận diện
          </span>{" "}
          và{" "}
          <span className="dth-before-after-highlight">
            đúng insight
          </span>{" "}
          sẽ
          <br className="dth-before-after-desktop-break" />
          giúp content dễ được chú ý hơn.
        </h2>

        {/* ==================================================
            INTERACTIVE COMPARISON
            ================================================== */}

        <div
          className="dth-before-after-compare"
          style={compareStyle}
        >
          {/* AFTER — GOOD DESIGN / BASE LAYER */}

          <div className="dth-before-after-panel dth-before-after-panel--good">
            <div className="dth-before-after-good-art">

              <div className="dth-before-after-good-heading">
                SUMMER SALE
              </div>

              <div className="dth-before-after-good-offer">
                <strong>30%</strong>
                <span>toàn bộ</span>
              </div>

              <span className="dth-before-after-good-cta">
                Mua ngay →
              </span>

              <div
                className="dth-before-after-good-swatches"
                aria-hidden="true"
              >
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>

          {/* BEFORE — BAD DESIGN / CLIPPED LAYER */}

          <div className="dth-before-after-panel dth-before-after-panel--bad">
            <div className="dth-before-after-bad-art">
              <strong className="dth-before-after-bad-title">
                SUMMER SALE SIÊU KHỦNG
              </strong>

              <span className="dth-before-after-bad-discount">
                giảm giá 30% 40% 50%!!!
              </span>

              <span className="dth-before-after-bad-small">
                mua ngay hôm nay kẻo lỡ
              </span>

              <span className="dth-before-after-bad-promo">
                FREESHIP · QUÀ TẶNG · DEAL SỐC
              </span>

              <strong className="dth-before-after-bad-click">
                ★★★ CLICK LIỀN TAY ★★★
              </strong>

              <small>
                nhanh lên còn kịp nha mọi người ơi
              </small>
            </div>
          </div>

          {/* FIXED LABELS */}

          <span className="dth-before-after-tag dth-before-after-tag--bad">
            ẤN PHẨM KHÔNG TỐT
          </span>

          <span className="dth-before-after-tag dth-before-after-tag--good">
            ẤN PHẨM TỐT
          </span>

          {/* SLIDER HANDLE */}

          <div
            className="dth-before-after-handle"
            aria-hidden="true"
          >
            <span>↔</span>
          </div>

          {/* ACCESSIBLE DRAG CONTROL */}

          <input
            className="dth-before-after-range"
            type="range"
            min="0"
            max="100"
            step="1"
            value={position}
            onChange={(event) =>
              setPosition(Number(event.target.value))
            }
            aria-label="Kéo để so sánh ấn phẩm tốt và ấn phẩm không tốt"
            aria-valuetext={`${position}% ấn phẩm không tốt, ${
              100 - position
            }% ấn phẩm tốt`}
          />
        </div>

        {/* ==================================================
            BOTTOM NOTE
            ================================================== */}

        <p className="dth-before-after-note">
          Ngược lại, một thiết kế rối, khó nhìn hoặc truyền
          tải sai ý tưởng thì
          <br className="dth-before-after-desktop-break" />
          content hay đến đâu cũng rất dễ bị lướt qua.
        </p>
      </div>
    </section>
  );
}