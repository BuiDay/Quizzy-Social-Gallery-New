
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type SocialMediaBundleFinalOfferProps = {
    productImageSrc?: string;
    purchaseUrl?: string;
};

export function SocialMediaBundleFinalOfferSection({
    productImageSrc,
    purchaseUrl,
}: SocialMediaBundleFinalOfferProps) {
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
            id="bundle-final-offer"
            className={`smbundle-final-offer ${isVisible ? "is-visible" : ""
                }`}
        >
            <div className="smbundle-final-offer-inner">
                {/* =====================================================
            HEADING
            ===================================================== */}

                <div className="smbundle-final-offer-heading">
                    <span className="smbundle-final-offer-eyebrow">
                        FULL WORKFLOW LÀM VIỆC VỚI CLIENT
                    </span>

                    <h2>
                        TẤT CẢ GÓM LẠI TRONG
                        <br />
                        <span className="smbundle-final-offer-highlight">
                            MỘT BUNDLE DUY NHẤT
                        </span>
                    </h2>
                </div>

                {/* =====================================================
            PURCHASE CARD
            ===================================================== */}

                <div className="smbundle-final-offer-card">
                    {/* LEFT — PRODUCT IMAGE */}

                    <div className="smbundle-final-offer-visual">
                        {productImageSrc ? (
                            <Image
                                src={productImageSrc}
                                alt="Social Media Bundle gồm bộ tài liệu và template"
                                fill
                                sizes="(max-width: 760px) 90vw, 46vw"
                                className="smbundle-final-offer-image"
                            />
                        ) : (
                            <div className="smbundle-final-offer-placeholder">
                                <span>SOCIAL MEDIA</span>
                                <strong>BUNDLES</strong>
                                <small>PRODUCT IMAGE</small>
                            </div>
                        )}
                    </div>

                    {/* RIGHT — PRICE & CTA */}

                    <div className="smbundle-final-offer-info">
                        <p className="smbundle-final-offer-price-label">
                            SỞ HỮU TÀI LIỆU VỚI GIÁ CHỈ
                        </p>

                        <div className="smbundle-final-offer-divider" />

                        <div className="smbundle-final-offer-price">
                            <strong>599.000đ</strong>
                            <del>1.299.000đ</del>
                        </div>

                        <p className="smbundle-final-offer-note">
                            *Áp dụng giảm 30% cho 100 bạn đăng ký nhanh nhất
                        </p>

                        <p className="smbundle-final-offer-update">
                            * Update thường xuyên: Template hiện tại sẽ được
                            mình tiếp tục cập nhật và bổ sung.
                        </p>


                        <a
                            data-cur="OPEN"
                            className="smbundle-final-offer-button"
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