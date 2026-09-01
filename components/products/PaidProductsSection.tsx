"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: string;
  oldPrice?: string;
  category: string[];
  meta: string;
  image: string;
  accent?: "lime" | "cream";
};

const products: Product[] = [
  {
    id: 1,
    slug: "tiktok-ideas-hacking",
    title: "TIKTOK IDEAS HACKING",
    description:
      "Giúp bạn tìm, phân tích và phát triển content ideas thú vị phù hợp với brainstorm từ con số 0.",
    price: "499.000đ",
    oldPrice: "899.000đ",
    category: ["Content Marketing", "Social Media", "Brainstorm"],
    meta: "Social Media · Brainstorm · Ebook",
    image: "/images/products/tiktok-ideas-hacking.png",
    accent: "lime",
  },

  {
    id: 2,
    slug: "social-media-bundle",
    title: "SOCIAL MEDIA BUNDLE",
    description:
      "Trọn bộ công cụ giúp bạn xây dựng và vận hành quy trình Social Media từ strategy đến report.",
    price: "599.000đ",
    oldPrice: "1.299.000đ",
    category: ["Social Media", "Template"],
    meta: "Social Media · Template",
    image: "/images/products/social-media-bundle.png",
    accent: "cream",
  },

  {
    id: 3,
    slug: "social-media-package-01",
    title: "SOCIAL MEDIA PACKAGE 01",
    description:
      "Hệ thống hóa quy trình làm Social Media từ strategy, planning đến portfolio với template có sẵn.",
    price: "379.000đ",
    oldPrice: "699.000đ",
    category: ["Social Media", "Template", "Career & Job"],
    meta: "Social Media · Template",
    image: "/images/products/social-media-package-01.png",
    accent: "cream",
  },

  {
    id: 4,
    slug: "social-media-package-02",
    title: "SOCIAL MEDIA PACKAGE 02",
    description:
      "Bộ template hỗ trợ bạn hoàn thiện quy trình làm việc từ client brief, audit, strategy và content report.",
    price: "259.000đ",
    oldPrice: "599.000đ",
    category: ["Social Media", "Template"],
    meta: "Social Media · Template",
    image: "/images/products/social-media-package-02.png",
    accent: "cream",
  },

  {
    id: 5,
    slug: "tu-duy-thiet-ke-voi-canva",
    title: "TƯ DUY THIẾT KẾ VỚI CANVA",
    description:
      "Giúp bạn hiểu cách tư duy layout, visual và bố cục để ứng dụng linh hoạt trên Canva.",
    price: "339.000đ",
    oldPrice: "599.000đ",
    category: ["Design", "Ebook"],
    meta: "Social Media · Ebook · Design",
    image: "/images/products/canva-design-thinking.png",
    accent: "cream",
  },

  {
    id: 6,
    slug: "social-media-beginner-ebook",
    title: "SOCIAL MEDIA BEGINNER EBOOK",
    description:
      "Tài liệu nền tảng giúp người mới hiểu Social Media và biết mình cần học, làm gì để bắt đầu.",
    price: "499.000đ",
    oldPrice: "1.145.000đ",
    category: ["Social Media", "Ebook", "Career & Job"],
    meta: "Social Media · Ebook",
    image: "/images/products/social-media-beginner.png",
    accent: "cream",
  },
];

const filters = [
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

export function PaidProductsSection() {
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "Tất cả") return products;

    return products.filter((product) =>
      product.category.includes(activeFilter),
    );
  }, [activeFilter]);

  return (
    <section
      className="products-paid"
      id="products-library"
    >
      <div className="wrap products-paid-wrap">
        {/* ================= HEADING ================= */}

        <div className="products-paid-head">
          <div
            className="products-paid-eyebrow"
            data-rv="up"
          >
            <i />
            <span>01 / TÀI LIỆU CÓ PHÍ</span>
          </div>

          <h2
            className="products-paid-title"
            data-rv="up"
            data-dl="70"
          >
            Tài liệu{" "}
            <span className="products-paid-highlight products-paid-highlight--sky">
              chuyên sâu
            </span>{" "}
            để tiến gần hơn
            <br />
            đến{" "}
            <span className="products-paid-highlight products-paid-highlight--lime">
              mức thu nhập bạn muốn
            </span>
            .
          </h2>

          <p
            className="products-paid-intro"
            data-rv="up"
            data-dl="130"
          >
            Nâng cấp kỹ năng, chuẩn hóa cách làm việc và tăng giá trị
            chuyên môn Social Media. Từ strategy, planning đến portfolio,
            proposal, audit và reporting đều có hướng dẫn, có framework,
            có template để áp dụng ngay.
          </p>
        </div>

        {/* ================= FEATURED ================= */}

        <article
          className="products-featured"
          data-rv="up"
          data-dl="180"
        >
          <div className="products-featured-visual">
            <div
              className="products-featured-image"
              style={{
                backgroundImage:
                  "url('/images/products/social-media-beginner.png')",
              }}
            />
          </div>

          <div className="products-featured-content">
            <div className="products-featured-badge">
              <span>★</span>
              KHÓA HỌC ĐƯỢC YÊU THÍCH NHẤT
            </div>

            <div className="products-buyers">
              <div className="products-buyers-avatars">
                <i />
                <i />
                <i />
                <i />
              </div>

              <span>80+ người đã mua</span>
            </div>

            <h3>
              Social Media
              <br />
              Beginner Ebook
            </h3>

            <p>
              Tài liệu nền tảng giúp người mới hiểu Social Media và
              biết mình cần học, làm gì để bắt đầu.
            </p>

            <div className="products-featured-price">
              <strong>499.000đ</strong>

              <del>1.145.000đ</del>

              <span className="products-discount">
                -56%
              </span>
            </div>

            <div className="products-featured-divider" />

            <a
              href="/products/social-media-beginner-ebook"
              className="products-featured-button"
              data-cur="OPEN"
            >
              <span>Xem chi tiết tài liệu</span>
              <span>↗</span>
            </a>
          </div>
        </article>

        {/* ================= FILTER ================= */}

        <div
          className="products-filter"
          data-rv="up"
        >
          <span className="products-filter-label">
            FILTER BY
          </span>

          <div className="products-filter-list">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`products-filter-button ${
                  activeFilter === filter ? "is-active" : ""
                }`}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <span className="products-filter-count">
            {filteredProducts.length} tài liệu
          </span>
        </div>

        {/* ================= GRID ================= */}

        <div className="products-paid-grid">
          {filteredProducts.map((product, index) => (
            <article
              className={`products-paid-card products-paid-card--${
                product.accent ?? "cream"
              }`}
              key={product.id}
              data-rv="up"
              data-dl={String((index % 4) * 70)}
            >
              <div className="products-paid-card-copy">
                <span className="products-paid-tag">
                  TRẢ PHÍ
                </span>

                <h3>{product.title}</h3>

                <p>{product.description}</p>

                <div className="products-paid-price">
                  <strong>{product.price}</strong>

                  {product.oldPrice && (
                    <del>{product.oldPrice}</del>
                  )}
                </div>

                <span className="products-paid-meta">
                  {product.meta}
                </span>
              </div>

              <div className="products-paid-card-visual">
                <div
                  className="products-paid-card-image"
                  style={{
                    backgroundImage: `url("${product.image}")`,
                  }}
                />
              </div>

              <div className="products-paid-card-footer">
                <a
                  href={`/products/${product.slug}`}
                  data-cur="OPEN"
                >
                  <span>Xem chi tiết tài liệu</span>
                  <span>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}