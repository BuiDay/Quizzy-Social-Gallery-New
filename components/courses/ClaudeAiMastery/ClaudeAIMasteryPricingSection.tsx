"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
} from "react";

type ClaudeAIMasteryPricingSectionProps = {
  originalPrice?: string;
  currentPrice?: string;
  purchaseUrl?: string;
};

const benefits = [
  "20+ Tài liệu & Template",
  "Certificate",
  "Community 3,000+ thành viên",
  "Record khóa học 6 tháng",
  "Các tài nguyên thực hành đi kèm",
];

export function ClaudeAIMasteryPricingSection({
  originalPrice = "xxx.xxx.xxxđ",
  currentPrice = "xxx.xxx.xxxđ",
  purchaseUrl = "#claude-register",
}: ClaudeAIMasteryPricingSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items =
      section.querySelectorAll<HTMLElement>(
        ".claude-pricing-reveal",
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
        threshold: 0.15,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    items.forEach((item) =>
      observer.observe(item),
    );

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="claude-pricing"
      id="claude-register"
    >
      <div className="claude-pricing__inner">
        {/* KICKER */}

        <div className="claude-pricing__kicker claude-pricing-reveal">
          <i />
          <span>HỌC PHÍ &amp; ƯU ĐÃI</span>
        </div>

        {/* CARDS */}

        <div className="claude-pricing__grid">
          {/* LEFT */}

          <article
            className="claude-pricing-value claude-pricing-reveal"
            style={
              {
                "--pricing-delay": "0.08s",
              } as CSSProperties
            }
          >
            <div className="claude-pricing-value__top">
              <span>GIÁ GỐC</span>

              <strong>
                {originalPrice}
              </strong>
            </div>

            <div className="claude-pricing-value__line" />

            <span className="claude-pricing-value__bonus">
              <i>ϟ</i>
              BONUS
            </span>

            <ul>
              {benefits.map((item) => (
                <li key={item}>
                  <span
                    className="claude-pricing-value__check"
                    aria-hidden="true"
                  >
                    ✓
                  </span>

                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="claude-pricing-value__bottom">
              <span>TỔNG GIÁ TRỊ</span>

              <strong>
                {originalPrice}
              </strong>
            </div>
          </article>

          {/* RIGHT */}

          <article
            className="claude-pricing-offer claude-pricing-reveal"
            style={
              {
                "--pricing-delay": "0.17s",
              } as CSSProperties
            }
          >
            <span className="claude-pricing-offer__badge">
              ƯU ĐÃI ĐẾN 30%
            </span>

            <div className="claude-pricing-offer__label">
              GIÁ ƯU ĐÃI HIỆN TẠI
            </div>

            <div className="claude-pricing-offer__line" />

            <strong className="claude-pricing-offer__price">
              {currentPrice}
            </strong>

            <p className="claude-pricing-offer__note">
              *Áp dụng cho 100 bạn đăng ký nhanh nhất
            </p>

            <p className="claude-pricing-offer__update">
              <b>* Update thường xuyên:</b>{" "}
              Template hiện tại sẽ được mình tiếp tục cập nhật
              và bổ sung.
            </p>

            <a
              href={purchaseUrl}
              className="claude-pricing-offer__button"
              data-cur="OPEN"
            >
              <span>Bấm vào để mua ngay</span>
              <span aria-hidden="true">→</span>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}