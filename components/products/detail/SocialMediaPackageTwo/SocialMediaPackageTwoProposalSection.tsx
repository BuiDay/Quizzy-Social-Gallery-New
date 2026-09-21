
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ProposalItem = {
  title: string;
  description: string;
  image: string | null;
};

const proposalItems: ProposalItem[] = [
  {
    title: "Proposal framework",
    description: "Bộ khung chuẩn để bắt đầu một proposal.",
    image: null,
  },
  {
    title: "Các hạng mục đề xuất",
    description: "Liệt kê rõ những gì bạn sẽ làm cho client.",
    image: null,
  },
  {
    title: "Bảng giá theo từng hạng mục",
    description: "Minh bạch chi phí cho từng phần công việc.",
    image: null,
  },
  {
    title: "Cách trình bày proposal với client",
    description: "Gợi ý cách present để tăng tỉ lệ chốt.",
    image: null,
  },
];

/* ============================================================
   PREVIEW — PROPOSAL DOCUMENT
   ============================================================ */

function ProposalDocumentPreview({
  activeIndex,
}: {
  activeIndex: number;
}) {
  return (
    <div className="smpkg2-proposal-document">
      {/* DOCUMENT WINDOW */}

      <div className="smpkg2-proposal-document__bar">
        <div className="smpkg2-proposal-document__dots">
          <span />
          <span />
          <span />
        </div>

        <span>social_media_proposal.pdf</span>

        <span className="smpkg2-proposal-document__page">
          0{activeIndex + 1} / 04
        </span>
      </div>

      {/* DOCUMENT BODY */}

      <div className="smpkg2-proposal-document__body">

        {/* 01 — FRAMEWORK */}

        <div
          className={`smpkg2-proposal-document__block ${
            activeIndex === 0 ? "is-active" : ""
          }`}
        >
          <div className="smpkg2-proposal-document__block-top">
            <span className="smpkg2-proposal-document__tag">
              01 · FRAMEWORK
            </span>

            <span className="smpkg2-proposal-document__check">
              ✓
            </span>
          </div>

          <div className="smpkg2-proposal-document__lines">
            <i />
            <i />
          </div>
        </div>

        {/* 02 — PROPOSED SERVICES */}

        <div
          className={`smpkg2-proposal-document__block ${
            activeIndex === 1 ? "is-active" : ""
          }`}
        >
          <div className="smpkg2-proposal-document__block-top">
            <strong>CÁC HẠNG MỤC ĐỀ XUẤT</strong>

            <span className="smpkg2-proposal-document__check">
              ✓
            </span>
          </div>

          <div className="smpkg2-proposal-document__services">
            <div>
              <span>CONTENT STRATEGY</span>
              <i />
            </div>

            <div>
              <span>SOCIAL MEDIA MANAGEMENT</span>
              <i />
            </div>

            <div>
              <span>REPORTING</span>
              <i />
            </div>
          </div>
        </div>

        {/* 03 — PRICING */}

        <div
          className={`smpkg2-proposal-document__block ${
            activeIndex === 2 ? "is-active" : ""
          }`}
        >
          <div className="smpkg2-proposal-document__block-top">
            <strong>BẢNG GIÁ THEO HẠNG MỤC</strong>

            <span className="smpkg2-proposal-document__check">
              ✓
            </span>
          </div>

          <div className="smpkg2-proposal-document__pricing">
            {Array.from({ length: 6 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
        </div>

        {/* 04 — PRESENTATION */}

        <div
          className={`smpkg2-proposal-document__block ${
            activeIndex === 3 ? "is-active" : ""
          }`}
        >
          <div className="smpkg2-proposal-document__block-top">
            <strong>TRÌNH BÀY VỚI CLIENT</strong>

            <span className="smpkg2-proposal-document__check">
              ✓
            </span>
          </div>

          <div className="smpkg2-proposal-document__presentation">
            <div>
              <span>SOCIAL MEDIA</span>
              <strong>PROPOSAL</strong>
              <i />
            </div>

            <div>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING SELECTED LABEL */}

      <div
        className="smpkg2-proposal-document__floating"
        key={activeIndex}
      >
        <span>0{activeIndex + 1}</span>
        <strong>{proposalItems[activeIndex].title}</strong>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN SECTION
   ============================================================ */

export function SocialMediaPackageTwoProposalSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`smpkg2-proposal ${
        isVisible ? "is-visible" : ""
      }`}
      id="smpkg2-proposal"
    >
      <div className="smpkg2-proposal-inner">

        {/* ==================================================
            MAIN CARD
            ================================================== */}

        <div className="smpkg2-proposal-card">

          {/* EYEBROW */}

          <div className="smpkg2-proposal-label">
            <span className="smpkg2-proposal-label__dot" />

            <span>
              01 · SOCIAL MEDIA PROPOSAL
            </span>
          </div>

          {/* HEADING */}

          <h2 className="smpkg2-proposal-title">
            ĐÃ PITCH CLIENT THÌ ĐỪNG ĐỂ THIẾU PROPOSAL.
          </h2>

          {/* DESCRIPTION */}

          <p className="smpkg2-proposal-description">
            Một proposal đủ rõ giúp client hiểu bạn định làm
            gì, làm như thế nào và chi phí ra sao... thay vì
            phải để khách hàng tự hình dung.
          </p>

          {/* ==================================================
              CONTENT GRID
              ================================================== */}

          <div className="smpkg2-proposal-grid">

            {/* LEFT — FOUR INTERACTIVE CONTENT ITEMS */}

            <div
              className="smpkg2-proposal-list"
              role="tablist"
              aria-label="Các nội dung trong Social Media Proposal"
            >
              {proposalItems.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  id={`smpkg2-proposal-tab-${index}`}
                  aria-selected={activeIndex === index}
                  aria-controls="smpkg2-proposal-preview"
                  className={`smpkg2-proposal-item ${
                    activeIndex === index
                      ? "is-active"
                      : ""
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  style={
                    {
                      "--proposal-item-delay": `${0.12 + index * 0.1}s`,
                    } as React.CSSProperties
                  }
                >
                  <span className="smpkg2-proposal-item__number">
                    {index + 1}
                  </span>

                  <span className="smpkg2-proposal-item__content">
                    <strong>{item.title}</strong>

                    <span>{item.description}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* RIGHT — DOCUMENT PREVIEW */}

            <div
              className="smpkg2-proposal-preview"
              id="smpkg2-proposal-preview"
              role="tabpanel"
              aria-labelledby={`smpkg2-proposal-tab-${activeIndex}`}
            >
              {proposalItems[activeIndex].image ? (
                <Image
                  key={activeIndex}
                  src={proposalItems[activeIndex].image}
                  alt={`Minh họa ${proposalItems[activeIndex].title}`}
                  fill
                  sizes="(max-width: 760px) 90vw, 45vw"
                  className="smpkg2-proposal-preview__image"
                />
              ) : (
                <ProposalDocumentPreview
                  activeIndex={activeIndex}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}