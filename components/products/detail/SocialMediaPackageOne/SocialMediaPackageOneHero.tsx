import Image from "next/image";
import type { CSSProperties } from "react";

type SocialMediaPackageOneHeroProps = {
    productImageSrc?: string;
    purchaseUrl?: string;
};

const packageItems = [
    "Social Media Portfolio",
    "Social Media Strategy",
    "Social Media Plan",
];

const entrance = (delay: number): CSSProperties =>
({
    "--smpkg1-delay": `${delay}s`,
} as CSSProperties);

export function SocialMediaPackageOneHero({
    productImageSrc,
    purchaseUrl,
}: SocialMediaPackageOneHeroProps) {
    return (
        <section className="smpkg1-hero" id="social-media-package-one">
            <div className="smpkg1-hero-inner">
                {/* BREADCRUMB */}

                <div className="smpkg1-breadcrumb smpkg1-enter" style={entrance(0.05)}>
                    <span className="smpkg1-breadcrumb-dot" />

                    <span>TÀI LIỆU SỐ \ SOCIAL MEDIA PACKAGE 1</span>
                </div>

                {/* MAIN GRID */}

                <div className="smpkg1-hero-grid">
                    {/* LEFT */}

                    <div className="smpkg1-hero-left">
                        <h1 className="smpkg1-title">
                            <span
                                className="smpkg1-title-row smpkg1-title-row--social smpkg1-enter"
                                style={entrance(0.12)}
                            >
                                <span className="smpkg1-star" aria-hidden="true">
                                    ✱
                                </span>

                                <span className="smpkg1-title-pill">SOCIAL</span>
                            </span>

                            <span
                                className="smpkg1-title-row smpkg1-title-row--media smpkg1-enter"
                                style={entrance(0.22)}
                            >
                                <span className="smpkg1-title-pill">MEDIA</span>

                                <a
                                    href="#smpkg1-buy"
                                    className="smpkg1-title-arrow"
                                    aria-label="Xem thông tin mua Social Media Package 1"
                                    data-cur="OPEN"
                                >
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
                            </span>

                            <span
                                className="smpkg1-title-row smpkg1-enter"
                                style={entrance(0.32)}
                            >
                                <span className="smpkg1-title-pill smpkg1-title-pill--lime">
                                    PACKAGE 1
                                </span>
                            </span>
                        </h1>

                        {/* PACKAGE CONTENTS */}

                        <ul
                            className="smpkg1-package-list smpkg1-enter"
                            style={entrance(0.43)}
                        >
                            {packageItems.map((item) => (
                                <li key={item}>
                                    <span aria-hidden="true">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RIGHT */}

                    <div className="smpkg1-hero-right">
                        {/* PRODUCT MOCKUP */}

                        <div className="smpkg1-visual smpkg1-enter" style={entrance(0.22)}>
                            {productImageSrc ? (
                                <Image
                                    src={productImageSrc}
                                    alt="Social Media Package 1 gồm Portfolio, Strategy và Plan"
                                    fill
                                    priority
                                    sizes="(max-width: 820px) 90vw, 50vw"
                                    className="smpkg1-product-image"
                                />
                            ) : (
                                <div className="smpkg1-visual-placeholder">
                                    <span>SOCIAL MEDIA</span>
                                    <strong>PACKAGE 1</strong>
                                    <small>PRODUCT MOCKUP</small>
                                </div>
                            )}

                            {/* FLOATING TAGS */}

                            <span
                                className="smpkg1-tag smpkg1-tag--portfolio ftag"
                                data-d="14"
                            >
                                1. SOCIAL MEDIA PORTFOLIO
                            </span>

                            <span
                                className="smpkg1-tag smpkg1-tag--strategy ftag"
                                data-d="19"
                            >
                                2. SOCIAL MEDIA STRATEGY
                            </span>

                            <span
                                className="smpkg1-tag smpkg1-tag--plan ftag"
                                data-d="23"
                            >
                                3. SOCIAL MEDIA PLAN
                            </span>
                        </div>

                        {/* PRICE */}

                        <div
                            className="smpkg1-price-area smpkg1-enter"
                            id="smpkg1-buy"
                            style={entrance(0.43)}
                        >
                            <p className="smpkg1-price-label">SỞ HỮU TÀI LIỆU CHỈ VỚI</p>

                            <div className="smpkg1-price-row">
                                <strong>379.000đ</strong>
                                <del>899.000đ</del>
                            </div>

                            <a
                                href={purchaseUrl}
                                className="smpkg1-buy-button"
                                data-cur="OPEN"
                            >
                                <span>MUA NGAY</span>
                                <span className="smpkg1-buy-arrow" aria-hidden="true">
                                    →
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
            <div className="smbundle-marquee">

                <div className="smbundle-marquee-track">

                    {[...Array(8)].map((_, index) => (
                        <div
                            className="smbundle-marquee-item"
                            key={index}
                        >
                            <span>
                                SOCIAL MEDIA PACKAGE 1
                            </span>

                            <i aria-hidden="true">
                                ✦
                            </i>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}
