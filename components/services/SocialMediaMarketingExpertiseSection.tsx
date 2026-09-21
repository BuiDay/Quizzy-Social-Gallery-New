"use client";

import Image, { type StaticImageData } from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type ExpertiseItem = {
  number: string;
  shortLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  image?: string | StaticImageData;
};

type Props = {
  coachingImage?: string | StaticImageData;
  consultationImage?: string | StaticImageData;
  personalBrandingImage?: string | StaticImageData;
};

export function SocialMediaMarketingExpertiseSection({
  coachingImage,
  consultationImage,
  personalBrandingImage,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  const expertise: ExpertiseItem[] = [
    {
      number: "01",
      shortLabel: "COACHING",
      eyebrow: "COACHING",
      title: "COACHING SOCIAL MEDIA MARKETING",
      description:
        "Đồng hành cùng chủ doanh nghiệp để hiểu cách xây dựng và vận hành Social Media hiệu quả, thay vì phụ thuộc hoàn toàn vào team bên ngoài.",
      tags: [
        "1-on-1 Coaching",
        "Lộ trình cá nhân hóa",
        "Review & Feedback",
      ],
      image: coachingImage,
    },
    {
      number: "02",
      shortLabel: "CONSULTATION",
      eyebrow: "CONSULTATION",
      title: "TƯ VẤN CHIẾN LƯỢC SOCIAL MEDIA",
      description:
        "Phân tích hiện trạng, xác định hướng đi và xây dựng chiến lược Social Media phù hợp với mục tiêu kinh doanh và thương hiệu.",
      tags: [
        "Định hướng dài hạn",
        "“May đo” giải pháp",
        "Đồng hành cùng triển khai",
      ],
      image: consultationImage,
    },
    {
      number: "03",
      shortLabel: "PERSONAL BRANDING",
      eyebrow: "PERSONAL BRANDING",
      title: "TƯ VẤN XÂY DỰNG PERSONAL BRANDING",
      description:
        "Định hướng nội dung và chiến lược xây dựng thương hiệu cá nhân trên Social Media, từ định vị nhân hiệu đến thực thi triển khai.",
      tags: [
        "Khai phá thế mạnh",
        "Xây dựng dấu ấn",
        "Phát triển nhân hiệu",
      ],
      image: personalBrandingImage,
    },
  ];

  const activeItem = expertise[activeIndex];

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
        threshold: 0.14,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const changeTab = (index: number) => {
    if (index === activeIndex) return;

    setActiveIndex(index);
    setRenderKey((current) => current + 1);
  };

  return (
    <section
      ref={sectionRef}
      className={`smm-expertise ${
        isVisible ? "is-visible" : ""
      }`}
      id="smm-expertise"
    >
      <div className="smm-expertise-inner">
        {/* =========================================
            HEADER
            ========================================= */}

        <div className="smm-expertise-header">
          <div className="smm-expertise-heading">
            <span className="smm-expertise-kicker">
              <i />
              PILLARS OF EXPERTISE
            </span>

            <h2>
              NĂNG LỰC CỐT LÕI
              <span aria-hidden="true">✱</span>
            </h2>
          </div>

          {/* TABS */}

          <div
            className="smm-expertise-tabs"
            role="tablist"
            aria-label="Năng lực cốt lõi"
          >
            {expertise.map((item, index) => (
              <button
                key={item.number}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                className={`smm-expertise-tab ${
                  activeIndex === index
                    ? "is-active"
                    : ""
                }`}
                onClick={() => changeTab(index)}
                data-cur="OPEN"
              >
                <strong>{item.number}</strong>
                <span>{item.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* =========================================
            ACTIVE CARD
            ========================================= */}

        <article
          key={renderKey}
          className="smm-expertise-card"
        >
          {/* LEFT */}

          <div className="smm-expertise-content">
            <div className="smm-expertise-meta">
              <strong>{activeItem.number}</strong>

              <span>/ {activeItem.eyebrow}</span>
            </div>

            <h3>{activeItem.title}</h3>

            <p className="smm-expertise-description">
              {activeItem.description}
            </p>

            <div className="smm-expertise-tags">
              {activeItem.tags.map((tag, index) => (
                <span
                  key={tag}
                  style={
                    {
                      "--smm-tag-delay": `${
                        0.18 + index * 0.07
                      }s`,
                    } as CSSProperties
                  }
                >
                  <i>✓</i>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT */}

          <div className="smm-expertise-visual">
            {activeItem.image ? (
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                sizes="(max-width: 760px) 90vw, 45vw"
                className="smm-expertise-image"
              />
            ) : (
              <div className="smm-expertise-placeholder">
                <span>
                  {activeItem.eyebrow}
                </span>

                <strong>
                  SOCIAL MEDIA
                  <br />
                  MARKETING
                </strong>
              </div>
            )}
          </div>
        </article>

        {/* =========================================
            MOBILE DOTS
            ========================================= */}

        <div className="smm-expertise-mobile-dots">
          {expertise.map((item, index) => (
            <button
              type="button"
              key={item.number}
              className={
                activeIndex === index
                  ? "is-active"
                  : ""
              }
              onClick={() => changeTab(index)}
              aria-label={`Xem ${item.shortLabel}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}