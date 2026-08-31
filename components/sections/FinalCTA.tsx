export function FinalCTA() {
    return (
      <section className="final-cta" id="final-cta">
        <div className="wrap">
          <div className="final-cta-shell" data-rv="up">
            {/* ================= LEFT ================= */}
            <div className="final-cta-copy">
              <h2
                className="final-cta-title"
                data-rv="up"
                data-dl="70"
              >
                Học Social Media{" "}
                <span className="final-cta-highlight final-cta-highlight--lime">
                  dễ hơn
                </span>
  
            
  
                với một{" "}
                <span className="final-cta-highlight final-cta-highlight--sky">
                  lộ trình rõ ràng
                </span>
              </h2>
  
              <div
                className="final-cta-description"
                data-rv="up"
                data-dl="140"
              >
                <p>
                  Những gì mình chia sẻ đều đến từ công việc thật, tài liệu
                  mình dùng với khách hàng, quy trình mình chạy mỗi ngày.
                </p>
  
                <p>
                  Bạn không phải mò lại con đường mình đã đi.
                </p>
              </div>
            </div>
  
            {/* ================= RIGHT ================= */}
            <div
              className="final-cta-box"
              data-rv="up"
              data-dl="180"
            >
              <h3>
                Bắt đầu lộ trình của bạn
                <br />
                ngay bây giờ!
              </h3>
  
              <div className="final-cta-actions">
                <a
                  href="#gallery"
                  className="final-cta-btn final-cta-btn--dark mag"
                  data-cur="OPEN"
                >
                  <span>Khám phá thư viện tài liệu</span>
  
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
  
                <a
                  href="#courses"
                  className="final-cta-btn final-cta-btn--light mag"
                  data-cur="OPEN"
                >
                  <span>Xem các khóa học đang mở</span>
  
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }