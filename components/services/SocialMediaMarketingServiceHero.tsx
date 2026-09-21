import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

type SocialMediaMarketingServiceHeroProps = {
    imageSrc?: string | StaticImageData;
    contactUrl?: string;
};

const enterStyle = (delay: number): CSSProperties =>
    ({
        "--smm-service-delay": `${delay}s`,
    }) as CSSProperties;


const heroStats = [
    {
        value: "5+",
        label:
            "Năm kinh nghiệm Social Media Marketing & Personal Branding.",
        lime: true,
    },
    {
        value: "230K+",
        label:
            "Followers trên các nền tảng mạng xã hội.",
    },
    {
        value: "20+",
        label:
            "Dự án và thương hiệu đã hợp tác, đồng hành.",
    },
    {
        value: "200tr–2 tỷ",
        label:
            "Doanh thu từ các dự án đã triển khai thành công.",
    },
];

export function SocialMediaMarketingServiceHero({
    imageSrc,
    contactUrl = "#contact",
}: SocialMediaMarketingServiceHeroProps) {
    return (
        <section
            className="smm-service-hero"
            id="social-media-marketing-service"
        >
            <div className="smm-service-hero__inner">
                {/* =========================================
            LEFT CONTENT
            ========================================= */}

                <div className="smm-service-hero__content">
                    <h1 className="smm-service-hero__title">
                        {/* ROW 01 */}

                        <span
                            className="smm-service-hero__row smm-service-enter"
                            style={enterStyle(0.05)}
                        >
                            <span>GIẢI PHÁP</span>

                            <span
                                className="smm-service-hero__star"
                                aria-hidden="true"
                            >
                                ✱
                            </span>
                        </span>

                        {/* ROW 02 */}

                        <span
                            className="smm-service-hero__row smm-service-enter"
                            style={enterStyle(0.14)}
                        >
                            <span className="smm-service-hero__lime">
                                SOCIAL MEDIA
                            </span>
                        </span>

                        {/* ROW 03 */}

                        <span
                            className="smm-service-hero__row smm-service-enter"
                            style={enterStyle(0.23)}
                        >
                            <span className="smm-service-hero__lime">
                                MARKETING
                            </span>
                        </span>

                        {/* ROW 04 */}

                        <span
                            className="smm-service-hero__row smm-service-enter"
                            style={enterStyle(0.32)}
                        >
                            <span
                                className="smm-service-hero__purple-arrow"
                                aria-hidden="true"
                            >
                                →
                            </span>

                            <span className="smm-service-hero__outline">
                                TOÀN DIỆN
                            </span>
                        </span>

                        {/* ROW 05 */}

                        <span
                            className="smm-service-hero__row smm-service-enter"
                            style={enterStyle(0.41)}
                        >
                            <span>CHO DOANH NGHIỆP</span>
                        </span>
                    </h1>

                    {/* =========================================
              DESCRIPTION
              ========================================= */}

                    <p
                        className="smm-service-hero__description smm-service-enter"
                        style={enterStyle(0.5)}
                    >
                        Từ Coaching, tư vấn chiến lược đến triển khai{" "}
                        <strong>Social Media Marketing</strong>, Quizzy đồng hành
                        cùng doanh nghiệp và cá nhân muốn xây dựng thương hiệu
                        trên Social Media bài bản hơn.
                    </p>

                    {/* =========================================
              CTA
              ========================================= */}

                    <a
                        href={contactUrl}
                        className="smm-service-hero__button smm-service-enter"
                        style={enterStyle(0.58)}
                        data-cur="OPEN"
                    >
                        <span>Liên hệ làm việc</span>

                        <span
                            className="smm-service-hero__button-arrow"
                            aria-hidden="true"
                        >
                            ↗
                        </span>
                    </a>
                </div>

                {/* =========================================
            RIGHT VISUAL
            ========================================= */}

                <div
                    className="smm-service-hero__visual-wrap smm-service-enter"
                    style={enterStyle(0.25)}
                >
                    <div className="smm-service-hero__visual">
                        {imageSrc ? (
                            <Image
                                src={imageSrc}
                                alt="Dịch vụ Social Media Marketing"
                                fill
                                priority
                                sizes="(max-width: 760px) 90vw, 45vw"
                                className="smm-service-hero__image"
                            />
                        ) : (
                            <div className="smm-service-hero__placeholder">
                                <div className="smm-service-hero__cloud" />

                                <div className="smm-service-hero__hill smm-service-hero__hill--back" />

                                <div className="smm-service-hero__hill smm-service-hero__hill--front" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="smm-service-hero__stats">
                <div className="smm-service-hero__stats-inner">
                    {heroStats.map((stat, index) => (
                        <div
                            className="smm-service-hero__stat smm-service-enter"
                            style={enterStyle(0.62 + index * 0.08)}
                            key={stat.value}
                        >
                            <strong
                                className={
                                    stat.lime
                                        ? "smm-service-hero__stat-value smm-service-hero__stat-value--lime"
                                        : "smm-service-hero__stat-value"
                                }
                            >
                                {stat.value}
                            </strong>

                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}