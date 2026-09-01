import Image from "next/image";
import ThumailImage from "@/assets/images/TikTok Ideas Hacking/1.png";

export function TiktokFinalOfferSection() {
  return (
    <section
      className="tiktok-final-offer"
      id="tiktok-final-offer"
    >
      <div className="wrap tiktok-final-offer-inner">
        {/* ================= TOP MESSAGE ================= */}

        <div className="tiktok-final-offer-copy">
          <h2
            className="tiktok-final-offer-heading"
            data-rv="up"
          >
            Một{" "}
            <span className="tiktok-final-outline">
              video viral
            </span>{" "}
            có thể đến từ{" "}
            <span className="tiktok-final-highlight tiktok-final-highlight--purple">
              may mắn
            </span>

            <br />

            nhưng một{" "}
            <span className="tiktok-final-outline">
              kênh bền vững
            </span>{" "}
            cần một{" "}
            <span className="tiktok-final-highlight tiktok-final-highlight--lime">
              hệ thống
            </span>
            .
          </h2>

          <p
            className="tiktok-final-offer-description"
            data-rv="up"
            data-dl="70"
          >
            Nếu bạn đang muốn xây TikTok bài bản hơn, làm content nhanh hơn
            và không
            <br />
            còn liên tục mắc kẹt với câu hỏi:{" "}
            <strong>“HÔM NAY ĐĂNG GÌ?”</strong>
          </p>
        </div>

        {/* ================= DOWN ================= */}

        <div
          className="tiktok-final-down"
          data-rv="up"
          data-dl="110"
          aria-hidden="true"
        >
          ↓
        </div>

        <div
          className="tiktok-final-type"
          data-rv="up"
          data-dl="140"
        >
          EBOOK
        </div>

        {/* ================= PRODUCT NAME ================= */}

        <div
          className="tiktok-final-product-name"
          data-rv="up"
          data-dl="170"
        >
          <span className="tiktok-final-star">
            ✱
          </span>

          <span className="tiktok-final-product-pill">
            TIKTOK
          </span>

          <span className="tiktok-final-product-pill">
            IDEAS
          </span>

          <span className="tiktok-final-product-pill">
            HACKING
          </span>

          <a
            href="#tiktok-final-buy"
            className="tiktok-final-arrow"
            data-cur="OPEN"
            aria-label="Mua TikTok Ideas Hacking"
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

        {/* ================= SUBTITLE ================= */}

        <p
          className="tiktok-final-subtitle"
          data-rv="up"
          data-dl="200"
        >
          LÀ THỨ BẠN CẦN ĐỂ BẮT ĐẦU!
        </p>

        {/* ================= BUY CARD ================= */}

        <article
          className="tiktok-final-buy-card"
          id="tiktok-final-buy"
          data-rv="up"
          data-dl="230"
        >
          {/* IMAGE */}

          <div className="tiktok-final-buy-visual">
            <Image
              src={ThumailImage}
              alt="TikTok Ideas Hacking"
              className="tiktok-final-buy-image"
              priority={false}
            />
          </div>

          {/* CONTENT */}

          <div className="tiktok-final-buy-content">
            <span className="tiktok-final-price-label">
              SỞ HỮU TÀI LIỆU VỚI GIÁ CHỈ
            </span>

            <div className="tiktok-final-divider" />

            <div className="tiktok-final-price">
              <strong>499.000đ</strong>

              <del>999.000đ</del>
            </div>

            <p className="tiktok-final-note">
              *Áp dụng giảm 30% cho 100 bạn đăng ký nhanh nhất
            </p>

            <a
              href="#"
              className="tiktok-final-buy-button"
              data-cur="OPEN"
            >
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