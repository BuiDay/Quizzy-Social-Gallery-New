"use client";
import { useState } from "react";
import { galleryItems } from "@/data/content";
import { Art } from "@/components/ui/Art";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useModal } from "@/components/ui/ModalContext";

export function Gallery() {
  const { openModal } = useModal();
  const [dim, setDim] = useState(false);
  return (
    <section className="sec" id="gallery">
      <div className="wrap">
        <div className="shead">
          <div>
            <Eyebrow data-rv="up">01 / Tài liệu & sản phẩm số</Eyebrow>
            <h2 className="h2" data-rv="clip" data-dl="70">
              Tài liệu <span className="cap sky">thực chiến</span>,<br />
              dễ hiểu và <span className="cap lim">dễ áp dụng</span>.
            </h2>
          </div>
          <p className="lead" data-rv="up" data-dl="150">
            Bốn bộ tài liệu được dùng nhiều nhất, xây từ chính công việc thật.
            Toàn bộ thư viện 30+ sản phẩm nằm ở trang Tài liệu số.
          </p>
        </div>
        <div
          className={`bento ${dim ? "dim" : ""}`}
          id="bento"
          data-rv="up"
          onMouseLeave={() => setDim(false)}
        >
          {galleryItems.map((p) => (
            <button
              key={p.t}
              className={`card ${p.cls}`}
              data-cur="EXPLORE"
              onMouseEnter={() => setDim(true)}
              onClick={() => openModal(p)}
            >
              <Art variant={p.g} />
              <div className="ctop">
                <span className="plabel glass">{p.cat}</span>
                <span className="arc">
                  <ArrowUpRightIcon />
                </span>
              </div>
              <div className="cbot">
                <h3 className="h3">{p.t}</h3>
                <p className="meta">{p.meta}</p>
              </div>
            </button>
          ))}
        </div>
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
              30+ templates, workbook và bộ công cụ được phân loại theo
              Strategy, Content, Personal Branding, Templates và AI.
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
