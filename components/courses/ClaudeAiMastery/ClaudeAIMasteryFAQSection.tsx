"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type FAQItem = {
  number: string;
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    number: "01",
    question:
      "Mình chưa từng dùng Claude thì có học được không?",
    answer:
      "Có. Khóa học bắt đầu từ những kiến thức nền tảng về Claude trước khi đi vào các ứng dụng nâng cao.",
  },

  {
    number: "02",
    question:
      "Mình không biết Code thì có học được không?",
    answer:
      "Có. Các phần Vibe Coding được hướng dẫn theo hướng thực hành và không yêu cầu bạn phải có nền tảng lập trình chuyên sâu.",
  },

  {
    number: "03",
    question:
      "Khóa học có chỉ dành cho người làm Social Media không?",
    answer:
      "Social Media là bối cảnh chính để mình minh họa, nhưng những workflow và tư duy trong khóa học có thể ứng dụng cho nhiều công việc khác.",
  },

  {
    number: "04",
    question:
      "Học xong mình có được xem lại bài không?",
    answer:
      "Có. Học viên được truy cập và xem lại Record trong vòng 6 tháng.",
  },

  {
    number: "05",
    question:
      "Học xong có thể áp dụng ngay vào công việc không?",
    answer:
      "Có. Khóa học tập trung vào Demo và thực hành, với các output có thể tiếp tục sử dụng và cá nhân hóa sau khi học.",
  },
];

export function ClaudeAIMasteryFAQSection() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  const [isVisible, setIsVisible] =
    useState(false);

  /* =========================================================
     SECTION REVEAL
     ========================================================= */

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
          if (!entry.isIntersecting)
            return;

          setIsVisible(true);

          observer.disconnect();
        },
        {
          threshold: 0.1,
          rootMargin:
            "0px 0px -5% 0px",
        },
      );

    observer.observe(section);

    return () =>
      observer.disconnect();
  }, []);

  /* =========================================================
     ACCORDION
     ========================================================= */

  const toggleFAQ = (
    index: number,
  ) => {
    setActiveIndex((current) =>
      current === index
        ? null
        : index,
    );
  };

  return (
    <section
      ref={sectionRef}
      className={`claude-faq ${
        isVisible
          ? "is-visible"
          : ""
      }`}
      id="claude-faq"
    >
      <div className="claude-faq__inner">

        {/* =====================================
            LEFT
            ===================================== */}

        <div className="claude-faq__intro">
          <h2>
            <span>
              CÂU HỎI
            </span>

            <strong>
              THƯỜNG GẶP
            </strong>
          </h2>

          <p>
            Mọi điều bạn cần biết trước
            khi bắt đầu hành trình đưa
            Claude AI vào quy trình làm
            việc Social Media thực tế.
          </p>
        </div>

        {/* =====================================
            FAQ LIST
            ===================================== */}

        <div className="claude-faq__list">
          {faqItems.map(
            (item, index) => {
              const isOpen =
                activeIndex === index;

              return (
                <article
                  key={item.number}
                  className={`claude-faq-item ${
                    isOpen
                      ? "is-open"
                      : ""
                  }`}
                  style={
                    {
                      "--faq-delay": `${
                        0.08 +
                        index * 0.07
                      }s`,
                    } as CSSProperties
                  }
                >
                  <button
                    type="button"
                    className="claude-faq-item__button"
                    aria-expanded={
                      isOpen
                    }
                    aria-controls={`faq-answer-${index}`}
                    onClick={() =>
                      toggleFAQ(
                        index,
                      )
                    }
                    data-cur="OPEN"
                  >
                    <span className="claude-faq-item__number">
                      {
                        item.number
                      }
                    </span>

                    <span className="claude-faq-item__question">
                      {
                        item.question
                      }
                    </span>

                    <span
                      className="claude-faq-item__plus"
                      aria-hidden="true"
                    >
                      <i />
                      <i />
                    </span>
                  </button>

                  {/* ANSWER */}

                  <div
                    id={`faq-answer-${index}`}
                    className="claude-faq-item__answer-wrap"
                  >
                    <div className="claude-faq-item__answer">
                      <p>
                        {
                          item.answer
                        }
                      </p>
                    </div>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}