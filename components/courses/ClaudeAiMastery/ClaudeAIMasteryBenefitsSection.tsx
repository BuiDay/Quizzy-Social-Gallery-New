"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

type Benefit = {
  title: string;
  description: string;
  icon: ReactNode;
};

const resources = [
  "30+ AI Skills cho Social Media & Content Creation",
  "50+ Prompt thực chiến cho Social Media",
  "Thư viện Knowledge Base cho Claude",
  "Từ điển thuật ngữ trong Claude",
];

function CertificateIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="9" r="5" />
      <path d="m9 13-1 7 4-2 4 2-1-7" />
      <path d="m10.2 9 1.2 1.2L14 7.7" />
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="9" r="3" />
      <circle cx="16.5" cy="10" r="2.5" />
      <path d="M4 19c.4-3 2.2-5 5-5s4.7 2 5 5" />
      <path d="M14 15c3.1-.4 5.4 1.3 6 4" />
    </svg>
  );
}

function LearningIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m10 9 5 3-5 3Z" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="4" width="14" height="11" rx="1.5" />
      <path d="M3 19h18M8 15l-1 4M16 15l1 4" />
    </svg>
  );
}

const benefits: Benefit[] = [
  {
    title: "CERTIFICATE MIỄN PHÍ",
    description:
      "Nhận Certificate hoàn thành khóa học.",
    icon: <CertificateIcon />,
  },
  {
    title: "THAM GIA CỘNG ĐỒNG SOCIAL MEDIA",
    description:
      "Tham gia cộng đồng 3,000+ thành viên cùng học hỏi và thực chiến Social Media.",
    icon: <CommunityIcon />,
  },
  {
    title: "HỆ THỐNG E-LEARNING BÀI BẢN",
    description:
      "Giáo trình được xây dựng theo lộ trình rõ ràng, kết hợp video bài giảng và thực hành.",
    icon: <LearningIcon />,
  },
  {
    title: "HỌC ONLINE CHỦ ĐỘNG",
    description:
      "Học theo tốc độ của bạn và xem lại Record trong vòng 6 tháng.",
    icon: <LaptopIcon />,
  },
];

export function ClaudeAIMasteryBenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items =
      section.querySelectorAll<HTMLElement>(
        ".claude-benefits-reveal",
      );

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) =>
        item.classList.add("is-visible"),
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add(
            "is-visible",
          );

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    items.forEach((item) =>
      observer.observe(item),
    );

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="claude-benefits"
      id="claude-benefits"
    >
      <div className="claude-benefits__inner">

        {/* KICKER */}

        <div className="claude-benefits__kicker claude-benefits-reveal">
          <i />
          <span>QUYỀN LỢI HỌC VIÊN</span>
        </div>

        {/* TOP HEADING */}

        <div className="claude-benefits__heading">
          <strong className="claude-benefits__big-number claude-benefits-reveal">
            20+
          </strong>

          <h2 className="claude-benefits-reveal">
            TÀI LIỆU &amp; TEMPLATE MIỄN PHÍ
            <span>TRONG KHÓA HỌC</span>
          </h2>
        </div>

        {/* BODY */}

        <div className="claude-benefits__body">

          {/* LEFT VISUAL */}

          <div className="claude-benefits-resources claude-benefits-reveal">

            <div
              className="claude-benefits-resources__burst"
              aria-hidden="true"
            />

            <div className="claude-benefits-resources__folder">
              <div className="claude-benefits-resources__folder-tab" />
            </div>

            <div className="claude-benefits-resources__list">
              {resources.map(
                (resource, index) => (
                  <div
                    key={resource}
                    className="claude-benefits-resource"
                    style={
                      {
                        "--resource-index":
                          index,
                      } as CSSProperties
                    }
                  >
                    <i />
                    <span>{resource}</span>
                    <i />
                  </div>
                ),
              )}
            </div>

            <div
              className="claude-benefits-resources__cursor"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 40 50"
                fill="none"
              >
                <path
                  d="M5 3L7 39L16 30L23 45L30 41L23 27L35 26L5 3Z"
                  fill="white"
                  stroke="black"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* RIGHT BENEFITS */}

          <div className="claude-benefits__list">
            {benefits.map(
              (benefit, index) => (
                <article
                  key={benefit.title}
                  className="claude-benefit-card claude-benefits-reveal"
                  style={
                    {
                      "--benefit-delay": `${
                        0.08 +
                        index * 0.08
                      }s`,
                    } as CSSProperties
                  }
                >
                  <div className="claude-benefit-card__icon">
                    {benefit.icon}
                  </div>

                  <div className="claude-benefit-card__content">
                    <h3>
                      {benefit.title}
                    </h3>

                    <p>
                      {
                        benefit.description
                      }
                    </p>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}