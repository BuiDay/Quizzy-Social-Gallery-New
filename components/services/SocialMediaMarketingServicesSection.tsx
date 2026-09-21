"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type ServiceItem = {
  number: string;
  title: string;
  description: string;
  scope: string[];
  featured?: boolean;
};

const services: ServiceItem[] = [
  {
    number: "01",
    title: "SOCIAL MEDIA & PERSONAL BRANDING COACHING",
    description:
      "Dành cho chủ doanh nghiệp và cá nhân muốn tự xây dựng Social Media.",
    scope: [
      "Đồng hành 1:1 trong suốt quá trình Coaching",
      "Góp ý trực tiếp nội dung & kịch bản",
      "Tối ưu quy trình sản xuất nội bộ",
      "Xây dựng phong cách & tiếng nói thương hiệu",
    ],
  },
  {
    number: "02",
    title: "SOCIAL MEDIA STRATEGY CONSULTING",
    description:
      "Dành cho doanh nghiệp đã có team nhưng cần một góc nhìn chiến lược.",
    scope: [
      "Audit toàn diện các kênh Social Media",
      "Bộ khung Content Pillars & Key Messages",
      "Channel Strategy & Phân bổ ngân sách",
      "Action Plan 3 - 6 tháng kèm chỉ số đo lường",
    ],
  },
  {
    number: "03",
    title: "TRIỂN KHAI SOCIAL MEDIA MARKETING TOÀN DIỆN",
    description:
      "QCC Mastery Social Agency là đội ngũ chuyên nghiệp phụ trách triển khai Social Media Marketing từ chiến lược đến thực thi.",
    scope: [
      "Đội ngũ Content, editor & Designer trực tiếp phụ trách",
      "Sản xuất ấn phẩm Visual, Video ngắn & Carousel",
      "Vận hành & tối ưu lịch đăng bài",
      "Báo cáo hiệu quả & phân tích chỉ số định kỳ",
    ],
    featured: true,
  },
];

type Props = {
  contactUrl?: string;
};

export function SocialMediaMarketingServicesSection({
  contactUrl = "#contact",
}: Props) {
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
        threshold: 0.12,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`smm-services ${
        isVisible ? "is-visible" : ""
      }`}
      id="smm-services"
    >
      <div className="smm-services-inner">
        {/* =========================================
            KICKER
            ========================================= */}

        <div className="smm-services-kicker">
          <i />
          <span>DỊCH VỤ SOCIAL MEDIA</span>
        </div>

        {/* =========================================
            CARDS
            ========================================= */}

        <div className="smm-services-grid">
          {services.map((service, index) => (
            <article
              key={service.number}
              className={`smm-service-card ${
                service.featured
                  ? "smm-service-card--featured"
                  : ""
              }`}
              style={
                {
                  "--smm-service-card-delay": `${
                    0.1 + index * 0.12
                  }s`,
                } as CSSProperties
              }
            >
              {/* TOP */}

              <div className="smm-service-card__top">
                <span className="smm-service-card__number">
                  {service.number}
                </span>

                <a
                  href={contactUrl}
                  className="smm-service-card__arrow"
                  aria-label={`Liên hệ về ${service.title}`}
                  data-cur="OPEN"
                >
                  ↗
                </a>
              </div>

              {/* CONTENT */}

              <div className="smm-service-card__content">
                <h3>{service.title}</h3>

                <p>{service.description}</p>
              </div>

              {/* SCOPE */}

              <div className="smm-service-card__scope">
                <h4>
                  <span aria-hidden="true">✦</span>
                  Scope of Partnership
                </h4>

                <ul>
                  {service.scope.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">●</span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}

              <div className="smm-service-card__footer">
                <a
                  href={contactUrl}
                  className="smm-service-card__button"
                  data-cur="OPEN"
                >
                  <span>Liên hệ làm việc</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}