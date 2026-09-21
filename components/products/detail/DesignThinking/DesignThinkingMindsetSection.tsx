"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const questions = [
  "Một thiết kế đẹp là đẹp như thế nào?",
  "Thế nào là đúng nhận diện?",
  "Làm thế nào để đánh giá một Social Post đúng insight?",
];

const skills = [
  {
    number: "01",
    title: "BỐ CỤC - LAYOUT",
    description: "Hiểu bố cục, hình ảnh và màu sắc.",
  },
  {
    number: "02",
    title: "TÌM Ý TƯỞNG",
    description:
      "Biết brief, tìm reference và truyền tải ý tưởng.",
  },
  {
    number: "03",
    title: "THIẾT KẾ CÓ INSIGHT",
    description:
      "Biết thế nào là đẹp, đúng nhận diện và đúng insight.",
  },
  {
    number: "04",
    title: "THỰC CHIẾN CANVA",
    description:
      "Tự chỉnh sửa với các tác vụ cơ bản trên Canva.",
  },
];

export function DesignThinkingMindsetSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [visibleQuestions, setVisibleQuestions] =
    useState(0);

  const [showEbook, setShowEbook] =
    useState(false);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setVisibleQuestions(3);
      setShowEbook(true);
      return;
    }

    let frameId = 0;

    const clamp = (
      value: number,
      min: number,
      max: number,
    ) => Math.min(Math.max(value, min), max);

    const update = () => {
      frameId = 0;

      const rect =
        scrollElement.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight;

      const scrollDistance = Math.max(
        scrollElement.offsetHeight -
          viewportHeight,
        1,
      );

      const progress = clamp(
        -rect.top / scrollDistance,
        0,
        1,
      );

      /*
        FLOW

        0.00 - 0.13
        Chỉ hiện intro

        0.13
        Câu 01 xuất hiện

        0.34
        Câu 02 xuất hiện

        0.55
        Câu 03 xuất hiện

        0.76
        Intro/questions chuyển đi
        Ebook xuất hiện

        Tức là sau câu 03 vẫn phải scroll
        thêm một đoạn mới tới Ebook.
      */

      let count = 0;

      if (progress >= 0.13) count = 1;
      if (progress >= 0.34) count = 2;
      if (progress >= 0.55) count = 3;

      const nextShowEbook =
        progress >= 0.76;

      setVisibleQuestions((current) =>
        current === count
          ? current
          : count,
      );

      setShowEbook((current) =>
        current === nextShowEbook
          ? current
          : nextShowEbook,
      );
    };

    const requestUpdate = () => {
      if (frameId) return;

      frameId =
        window.requestAnimationFrame(
          update,
        );
    };

    update();

    window.addEventListener(
      "scroll",
      requestUpdate,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      requestUpdate,
    );

    return () => {
      window.cancelAnimationFrame(
        frameId,
      );

      window.removeEventListener(
        "scroll",
        requestUpdate,
      );

      window.removeEventListener(
        "resize",
        requestUpdate,
      );
    };
  }, []);

  return (
    <section
      className="dth-mindset"
      id="design-thinking-mindset"
    >
      <div
        ref={scrollRef}
        className="dth-mindset-scroll"
      >
        <div className="dth-mindset-sticky">

          {/* ================================================
              SCREEN 01 — INTRO + QUESTIONS
              ================================================ */}

          <div
            className={`dth-mindset-screen dth-mindset-screen--questions ${
              showEbook
                ? "is-hidden"
                : "is-active"
            }`}
          >
            <div className="dth-mindset-inner">
              <div className="dth-mindset-top">

                {/* LEFT */}

                <div className="dth-mindset-intro">
                  <h2 className="dth-mindset-intro__title">
                    VÀ LÊN Ý TƯỞNG THIẾT KẾ GẦN
                    <br />

                    NHƯ LÀ MỘT{" "}
                    <span>
                      KỸ NĂNG BẮT BUỘC
                    </span>
                    <br />

                    CỦA SOCIAL MEDIA MARKETER.
                  </h2>

                  <p className="dth-mindset-intro__description">
                    Bạn không nhất thiết phải trở
                    thành Designer. Nhưng bạn cần
                    có tư duy thiết kế để biết cách
                    nhìn một visual, hiểu những yếu
                    tố đang tạo nên nó và quan trọng
                    nhất là biết cách biến ý tưởng
                    content thành một brief rõ ràng.
                  </p>
                </div>

                {/* RIGHT */}

                <ul className="dth-mindset-questions">
                  {questions.map(
                    (question, index) => (
                      <li
                        key={question}
                        className={`dth-mindset-question ${
                          visibleQuestions >
                          index
                            ? "is-visible"
                            : ""
                        }`}
                      >
                        <span
                          className="dth-mindset-question__dot"
                          aria-hidden="true"
                        />

                        <span className="dth-mindset-question__text">
                          {question}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {/* SCROLL INDICATOR */}

              <div
                className={`dth-mindset-scroll-hint ${
                  visibleQuestions === 3
                    ? "is-ready"
                    : ""
                }`}
                aria-hidden="true"
              >
                <span>↓</span>
              </div>
            </div>
          </div>

          {/* ================================================
              SCREEN 02 — EBOOK
              CÙNG STICKY VIEWPORT
              ================================================ */}

          <div
            className={`dth-mindset-screen dth-mindset-screen--ebook ${
              showEbook
                ? "is-active"
                : ""
            }`}
          >
            <div className="dth-mindset-ebook">

              {/* LABEL */}

              <span className="dth-mindset-ebook__label">
                EBOOK
              </span>

              {/* BIG TITLE */}

              <div className="dth-mindset-ebook__heading">
                <span
                  className="dth-mindset-ebook__star"
                  aria-hidden="true"
                >
                  ✱
                </span>

                <h3 className="dth-mindset-ebook__title">
                  <span>TÀI LIỆU</span>
                  <span>TƯ DUY</span>
                  <span>THIẾT KẾ</span>
                </h3>

                <a
                  href="#design-thinking-buy"
                  className="dth-mindset-ebook__arrow"
                  aria-label="Xem thông tin mua tài liệu Tư duy Thiết kế"
                  data-cur="OPEN"
                >
                  →
                </a>
              </div>

              {/* DESCRIPTION */}

              <p className="dth-mindset-ebook__description">
                Đây không phải một khóa học
                Design, cũng không bắt bạn học
                từ A đến Z để trở thành Designer.
                Mình chỉ tập trung vào những gì
                một người làm Social Media thực
                sự cần biết để làm việc với
                Designer tốt hơn và tự xử lý
                những visual cơ bản khi cần với
                4 kỹ năng:
              </p>

              {/* SKILLS */}

              <div className="dth-mindset-skills">
                {skills.map(
                  (skill, index) => (
                    <article
                      className="dth-mindset-skill"
                      key={skill.number}
                      style={
                        {
                          "--dth-skill-delay": `${
                            0.18 +
                            index * 0.1
                          }s`,
                        } as CSSProperties
                      }
                    >
                      <span className="dth-mindset-skill__number">
                        {skill.number}
                      </span>

                      <div className="dth-mindset-skill__content">
                        <h4>
                          {skill.title}
                        </h4>

                        <p>
                          {
                            skill.description
                          }
                        </p>
                      </div>
                    </article>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}