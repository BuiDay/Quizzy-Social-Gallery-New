"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  contactUrl?: string;
};

export function SocialMediaMarketingFinalCTASection({
  contactUrl = "#contact",
}: Props) {
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
          if (!entry.isIntersecting)
            return;

          setIsVisible(true);
          observer.disconnect();
        },
        {
          threshold: 0.22,
          rootMargin:
            "0px 0px -5% 0px",
        },
      );

    observer.observe(section);

    return () =>
      observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`smm-final-cta ${
        isVisible
          ? "is-visible"
          : ""
      }`}
      id="contact"
    >
      <div className="smm-final-cta__inner">

        {/* =====================================
            HEADLINE
            ===================================== */}

        <h2 className="smm-final-cta__title">
          <span className="smm-final-cta__line">
            <span className="smm-final-cta__outline">
              CHỦ THƯƠNG HIỆU/ CÁ NHÂN
            </span>{" "}
            ĐANG TÌM
          </span>

          <span className="smm-final-cta__line">
            MỘT HƯỚNG ĐI RÕ RÀNG TRÊN
          </span>

          <span className="smm-final-cta__line">
            <span className="smm-final-cta__lime">
              SOCIAL MEDIA?
            </span>
          </span>
        </h2>

        {/* =====================================
            DESCRIPTION
            ===================================== */}

        <p className="smm-final-cta__description">
          Dù các Anh/Chị cần một người đồng hành,
          một chiến lược rõ ràng hay một đội ngũ trực
          tiếp triển khai, Quizzy tin rằng mình sẽ cùng
          Anh/Chị tìm ra hướng đi phù hợp nhất.
        </p>

        {/* =====================================
            CTA
            ===================================== */}

        <a
          href={contactUrl}
          className="smm-final-cta__button"
          data-cur="OPEN"
        >
          <span>
            Liên hệ làm việc
          </span>

          <span
            className="smm-final-cta__arrow"
            aria-hidden="true"
          >
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}