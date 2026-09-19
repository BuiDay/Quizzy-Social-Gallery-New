
"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   DOCUMENT WALL DATA
   ============================================================ */

type DocumentCard = {
    filename: string;
    title: string;
    type: "proposal" | "pricing" | "report" | "audit" | "calendar";
};

const leftDocuments: DocumentCard[] = [
    {
        filename: "proposal_01.pdf",
        title: "Client · F&B Brand",
        type: "proposal",
    },
    {
        filename: "pricing.pdf",
        title: "Bảng giá hạng mục",
        type: "pricing",
    },
    {
        filename: "report_q2.pdf",
        title: "Monthly Report",
        type: "report",
    },
    {
        filename: "proposal_04.pdf",
        title: "Client · Beauty",
        type: "proposal",
    },
];

const rightDocuments: DocumentCard[] = [
    {
        filename: "content_plan.pdf",
        title: "Content Calendar",
        type: "calendar",
    },
    {
        filename: "proposal_03.pdf",
        title: "Client · Agency",
        type: "proposal",
    },
    {
        filename: "audit_ig.pdf",
        title: "Audit · Instagram",
        type: "audit",
    },
    {
        filename: "monthly_report.pdf",
        title: "Social Media Report",
        type: "report",
    },
];

const workflow = [
    "Báo giá dịch vụ",
    "Phân tích kênh thương hiệu",
    "Pitching định hướng",
    "Lập kế hoạch và triển khai",
    "Tối ưu chiến lược",
];

/* ============================================================
   DOCUMENT MOCKUP
   ============================================================ */

function DocumentMockup({
    document,
}: {
    document: DocumentCard;
}) {
    return (
        <div className="smpkg2-exp-doc">
            <div className="smpkg2-exp-doc__bar">
                <span />
                <span />
                <span />

                <small>{document.filename}</small>
            </div>

            <div className="smpkg2-exp-doc__body">
                <strong className="smpkg2-exp-doc__title">
                    {document.title}
                </strong>

                {document.type === "proposal" && (
                    <>
                        <div className="smpkg2-exp-doc__lines">
                            <i />
                            <i />
                            <i />
                        </div>

                        <div className="smpkg2-exp-doc__highlight" />

                        <div className="smpkg2-exp-doc__lines smpkg2-exp-doc__lines--bottom">
                            <i />
                            <i />
                        </div>
                    </>
                )}

                {document.type === "pricing" && (
                    <div className="smpkg2-exp-doc__pricing">
                        {Array.from({ length: 8 }, (_, index) => (
                            <span key={index} />
                        ))}
                    </div>
                )}

                {document.type === "report" && (
                    <>
                        <svg
                            className="smpkg2-exp-doc__chart"
                            viewBox="0 0 160 65"
                            preserveAspectRatio="none"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M2 58L30 40L55 45L82 22L108 29L158 7"
                                stroke="#A97FDD"
                                strokeWidth="2.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <div className="smpkg2-exp-doc__pricing smpkg2-exp-doc__pricing--report">
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                    </>
                )}

                {(document.type === "audit" ||
                    document.type === "calendar") && (
                        <>
                            <div className="smpkg2-exp-doc__calendar">
                                {Array.from({ length: 9 }, (_, index) => (
                                    <span key={index} />
                                ))}
                            </div>

                            <div className="smpkg2-exp-doc__lines">
                                <i />
                                <i />
                            </div>
                        </>
                    )}
            </div>
        </div>
    );
}

/* ============================================================
   INFINITE VERTICAL DOCUMENT COLUMN
   ============================================================ */

function DocumentColumn({
    documents,
    direction,
}: {
    documents: DocumentCard[];
    direction: "up" | "down";
}) {
    return (
        <div
            className={`smpkg2-exp-wall__column smpkg2-exp-wall__column--${direction}`}
            aria-hidden="true"
        >
            <div className="smpkg2-exp-wall__track">
                {Array.from({ length: 2 }, (_, groupIndex) => (
                    <div
                        className="smpkg2-exp-wall__group"
                        key={groupIndex}
                    >
                        {documents.map((document, index) => (
                            <DocumentMockup
                                key={`${groupIndex}-${index}`}
                                document={document}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ============================================================
   EXPERIENCE SECTION
   ============================================================ */

export function SocialMediaPackageTwoExperienceSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [clientCount, setClientCount] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const animatedElements =
            section.querySelectorAll<HTMLElement>(
                ".smpkg2-exp-reveal",
            );

        const counterTarget =
            section.querySelector<HTMLElement>(
                ".smpkg2-exp-counter",
            );

        let counterStarted = false;
        let counterFrame = 0;

        const startCounter = () => {
            if (counterStarted) return;

            counterStarted = true;

            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (reducedMotion) {
                setClientCount(50);
                return;
            }

            const duration = 1400;
            const startTime = performance.now();

            const animateCounter = (now: number) => {
                const progress = Math.min(
                    (now - startTime) / duration,
                    1,
                );

                const eased = 1 - Math.pow(1 - progress, 3);

                setClientCount(Math.round(eased * 50));

                if (progress < 1) {
                    counterFrame =
                        window.requestAnimationFrame(animateCounter);
                }
            };

            counterFrame =
                window.requestAnimationFrame(animateCounter);
        };

        if (!("IntersectionObserver" in window)) {
            animatedElements.forEach((element) => {
                element.classList.add("is-in");
            });

            startCounter();

            return () => {
                window.cancelAnimationFrame(counterFrame);
            };
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const element = entry.target as HTMLElement;

                    element.classList.add("is-in");

                    if (
                        element === counterTarget ||
                        element.contains(counterTarget)
                    ) {
                        startCounter();
                    }

                    observer.unobserve(element);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -3% 0px",
            },
        );

        animatedElements.forEach((element) => {
            observer.observe(element);
        });

        return () => {
            observer.disconnect();
            window.cancelAnimationFrame(counterFrame);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="smpkg2-exp"
            id="smpkg2-experience"
        >
            <div className="smpkg2-exp-inner">
                {/* ==================================================
            TOP — CLIENTS + DOCUMENT WALL
            ================================================== */}

                <div className="smpkg2-exp-hero">
                    <div className="smpkg2-exp-hero__left">
                        <h2 className="smpkg2-exp-title smpkg2-exp-reveal">
                            TỪ 0 ĐẾN{" "}
                            <span className="smpkg2-exp-counter">
                                {clientCount}+
                            </span>
                            <br />
                            CLIENTS
                            <br />
                            TRONG 1 NĂM
                        </h2>

                        <p className="smpkg2-exp-intro smpkg2-exp-reveal">
                            Là con số mình đạt được nhờ những Proposal
                            được chuẩn bị chỉn chu. Trong đó, mình đã tự
                            tin nhận và triển khai các project có doanh
                            thu từ{" "}
                            <strong>200 triệu đến 1 tỷ đồng/năm.</strong>
                        </p>
                    </div>

                    <div className="smpkg2-exp-hero__right smpkg2-exp-reveal">
                        <div className="smpkg2-exp-wall">
                            <DocumentColumn
                                documents={leftDocuments}
                                direction="up"
                            />

                            <DocumentColumn
                                documents={rightDocuments}
                                direction="down"
                            />
                        </div>
                    </div>
                </div>

                {/* ==================================================
            99% CLIENT RETENTION
            ================================================== */}

                <div className="smpkg2-exp-pride smpkg2-exp-reveal">
                    <div className="smpkg2-exp-ring">
                        <svg
                            viewBox="0 0 160 160"
                            aria-hidden="true"
                        >
                            <defs>
                                <linearGradient
                                    id="smpkg2ExpRingGradient"
                                    x1="0"
                                    y1="0"
                                    x2="1"
                                    y2="1"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor="#C9A9F0"
                                    />

                                    <stop
                                        offset="100%"
                                        stopColor="#8A5FCF"
                                    />
                                </linearGradient>
                            </defs>

                            <circle
                                className="smpkg2-exp-ring__track"
                                cx="80"
                                cy="80"
                                r="69"
                            />

                            <circle
                                className="smpkg2-exp-ring__progress"
                                cx="80"
                                cy="80"
                                r="69"
                            />
                        </svg>

                        <div className="smpkg2-exp-ring__label">
                            <strong>99%</strong>
                            <span>
                                Khách hàng
                                <br />
                                lâu dài
                            </span>
                        </div>
                    </div>

                    <div className="smpkg2-exp-pride__copy">
                        <p>
                            Những điều mình tự hào hơn cả con số
                            <br className="smpkg2-exp-desktop-break" />
                            {" "}50+ clients là:
                        </p>

                        <strong>
                            Gần như 99% trong số đó vẫn tiếp tục
                            đồng hành và làm việc lâu dài với mình.
                        </strong>
                    </div>
                </div>

                {/* ==================================================
            WORKFLOW INTRO
            ================================================== */}

                <p className="smpkg2-exp-workflow-intro smpkg2-exp-reveal">
                    Bởi sau khi client gật đầu, mình không làm việc
                    theo kiểu “nhận brief rồi làm” mà luôn có{" "}
                    <strong>
                        một quy trình rõ ràng để làm việc với client:
                    </strong>
                </p>

                {/* ==================================================
            WORKFLOW STEPS
            ================================================== */}

                <div className="smpkg2-exp-workflow smpkg2-exp-reveal">
                    {workflow.map((step, index) => (
                        <div
                            className="smpkg2-exp-workflow__item"
                            key={step}
                        >
                            <span className="smpkg2-exp-workflow__pill">
                                {step}
                            </span>

                            {index < workflow.length - 1 && (
                                <span
                                    className="smpkg2-exp-workflow__arrow"
                                    aria-hidden="true"
                                >
                                    →
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* ==================================================
            CLOSING TEXT
            ================================================== */}

                <p className="smpkg2-exp-closing smpkg2-exp-reveal">
                    Và sau khi làm qua hàng chục project,
                    mình nhận ra đây chính là:
                </p>

                {/* ==================================================
    3 TÀI LIỆU BẤT LY THÂN
    ================================================== */}

                <div className="smpkg2-exp-trio smpkg2-exp-reveal">
                    <h3 className="smpkg2-exp-trio__title">
                        3 tài liệu{" "}
                        <span className="smpkg2-exp-trio__highlight">
                            bất ly thân
                        </span>
                        <br />
                        bất kỳ ai làm{" "}
                        <span className="smpkg2-exp-trio__outline">
                            Social Media
                        </span>{" "}
                        cũng nên có
                    </h3>

                    <div className="smpkg2-exp-trio__grid">

                        {/* 01 — PROPOSAL */}

                        <div className="smpkg2-exp-trio__item smpkg2-exp-trio__item--proposal">
                            <span className="smpkg2-exp-trio__label">
                                Proposal đủ thuyết phục
                            </span>

                            <div
                                className="smpkg2-exp-trio__image"
                                role="img"
                                aria-label="Ảnh minh họa cho Social Media Proposal"
                            >
                                <div className="smpkg2-exp-trio__cloud">
                                    <span />
                                    <span />
                                    <span />
                                </div>

                                <div className="smpkg2-exp-trio__hill smpkg2-exp-trio__hill--back" />
                                <div className="smpkg2-exp-trio__hill smpkg2-exp-trio__hill--front" />
                            </div>
                        </div>

                        {/* 02 — AUDIT */}

                        <div className="smpkg2-exp-trio__item smpkg2-exp-trio__item--audit">
                            <div
                                className="smpkg2-exp-trio__image"
                                role="img"
                                aria-label="Ảnh minh họa cho Social Media Audit"
                            >
                                <div className="smpkg2-exp-trio__cloud">
                                    <span />
                                    <span />
                                    <span />
                                </div>

                                <div className="smpkg2-exp-trio__hill smpkg2-exp-trio__hill--back" />
                                <div className="smpkg2-exp-trio__hill smpkg2-exp-trio__hill--front" />
                            </div>

                            <span className="smpkg2-exp-trio__label">
                                Audit có cơ sở
                            </span>
                        </div>

                        {/* 03 — MONTHLY REPORT */}

                        <div className="smpkg2-exp-trio__item smpkg2-exp-trio__item--report">
                            <span className="smpkg2-exp-trio__label">
                                Report chứng minh kết quả
                            </span>

                            <div
                                className="smpkg2-exp-trio__image"
                                role="img"
                                aria-label="Ảnh minh họa cho Social Media Monthly Report"
                            >
                                <div className="smpkg2-exp-trio__cloud">
                                    <span />
                                    <span />
                                    <span />
                                </div>

                                <div className="smpkg2-exp-trio__hill smpkg2-exp-trio__hill--back" />
                                <div className="smpkg2-exp-trio__hill smpkg2-exp-trio__hill--front" />
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM CALLOUT */}

                    <div className="smpkg2-exp-trio__callout">
                        Không chỉ giúp bạn xây dựng một{" "}
                        <span>workflow tinh gọn</span>{" "}
                        để cạnh tranh trên thị trường mà còn tăng thu nhập
                        và tiến xa hơn trong nghề Social Media.
                    </div>
                </div>
            </div>
        </section>
    );
}