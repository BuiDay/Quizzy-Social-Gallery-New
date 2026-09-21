import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

type ClaudeAIMasteryHeroProps = {
  imageSrc?: string | StaticImageData;
  purchaseUrl?: string;
  curriculumUrl?: string;
};

const enterStyle = (delay: number): CSSProperties =>
  ({
    "--claude-hero-delay": `${delay}s`,
  }) as CSSProperties;

const stats = [
  {
    value: "500+",
    label:
      "Học viên đã tiếp cận kiến thức Social Media Marketing thực chiến.",
    lime: true,
  },
  {
    value: "6+",
    label:
      "Giờ học chuyên sâu, tập trung vào thực hành.",
  },
  {
    value: "08",
    label:
      "Module tinh học, đi từ cài đặt đến ứng dụng trong công việc.",
  },
  {
    value: "20+",
    label:
      "Tài liệu & template Prompt & Workflow thực chiến.",
  },
];

export function ClaudeAIMasteryHero({
  imageSrc,
  purchaseUrl = "#claude-register",
  curriculumUrl = "#claude-curriculum",
}: ClaudeAIMasteryHeroProps) {
  return (
    <section
      className="claude-course-hero"
      id="claude-ai-mastery"
    >
      <div className="claude-course-hero__main">
        <div className="claude-course-hero__inner">

          {/* =========================================
              LEFT
              ========================================= */}

          <div className="claude-course-hero__content">

            {/* BREADCRUMB */}

            <div
              className="claude-course-hero__kicker claude-course-hero-enter"
              style={enterStyle(0.04)}
            >
              <i />
              <span>
                KHÓA HỌC SOCIAL MEDIA MARKETING
                <b>\</b>
                CLAUDE AI MASTERY
              </span>
            </div>

            {/* =========================================
                TITLE
                ========================================= */}

            <div className="claude-course-hero__title">
              <div className="claude-course-hero__title-row">
                <span
                  className="claude-course-hero__star claude-course-hero-enter"
                  style={enterStyle(0.1)}
                  aria-hidden="true"
                >
                  ✱
                </span>

                <span
                  className="claude-course-hero__pill claude-course-hero-enter"
                  style={enterStyle(0.16)}
                >
                  CLAUDE
                </span>

                <span
                  className="claude-course-hero__pill claude-course-hero-enter"
                  style={enterStyle(0.22)}
                >
                  AI
                </span>
              </div>

              <div className="claude-course-hero__title-row claude-course-hero__title-row--second">
                <span
                  className="claude-course-hero__pill claude-course-hero-enter"
                  style={enterStyle(0.28)}
                >
                  MASTERY
                </span>

                <a
                  href={curriculumUrl}
                  className="claude-course-hero__title-arrow claude-course-hero-enter"
                  style={enterStyle(0.34)}
                  aria-label="Xem lộ trình khóa học"
                  data-cur="OPEN"
                >
                  →
                </a>
              </div>
            </div>

            {/* =========================================
                INFO BOX
                ========================================= */}

            <div
              className="claude-course-hero__info claude-course-hero-enter"
              style={enterStyle(0.4)}
            >
              <p>
                Không chỉ học cách sử dụng Claude. Học cách đưa Claude
                vào Research, Content, Design, Data và những công việc
                lặp lại trong quy trình Social Media.
              </p>

              <div className="claude-course-hero__rating">
                <div
                  className="claude-course-hero__people"
                  aria-hidden="true"
                >
                  <span className="claude-course-hero__person claude-course-hero__person--1" />
                  <span className="claude-course-hero__person claude-course-hero__person--2" />
                  <span className="claude-course-hero__person claude-course-hero__person--3" />

                  <span className="claude-course-hero__person claude-course-hero__person--count">
                    +500
                  </span>
                </div>

                <div className="claude-course-hero__rating-copy">
                  <div>
                    <span className="claude-course-hero__stars">
                      ★★★★★
                    </span>

                    <strong>5.0 / 5.0</strong>
                  </div>

                  <p>
                    500+ học viên đang áp dụng mỗi ngày
                  </p>
                </div>
              </div>
            </div>

            {/* =========================================
                BUTTONS
                ========================================= */}

            <div
              className="claude-course-hero__actions claude-course-hero-enter"
              style={enterStyle(0.5)}
            >
              <div className="claude-course-hero__primary-wrap">
                <span className="claude-course-hero__discount">
                  Ưu đãi tới 30%
                </span>

                <a
                  href={purchaseUrl}
                  className="claude-course-hero__button claude-course-hero__button--primary"
                  data-cur="OPEN"
                >
                  Đăng ký ngay
                </a>
              </div>

              <a
                href={curriculumUrl}
                className="claude-course-hero__button claude-course-hero__button--secondary"
                data-cur="OPEN"
              >
                <span>Xem lộ trình học</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* =========================================
              RIGHT VISUAL
              ========================================= */}

          <div
            className="claude-course-hero__visual-wrap claude-course-hero-enter"
            style={enterStyle(0.24)}
          >
            <div className="claude-course-hero__visual">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="Claude AI Mastery"
                  fill
                  priority
                  sizes="(max-width: 800px) 90vw, 46vw"
                  className="claude-course-hero__image"
                />
              ) : (
                <div className="claude-course-hero__placeholder">
                  <span>CLAUDE AI</span>
                  <strong>Mastery</strong>

                  <p>
                    SOCIAL MEDIA
                    <br />
                    WORKFLOW
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          STATS BAR
          ========================================= */}

      <div className="claude-course-hero__stats">
        <div className="claude-course-hero__stats-inner">
          {stats.map((stat, index) => (
            <div
              key={stat.value}
              className="claude-course-hero__stat claude-course-hero-enter"
              style={enterStyle(0.58 + index * 0.07)}
            >
              <strong
                className={
                  stat.lime
                    ? "claude-course-hero__stat-value claude-course-hero__stat-value--lime"
                    : "claude-course-hero__stat-value"
                }
              >
                {stat.value}
              </strong>

              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}