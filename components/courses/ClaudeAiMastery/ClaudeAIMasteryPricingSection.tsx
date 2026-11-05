"use client";

import { PaidProductAction } from "@/components/ui/PaidProductAction";

type ClaudeAIMasteryPricingSectionProps = {
  originalPrice?: string;
  currentPrice?: string;
  purchaseUrl?: string;
  savingPrice?: string;
  offerLabel?: string;
  discountLabel?: string;
  product?: any;
  handleBuy?: any;
};

const moduleTags = [
  "Hệ sinh thái Claude",
  "Skills & Token",
  "Research",
  "Content",
  "Design",
  "Data",
  "Vibe coding & CV",
];

const benefits: {
  title: string;
  description?: string;
  isNew?: boolean;
  withTags?: boolean;
}[] = [
  {
    title: "9 module học, từ nền tảng đến thực chiến",
    withTags: true,
  },
  {
    title: "Skills edit video + Edit Studio",
    description:
      "Website motion graphic, 30+ hiệu ứng chữ và 20+ hiệu ứng cảnh. Chỉnh trực tiếp trên giao diện edit trong Claude.",
    isNew: true,
  },
  {
    title: "20+ tài liệu & template dùng ngay",
    description:
      "30+ AI Skills cho Social Media, 50+ prompt thực chiến, thư viện Knowledge Base và tài nguyên Claude.",
  },
  {
    title: "Cộng đồng Social Media 6.000+ thành viên",
    description: "Hỏi đáp, chia sẻ workflow và cập nhật tính năng mới của Claude.",
  },
  {
    title: "Certificate và 6 tháng xem lại",
    description: "Học theo tốc độ của bạn trên hệ thống e-learning.",
  },
];

export function ClaudeAIMasteryPricingSection({
  originalPrice = "3.990.000 ₫",
  currentPrice = "2.590.000 ₫",
  purchaseUrl = "#claude-register",
  savingPrice = "1.400.000đ",
  offerLabel = "Ưu đãi",
  discountLabel = "GIẢM 35%",
  product,
  handleBuy,
}: ClaudeAIMasteryPricingSectionProps) {
  return (
    <section className="claude-price2" id="claude-register">
      <div className="cp-inner">
        <div className="cp-head">
          <span className="cp-eyebrow">
            <i />
            Học phí sau cập nhật
          </span>
          <h2 className="cp-title">
            Đây chắc chắn là <span className="cp-pill">khoản đầu tư AI</span>
            <br />
            <span className="cp-pill cp-pill--lime">xứng đáng</span> trong năm nay
          </h2>
          <p className="cp-sub">
            Chỉ cần học một lần là bạn có thể dùng Claude cho cả research,
            content, design, data và giờ là edit video hoàn toàn tự động hóa,
            với mức giá chỉ giữ đến hết đợt này.
          </p>
        </div>

        <div className="cp-grid">
          {/* LEFT — BENEFITS */}
          <div className="cp-benefits">
            <div className="cp-label">Bạn nhận được gì</div>
            <h3>
              Một lần đăng ký,
              <br />
              dùng trọn bộ trong 6 tháng.
            </h3>

            <ul className="cp-list">
              {benefits.map((item) => (
                <li key={item.title} className={item.isNew ? "is-new" : undefined}>
                  <span className="cp-check">✓</span>
                  <div>
                    <b>{item.title}</b>
                    {item.withTags && (
                      <div className="cp-chips">
                        {moduleTags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                        <span className="is-new">Edit video</span>
                      </div>
                    )}
                    {item.description && <p>{item.description}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — OFFER */}
          <div className="cp-offer">
            <span className="cp-tag">{offerLabel}</span>

            <div className="cp-update">
              <small>Giá cập nhật</small>
              <div className="cp-price">{currentPrice}</div>
              <div className="cp-row">
                <span className="cp-old">{originalPrice}</span>
                <span className="cp-save">Tiết kiệm {savingPrice}</span>
              </div>
              <div className="cp-incl">
                Đã gồm <b>module 09: Tự động hoá edit video với Claude</b> cùng
                bộ skill và tài liệu đi kèm.
              </div>
            </div>

            <div className="cp-cta-wrap">
              <span className="cp-badge">{discountLabel}</span>
              {product ? (
                <PaidProductAction
                  product={product}
                  buttonText={`Giữ suất giá ${currentPrice}`}
                  onBuy={handleBuy}
                  className="cp-cta"
                />
              ) : (
                <a className="cp-cta" href={purchaseUrl}>
                  <span>Giữ suất giá {currentPrice}</span>
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>

            <p className="cp-note">Giá tăng ở đợt mở bán tiếp theo.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
