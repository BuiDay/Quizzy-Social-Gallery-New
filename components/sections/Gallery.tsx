"use client";

import { useRef } from "react";
import { galleryItems } from "@/data/content";
import { Art } from "@/components/ui/Art";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useModal } from "@/components/ui/ModalContext";

export function Gallery() {
  const { openModal } = useModal();
  const railRef = useRef<HTMLDivElement>(null);

  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction * Math.min(360, rail.clientWidth * 0.72),
      behavior: "smooth",
    });
  };

  return (
    <section className="sec gallery-section" id="gallery">
      <div className="wrap gallery-wrap">
        {/* HEADER — giữ nguyên */}
        <div className="shead">
          <div>
            <Eyebrow data-rv="up">01 / Tài liệu & sản phẩm số</Eyebrow>

            <h2 className="h2" data-rv="clip" data-dl="70">
              Tài liệu <span className="cap sky">thực chiến</span>,
              <br />
              dễ hiểu và <span className="cap lim">dễ áp dụng</span>.
            </h2>
          </div>

          <p className="lead" data-rv="up" data-dl="150">
           <strong style={{color:"var(--lilac-2)"}} >30+ tài liệu và công cụ Social Media</strong> được xây dựng từ kinh nghiệm thực chiến, giúp bạn áp dụng ngay vào công việc.
          </p>
        </div>

        {/* PRODUCT RAIL */}
        <div className="gallery-products" data-rv="up" data-dl="80">
          <div className="gallery-products-nav">
            <button
              type="button"
              className="gallery-nav-btn"
              aria-label="Tài liệu trước"
              onClick={() => scrollRail(-1)}
            >
              ‹
            </button>

            <button
              type="button"
              className="gallery-nav-btn"
              aria-label="Tài liệu tiếp theo"
              onClick={() => scrollRail(1)}
            >
              ›
            </button>
          </div>

          <div className="gallery-products-rail" ref={railRef}>
            {galleryItems.map((item, index) => (
              <button
                key={item.t}
                type="button"
                className={`gallery-product-card gallery-product-card--${index % 4}`}
                data-cur="EXPLORE"
                onClick={() => openModal(item)}
              >
                <div className="gallery-product-copy">
                  <div className="gallery-product-head">
                    <span className="gallery-product-label">
                      {item.cat}
                    </span>

                    <span className="gallery-product-arrow" aria-hidden="true">
                      <ArrowUpRightIcon />
                    </span>
                  </div>

                  <div className="gallery-product-text">
                    <h3>{item.t}</h3>
                    <p>{item.meta}</p>
                  </div>
                </div>

                <div className="gallery-product-visual" aria-hidden="true">
                  <Art variant={item.g} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA — giữ nguyên */}
        <a
          href="#gallery"
          className="linkcard"
          style={{ marginTop: 14 }}
          data-rv="up"
          data-dl="120"
          data-cur="OPEN"
        >
          <div>
            <h3 className="h3">Xem toàn bộ thư viện tài liệu</h3>
            <p>
              30+ templates, workbook và bộ công cụ được phân loại theo Strategy,
              Content, Personal Branding, Templates và AI.
            </p>
          </div>

          <span className="arc">
            <ArrowRightIcon />
          </span>
        </a>
      </div>
    </section>
  );
}