
import Image from "next/image";
import type { CSSProperties } from "react";

type SocialMediaPackageTwoHeroProps = {
  productImageSrc?: string;
  purchaseUrl?: string;
};

const packageItems = [
  "Social Media Proposal",
  "Social Media Audit",
  "Social Media Monthly Report",
];

const entrance = (delay: number): CSSProperties =>
  ({
    "--smpkg2-delay": `${delay}s`,
  }) as CSSProperties;

export function SocialMediaPackageTwoHero({
  productImageSrc,
  purchaseUrl,
}: SocialMediaPackageTwoHeroProps) {
  return (
    <section
      className="smpkg2-hero"
      id="social-media-package-2"
    >
      <div className="smpkg2-hero-inner">
        {/* BREADCRUMB */}

        <div
          className="smpkg2-breadcrumb smpkg2-enter"
          style={entrance(0.05)}
        >
          <span className="smpkg2-breadcrumb-dot" />

          <span>
            TÀI LIỆU SỐ \ SOCIAL MEDIA PACKAGE 2
          </span>
        </div>

        {/* MAIN CONTENT */}

        <div className="smpkg2-hero-grid">
          {/* LEFT — TITLE & PACKAGE CONTENT */}

          <div className="smpkg2-hero-left">
            <h1 className="smpkg2-title">
              <span
                className="smpkg2-title-row smpkg2-title-row--social smpkg2-enter"
                style={entrance(0.12)}
              >
                <span
                  className="smpkg2-star"
                  aria-hidden="true"
                >
                  ✱
                </span>

                <span className="smpkg2-title-pill">
                  SOCIAL
                </span>
              </span>

              <span
                className="smpkg2-title-row smpkg2-enter"
                style={entrance(0.22)}
              >
                <span className="smpkg2-title-pill">
                  MEDIA
                </span>

                <a
                  href="#smpkg2-buy"
                  className="smpkg2-title-arrow"
                  aria-label="Xem thông tin mua Social Media Package 2"
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
                className="smpkg2-title-row smpkg2-enter"
                style={entrance(0.32)}
              >
                <span className="smpkg2-title-pill smpkg2-title-pill--lime">
                  PACKAGE 2
                </span>
              </span>
            </h1>

            {/* THREE DOCUMENTS */}

            <ul
              className="smpkg2-package-list smpkg2-enter"
              style={entrance(0.43)}
            >
              {packageItems.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — PRODUCT & PRICE */}

          <div className="smpkg2-hero-right">
            <div
              className="smpkg2-visual smpkg2-enter"
              style={entrance(0.22)}
            >
              {productImageSrc ? (
                <Image
                  src={productImageSrc}
                  alt="Social Media Package 02 gồm Proposal, Audit và Monthly Report"
                  fill
                  priority
                  sizes="(max-width: 820px) 90vw, 50vw"
                  className="smpkg2-product-image"
                />
              ) : (
                <div className="smpkg2-visual-placeholder">
                  <span>SOCIAL MEDIA</span>
                  <strong>PACKAGE 02</strong>
                  <small>PRODUCT MOCKUP</small>
                </div>
              )}

              {/* FLOATING TAGS */}

              <span
                className="smpkg2-tag smpkg2-tag--proposal ftag"
                data-d="14"
              >
                1. SOCIAL MEDIA PROPOSAL
              </span>

              <span
                className="smpkg2-tag smpkg2-tag--audit ftag"
                data-d="19"
              >
                2. SOCIAL MEDIA AUDIT
              </span>

              <span
                className="smpkg2-tag smpkg2-tag--report ftag"
                data-d="23"
              >
                3. SOCIAL MEDIA MONTHLY REPORT
              </span>
            </div>

            {/* PRICE & CTA */}

            <div
              className="smpkg2-price-area smpkg2-enter"
              id="smpkg2-buy"
              style={entrance(0.43)}
            >
              <p className="smpkg2-price-label">
                SỞ HỮU TÀI LIỆU CHỈ VỚI
              </p>

              <div className="smpkg2-price-row">
                <strong>259.000đ</strong>
                <del>599.000đ</del>
              </div>

              {purchaseUrl ? (
                <a
                  href={purchaseUrl}
                  className="smpkg2-buy-button"
                  data-cur="OPEN"
                >
                  <span>MUA NGAY</span>
                  <span
                    className="smpkg2-buy-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              ) : (
                <button
                  type="button"
                  className="smpkg2-buy-button"
                  disabled
                  title="Chưa có liên kết thanh toán"
                >
                  <span>MUA NGAY</span>
                  <span
                    className="smpkg2-buy-arrow"
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
        className="smpkg2-marquee smpkg2-enter"
        style={entrance(0.6)}
        aria-label="Social Media Package 2"
      >
        <div className="smpkg2-marquee-track" aria-hidden="true">
          {Array.from({ length: 2 }, (_, group) => (
            <div
              className="smpkg2-marquee-group"
              key={group}
            >
              {Array.from({ length: 4 }, (_, index) => (
                <span
                  className="smpkg2-marquee-item"
                  key={index}
                >
                  SOCIAL MEDIA PACKAGE 2
                  <span
                    className="smpkg2-marquee-star"
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