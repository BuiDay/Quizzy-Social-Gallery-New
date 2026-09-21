import type { CSSProperties } from "react";

const enterDelay = (delay: number): CSSProperties =>
  ({
    "--course-hero-delay": `${delay}s`,
  }) as CSSProperties;

const marqueeItems = [
  "SOCIAL MEDIA STRATEGY",
  "COMMUNITY MANAGEMENT",
  "CONTENT MARKETING",
];

export function SocialMediaCoursesHero() {
  return (
    <section
      className="course-hero"
      id="courses"
    >
      <div className="course-hero-inner">
        {/* ==================================================
            MAIN TITLE
            ================================================== */}

        <div className="course-hero-title-wrap">
          {/* ROW 01 */}

          <div className="course-hero-row course-hero-row--top">
            <span
              className="course-hero-star course-hero-enter"
              style={enterDelay(0.05)}
              aria-hidden="true"
            >
              ✱
            </span>

            <span
              className="course-hero-pill course-hero-pill--outline course-hero-enter"
              style={enterDelay(0.12)}
            >
              KHÓA
            </span>

            <span
              className="course-hero-pill course-hero-pill--outline course-hero-enter"
              style={enterDelay(0.19)}
            >
              HỌC
            </span>

            <a
              href="#course-list"
              className="course-hero-arrow course-hero-enter"
              style={enterDelay(0.26)}
              aria-label="Xem danh sách khóa học"
              data-cur="OPEN"
            >
              →
            </a>
          </div>

          {/* ROW 02 */}

          <div className="course-hero-row course-hero-row--bottom">
            <span
              className="course-hero-pill course-hero-pill--lime course-hero-enter"
              style={enterDelay(0.32)}
            >
              SOCIAL
            </span>

            <span
              className="course-hero-pill course-hero-pill--lime course-hero-enter"
              style={enterDelay(0.39)}
            >
              MEDIA
            </span>

            <span
              className="course-hero-pill course-hero-pill--lime course-hero-enter"
              style={enterDelay(0.46)}
            >
              MARKETING
            </span>
          </div>
        </div>

        {/* ==================================================
            SUBTITLE
            ================================================== */}

        <p
          className="course-hero-subtitle course-hero-enter"
          style={enterDelay(0.55)}
        >
          Mở khóa năng lực Social Media với các khóa học dành riêng
          <br className="course-hero-desktop-break" />
          cho dân Creative Social Media Marketer.
        </p>
      </div>

      {/* ====================================================
          MARQUEE
          ==================================================== */}

      <div
        className="course-hero-marquee course-hero-enter"
        style={enterDelay(0.65)}
      >
        <div
          className="course-hero-marquee__track"
          aria-hidden="true"
        >
          {Array.from({ length: 2 }, (_, groupIndex) => (
            <div
              className="course-hero-marquee__group"
              key={groupIndex}
            >
              {marqueeItems.map((item) => (
                <span
                  className="course-hero-marquee__item"
                  key={`${groupIndex}-${item}`}
                >
                  <span>{item}</span>

                  <span className="course-hero-marquee__star">
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}