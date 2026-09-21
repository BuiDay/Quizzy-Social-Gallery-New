"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type DesignThinkingFinalOfferSectionProps = {
  productImageSrc?: string;
  purchaseUrl?: string;
};

export function DesignThinkingFinalOfferSection({
  productImageSrc,
  purchaseUrl,
}: DesignThinkingFinalOfferSectionProps) {
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
        rootMargin: "0px 0px -5% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`dth-final ${
        isVisible ? "is-visible" : ""
      }`}
      id="design-thinking-final-offer"
    >
      <div className="dth-final-inner">

        {/* =========================================
            HEADING
            ========================================= */}

        <div className="dth-final-heading">
          <h2>
            NẾU BẠN MUỐN LÀM{" "}
            <span className="dth-final-outline">
              SOCIAL MEDIA
            </span>
            <br />

            TỐT HƠN, ĐÂY LÀ MỘT TRONG NHỮNG
            <br />

            <span className="dth-final-lime">
              KỸ NĂNG RẤT ĐÁNG ĐỂ CÓ.
            </span>
          </h2>
        </div>

        {/* =========================================
            OFFER CARD
            ========================================= */}

        <div className="dth-final-card">

          {/* LEFT — PRODUCT MOCKUP */}

          <div className="dth-final-visual">
            {productImageSrc ? (
              <Image
                src={productImageSrc}
                alt="Tài liệu Tư duy Thiết kế dành cho Social Media Marketing"
                fill
                sizes="(max-width: 760px) 90vw, 48vw"
                className="dth-final-image"
              />
            ) : (
              <div className="dth-final-placeholder">
                <span>TÀI LIỆU</span>

                <strong>
                  TƯ DUY
                  <br />
                  THIẾT KẾ
                </strong>

                <small>
                  SOCIAL MEDIA DESIGN
                </small>
              </div>
            )}
          </div>

          {/* RIGHT — PRICE */}

          <div className="dth-final-info">
            <p className="dth-final-price-label">
              SỞ HỮU TÀI LIỆU VỚI GIÁ CHỈ
            </p>

            <div className="dth-final-divider" />

            <div className="dth-final-price">
              <strong>339.000đ</strong>

              <del>399.000đ</del>
            </div>

            <p className="dth-final-note">
              *Áp dụng giảm 30% cho 100 bạn đăng ký nhanh nhất
            </p>

            <p className="dth-final-update">
              * Update thường xuyên: Template hiện tại sẽ được mình
              tiếp tục cập nhật và bổ sung.
            </p>

            {purchaseUrl ? (
              <a
                href={purchaseUrl}
                className="dth-final-button"
                data-cur="OPEN"
              >
                <span>Bấm vào để mua ngay</span>

                <span
                  className="dth-final-button__arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            ) : (
              <button
                type="button"
                className="dth-final-button"
                disabled
              >
                <span>Bấm vào để mua ngay</span>

                <span
                  className="dth-final-button__arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}