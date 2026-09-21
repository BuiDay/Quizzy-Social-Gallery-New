"use client";

import Image, { type StaticImageData } from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type ClaudeAIMasterySolutionSectionProps = {
  productImage?: string | StaticImageData;
  curriculumUrl?: string;
};

const orbitItems = [
  {
    label: "Claude",
    className: "claude-solution-orbit__item--claude",
    icon: "",
  },
  {
    label: "Content",
    className: "claude-solution-orbit__item--content",
    icon: "",
  },
  {
    label: "Data",
    className: "claude-solution-orbit__item--data",
    icon: "",
  },
  {
    label: "Workflow",
    className: "claude-solution-orbit__item--workflow",
    icon: "",
  },
  {
    label: "Design",
    className: "claude-solution-orbit__item--design",
    icon: "",
  },
  {
    label: "Code",
    className: "claude-solution-orbit__item--code",
    icon: "",
  },
];

export function ClaudeAIMasterySolutionSection({
  productImage,
  curriculumUrl = "#claude-curriculum",
}: ClaudeAIMasterySolutionSectionProps) {
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
        threshold: 0.08,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`claude-solution ${
        isVisible ? "is-visible" : ""
      }`}
      id="claude-solution"
    >
      <div className="claude-solution__inner">

        {/* =====================================================
            TOP HEADING
            ===================================================== */}

        <div className="claude-solution__heading">
          <h2>
            TỰ ĐỘNG HÓA CÔNG VIỆC
            <br />

            SOCIAL MEDIA VỚI{" "}
            <span>
              CLAUDE AI
            </span>
          </h2>
        </div>

        {/* =====================================================
            INSIGHT BOX
            ===================================================== */}

        <div className="claude-solution-insight">
          <h3>
            VÀ ĐÂY LÀ LÚC MÌNH NHẬN RA:
          </h3>

          <p>
            Claude không thiếu khả năng. Vấn đề là Claude{" "}
            <strong>
              chưa được thiết lập để làm việc theo cách của mình.
            </strong>{" "}
            Claude chưa hiểu thương hiệu, khách hàng, cách Research,
            tiêu chuẩn Content hay những quy trình bạn luôn phải thực
            hiện trước khi gửi kết quả cho client.
          </p>

          <p>
            Đó là khoảng cách giữa việc “Chat với Claude” và thực sự
            “làm việc cùng Claude”. Và{" "}
            <strong>
              khóa học Claude AI Mastery được mình thiết kế để giải
              quyết vấn đề đó.
            </strong>
          </p>
        </div>

        {/* =====================================================
            DOWN ARROW
            ===================================================== */}

        <div
          className="claude-solution__down"
          aria-hidden="true"
        >
          ↓
        </div>

        {/* =====================================================
            COURSE TITLE
            ===================================================== */}

        <div className="claude-solution-course">
          <span className="claude-solution-course__label">
            KHÓA HỌC
          </span>

          <div className="claude-solution-course__title">
            <span
              className="claude-solution-course__star"
              aria-hidden="true"
            >
              ✱
            </span>

            <span className="claude-solution-course__pill">
              CLAUDE
            </span>

            <span className="claude-solution-course__pill">
              AI
            </span>

            <span className="claude-solution-course__pill">
              MASTERY
            </span>

            <a
              href={curriculumUrl}
              className="claude-solution-course__arrow"
              aria-label="Xem lộ trình Claude AI Mastery"
              data-cur="OPEN"
            >
              →
            </a>
          </div>

          <p className="claude-solution-course__description">
            Thay vì tiếp tục góp nhặt thêm Prompt, bạn sẽ học cách
            thiết lập một hệ thống làm việc với Claude, để Claude hiểu
            cách bạn làm việc và có thể tiếp tục được{" "}
            <strong>
              tối ưu theo workflow
            </strong>{" "}
            của riêng bạn.
          </p>
        </div>

        {/* =====================================================
            PRODUCT VISUAL
            ===================================================== */}

        <div className="claude-solution-visual">
          {/* ORBIT */}

          <div
            className="claude-solution-orbit"
            aria-hidden="true"
          >
            <span className="claude-solution-orbit__ring claude-solution-orbit__ring--1" />
            <span className="claude-solution-orbit__ring claude-solution-orbit__ring--2" />
            <span className="claude-solution-orbit__ring claude-solution-orbit__ring--3" />

            {orbitItems.map((item, index) => (
              <div
                key={item.label}
                className={`claude-solution-orbit__item ${item.className}`}
                style={
                  {
                    "--claude-orbit-delay": `${0.55 + index * 0.08}s`,
                  } as CSSProperties
                }
              >
                <span className="claude-solution-orbit__icon">
                  {item.icon}
                </span>

                <small>
                  {item.label}
                </small>
              </div>
            ))}
          </div>

          {/* CENTER PRODUCT */}

          <div className="claude-solution-product">
            {productImage ? (
              <Image
                src={productImage}
                alt="Claude AI Mastery"
                fill
                sizes="(max-width: 700px) 80vw, 600px"
                className="claude-solution-product__image"
              />
            ) : (
              <div className="claude-solution-product__fallback">
                {/* BACK PAPERS */}

                <div className="claude-solution-product__paper claude-solution-product__paper--left">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="claude-solution-product__paper claude-solution-product__paper--right">
                  <span />
                  <span />
                  <span />
                </div>

                {/* MONITOR */}

                <div className="claude-solution-product__monitor">
                  <div className="claude-solution-product__monitor-screen">
                    <small>
                      QUIZZY SOCIAL
                    </small>

                    <strong>
                      CLAUDE AI
                      <br />
                      MASTERY
                    </strong>

                    <span>
                      SOCIAL MEDIA WORKFLOW
                    </span>
                  </div>

                  <div className="claude-solution-product__monitor-stand" />
                </div>

                {/* PHONE */}

                <div className="claude-solution-product__phone">
                  <div />
                  <span />
                  <span />
                  <span />
                </div>

                {/* LAPTOP */}

                <div className="claude-solution-product__laptop">
                  <div>
                    <span />
                    <span />
                    <span />
                  </div>

                  <i />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}