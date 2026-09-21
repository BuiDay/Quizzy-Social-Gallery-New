
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  productImageSrc?: string;
  purchaseUrl?: string;
};

export function SocialMediaPackageTwoFinalOfferSection({
  productImageSrc,
  purchaseUrl,
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
        rootMargin: "0px 0px -5% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`smpkg2-final ${isVisible ? "is-visible" : ""}`}
      id="smpkg2-final-offer"
    >
      <div className="smpkg2-final-inner">

        {/* HEADING */}

        <div className="smpkg2-final-heading">
          <h2>
            Đừng đợi đến lúc cần
            <br />

            mới bắt đầu làm từ{" "}
            <span className="smpkg2-final-highlight">
              con số 0!
            </span>
          </h2>

          <p>
            Nếu bạn đã bắt đầu làm Social Media nghiêm túc,
            <br className="smpkg2-final-desktop-break" />

            thì chắc chắn bạn sẽ cần 3 file này sớm thôi.
            Nhưng mọi thứ bạn cần để bắt đầu làm việc
            <br className="smpkg2-final-desktop-break" />

            với client bài bản hơn đã được gom sẵn trong
            một package.
          </p>
        </div>

        {/* PURCHASE CARD */}

        <div className="smpkg2-final-card">

          {/* PRODUCT MOCKUP */}

          <div className="smpkg2-final-visual">
            {productImageSrc ? (
              <Image
                src={productImageSrc}
                alt="Social Media Package 02 gồm Proposal, Audit và Monthly Report"
                fill
                sizes="(max-width: 760px) 90vw, 46vw"
                className="smpkg2-final-product-image"
              />
            ) : (
              <div className="smpkg2-final-placeholder">
                <span>SOCIAL MEDIA</span>
                <strong>PACKAGE 02</strong>
                <small>
                  PROPOSAL · AUDIT · MONTHLY REPORT
                </small>
              </div>
            )}
          </div>

          {/* PRICE & CTA */}

          <div className="smpkg2-final-info">
            <p className="smpkg2-final-price-label">
              SỞ HỮU TÀI LIỆU VỚI GIÁ CHỈ
            </p>

            <div className="smpkg2-final-divider" />

            <div className="smpkg2-final-price">
              <strong>259.000đ</strong>
              <del>599.000đ</del>
            </div>

            <p className="smpkg2-final-note">
              *Áp dụng ưu đãi cho 100 bạn đăng ký nhanh nhất
            </p>

            <p className="smpkg2-final-update">
              * Update thường xuyên: Template hiện tại sẽ
              được mình tiếp tục cập nhật và bổ sung.
            </p>

            {purchaseUrl ? (
              <a
                href={purchaseUrl}
                className="smpkg2-final-button"
                data-cur="OPEN"
              >
                <span>Bấm vào để mua ngay</span>

                <span
                  className="smpkg2-final-button-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            ) : (
              <button
                type="button"
                className="smpkg2-final-button"
                disabled
                title="Chưa có liên kết thanh toán"
              >
                <span>Bấm vào để mua ngay</span>

                <span
                  className="smpkg2-final-button-arrow"
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