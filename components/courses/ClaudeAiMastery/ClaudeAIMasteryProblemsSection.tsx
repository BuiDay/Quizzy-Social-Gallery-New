"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const problems = [
  {
    number: "01",
    title: "Kiến thức rời rạc",
    description:
      "Mỗi video chỉ cho một tính năng hoặc một task riêng lẻ, nhưng không chỉ cách kết nối chúng thành một workflow hoàn chỉnh.",
    rotate: "-4deg",
  },
  {
    number: "02",
    title: "Không đúng nhu cầu",
    description:
      "Demo thường dùng dữ liệu mẫu và tình huống đơn giản. Đến khi áp dụng vào client, data và bài toán thực tế, kết quả lại không giống như kỳ vọng.",
    rotate: "3deg",
  },
  {
    number: "03",
    title: "Không có hệ thống",
    description:
      "Có nhiều Prompt, biết nhiều tính năng, nhưng mỗi lần làm việc vẫn phải giải thích lại context, chỉnh output và kiểm tra từng bước.",
    rotate: "-3deg",
  },
];

export function ClaudeAIMasteryProblemsSection() {
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
        threshold: 0.16,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`claude-problems ${
        isVisible ? "is-visible" : ""
      }`}
      id="claude-problems"
    >
      <div className="claude-problems__inner">

        {/* =========================================
            HEADING
            ========================================= */}

        <div className="claude-problems__heading">
          <h2>
            NHƯNG MÌNH CŨNG TỪNG BẮT ĐẦU TỪ VIỆC
            <br />
            KHÔNG BIẾT GÌ VỀ CLAUDE AI CẢ!
          </h2>

          <p>
            Trên mạng có rất nhiều video hướng dẫn cách dùng Claude,
            từ Prompt, Research đến Content và Automation. Nhưng xem
            nhiều không có nghĩa là{" "}
            <strong>
              bạn biết cách biến Claude thành một phần trong công việc
              của mình.
            </strong>{" "}
            Bởi vì:
          </p>
        </div>

        {/* =========================================
            CARDS
            ========================================= */}

        <div className="claude-problems__cards">
          {problems.map((item, index) => (
            <article
              key={item.number}
              className="claude-problem-card"
              style={
                {
                  "--claude-problem-rotate": item.rotate,
                  "--claude-problem-delay": `${
                    0.15 + index * 0.12
                  }s`,
                } as CSSProperties
              }
            >
              {/* PIN */}

              <div
                className="claude-problem-card__pin"
                aria-hidden="true"
              >
                <span />
              </div>

              {/* NUMBER */}

              <div className="claude-problem-card__number">
                {item.number}
              </div>

              {/* TITLE */}

              <h3>{item.title}</h3>

              {/* DESCRIPTION */}

              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}