
import Image from "next/image";
import type { CSSProperties } from "react";

type DesignThinkingHeroProps = {
  productImageSrc?: string;
  purchaseUrl?: string;
};

const enterStyle = (delay: number): CSSProperties =>
  ({
    "--dth-delay": `${delay}s`,
  }) as CSSProperties;

export function DesignThinkingHero({
  productImageSrc,
  purchaseUrl,
}: DesignThinkingHeroProps) {
  return (
    <section
      className="dth-hero"
      id="design-thinking"
    >
      <div className="dth-hero-inner">
        {/* BREADCRUMB */}

        <div
          className="dth-breadcrumb dth-enter"
          style={enterStyle(0.05)}
        >
          <span className="dth-breadcrumb-dot" />

          <span>
            TÀI LIỆU SỐ \ TÀI LIỆU TƯ DUY THIẾT KẾ
          </span>
        </div>

        {/* MAIN CONTENT */}

        <div className="dth-hero-grid">
          {/* LEFT — TITLE */}

          <div className="dth-hero-left">
            <h1 className="dth-title">
              <span
                className="dth-title-row dth-title-row--first dth-enter"
                style={enterStyle(0.13)}
              >
                <span
                  className="dth-title-star"
                  aria-hidden="true"
                >
                  ✱
                </span>

                <span className="dth-title-pill">
                  TÀI LIỆU
                </span>
              </span>

              <span
                className="dth-title-row dth-enter"
                style={enterStyle(0.23)}
              >
                <span className="dth-title-pill">
                  TƯ DUY
                </span>

                <a
                  href="#design-thinking-buy"
                  className="dth-title-arrow"
                  aria-label="Xem thông tin mua tài liệu"
                  data-cur="OPEN"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m15 8 4 4-4 4" />
                  </svg>
                </a>
              </span>

              <span
                className="dth-title-row dth-enter"
                style={enterStyle(0.33)}
              >
                <span className="dth-title-pill dth-title-pill--lime">
                  THIẾT KẾ
                </span>
              </span>
            </h1>

            {/* SUBTITLE */}

            <p
              className="dth-hero-subtitle dth-enter"
              style={enterStyle(0.44)}
            >
              Bộ tài liệu về Thiết kế dành riêng cho
              <br className="dth-desktop-break" />
              người làm Social Media Marketing
            </p>
          </div>

          {/* RIGHT — MOCKUP + PRICE */}

          <div className="dth-hero-right">
            <div
              className="dth-visual dth-enter"
              style={enterStyle(0.25)}
            >
              {productImageSrc ? (
                <Image
                  src={productImageSrc}
                  alt="Bộ tài liệu Tư duy thiết kế dành cho Social Media Marketing"
                  fill
                  priority
                  sizes="(max-width: 820px) 90vw, 52vw"
                  className="dth-product-image"
                />
              ) : (
                <div className="dth-visual-placeholder">
                  <span>TÀI LIỆU</span>
                  <strong>TƯ DUY THIẾT KẾ</strong>

                  <small>
                    BRIEF · DESIGN PRINCIPLES · CANVA
                  </small>
                </div>
              )}

              {/* FLOATING TAGS */}

              <span
                className="dth-tag dth-tag--principles ftag"
                data-d="14"
              >
                NGUYÊN TẮC THIẾT KẾ
              </span>

              <span
                className="dth-tag dth-tag--brief ftag"
                data-d="19"
              >
                BRIEF ẤN PHẨM
              </span>

              <span
                className="dth-tag dth-tag--canva ftag"
                data-d="23"
              >
                THỰC CHIẾN CANVA
              </span>
            </div>

            {/* PRICE */}

            <div
              className="dth-price-area dth-enter"
              id="design-thinking-buy"
              style={enterStyle(0.46)}
            >
              <p className="dth-price-label">
                SỞ HỮU TÀI LIỆU CHỈ VỚI
              </p>

              <div className="dth-price-row">
                <strong>339.000đ</strong>
                <del>399.000đ</del>
              </div>

              {purchaseUrl ? (
                <a
                  href={purchaseUrl}
                  className="dth-buy-button"
                  data-cur="OPEN"
                >
                  <span>MUA NGAY</span>

                  <span
                    className="dth-buy-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              ) : (
                <button
                  type="button"
                  className="dth-buy-button"
                  disabled
                  title="Chưa có liên kết thanh toán"
                >
                  <span>MUA NGAY</span>

                  <span
                    className="dth-buy-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM MARQUEE */}

      <div
        className="dth-marquee dth-enter"
        style={enterStyle(0.6)}
        aria-label="Tài liệu tư duy thiết kế"
      >
        <div
          className="dth-marquee-track"
          aria-hidden="true"
        >
          {Array.from({ length: 2 }, (_, groupIndex) => (
            <div
              className="dth-marquee-group"
              key={groupIndex}
            >
              {Array.from({ length: 4 }, (_, index) => (
                <span
                  className="dth-marquee-item"
                  key={index}
                >
                  TÀI LIỆU TƯ DUY THIẾT KẾ

                  <span
                    className="dth-marquee-star"
                    aria-hidden="true"
                  >
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}