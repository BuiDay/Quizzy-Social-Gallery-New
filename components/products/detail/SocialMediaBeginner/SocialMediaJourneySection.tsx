"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Image1 from "@/assets/images/Social Media Beginner/1 (1).jpg";
import Image2 from "@/assets/images/Social Media Beginner/1 (2).jpg";
import Image3 from "@/assets/images/Social Media Beginner/1 (3).jpg";
import Image4 from "@/assets/images/Social Media Beginner/1 (4).jpg";
import Image5 from "@/assets/images/Social Media Beginner/1 (5).jpg";
const slides = [
    Image1,
    Image2,
    Image3, Image4, Image5
];

const opportunities = [
    {
        id: "agency",
        title: (
            <>
                LÀM AGENCY
                <br />
                / CLIENT
            </>
        ),
        description:
            "Có cơ hội làm tại Zing News và xây dựng agency, đồng hành cùng nhiều big client như Pandora.",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <rect x="4" y="6" width="16" height="13" rx="1.5" />
                <path d="M9 6V4.5h6V6" />
                <path d="M8 9v7M16 9v7" />
            </svg>
        ),
        tone: "lime",
    },
    {
        id: "freelance",
        title: (
            <>
                SIDE JOB/
                <br />
                FREELANCE
            </>
        ),
        description:
            "Kiếm 100 triệu từ những dự án tư vấn và làm nội dung cho thương hiệu ngay khi còn là sinh viên.",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <path d="M7 7.5h10a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-1l-3 2v-2H7a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3Z" />
                <circle cx="9" cy="12.5" r=".8" fill="currentColor" />
                <circle cx="12" cy="12.5" r=".8" fill="currentColor" />
                <circle cx="15" cy="12.5" r=".8" fill="currentColor" />
            </svg>
        ),
        tone: "pink",
    },
    {
        id: "personal",
        title: (
            <>
                THƯƠNG HIỆU
                <br />
                CÁ NHÂN
            </>
        ),
        description:
            "Xây dựng kênh riêng và từng bước tạo ra nguồn thu nhập thụ động.",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5.5 20c.5-4 2.7-6 6.5-6s6 2 6.5 6" />
            </svg>
        ),
        tone: "pink",
    },
    {
        id: "global",
        title: (
            <>
                LÀM VIỆC
                <br />
                TOÀN CẦU
            </>
        ),
        description:
            "Tự tin làm việc cùng nhiều thương hiệu trong và ngoài nước, từ Đông Nam Á đến Úc, Mỹ và Canada.",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <circle cx="12" cy="12" r="8" />
                <path d="M4 12h16" />
                <path d="M12 4c2.1 2.2 3.1 4.8 3.1 8s-1 5.8-3.1 8" />
                <path d="M12 4c-2.1 2.2-3.1 4.8-3.1 8s1 5.8 3.1 8" />
            </svg>
        ),
        tone: "blue",
    },
];

export function SocialMediaJourneySection() {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveSlide((current) =>
                current === slides.length - 1 ? 0 : current + 1,
            );
        }, 5000);

        return () => window.clearInterval(timer);
    }, []);

    return (
        <section className="smb-journey">
            <div
                className="wrap smb-journey-shell"
                data-rv="up"
            >
                {/* =====================================================
            LEFT
            ===================================================== */}

                <div className="smb-journey-content">
                    <h2 className="smb-journey-title">
                        TỪ MỘT SOCIAL MEDIA NEWBIE,
                        <br />
                        MÌNH ĐÃ MỞ RA NHIỀU CƠ HỘI HƠN
                        MÌNH TỪNG NGHĨ:
                    </h2>

                    <div className="smb-journey-cards">
                        {opportunities.map((item) => (
                            <article
                                className="smb-journey-card"
                                key={item.id}
                            >
                                <div
                                    className={`smb-journey-icon smb-journey-icon--${item.tone}`}
                                >
                                    {item.icon}
                                </div>

                                <h3>
                                    {item.title}
                                </h3>

                                <p>
                                    {item.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>

                {/* =====================================================
            RIGHT IMAGE SLIDER
            ===================================================== */}

                <div className="smb-journey-gallery">
                    <div className="smb-journey-slides">
                        {slides.map((src, index) => (
                            <Image
                                key={index}
                                src={src}
                                alt={`Social Media journey ${index + 1}`}
                                className={`smb-journey-image ${activeSlide === index
                                        ? "is-active"
                                        : ""
                                    }`}
                            />
                        ))}
                    </div>

                    {/* dots */}

                    <div className="smb-journey-dots">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`smb-journey-dot ${activeSlide === index
                                        ? "is-active"
                                        : ""
                                    }`}
                                aria-label={`Xem ảnh ${index + 1}`}
                                onClick={() =>
                                    setActiveSlide(index)
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}