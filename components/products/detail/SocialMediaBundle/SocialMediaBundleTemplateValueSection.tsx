
"use client";

import { useEffect, useRef, useState } from "react";

const valueCards = [
  {
    title: "MỤC ĐÍCH",
    description:
      "Biết template này hỗ trợ gì và nằm ở đâu trong quy trình làm việc.",
  },
  {
    title: "CÁCH SỬ DỤNG",
    description:
      "Hiểu cách dùng đúng template, đúng thời điểm để không phải làm lại từ đầu.",
  },
  {
    title: "ỨNG DỤNG THỰC TẾ",
    description:
      "Dễ dàng điều chỉnh theo từng client, ngành hàng và project.",
  },
];

export function SocialMediaBundleTemplateValueSection() {
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
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`smbundle-template-value ${
        isVisible ? "is-visible" : ""
      }`}
      id="bundle-template-value"
    >
      <div className="smbundle-template-value-inner">
        <div className="smbundle-template-value-panel">
          {/* TOP CONTENT */}

          <div className="smbundle-template-value-top">
            <h2 className="smbundle-template-value-heading">
              ĐÂY KHÔNG CHỈ
              <br />
              LÀ TEMPLATE
            </h2>

            <p className="smbundle-template-value-description">
              Trong bundle có hướng dẫn và diễn giải để bạn hiểu
              cách dùng, thay vì phải đoán. Bạn có thể tái sử
              dụng cho nhiều khách hàng và dự án khác nhau.
            </p>
          </div>

          {/* THREE VALUE CARDS */}

          <div className="smbundle-template-value-grid">
            {valueCards.map((card, index) => (
              <article
                className="smbundle-template-value-card"
                key={card.title}
                style={
                  {
                    "--card-delay": `${0.18 + index * 0.1}s`,
                  } as React.CSSProperties
                }
              >
                <h3>{card.title}</h3>

                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}