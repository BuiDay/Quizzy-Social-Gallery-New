"use client";

import { useEffect, useRef, useState } from "react";

const salaryData = [
  {
    value: "$500–2K",
    height: 52,
    fill: 50,
  },
  {
    value: "$900–3.5K",
    height: 92,
    fill: 55,
  },
  {
    value: "$1.5–5K",
    height: 130,
    fill: 58,
  },
  {
    value: "$3.5–9.5K",
    height: 205,
    fill: 64,
  },
];

export function SocialMediaSalarySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`smb-salary ${isVisible ? "is-visible" : ""}`}
      id="smb-salary"
    >
      <div className="wrap smb-salary-inner">
        {/* =====================================================
            LEFT — CHART
            ===================================================== */}

        <div className="smb-salary-card" data-rv="up">
          <h3>
            Mức thu nhập trung bình ngành
            <br />
            Social Media Marketing khu vực
            <br />
            Đông Nam Á
          </h3>

          {/* CHART */}

          <div className="smb-salary-chart">
            {salaryData.map((item, index) => (
              <div
                className="smb-salary-column"
                key={item.value}
                style={
                  {
                    "--salary-delay": `${0.08 + index * 0.14}s`,
                  } as React.CSSProperties
                }
              >
                {/* VALUE */}

                <span className="smb-salary-value">{item.value}</span>

                {/* BAR */}

                <div
                  className="smb-salary-bar"
                  style={{
                    height: `${item.height}px`,
                  }}
                >
                  <span
                    className="smb-salary-bar-fill"
                    style={{
                      height: `${item.fill}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* SOURCE */}

          <p className="smb-salary-source">
            Tham khảo khu vực ĐNÁ (Singapore, Malaysia, Philippines,
            Indonesia...), tổng hợp từ Glassdoor, Indeed &amp; Jobstreet
            2025–2026
          </p>
        </div>

        {/* =====================================================
            RIGHT — CONTENT
            ===================================================== */}

        <div className="smb-salary-content" data-rv="up" data-dl="100">
          <h2 className="smb-salary-title">
            Tự tin đạt mức lương
            <br />
            mong muốn với
            <br />
            <span>Social Media Beginner Ebook</span>
          </h2>

          <div className="smb-salary-copy">
            <p>
              Social Media Marketing đang trở thành một phần không thể thiếu của
              doanh nghiệp, tạo ra nhu cầu nhân sự lớn và nhiều cơ hội phát
              triển.
            </p>

            <p>
              Có nền tảng đúng từ đầu, bạn sẽ có lợi thế để xây dựng năng lực,
              tạo ra giá trị và tiến gần hơn đến mức thu nhập mình mong muốn.
            </p>
          </div>

          <p className="smb-salary-callout">
            Cấp Executive với kinh nghiệm 1–2 năm
            <br />
            có thể lên tới ~$1000/tháng
          </p>

          <a href="#smb-buy" className="smb-salary-cta" data-cur="OPEN">
            <span>MÌNH MUỐN SỞ HỮU EBOOK NÀY NGAY!</span>

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
      </div>
    </section>
  );
}
