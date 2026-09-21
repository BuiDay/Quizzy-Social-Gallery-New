
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type AuditItem = {
  title: string;
  image: string | null;
};

const auditItems: AuditItem[] = [
  {
    title: "Phân tích hiện trạng Social Media",
    image: null,
  },
  {
    title: "Đánh giá điểm mạnh / điểm yếu",
    image: null,
  },
  {
    title: "Phân tích hiệu suất kênh",
    image: null,
  },
  {
    title: "Xác định vấn đề cần cải thiện",
    image: null,
  },
  {
    title: "Đề xuất hướng tối ưu",
    image: null,
  },
];

/* ============================================================
   AUDIT DASHBOARD PREVIEW
   ============================================================ */

function AuditDashboardPreview({
  activeIndex,
}: {
  activeIndex: number;
}) {
  return (
    <div className="smpkg2-audit-dashboard">
      {/* DOCUMENT HEADER */}

      <div className="smpkg2-audit-dashboard__top">
        <div className="smpkg2-audit-dashboard__dots">
          <i />
          <i />
          <i />
        </div>

        <span>social_media_audit.pdf</span>

        <span className="smpkg2-audit-dashboard__page">
          0{activeIndex + 1} / 05
        </span>
      </div>

      {/* DOCUMENT BODY */}

      <div className="smpkg2-audit-dashboard__body">

        {/* 01 — CHANNEL OVERVIEW */}

        <div
          className={`smpkg2-audit-dashboard__zone smpkg2-audit-dashboard__zone--overview ${
            activeIndex === 0 ? "is-active" : ""
          }`}
        >
          <span className="smpkg2-audit-dashboard__zone-label">
            01 / CHANNEL OVERVIEW
          </span>

          <div className="smpkg2-audit-dashboard__profile">
            <div className="smpkg2-audit-dashboard__avatar">
              S
            </div>

            <div className="smpkg2-audit-dashboard__profile-info">
              <strong>@social.brand</strong>
              <span>Social Media Channel</span>

              <div className="smpkg2-audit-dashboard__profile-lines">
                <i />
                <i />
              </div>
            </div>
          </div>

          <div className="smpkg2-audit-dashboard__overview-stats">
            <div>
              <strong>12.8K</strong>
              <span>Followers</span>
            </div>

            <div>
              <strong>48</strong>
              <span>Posts</span>
            </div>

            <div>
              <strong>4.2%</strong>
              <span>Engagement</span>
            </div>
          </div>
        </div>

        {/* 02 — STRENGTHS & WEAKNESSES */}

        <div
          className={`smpkg2-audit-dashboard__zone smpkg2-audit-dashboard__zone--swot ${
            activeIndex === 1 ? "is-active" : ""
          }`}
        >
          <span className="smpkg2-audit-dashboard__zone-label">
            02 / STRENGTHS & WEAKNESSES
          </span>

          <div className="smpkg2-audit-dashboard__swot-grid">
            <div className="smpkg2-audit-dashboard__swot-strength">
              <span>STRENGTHS ↗</span>

              <i />
              <i />
              <i />
            </div>

            <div className="smpkg2-audit-dashboard__swot-weakness">
              <span>WEAKNESSES ↘</span>

              <i />
              <i />
              <i />
            </div>
          </div>
        </div>

        {/* 03 — PERFORMANCE */}

        <div
          className={`smpkg2-audit-dashboard__zone smpkg2-audit-dashboard__zone--performance ${
            activeIndex === 2 ? "is-active" : ""
          }`}
        >
          <span className="smpkg2-audit-dashboard__zone-label">
            03 / CHANNEL PERFORMANCE
          </span>

          <div className="smpkg2-audit-dashboard__performance">
            <div className="smpkg2-audit-dashboard__performance-heading">
              <strong>CONTENT PERFORMANCE</strong>
              <span>↗</span>
            </div>

            <div className="smpkg2-audit-dashboard__chart">
              {[39, 58, 46, 76, 63, 91].map((height, index) => (
                <span key={index}>
                  <i style={{ height: `${height}%` }} />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 04 — PROBLEMS TO IMPROVE */}

        <div
          className={`smpkg2-audit-dashboard__zone smpkg2-audit-dashboard__zone--issues ${
            activeIndex === 3 ? "is-active" : ""
          }`}
        >
          <span className="smpkg2-audit-dashboard__zone-label">
            04 / KEY ISSUES
          </span>

          <div className="smpkg2-audit-dashboard__issue-list">
            <div>
              <span>01</span>
              <strong>Content Direction</strong>
              <i />
            </div>

            <div>
              <span>02</span>
              <strong>Audience Engagement</strong>
              <i />
            </div>

            <div>
              <span>03</span>
              <strong>Posting Consistency</strong>
              <i />
            </div>
          </div>
        </div>

        {/* 05 — RECOMMENDATIONS */}

        <div
          className={`smpkg2-audit-dashboard__zone smpkg2-audit-dashboard__zone--recommendations ${
            activeIndex === 4 ? "is-active" : ""
          }`}
        >
          <span className="smpkg2-audit-dashboard__zone-label">
            05 / RECOMMENDATIONS
          </span>

          <div className="smpkg2-audit-dashboard__recommendations">
            <div>
              <span>01</span>
              <strong>OPTIMIZE</strong>
              <i />
            </div>

            <div>
              <span>02</span>
              <strong>IMPROVE</strong>
              <i />
            </div>

            <div>
              <span>03</span>
              <strong>MEASURE</strong>
              <i />
            </div>
          </div>
        </div>
      </div>

      {/* SELECTED CONTENT */}

      <div
        key={activeIndex}
        className="smpkg2-audit-dashboard__selected"
      >
        <span>0{activeIndex + 1}</span>

        <strong>{auditItems[activeIndex].title}</strong>

        <span aria-hidden="true">↗</span>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN SECTION
   ============================================================ */

export function SocialMediaPackageTwoAuditSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  /* SCROLL ENTRANCE */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* AUTO SWITCH WHEN VISIBLE */

  useEffect(() => {
    if (!isVisible || isPaused) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex(
        (current) => (current + 1) % auditItems.length,
      );
    }, 2200);

    return () => window.clearInterval(interval);
  }, [isVisible, isPaused]);

  const selectItem = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
  };

  return (
    <section
      ref={sectionRef}
      className={`smpkg2-audit ${
        isVisible ? "is-visible" : ""
      }`}
      id="smpkg2-audit"
    >
      <div className="smpkg2-audit-inner">
        <div className="smpkg2-audit-card">

          {/* LABEL */}

          <div className="smpkg2-audit-label">
            <span className="smpkg2-audit-label__dot" />

            <span>02 · SOCIAL MEDIA AUDIT</span>
          </div>

          {/* HEADING */}

          <h2 className="smpkg2-audit-title">
            PHÂN TÍCH, BÓC TÁCH TÌNH TRẠNG KÊNH
          </h2>

          {/* DESCRIPTION */}

          <p className="smpkg2-audit-description">
            Social Media Audit giúp bạn nhìn lại toàn bộ tình
            trạng của một kênh trước khi bắt đầu project: đang
            làm tốt gì, đang có vấn đề gì và đâu là điểm cần
            cải thiện.
          </p>

          {/* CONTENT */}

          <div className="smpkg2-audit-grid">

            {/* LEFT — INTERACTIVE ITEMS */}

            <div
              className="smpkg2-audit-list"
              role="tablist"
              aria-label="Các nội dung trong Social Media Audit"
              onMouseLeave={() => setIsPaused(false)}
            >
              {auditItems.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  id={`smpkg2-audit-tab-${index}`}
                  aria-selected={activeIndex === index}
                  aria-controls="smpkg2-audit-preview"
                  className={`smpkg2-audit-item ${
                    activeIndex === index
                      ? "is-active"
                      : ""
                  }`}
                  onMouseEnter={() => selectItem(index)}
                  onFocus={() => selectItem(index)}
                  onClick={() => selectItem(index)}
                  style={
                    {
                      "--smpkg2-audit-delay": `${0.1 + index * 0.08}s`,
                    } as React.CSSProperties
                  }
                >
                  <span className="smpkg2-audit-item__number">
                    {index + 1}
                  </span>

                  <strong>{item.title}</strong>
                </button>
              ))}
            </div>

            {/* RIGHT — CHANGING PREVIEW */}

            <div
              className="smpkg2-audit-preview"
              id="smpkg2-audit-preview"
              role="tabpanel"
              aria-labelledby={`smpkg2-audit-tab-${activeIndex}`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {auditItems[activeIndex].image ? (
                <Image
                  key={activeIndex}
                  src={auditItems[activeIndex].image}
                  alt={`Minh họa ${auditItems[activeIndex].title}`}
                  fill
                  sizes="(max-width: 760px) 90vw, 45vw"
                  className="smpkg2-audit-preview__image"
                />
              ) : (
                <AuditDashboardPreview
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