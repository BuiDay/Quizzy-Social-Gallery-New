
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  productImageSrc?: string;
  purchaseUrl?: string;
};

export function SocialMediaPackageOneFinalOfferSection({
  productImageSrc,
  purchaseUrl = "#smpkg1-buy",
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
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`smpkg1-final ${
        isVisible ? "is-visible" : ""
      }`}
      id="smpkg1-final-offer"
    >
      <div className="smpkg1-final-inner">
        {/* HEADING */}

        <div className="smpkg1-final-heading">
          <span
            className="smpkg1-final-down"
            aria-hidden="true"
          >
            ↓
          </span>

          <div className="smpkg1-final-heading-row">
            <span
              className="smpkg1-final-star"
              aria-hidden="true"
            >
              ✳
            </span>

            <h2>
              OKAY, ĐÃ TỚI LÚC BẠN
              <br />
              BẮT TAY VÀO LÀM RỒI 👀
            </h2>
          </div>

          <p>
            Tài liệu đã được set up sẵn, bạn chỉ cần tự tin
            sử dụng để làm việc và
            <br className="smpkg1-final-desktop-break" />
            chinh phục thêm nhiều khách hàng khác nhau nha!
          </p>
        </div>

        {/* PURCHASE CARD */}

        <div className="smpkg1-final-card">
          {/* LEFT — PRODUCT IMAGE */}

          <div className="smpkg1-final-visual">
            {productImageSrc ? (
              <Image
                src={productImageSrc}
                alt="Social Media Package 01 gồm Portfolio, Strategy và Plan"
                fill
                sizes="(max-width: 760px) 90vw, 46vw"
                className="smpkg1-final-product-image"
              />
            ) : (
              <div className="smpkg1-final-placeholder">
                <span>SOCIAL MEDIA</span>
                <strong>PACKAGE 01</strong>
              </div>
            )}
          </div>

          {/* RIGHT — PRICE */}

          <div className="smpkg1-final-info">
            <p className="smpkg1-final-price-label">
              SỞ HỮU TÀI LIỆU VỚI GIÁ CHỈ
            </p>

            <div className="smpkg1-final-divider" />

            <div className="smpkg1-final-price">
              <strong>379.000đ</strong>
              <del>899.000đ</del>
            </div>

            <p className="smpkg1-final-note">
              *Áp dụng giảm 30% cho 100 bạn đăng ký nhanh nhất
            </p>

            <p className="smpkg1-final-update">
              * Update thường xuyên: Template hiện tại sẽ được
              mình tiếp tục cập nhật và bổ sung.
            </p>

            <a
              href={purchaseUrl}
              className="smpkg1-final-button"
              data-cur="OPEN"
            >
              <span>Bấm vào để mua ngay</span>

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
      </div>
    </section>
  );
}