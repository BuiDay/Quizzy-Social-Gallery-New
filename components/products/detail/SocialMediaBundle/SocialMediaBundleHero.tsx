import React from "react";

export function SocialMediaBundleHero() {
  return (
    <section
      className="smbundle-hero"
      id="social-media-bundle-top"
    >
      <div className="wrap smbundle-hero-inner">

        {/* =====================================================
            BREADCRUMB
            ===================================================== */}

        <div
          className="smbundle-breadcrumb smbundle-enter"
          style={
            {
              "--delay": "0.06s",
            } as React.CSSProperties
          }
        >
          <span className="smbundle-breadcrumb-dot" />

          <span>
            TÀI LIỆU SỐ \ SOCIAL MEDIA BUNDLE
          </span>
        </div>


        {/* =====================================================
            MAIN
            ===================================================== */}

        <div className="smbundle-hero-grid">

          {/* ===================================================
              LEFT
              =================================================== */}

          <div className="smbundle-hero-left">

            <div className="smbundle-title">

              {/* SOCIAL */}

              <div
                className="smbundle-title-row smbundle-title-row--social smbundle-enter"
                style={
                  {
                    "--delay": "0.15s",
                  } as React.CSSProperties
                }
              >
                <span
                  className="smbundle-star"
                  aria-hidden="true"
                >
                  ✱
                </span>

                <span className="smbundle-title-pill">
                  SOCIAL
                </span>
              </div>


              {/* MEDIA */}

              <div
                className="smbundle-title-row smbundle-title-row--media smbundle-enter"
                style={
                  {
                    "--delay": "0.23s",
                  } as React.CSSProperties
                }
              >
                <span className="smbundle-title-pill">
                  MEDIA
                </span>

                <a
                  href="#smbundle-buy"
                  className="smbundle-title-arrow"
                  aria-label="Xem Social Media Bundle"
                  data-cur="OPEN"
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


              {/* BUNDLE */}

              <div
                className="smbundle-title-row smbundle-enter"
                style={
                  {
                    "--delay": "0.31s",
                  } as React.CSSProperties
                }
              >
                <span className="smbundle-title-pill smbundle-title-pill--lime">
                  BUNDLE
                </span>
              </div>

            </div>


            {/* SUBTITLE */}

            <p
              className="smbundle-subtitle smbundle-enter"
              style={
                {
                  "--delay": "0.41s",
                } as React.CSSProperties
              }
            >
              Bộ tài liệu + template dành cho
              <br />
              người làm Social Media Marketing
            </p>

          </div>


          {/* ===================================================
              RIGHT
              =================================================== */}

          <div className="smbundle-hero-right">

            {/* ================= PRODUCT VISUAL ================= */}

            <div
              className="smbundle-product-visual smbundle-enter"
              style={
                {
                  "--delay": "0.23s",
                } as React.CSSProperties
              }
            >

              {/*
                SAU KHI CÓ ẢNH:

                import Image from "next/image";
                import BundleImage from "@/assets/images/Social Media Bundle/1.png";

                <Image
                  src={BundleImage}
                  alt="Social Media Bundle"
                  fill
                  priority
                  className="smbundle-product-image"
                />
              */}


              {/* TEMP PLACEHOLDER */}

              <div className="smbundle-product-placeholder">
                <span>
                  SOCIAL MEDIA
                </span>

                <strong>
                  BUNDLES
                </strong>
              </div>


              {/* FLOATING TAGS */}

              <span
                className="smbundle-product-tag smbundle-product-tag--proposal ftag"
                data-d="14"
              >
                SOCIAL MEDIA PROPOSAL
              </span>

              <span
                className="smbundle-product-tag smbundle-product-tag--portfolio ftag"
                data-d="19"
              >
                SOCIAL MEDIA PORTFOLIO
              </span>

              <span
                className="smbundle-product-tag smbundle-product-tag--template ftag"
                data-d="23"
              >
                SOCIAL MEDIA TEMPLATE
              </span>

            </div>


            {/* ================= PRICE ================= */}

            <div
              className="smbundle-price-area smbundle-enter"
              id="smbundle-buy"
              style={
                {
                  "--delay": "0.42s",
                } as React.CSSProperties
              }
            >
              <p className="smbundle-price-label">
                SỞ HỮU TÀI LIỆU CHỈ VỚI
              </p>


              <div className="smbundle-price-row">
                <strong>
                  599.000đ
                </strong>

                <del>
                  1.299.000đ
                </del>
              </div>


              <a
                href="#"
                className="smbundle-buy"
                data-cur="OPEN"
              >
                <span>
                  MUA NGAY
                </span>

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


      {/* =====================================================
          MARQUEE
          ===================================================== */}

      <div className="smbundle-marquee">

        <div className="smbundle-marquee-track">

          {[...Array(8)].map((_, index) => (
            <div
              className="smbundle-marquee-item"
              key={index}
            >
              <span>
                SOCIAL MEDIA BUNDLE
              </span>

              <i aria-hidden="true">
                ✦
              </i>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}