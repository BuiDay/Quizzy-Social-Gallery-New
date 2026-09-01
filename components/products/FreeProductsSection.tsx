"use client";

import { useMemo, useState } from "react";

type FreeProduct = {
  id: number;
  title: string;
  description: string;
  category: string[];
  meta: string;
  image: string;
  downloadUrl?: string;
};

const freeProducts: FreeProduct[] = [
  {
    id: 1,
    title: "25 CONTENT IDEAS",
    description:
      "Tổng hợp 25 Content Ideas giúp bạn không bao giờ bí ý tưởng.",
    category: ["Content Marketing", "Social Media", "Brainstorm"],
    meta: "Social Media · Content Marketing · Brainstorm",
    image: "/images/products/free/25-content-ideas.png",
  },
  {
    id: 2,
    title: "25 F&B CONTENT IDEAS",
    description:
      "25 ý tưởng content dành riêng cho ngành F&B.",
    category: ["Content Marketing", "Social Media", "Brainstorm"],
    meta: "Social Media · Content Marketing · Brainstorm",
    image: "/images/products/free/25-fnb-content-ideas.png",
  },
  {
    id: 3,
    title: "50 SERIES TỪNG NGÁCH",
    description:
      "50 ý tưởng series được chia sẵn theo từng ngành/ngách.",
    category: ["Content Marketing", "Social Media", "Brainstorm"],
    meta: "Social Media · Content Marketing · Brainstorm",
    image: "/images/products/free/50-series.png",
  },
  {
    id: 4,
    title: "20 MẪU CÂU HOOKS",
    description:
      "20 mẫu hook giúp giữ người xem ngay từ những giây đầu.",
    category: ["Content Marketing", "Social Media"],
    meta: "Social Media · Content Marketing · Brainstorm",
    image: "/images/products/free/20-hooks.png",
  },
  {
    id: 5,
    title: "TEMPLATE MẪU CTA",
    description:
      "Mẫu kêu gọi hành động cho từng mục tiêu chiến dịch.",
    category: ["Content Marketing", "Template"],
    meta: "Social Media · Content Marketing · Template",
    image: "/images/products/free/template-cta.png",
  },
  {
    id: 6,
    title: "TEMPLATE CONTENT CREATION",
    description:
      "Khung sản xuất nội dung từ ý tưởng tới bài đăng hoàn chỉnh.",
    category: ["Content Marketing", "Template"],
    meta: "Social Media · Content Marketing · Template",
    image: "/images/products/free/content-creation.png",
  },
  {
    id: 7,
    title: "38+ WEBSITE CHO DÂN MARKETING",
    description:
      "38+ website tìm ideas, tài nguyên và công cụ Marketing.",
    category: ["Content Marketing", "Career & Job"],
    meta: "Social Media · Content Marketing",
    image: "/images/products/free/38-websites.png",
  },
  {
    id: 8,
    title: "CHEAT SHEET 100 TỪ VIẾT TẮT",
    description:
      "100 từ viết tắt thường gặp trong Marketing.",
    category: ["Content Marketing", "Career & Job"],
    meta: "Social Media · Content Marketing",
    image: "/images/products/free/100-marketing-terms.png",
  },
  {
    id: 9,
    title: "TỔNG HỢP 18 EMAILS",
    description:
      "18 mẫu email trao đổi công việc và làm việc với client.",
    category: ["Career & Job", "Template"],
    meta: "Social Media · Content Marketing · Template",
    image: "/images/products/free/18-emails.png",
  },
  {
    id: 10,
    title: "LIST NHỮNG TỪ CẤM",
    description:
      "Danh sách từ ngữ dễ khiến bài bị hạn chế hiển thị.",
    category: ["Content Marketing", "Social Media"],
    meta: "Social Media · Content Marketing",
    image: "/images/products/free/tu-cam.png",
  },
  {
    id: 11,
    title: "TIPS THIẾT KẾ TRÊN CANVA",
    description:
      "Mẹo thiết kế nhanh và gọn gàng hơn trên Canva.",
    category: ["Design"],
    meta: "Social Media · Content Marketing · Design",
    image: "/images/products/free/canva-tips.png",
  },
  {
    id: 12,
    title: "MINI BOOK – TỰ HỌC MARKETING QUA YOUTUBE",
    description:
      "Lộ trình tự học Marketing qua YouTube trong 30 ngày.",
    category: ["Ebook", "Career & Job"],
    meta: "Social Media · Content Marketing · Ebook",
    image: "/images/products/free/youtube-marketing-book.png",
  },
  {
    id: 13,
    title: "TEMPLATE CONTENT CALENDAR",
    description:
      "Lịch nội dung theo tháng dùng chung cho cả team.",
    category: ["Content Marketing", "Template"],
    meta: "Social Media · Content Marketing · Template",
    image: "/images/products/free/content-calendar.png",
  },
  {
    id: 14,
    title: "LỘ TRÌNH SOCIAL MEDIA MANAGER TỪ CON SỐ 0",
    description:
      "Hướng dẫn chi tiết từ người mới đến Social Media Manager.",
    category: ["Social Media", "Career & Job", "Ebook"],
    meta: "Social Media · Ebook",
    image: "/images/products/free/social-media-roadmap.png",
  },
  {
    id: 15,
    title: "TỔNG HỢP TỈ LỆ KHUNG HÌNH CÁC NỀN TẢNG",
    description:
      "Tỉ lệ khung hình phù hợp cho từng nền tảng Social Media.",
    category: ["Social Media", "Design"],
    meta: "Social Media · Content Marketing · Design",
    image: "/images/products/free/social-size-guide.png",
  },
  {
    id: 16,
    title: "TEMPLATE PORT THẮNG JOB LỚN",
    description:
      "Biến portfolio thành vũ khí chinh phục job lớn.",
    category: ["Career & Job", "Template"],
    meta: "Social Media · Template · Career&Job",
    image: "/images/products/free/portfolio-template.png",
  },
  {
    id: 17,
    title: "WEBSITE TÌM JOB",
    description:
      "Tổng hợp các website tìm job nhanh hơn, đúng ngành hơn.",
    category: ["Career & Job"],
    meta: "Social Media · Career&Job",
    image: "/images/products/free/job-websites.png",
  },
  {
    id: 18,
    title: "TOP 4 TRỢ LÝ AI GHI CHÉP & TRANSCRIPT TỐT NHẤT",
    description:
      "Tài liệu tổng hợp các công cụ AI hỗ trợ ghi chép và transcript.",
    category: ["AI"],
    meta: "Social Media · AI",
    image: "/images/products/free/ai-transcript.png",
  },
  {
    id: 19,
    title: "TEMPLATE COVER LETTER",
    description:
      "Template giúp bạn viết Cover Letter chuyên nghiệp.",
    category: ["Career & Job", "Template"],
    meta: "Social Media · Career&Job · Template",
    image: "/images/products/free/cover-letter.png",
  },
  {
    id: 20,
    title: "SHORT VIDEO CALLSHEET",
    description:
      "Giúp lên kế hoạch quay Short Video rõ ràng, chuyên nghiệp.",
    category: ["Content Marketing", "Template"],
    meta: "Social Media · Content Marketing · Template",
    image: "/images/products/free/short-video-callsheet.png",
  },
  {
    id: 21,
    title: "30 CÂU HỎI PHỎNG VẤN & TRẢ LỜI MẪU",
    description:
      "Tổng hợp câu hỏi phỏng vấn thường gặp kèm cách trả lời mẫu.",
    category: ["Career & Job"],
    meta: "Social Media · Career&Job",
    image: "/images/products/free/interview-questions.png",
  },
  {
    id: 22,
    title: "TEMPLATE MONTHLY REPORT",
    description:
      "Template báo cáo Social Media hàng tháng.",
    category: ["Social Media", "Template"],
    meta: "Social Media · Template",
    image: "/images/products/free/monthly-report.png",
  },
];

const freeFilters = [
  "Tất cả",
  "Content Marketing",
  "Social Media",
  "Brainstorm",
  "Career & Job",
  "AI",
  "Template",
  "Ebook",
  "Design",
];

export function FreeProductsSection() {
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "Tất cả") {
      return freeProducts;
    }

    return freeProducts.filter((product) =>
      product.category.includes(activeFilter),
    );
  }, [activeFilter]);

  return (
    <section
      className="products-free"
      id="free-products"
    >
      <div className="wrap products-free-wrap">

        {/* ================= HEADER ================= */}

        <div className="products-free-head">
          <div className="products-free-head-left">

            <div
              className="products-free-eyebrow"
              data-rv="up"
            >
              <i />

              <span>
                02 / TÀI LIỆU MIỄN PHÍ
              </span>
            </div>

            <h2
              className="products-free-title"
              data-rv="up"
              data-dl="70"
            >
              Tài liệu{" "}
              <span className="products-free-highlight products-free-highlight--sky">
                cô đọng
              </span>
              ,

              <br />

              template{" "}
              <span className="products-free-highlight products-free-highlight--lime">
                thực chiến
              </span>
              .
            </h2>

          </div>


          <div
            className="products-free-head-right"
            data-rv="up"
            data-dl="130"
          >
            <p>
              Không cần tự mày mò từ con số 0. Các tài liệu
              được xây dựng từ quy trình Social Media thực tế,
              cô đọng những phần quan trọng nhất và đi kèm
              template có sẵn.
            </p>
          </div>
        </div>


        {/* ================= FILTER ================= */}

        <div
          className="products-free-filter"
          data-rv="up"
          data-dl="150"
        >
          <span className="products-free-filter-label">
            FILTER BY
          </span>

          <div className="products-free-filter-list">
            {freeFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`products-free-filter-button ${
                  activeFilter === filter
                    ? "is-active"
                    : ""
                }`}
                aria-pressed={
                  activeFilter === filter
                }
                onClick={() =>
                  setActiveFilter(filter)
                }
              >
                {filter}
              </button>
            ))}
          </div>

          <span className="products-free-filter-count">
            {filteredProducts.length} tài liệu
          </span>
        </div>


        {/* ================= PRODUCT GRID ================= */}

        <div className="products-free-grid">
          {filteredProducts.map(
            (product, index) => (
              <article
                className="products-free-card"
                key={product.id}
                data-rv="up"
                data-dl={String(
                  (index % 4) * 60,
                )}
              >

                {/* COPY */}

                <div className="products-free-card-copy">
                  <span className="products-free-tag">
                    MIỄN PHÍ
                  </span>

                  <h3>
                    {product.title}
                  </h3>

                  <p>
                    {product.description}
                  </p>

                  <span className="products-free-meta">
                    {product.meta}
                  </span>
                </div>


                {/* IMAGE */}

                <div className="products-free-card-visual">
                  <div
                    className="products-free-card-image"
                    style={{
                      backgroundImage: `url("${product.image}")`,
                    }}
                  />
                </div>


                {/* CTA */}

                <div className="products-free-card-footer">
                  <a
                    href={
                      product.downloadUrl ??
                      "#"
                    }
                    data-cur="OPEN"
                  >
                    <span>
                      Tải tài liệu
                    </span>

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 3v12" />

                      <path d="m7 10 5 5 5-5" />

                      <path d="M5 21h14" />
                    </svg>
                  </a>
                </div>

              </article>
            ),
          )}
        </div>

      </div>
    </section>
  );
}