
"use client";

import { useEffect, useRef } from "react";

type Feedback = {
  id: number;
  messages: string[];
};

const feedbacks: Feedback[] = [
  {
    id: 1,
    messages: [
      "Ui, cảm ơn Quỳnh nha. Mình thích nhất là template nhìn rõ ràng, dễ customize. Trước giờ mỗi lần làm proposal hay strategy đều phải tự ngồi mò kĩ á, giờ có sườn sẵn nên đỡ mất thời gian hơn rất nhiều 🥰",
    ],
  },
  {
    id: 2,
    messages: [
      "Ban đầu mình cũng nghĩ chỉ là template thôi, cũng sợ không biết xài sao.",
      "Nhưng phần hướng dẫn khá chi tiết nên dễ hiểu lắm nhe.",
      "Mình dùng lại được cho nhiều project chứ không phải chỉ một lần.",
    ],
  },
  {
    id: 3,
    messages: [
      "Mình mới bắt đầu freelance nên trước đó khá rối, không biết portfolio nên có gì.",
      "R làm strategy thì nên trình bày sao cho client dễ hiểu.",
      "Bộ này support mình nhiều lắm, làm một project Social Media cho khách cũng chuyên nghiệp hơn nữa.",
    ],
  },
];

type Props = {
  purchaseUrl?: string;
};

export function SocialMediaPackageOneFeedbackSection({
  purchaseUrl = "#smpkg1-buy",
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const revealElements =
      section.querySelectorAll<HTMLElement>(
        ".smpkg1-feedback-reveal",
      );

    const showAll = () => {
      revealElements.forEach((element) => {
        element.classList.add("is-visible");
      });
    };

    if (!("IntersectionObserver" in window)) {
      showAll();
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
        rootMargin: "0px 0px -4% 0px",
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="smpkg1-feedback"
      id="smpkg1-feedback"
    >
      <div className="smpkg1-feedback-inner">

        {/* ================================================
            TOP CONTENT
            ================================================ */}

        <div className="smpkg1-feedback-top">

          {/* NUMBER CARD */}

          <div className="smpkg1-feedback-number-card smpkg1-feedback-reveal">
            <strong>100+</strong>

            <span>
              BẠN ĐÃ SỞ HỮU TÀI LIỆU NÀY
            </span>
          </div>

          {/* INTRO COPY */}

          <div className="smpkg1-feedback-copy smpkg1-feedback-reveal">
            <p>
              Đây không phải là một bộ template mình mới tổng
              hợp. Mà mình đã xây dựng, sử dụng và chỉnh sửa
              những tài liệu này trong quá trình làm Social
              Media thực tế, sau đó mới đóng gói lại để bạn có
              thể sử dụng cho những project của riêng mình.
            </p>

            <p>
              Và sau đây là một vài feedback mình nhận được:
            </p>
          </div>

        </div>

        {/* ================================================
            TESTIMONIAL BOARD
            ================================================ */}

        <div className="smpkg1-feedback-board">

          {feedbacks.map((feedback) => (
            <article
              key={feedback.id}
              className={`
                smpkg1-feedback-note
                smpkg1-feedback-note--${feedback.id}
                smpkg1-feedback-reveal
              `}
            >
              {/* PURPLE PIN */}

              <span
                className="smpkg1-feedback-pin"
                aria-hidden="true"
              />

              {/* CHAT MESSAGES */}

              <div className="smpkg1-feedback-messages">
                {feedback.messages.map(
                  (message, index) => (
                    <p key={index}>
                      {message}
                    </p>
                  ),
                )}
              </div>
            </article>
          ))}

        </div>

        {/* ================================================
            CTA
            ================================================ */}

        <div className="smpkg1-feedback-action smpkg1-feedback-reveal">
          <a
            href={purchaseUrl}
            className="smpkg1-feedback-button"
            data-cur="OPEN"
          >
            <span>
              Mình muốn sở hữu ngay tài liệu này
            </span>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m15 8 4 4-4 4" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}