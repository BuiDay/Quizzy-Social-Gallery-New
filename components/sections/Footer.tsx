export function Footer() {
    return (
      <footer className="footer-new" id="footer">
        <div className="wrap footer-new-inner">
          {/* ================= BRAND ================= */}
          <div className="footer-brand">
            <a href="#top" className="footer-logo" data-cur="hover">
              <strong>QUIZZY</strong>
              <span>SOCIAL GALLERY</span>
            </a>
  
            <p className="footer-description">
              Quizzy Social Gallery là nơi mình chia sẻ kiến thức,
              tài liệu, công cụ và kinh nghiệm thực tế về Social Media
              - giúp bạn học dễ hơn, làm nhanh hơn và tự tin bắt đầu
              con đường của mình.
            </p>
          </div>
  
          {/* ================= MENU ================= */}
          <div className="footer-column">
            <h4>MENU</h4>
  
            <nav className="footer-links">
              <a href="#top" data-cur="hover">
                Trang chủ
              </a>
  
              <a href="#gallery" data-cur="hover">
                Tài liệu số
              </a>
  
              <a href="#courses" data-cur="hover">
                Khóa học
              </a>
  
              <a href="#services" data-cur="hover">
                Dịch vụ SMM
              </a>
            </nav>
          </div>
  
          {/* ================= CONTACT ================= */}
          <div className="footer-column footer-contact">
            <h4>LIÊN HỆ</h4>
  
            <div className="footer-links">
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noreferrer"
                data-cur="hover"
              >
                TikTok ↗
              </a>
  
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                data-cur="hover"
              >
                Instagram ↗
              </a>
  
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                data-cur="hover"
              >
                Facebook ↗
              </a>
  
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                data-cur="hover"
              >
                LinkedIn ↗
              </a>
  
              <a
                href="mailto:quizzymarketing.work@gmail.com"
                className="footer-email"
                data-cur="hover"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 5h18v14H3z" />
                  <path d="m3 6 9 7 9-7" />
                </svg>
  
                quizzymarketing.work@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }