import Image from "next/image";
import ThumailImage from "@/assets/images/TikTok Ideas Hacking/1.png";

export function TiktokIdeasHero() {
  return (
    <section className="tiktok-detail-hero">
      <div className="wrap tiktok-detail-inner">
        <div
          className="tiktok-detail-breadcrumb"
          data-rv="up"
        >
          <span className="tiktok-detail-dot" />

          <span>
            TÀI LIỆU SỐ \ TIKTOK IDEAS HACKING
          </span>
        </div>

        <div className="tiktok-detail-grid">
          {/* ================= LEFT ================= */}

          <div className="tiktok-detail-left">
            <div className="tiktok-detail-title-block">
              <div
                className="tiktok-detail-title-row"
                data-rv="up"
              >
                <span className="tiktok-detail-star">
                  ✱
                </span>

                <span className="tiktok-detail-pill">
                  TIKTOK
                </span>
              </div>

              <div
                className="tiktok-detail-title-row tiktok-detail-title-row--middle"
                data-rv="up"
                data-dl="70"
              >
                <span className="tiktok-detail-pill">
                  IDEAS
                </span>

                <a
                  href="#buy-now"
                  className="tiktok-detail-arrow"
                  data-cur="OPEN"
                  aria-label="Mua ngay"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m15 8 4 4-4 4" />
                  </svg>
                </a>
              </div>

              <div
                className="tiktok-detail-title-row"
                data-rv="up"
                data-dl="140"
              >
                <span className="tiktok-detail-pill tiktok-detail-pill--lime">
                  HACKING
                </span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}

          <div
            className="tiktok-detail-right"
            data-rv="scale"
          >
            <div className="tiktok-product-visual">
              <Image
                src={ThumailImage}
                alt="TikTok Ideas Hacking"
                className="tiktok-product-image"
                priority
              />

              <span
                className="tiktok-product-tag tiktok-product-tag--top ftag"
                data-d="18"
              >
                TREND RESEARCH
              </span>

              <span
                className="tiktok-product-tag tiktok-product-tag--left ftag"
                data-d="13"
              >
                VIRAL CONTENT
              </span>

              <span
                className="tiktok-product-tag tiktok-product-tag--bottom ftag"
                data-d="22"
              >
                HOOK IDEAS
              </span>
            </div>

            <div
              className="tiktok-detail-purchase"
              id="buy-now"
            >
              <span className="tiktok-detail-price-label">
                SỞ HỮU TÀI LIỆU CHỈ VỚI
              </span>

              <div className="tiktok-detail-price-row">
                <strong>499.000đ</strong>

                <del>999.000đ</del>
              </div>

              <a
                href="#"
                className="tiktok-detail-buy-btn"
                data-cur="OPEN"
              >
                <span>MUA NGAY</span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m15 8 4 4-4 4" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="tiktok-detail-marquee">
        <div className="tiktok-detail-marquee-track">
          <span>TIKTOK IDEAS HACKING</span>
          <i>✦</i>

          <span>TIKTOK IDEAS HACKING</span>
          <i>✦</i>

          <span>TIKTOK IDEAS HACKING</span>
          <i>✦</i>

          <span>TIKTOK IDEAS HACKING</span>
          <i>✦</i>

          <span>TIKTOK IDEAS HACKING</span>
          <i>✦</i>

          <span>TIKTOK IDEAS HACKING</span>
          <i>✦</i>
        </div>
      </div>
    </section>
  );
}