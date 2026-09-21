"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
} from "react";

type FeedbackItem = {
  name: string;
  role: string;
  content: string;
  avatar?: string;
};

const feedbacks: FeedbackItem[] = [
  {
    name: "Trang Vũ",
    role: "Freelance Content Creator & Strategist",
    content:
      "Cái mình bất ngờ nhất sau khóa là không chỉ học được Claude mà còn có thêm một đống thứ để đưa vào portfolio. Từ workflow Research, Content Assistant, Dashboard là điểm rất hay với những bạn đang đi làm hoặc đang tìm job vì mình không chỉ nói mình biết dùng AI mà còn có thể cho người khác xem mình đã ứng dụng nó như thế nào vào công việc.",
  },
  {
    name: "Minh Hoàng",
    role: "Social Media Lead tại Brand F&B",
    content:
      "Đăng ký học Claude vì tò mò, học xong thì mình có thêm một workflow khá rõ ràng để xử lý nhiều đầu việc Social Media hơn. Mình thích nhất phần biết cách setup Claude theo context và quy trình thực tế chứ không phải chỉ dùng prompt rời rạc.",
  },
  {
    name: "Khánh Đặng",
    role: "Content Specialist",
    content:
      "Highly recommend cho những bạn đang làm Social Media. Mình thích cách Quizzy dạy từ tư duy đến thực hành nên dù trước đó mình chưa dùng Claude nhiều vẫn theo được. Đặc biệt mấy phần automation với data làm mình kiểu “à ra làm được cái này luôn”.",
  },
  {
    name: "Ngọc Anh",
    role: "Social Media Executive",
    content:
      "Điểm mình thích là khóa học không chỉ đưa sẵn prompt mà còn chỉ cách xây cả workflow. Sau khi học mình có thể tự chỉnh Claude theo cách mình làm việc và dùng cho nhiều client khác nhau.",
  },
  {
    name: "Phương Linh",
    role: "Content Creator",
    content:
      "Trước đây mình dùng AI khá rời rạc. Học xong mới hiểu cách gom research, content, design và report thành một hệ thống. Phần Claude Skills với workflow là thứ mình ứng dụng nhiều nhất.",
  },
];

export function ClaudeAIMasteryFeedbackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const items =
      section.querySelectorAll<HTMLElement>(
        ".claude-feedback-reveal",
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

          entry.target.classList.add("is-visible");
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

  const moveSlider = (
    direction: "prev" | "next",
  ) => {
    const rail = railRef.current;

    if (!rail) return;

    const firstCard =
      rail.querySelector<HTMLElement>(
        ".claude-feedback-card",
      );

    const cardWidth =
      firstCard?.offsetWidth ?? 360;

    const styles =
      window.getComputedStyle(rail);

    const gap =
      parseFloat(styles.columnGap) || 24;

    rail.scrollBy({
      left:
        direction === "next"
          ? cardWidth + gap
          : -(cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="claude-feedback"
      id="claude-feedback"
    >
      <div className="claude-feedback__inner">
        {/* =========================================
            KICKER
            ========================================= */}

        <div className="claude-feedback__kicker claude-feedback-reveal">
          <i />
          <span>FEEDBACK KHÓA HỌC</span>
        </div>

        {/* =========================================
            HEADER
            ========================================= */}

        <div className="claude-feedback__header">
          <h2 className="claude-feedback-reveal">
            Feedback từ cộng đồng học viên
            <br />
            thực chiến cùng Quizzy Social Gallery
          </h2>

          <div className="claude-feedback__controls claude-feedback-reveal">
            <button
              type="button"
              onClick={() =>
                moveSlider("prev")
              }
              aria-label="Feedback trước"
            //   data-cur="OPEN"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() =>
                moveSlider("next")
              }
              aria-label="Feedback tiếp theo"
            //   data-cur="OPEN"
            >
              →
            </button>
          </div>
        </div>

        {/* =========================================
            SLIDER
            ========================================= */}

        <div
          ref={railRef}
          className="claude-feedback__rail claude-feedback-reveal"
        >
          {feedbacks.map(
            (feedback, index) => (
              <article
                className="claude-feedback-card"
                key={`${feedback.name}-${index}`}
                style={
                  {
                    "--feedback-delay": `${
                      index * 0.06
                    }s`,
                  } as CSSProperties
                }
              >
                {/* RATING */}

                <div
                  className="claude-feedback-card__stars"
                  aria-label="5 trên 5 sao"
                >
                  ● ● ● ● ●
                </div>

                {/* CONTENT */}

                <p className="claude-feedback-card__text">
                  {feedback.content}
                </p>

                {/* AUTHOR */}

                <div className="claude-feedback-card__author">
                  <div className="claude-feedback-card__avatar">
                    {feedback.avatar ? (
                      <img
                        src={feedback.avatar}
                        alt={feedback.name}
                      />
                    ) : (
                      <span>
                        {feedback.name
                          .split(" ")
                          .map(
                            (word) =>
                              word[0],
                          )
                          .slice(-2)
                          .join("")}
                      </span>
                    )}
                  </div>

                  <div>
                    <strong>
                      {feedback.name}
                    </strong>

                    <small>
                      {feedback.role}
                    </small>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}