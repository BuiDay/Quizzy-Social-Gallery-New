
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ReportItem = {
  title: string;
  image: string | null;
};

const reportItems: ReportItem[] = [
  {
    title: "Tổng hợp KPI & performance",
    image: null,
  },
  {
    title: "Theo dõi kết quả Social Media",
    image: null,
  },
  {
    title: "Phân tích điểm mạnh / điểm yếu",
    image: null,
  },
  {
    title: "Tổng hợp insight",
    image: null,
  },
  {
    title: "Trình bày kết quả với client",
    image: null,
  },
];

/* ============================================================
   MONTHLY REPORT — INTERACTIVE PREVIEW
   ============================================================ */

function MonthlyReportPreview({
  activeIndex,
}: {
  activeIndex: number;
}) {
  const active = (index: number) =>
    activeIndex === index ? "is-active" : "";

  return (
    <div className="smpkg2-report-document">
      {/* DOCUMENT WINDOW */}

      <div className="smpkg2-report-document__top">
        <div className="smpkg2-report-document__dots">
          <i />
          <i />
          <i />
        </div>

        <span>social_media_monthly_report.pdf</span>

        <span className="smpkg2-report-document__page">
          0{activeIndex + 1} / 05
        </span>
      </div>

      <div className="smpkg2-report-document__body">

        {/* 01 — KPI OVERVIEW */}

        <div
          className={`smpkg2-report-document__zone smpkg2-report-document__zone--kpi ${active(0)}`}
        >
          <div className="smpkg2-report-document__zone-head">
            <span>01 / KPI OVERVIEW</span>
            <span>↗</span>
          </div>

          <div className="smpkg2-report-document__kpis">
            {[
              ["248K", "Reach"],
              ["12.4%", "Engagement"],
              ["1,860", "New followers"],
              ["32", "Posts"],
            ].map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 02 — PERFORMANCE CHART */}

        <div
          className={`smpkg2-report-document__zone smpkg2-report-document__zone--performance ${active(1)}`}
        >
          <div className="smpkg2-report-document__zone-head">
            <span>02 / PERFORMANCE</span>
            <span>LAST 4 WEEKS</span>
          </div>

          <div className="smpkg2-report-document__chart">
            <div className="smpkg2-report-document__chart-grid" />

            <svg
              viewBox="0 0 320 110"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 96L65 76L126 82L190 49L252 57L317 12"
                stroke="#A97FDD"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="smpkg2-report-document__chart-labels">
              <span>W1</span>
              <span>W2</span>
              <span>W3</span>
              <span>W4</span>
            </div>
          </div>

          <div className="smpkg2-report-document__platforms">
            {[
              ["Instagram", 82, "+82%"],
              ["TikTok", 64, "+64%"],
              ["Facebook", 38, "+38%"],
            ].map(([name, width, result]) => (
              <div key={name}>
                <span>{name}</span>

                <div className="smpkg2-report-document__platform-bar">
                  <i style={{ width: `${width}%` }} />
                </div>

                <strong>{result}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* 03 — STRENGTHS / WEAKNESSES */}

        <div
          className={`smpkg2-report-document__zone smpkg2-report-document__zone--analysis ${active(2)}`}
        >
          <div className="smpkg2-report-document__zone-head">
            <span>03 / PERFORMANCE ANALYSIS</span>
          </div>

          <div className="smpkg2-report-document__analysis-grid">
            <div>
              <strong>STRENGTHS ↗</strong>
              <i />
              <i />
              <i />
            </div>

            <div>
              <strong>TO IMPROVE ↗</strong>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>

        {/* 04 — INSIGHTS */}

        <div
          className={`smpkg2-report-document__zone smpkg2-report-document__zone--insights ${active(3)}`}
        >
          <div className="smpkg2-report-document__zone-head">
            <span>04 / KEY INSIGHTS</span>
          </div>

          <div className="smpkg2-report-document__insight">
            <span>✳</span>

            <div>
              <strong>WHAT WORKED THIS MONTH?</strong>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>

        {/* 05 — CLIENT PRESENTATION */}

        <div
          className={`smpkg2-report-document__zone smpkg2-report-document__zone--client ${active(4)}`}
        >
          <div className="smpkg2-report-document__zone-head">
            <span>05 / CLIENT SUMMARY</span>
          </div>

          <div className="smpkg2-report-document__summary">
            <div className="smpkg2-report-document__summary-cover">
              <small>SOCIAL MEDIA</small>
              <strong>MONTHLY REPORT</strong>
              <span>↗</span>
            </div>

            <div className="smpkg2-report-document__summary-notes">
              <i />
              <i />
              <i />
              <span>READY TO PRESENT ✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* CURRENT SELECTION */}

      <div
        className="smpkg2-report-document__selected"
        key={activeIndex}
      >
        <span>0{activeIndex + 1}</span>

        <strong>{reportItems[activeIndex].title}</strong>

        <span aria-hidden="true">↗</span>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN SECTION
   ============================================================ */

export function SocialMediaPackageTwoMonthlyReportSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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
      className={`smpkg2-report ${
        isVisible ? "is-visible" : ""
      }`}
      id="smpkg2-monthly-report"
    >
      <div className="smpkg2-report-inner">
        <div className="smpkg2-report-card">

          {/* TOP LABEL */}

          <div className="smpkg2-report-label">
            <span className="smpkg2-report-label__dot" />

            <span>
              03 · SOCIAL MEDIA MONTHLY REPORT
            </span>
          </div>

          {/* HEADING */}

          <h2 className="smpkg2-report-title">
            TỔNG HỢP KẾT QUẢ, ĐỌC HIỂU HIỆU SUẤT KÊNH
          </h2>

          {/* DESCRIPTION */}

          <p className="smpkg2-report-description">
            Template report tổng hợp KPI, hiệu suất và
            insight,... để bạn theo dõi kết quả và trình bày
            rõ ràng với client sau mỗi tháng.
          </p>

          {/* INTERACTIVE CONTENT */}

          <div className="smpkg2-report-grid">

            {/* LEFT — FIVE ITEMS */}

            <div
              className="smpkg2-report-list"
              role="tablist"
              aria-label="Các nội dung trong Social Media Monthly Report"
            >
              {reportItems.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  id={`smpkg2-report-tab-${index}`}
                  aria-selected={activeIndex === index}
                  aria-controls="smpkg2-report-preview"
                  className={`smpkg2-report-item ${
                    activeIndex === index
                      ? "is-active"
                      : ""
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  style={
                    {
                      "--report-item-delay": `${0.08 + index * 0.09}s`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className="smpkg2-report-item__icon"
                    aria-hidden="true"
                  >
                    ✳
                  </span>

                  <strong>{item.title}</strong>
                </button>
              ))}
            </div>

            {/* RIGHT — CHANGING PREVIEW */}

            <div
              className="smpkg2-report-preview"
              id="smpkg2-report-preview"
              role="tabpanel"
              aria-labelledby={`smpkg2-report-tab-${activeIndex}`}
            >
              {reportItems[activeIndex].image ? (
                <Image
                  key={activeIndex}
                  src={reportItems[activeIndex].image}
                  alt={`Minh họa ${reportItems[activeIndex].title}`}
                  fill
                  sizes="(max-width: 760px) 90vw, 45vw"
                  className="smpkg2-report-preview__image"
                />
              ) : (
                <MonthlyReportPreview activeIndex={activeIndex} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}