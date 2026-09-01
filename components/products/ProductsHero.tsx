export function ProductsHero() {
    return (
      <section className="products-hero" id="products-top">
        <div className="products-hero-inner">
          {/* ================= BIG TITLE ================= */}
          <div className="products-hero-title-row">
            <span
              className="products-hero-star products-hero-animate"
              style={{ "--delay": "0.08s" } as React.CSSProperties}
              aria-hidden="true"
            >
              ✱
            </span>
  
            <span
              className="products-hero-pill products-hero-animate"
              style={{ "--delay": "0.15s" } as React.CSSProperties}
            >
              TÀI
            </span>
  
            <span
              className="products-hero-pill products-hero-pill--wide products-hero-animate"
              style={{ "--delay": "0.22s" } as React.CSSProperties}
            >
              LIỆU
            </span>
  
            <span
              className="products-hero-pill products-hero-pill--lime products-hero-animate"
              style={{ "--delay": "0.29s" } as React.CSSProperties}
            >
              SỐ
            </span>
  
            <a
              href="#products-library"
              className="products-hero-arrow products-hero-animate"
              style={{ "--delay": "0.36s" } as React.CSSProperties}
              aria-label="Khám phá tài liệu số"
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
          </div>
  
          {/* ================= DESCRIPTION ================= */}
          <div className="products-hero-description">
            <p
              className="products-hero-desc-line"
              style={{ "--delay": "0.48s" } as React.CSSProperties}
            >
              Một{" "}
              <strong>thư viện tài liệu full-stack</strong>{" "}
              cho những người làm Social Media
            </p>
  
            <p
              className="products-hero-desc-line"
              style={{ "--delay": "0.56s" } as React.CSSProperties}
            >
              - Bao gồm template, cheat sheet, framework và tài liệu thực chiến.
            </p>
          </div>
        </div>
      </section>
    );
  }