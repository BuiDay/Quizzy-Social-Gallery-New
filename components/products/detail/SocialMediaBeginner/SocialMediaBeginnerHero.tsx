import Image from "next/image";
import ThumailImage from "@/assets/images/Social Media Beginner/Social Media Beginner.png";

export function SocialMediaBeginnerHero() {
    return (
      <section
        className="smb-hero"
        id="social-media-beginner-top"
      >
        <div className="wrap smb-hero-inner">
  
          <div
            className="smb-breadcrumb smb-hero-enter"
            style={{ "--delay": "0.08s" } as React.CSSProperties}
          >
            <span className="smb-breadcrumb-dot" />
  
            <span>
              TÀI LIỆU SỐ \ SOCIAL MEDIA BEGINNER EBOOK
            </span>
          </div>
  
          {/* =====================================================
              MAIN
              ===================================================== */}
  
          <div className="smb-hero-grid">
  
            {/* ===================================================
                LEFT
                =================================================== */}
  
            <div className="smb-hero-title-area">
  
              {/* ROW 1 */}
  
              <div
                className="smb-title-row smb-title-row--social smb-hero-enter"
                style={{ "--delay": "0.16s" } as React.CSSProperties}
              >
                <span
                  className="smb-title-star"
                  aria-hidden="true"
                >
                  ✱
                </span>
  
                <span className="smb-title-pill">
                  SOCIAL
                </span>
              </div>
  
  
              {/* ROW 2 */}
  
              <div
                className="smb-title-row smb-title-row--media smb-hero-enter"
                style={{ "--delay": "0.24s" } as React.CSSProperties}
              >
                <span className="smb-title-pill">
                  MEDIA
                </span>
  
                <a
                  href="#smb-buy"
                  className="smb-title-arrow"
                  aria-label="Mua Social Media Beginner Ebook"
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
  
  
              {/* ROW 3 */}
  
              <div
                className="smb-title-row smb-hero-enter"
                style={{ "--delay": "0.32s" } as React.CSSProperties}
              >
                <span className="smb-title-pill smb-title-pill--lime">
                  BEGINNER
                </span>
              </div>
  
  
              {/* ROW 4 */}
  
              <div
                className="smb-title-row smb-title-row--ebook smb-hero-enter"
                style={{ "--delay": "0.4s" } as React.CSSProperties}
              >
                <span className="smb-title-pill">
                  EBOOK
                </span>
              </div>
  
            </div>
  
  
            {/* ===================================================
                RIGHT
                =================================================== */}
  
            <div className="smb-hero-product">
  
              {/* VISUAL */}
  
              <div
                className="smb-product-visual smb-hero-enter"
                style={{ "--delay": "0.25s" } as React.CSSProperties}
              >
                
  
                  <Image
                    src={ThumailImage}
                    alt="Social Media Beginner Ebook"
                    fill
                    priority
                    className="smb-product-image"
                  />
        
              
  
                <span
                  className="smb-product-tag smb-product-tag--strategy ftag"
                  data-d="14"
                >
                  SOCIAL MEDIA STRATEGY
                </span>
  
                <span
                  className="smb-product-tag smb-product-tag--plan ftag"
                  data-d="19"
                >
                  CONTENT PLAN
                </span>
  
                <span
                  className="smb-product-tag smb-product-tag--marketing ftag"
                  data-d="23"
                >
                  SOCIAL MEDIA MARKETING
                </span>
              </div>
  
  
              {/* PRICE */}
  
              <div
                className="smb-product-price-area smb-hero-enter"
                id="smb-buy"
                style={{ "--delay": "0.46s" } as React.CSSProperties}
              >
                <p className="smb-product-price-label">
                  SỞ HỮU TÀI LIỆU CHỈ VỚI
                </p>
  
                <div className="smb-product-price">
                  <strong>
                    499.000đ
                  </strong>
  
                  <del>
                    4.445.000đ
                  </del>
                </div>
  
                <a
                  href="#"
                  className="smb-product-buy"
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
  
        <div className="smb-hero-marquee">
          <div className="smb-hero-marquee-track">
  
            {[...Array(6)].map((_, index) => (
              <div
                className="smb-hero-marquee-item"
                key={index}
              >
                <span className="smb-marquee-star">
                  ✦
                </span>
  
                <span>
                  SOCIAL MEDIA BEGINNER EBOOK
                </span>
              </div>
            ))}
  
          </div>
        </div>
      </section>
    );
  }