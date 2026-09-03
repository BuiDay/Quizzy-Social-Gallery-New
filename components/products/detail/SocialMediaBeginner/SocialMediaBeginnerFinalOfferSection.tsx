import Image from "next/image";
import Thumnail from "@/assets/images/Social Media Beginner/Social Media Beginner.png";
export function SocialMediaBeginnerFinalOfferSection() {
  return (
    <section className="smb-final-offer" id="smb-final-offer">
      <div className="wrap smb-final-offer-inner">
        {/* =====================================================
              TOP MESSAGE
              ===================================================== */}

        <div className="smb-final-offer-copy">
          <h2 className="smb-final-offer-heading" data-rv="up">
            Bạn không cần có{" "}
            <span className="smb-final-offer-outline">bất kỳ kiến thức</span>{" "}
            nào
            <br />
            về <span className="smb-final-offer-highlight">
              Social Media
            </span>{" "}
            để bắt đầu.
          </h2>

          <p className="smb-final-offer-description" data-rv="up" data-dl="80">
            Ebook này được tạo ra để đưa bạn từ <strong>con số 0</strong> và
            giải thích mọi thứ theo cách đơn giản,
            <br />
            dễ hiểu đến cảnh của Social Media nhanh nhất - Dù là bạn muốn phát
            triển sự nghiệp,
            <br />
            tìm một side hustle hay đơn giản là trang bị thêm một skill có giá
            trị.
          </p>
        </div>

        {/* =====================================================
              ARROW
              ===================================================== */}

        <div
          className="smb-final-offer-down"
          data-rv="up"
          data-dl="130"
          aria-hidden="true"
        >
          ↓
        </div>

        {/* =====================================================
              TITLE BEFORE CARD
              ===================================================== */}

        <h3 className="smb-final-offer-subtitle" data-rv="up" data-dl="180">
          BẮT ĐẦU LỘ TRÌNH <span>SOCIAL MEDIA</span> NGAY HÔM NAY!
        </h3>

        {/* =====================================================
              BUY CARD
              ===================================================== */}

        <article
          className="smb-final-buy-card"
          id="smb-final-buy"
          data-rv="up"
          data-dl="230"
        >
          {/* ================= IMAGE ================= */}

          <div className="smb-final-buy-visual">
            <Image
              src={Thumnail}
              alt="Social Media Beginner Ebook"
              fill
              className="smb-final-buy-image"
            />
          </div>

          {/* ================= CONTENT ================= */}

          <div className="smb-final-buy-content">
            <span className="smb-final-price-label">
              SỞ HỮU TÀI LIỆU VỚI GIÁ CHỈ
            </span>

            <div className="smb-final-price-divider" />

            <div className="smb-final-price-row">
              <strong>499.000đ</strong>

              <del>4.445.000đ</del>
            </div>

            <p className="smb-final-price-note">
              *Áp dụng giảm 30% cho 100 bạn đăng ký nhanh nhất
            </p>

            <a href="#" className="smb-final-buy-button" data-cur="OPEN">
              <span>Bấm vào để mua ngay</span>

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
        </article>
      </div>
    </section>
  );
}
