"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const skills = [
  {
    number: "01",
    title: "STRATEGY",
    description: "Chiến lược & Định vị kênh",
    icon: "strategy",
  },
  {
    number: "02",
    title: "CONTENT",
    description: "Sáng tạo Nội Dung & Hooks",
    icon: "content",
  },
  {
    number: "03",
    title: "PLANNING",
    description: "Lên kế hoạch và quản lý",
    icon: "planning",
  },
  {
    number: "04",
    title: "CREATIVE",
    description: "Lên ý tưởng & Visual Direction",
    icon: "creative",
  },
  {
    number: "05",
    title: "PERFORMANCE",
    description: "Phân tích & Tối ưu hiệu quả",
    icon: "performance",
  },
];

function SkillIcon({
  type,
}: {
  type: string;
}) {
  if (type === "strategy") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="7"
        />
        <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />
      </svg>
    );
  }

  if (type === "content") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d="m5 19 3.2-.7L18 8.5 15.5 6 5.7 15.8 5 19Z" />
        <path d="m14.8 6.7 2.5 2.5" />
      </svg>
    );
  }

  if (type === "planning") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="4"
          y="5.5"
          width="16"
          height="14"
          rx="2"
        />
        <path d="M8 3.5v4M16 3.5v4M4 9.5h16" />
        <path d="M8 13h2M12 13h2M16 13h1M8 16h2M12 16h2" />
      </svg>
    );
  }

  if (type === "creative") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d="m12 3 1.2 4.1L17 8.5l-3.8 1.4L12 14l-1.2-4.1L7 8.5l3.8-1.4L12 3Z" />
        <path d="m18 13 .7 2.3L21 16l-2.3.7L18 19l-.7-2.3L15 16l2.3-.7L18 13Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="m13.5 3-7 10h5l-1 8 7-11h-5l1-7Z" />
    </svg>
  );
}

export function SocialMediaCoursesSkillsSection() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] =
    useState(false);

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    if (
      !(
        "IntersectionObserver" in
        window
      )
    ) {
      setIsVisible(true);
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            !entry.isIntersecting
          )
            return;

          setIsVisible(true);
          observer.disconnect();
        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -7% 0px",
        },
      );

    observer.observe(section);

    return () =>
      observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`course-skills ${
        isVisible
          ? "is-visible"
          : ""
      }`}
      id="course-skills"
    >
      <div className="course-skills-inner">
        {/* HEADING */}

        <div className="course-skills-heading">
          <h2>
            Biến kỹ năng{" "}
            <span className="course-skills-heading__lime">
              Social Media
            </span>
            <br />

            thành{" "}
            <span className="course-skills-heading__outline">
              cơ hội tăng thu nhập.
            </span>
          </h2>
        </div>

        {/* DESCRIPTION */}

        <div className="course-skills-intro">
          <p>
            Các khóa học tại{" "}
            <strong>
              Quizzy Social Gallery
            </strong>{" "}
            được thiết kế theo hướng{" "}
            <span>
              thực chiến
            </span>
            , tập trung vào những kiến
            thức và kỹ năng người làm
            Social Media thực sự cần để{" "}
            <strong>
              làm việc tốt hơn, nhận
              thêm project
            </strong>{" "}
            và{" "}
            <strong>
              mở rộng cơ hội trong nghề.
            </strong>
          </p>
        </div>

        {/* SKILLS SYSTEM */}

        <div className="course-skills-panel">
          <div className="course-skills-panel__heading">
            <span
              className="course-skills-panel__icon"
              aria-hidden="true"
            >
              ◈
            </span>

            <span>
              Hệ thống kỹ năng thực
              chiến toàn diện
            </span>
          </div>

          <div className="course-skills-grid">
            {skills.map(
              (skill, index) => (
                <article
                  key={
                    skill.number
                  }
                  className="course-skill-card"
                  style={
                    {
                      "--course-skill-delay": `${
                        0.08 +
                        index *
                          0.09
                      }s`,
                    } as CSSProperties
                  }
                >
                  <div className="course-skill-card__top">
                    <span className="course-skill-card__badge">
                      SKILL{" "}
                      {skill.number}
                    </span>

                    <span className="course-skill-card__icon">
                      <SkillIcon
                        type={
                          skill.icon
                        }
                      />
                    </span>
                  </div>

                  <h3>
                    {skill.title}
                  </h3>

                  <p>
                    {
                      skill.description
                    }
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}