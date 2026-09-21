"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const backgroundCourses = [
  {
    title: "SOCIAL MEDIA STRATEGY",
    subtitle: "Chiến lược và định hướng kênh",
  },
  {
    title: "COMMUNITY MANAGEMENT",
    subtitle: "Xây dựng và quản lý cộng đồng",
  },
  {
    title: "CONTENT MARKETING",
    subtitle: "Nội dung và hệ thống Content",
  },
];

const marqueeItems = [
  "SOCIAL MEDIA STRATEGY",
  "COMMUNITY MANAGEMENT",
  "CONTENT MARKETING",
];

export function SocialMediaCoursesComingSoonSection() {
  const sectionRef = useRef<HTMLElement>(null);
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
        threshold: 0.15,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`course-coming ${
        isVisible ? "is-visible" : ""
      }`}
      id="courses-coming-soon"
    >
      {/* =====================================================
          BLURRED BACKGROUND
          ===================================================== */}

      <div
        className="course-coming-background"
        aria-hidden="true"
      >
        {backgroundCourses.map((course, index) => (
          <article
            key={course.title}
            className={`course-coming-background__card course-coming-background__card--${
              index + 1
            }`}
          >
            <span className="course-coming-background__badge">
              COMING SOON
            </span>

            <strong>
              {course.title}
            </strong>

            <p>
              {course.subtitle}
            </p>

            <div className="course-coming-background__fake-button" />
          </article>
        ))}
      </div>

      {/* =====================================================
          MAIN BLACK CARD
          ===================================================== */}

      <div className="course-coming-card">
        {/* BADGE */}

        <div className="course-coming-badge">
          <i aria-hidden="true" />
          <span>COMING SOON</span>
        </div>

        {/* TITLE */}

        <h2>
          VÀ CÒN NHIỀU KHÓA HỌC
          <br />

          KHÁC{" "}
          <span>
            ĐANG ĐƯỢC
            <br />
            UPDATE...
          </span>
        </h2>

        {/* LIME TEXT */}

        <p className="course-coming-callout">
          CẢ NHÀ CÙNG CHỜ NHA!
        </p>

        {/* DECORATIVE STAR */}

        <span
          className="course-coming-star"
          aria-hidden="true"
        >
          ✦
        </span>

        {/* ===================================================
            BOTTOM MARQUEE
            =================================================== */}

        <div
          className="course-coming-marquee"
          aria-hidden="true"
        >
          <div className="course-coming-marquee__track">
            {Array.from({ length: 2 }, (_, groupIndex) => (
              <div
                className="course-coming-marquee__group"
                key={groupIndex}
              >
                {marqueeItems.map((item) => (
                  <span
                    className="course-coming-marquee__item"
                    key={`${groupIndex}-${item}`}
                  >
                    {item}

                    <i>✦</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}