"use client";

import Image, { type StaticImageData } from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";

type SocialMediaCoursesOpenSectionProps = {
  courseImageSrc?: string | StaticImageData;
  courseUrl?: string;
};

export function SocialMediaCoursesOpenSection({
  courseImageSrc,
  courseUrl = "#",
}: SocialMediaCoursesOpenSectionProps) {
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
      className={`course-open ${
        isVisible
          ? "is-visible"
          : ""
      }`}
      id="course-list"
    >
      <div className="course-open-inner">

        {/* =========================================
            SECTION HEADER
            ========================================= */}

        <div className="course-open-heading">
          <h2>
            &gt; Danh sách khóa học
            đang mở
          </h2>

          <span>
            01 khóa học
          </span>
        </div>

        {/* =========================================
            COURSE CARD
            ========================================= */}

        <article className="course-open-card">

          {/* LEFT IMAGE */}

          <div className="course-open-visual">
            <span className="course-open-visual__label">
              KHÓA HỌC ONLINE
            </span>

            {courseImageSrc ? (
              <Image
                src={
                  courseImageSrc
                }
                alt="Claude AI Mastery"
                fill
                sizes="(max-width: 700px) 100vw, 42vw"
                className="course-open-visual__image"
              />
            ) : (
              <div className="course-open-visual__placeholder">
                <div>
                  <span>
                    QUIZZY SOCIAL
                  </span>

                  <strong>
                    CLAUDE AI
                    <br />
                    MASTERY
                  </strong>

                  <small>
                    SOCIAL MEDIA
                    WORKFLOW
                  </small>
                </div>
              </div>
            )}

            <span
              className="course-open-visual__number"
              aria-hidden="true"
            >
              01
            </span>
          </div>

          {/* RIGHT CONTENT */}

          <div className="course-open-content">

            {/* TAGS */}

            <div className="course-open-tags">
              <span>
                <i />
                AI
              </span>

              <span>
                <i />
                SOCIAL MEDIA
              </span>
            </div>

            {/* TITLE */}

            <h3>
              Claude AI Mastery
            </h3>

            {/* DESCRIPTION */}

            <p className="course-open-description">
              Tự động hóa công việc
              Social Media với Claude
              AI — từ xây workflow, xử
              lý tài liệu, nghiên cứu,
              lên ý tưởng đến sản xuất
              nội dung, thay vì làm mọi
              thứ thủ công từ đầu.
            </p>

            {/* META */}

            <div className="course-open-meta">
              <span>
                8 module
              </span>

              <span>
                +20 tài liệu truy cập
                vĩnh viễn
              </span>
            </div>

            {/* CTA */}

            <a
              href={courseUrl}
              className="course-open-button"
              data-cur="OPEN"
            >
              <span>
                Xem chi tiết khóa học
              </span>

              <span
                className="course-open-button__arrow"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}