"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ============================================================
   DATA — PORTFOLIO
   ============================================================ */

type ExploreItem = {
    title: string;
    description: string;
    image: string | null;
};

const planItems: ExploreItem[] = [
    {
        title: "LÊN LỊCH NỘI DUNG",
        description: "Sắp xếp content theo ngày, tuần hoặc tháng.",
        image: null,
    },
    {
        title: "THEO DÕI TIẾN ĐỘ",
        description: "Biết content nào đang làm, đã hoàn thành hay còn chờ xử lý.",
        image: null,
    },
    {
        title: "PHÂN CHIA CÔNG VIỆC",
        description:
            "Dễ dàng theo dõi task, deadline và người phụ trách khi làm team.",
        image: null,
    },
];

function PlanCreativePreview({ index }: { index: number }) {
    return (
        <div className={`smpkg1-plan-art smpkg1-plan-art--${index + 1}`}>
            <div className="smpkg1-plan-art__top">
                <span>SOCIAL MEDIA PLAN</span>
                <span>0{index + 1} / 03</span>
            </div>

            {/* 01 — CONTENT CALENDAR */}

            {index === 0 && (
                <div className="smpkg1-plan-calendar">
                    <div className="smpkg1-plan-art__heading">
                        <div>
                            <span>CONTENT CALENDAR</span>
                            <h4>WHAT'S NEXT?</h4>
                        </div>

                        <span className="smpkg1-plan-calendar__month">SEPTEMBER ↗</span>
                    </div>

                    <div className="smpkg1-plan-calendar__grid">
                        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                            <span className="smpkg1-plan-calendar__day" key={day}>
                                {day}
                            </span>
                        ))}

                        {Array.from({ length: 28 }, (_, index) => (
                            <div
                                key={index}
                                className={`smpkg1-plan-calendar__date ${[2, 7, 11, 16, 21, 25].includes(index) ? "has-content" : ""
                                    }`}
                            >
                                <span>{index + 1}</span>

                                {[2, 11, 21].includes(index) && (
                                    <i className="smpkg1-plan-calendar__event smpkg1-plan-calendar__event--purple" />
                                )}

                                {[7, 16, 25].includes(index) && (
                                    <i className="smpkg1-plan-calendar__event smpkg1-plan-calendar__event--lime" />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="smpkg1-plan-calendar__legend">
                        <span>
                            <i />
                            CONTENT PRODUCTION
                        </span>

                        <span>
                            <i />
                            PUBLISHING
                        </span>
                    </div>
                </div>
            )}

            {/* 02 — CONTENT PROGRESS */}

            {index === 1 && (
                <div className="smpkg1-plan-progress">
                    <div className="smpkg1-plan-art__heading">
                        <div>
                            <span>CONTENT WORKFLOW</span>
                            <h4>TRACK EVERY STEP.</h4>
                        </div>
                    </div>

                    <div className="smpkg1-plan-progress__summary">
                        <div>
                            <span>MONTHLY PROGRESS</span>
                            <strong>75%</strong>
                        </div>

                        <div className="smpkg1-plan-progress__bar">
                            <i />
                        </div>
                    </div>

                    <div className="smpkg1-plan-progress__board">
                        <div className="smpkg1-plan-progress__column">
                            <div className="smpkg1-plan-progress__column-head">
                                <span>TO DO</span>
                                <b>02</b>
                            </div>

                            <div className="smpkg1-plan-progress__task">
                                <i />
                                <strong>Research trends</strong>
                                <small>CONTENT 01</small>
                            </div>

                            <div className="smpkg1-plan-progress__task">
                                <i />
                                <strong>Write caption</strong>
                                <small>CONTENT 02</small>
                            </div>
                        </div>

                        <div className="smpkg1-plan-progress__column">
                            <div className="smpkg1-plan-progress__column-head">
                                <span>IN PROGRESS</span>
                                <b>01</b>
                            </div>

                            <div className="smpkg1-plan-progress__task">
                                <i />
                                <strong>Design carousel</strong>
                                <small>CONTENT 03</small>
                            </div>
                        </div>

                        <div className="smpkg1-plan-progress__column">
                            <div className="smpkg1-plan-progress__column-head">
                                <span>DONE</span>
                                <b>03</b>
                            </div>

                            <div className="smpkg1-plan-progress__task">
                                <i />
                                <strong>Video editing</strong>
                                <small>CONTENT 04</small>
                            </div>

                            <div className="smpkg1-plan-progress__task">
                                <i />
                                <strong>Client approval</strong>
                                <small>CONTENT 05</small>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 03 — TASK ASSIGNMENT */}

            {index === 2 && (
                <div className="smpkg1-plan-team">
                    <div className="smpkg1-plan-art__heading">
                        <div>
                            <span>TEAM WORKSPACE</span>
                            <h4>WHO DOES WHAT?</h4>
                        </div>

                        <span className="smpkg1-plan-team__badge">03 MEMBERS</span>
                    </div>

                    <div className="smpkg1-plan-team__table">
                        <div className="smpkg1-plan-team__table-head">
                            <span>TASK</span>
                            <span>PIC</span>
                            <span>DEADLINE</span>
                            <span>STATUS</span>
                        </div>

                        {[
                            {
                                task: "Content direction",
                                pic: "Q",
                                deadline: "18 SEP",
                                status: "DONE",
                                tone: "lime",
                            },
                            {
                                task: "Scriptwriting",
                                pic: "A",
                                deadline: "20 SEP",
                                status: "IN PROGRESS",
                                tone: "purple",
                            },
                            {
                                task: "Visual design",
                                pic: "M",
                                deadline: "22 SEP",
                                status: "TO DO",
                                tone: "blue",
                            },
                            {
                                task: "Schedule posts",
                                pic: "Q",
                                deadline: "24 SEP",
                                status: "TO DO",
                                tone: "blue",
                            },
                        ].map((task) => (
                            <div className="smpkg1-plan-team__row" key={task.task}>
                                <strong>{task.task}</strong>

                                <span className="smpkg1-plan-team__avatar">{task.pic}</span>

                                <span className="smpkg1-plan-team__deadline">
                                    {task.deadline}
                                </span>

                                <span
                                    className={`smpkg1-plan-team__status smpkg1-plan-team__status--${task.tone}`}
                                >
                                    {task.status}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="smpkg1-plan-team__footer">
                        <span>✳</span>
                        EVERY TASK. ONE CLEAR WORKFLOW.
                    </div>
                </div>
            )}

            <div className="smpkg1-plan-art__footer">
                <span>SOCIAL MEDIA PACKAGE 01</span>
                <span>✳</span>
            </div>
        </div>
    );
}

const portfolioItems: ExploreItem[] = [
    {
        title: "GIỚI THIỆU CÁ NHÂN",
        description: "Bạn là ai, chuyên môn và thế mạnh của bạn.",
        image: null,
    },
    {
        title: "SERVICES",
        description: "Bạn đang cung cấp những dịch vụ Social Media nào.",
        image: null,
    },
    {
        title: "PROJECT SHOWCASE",
        description: "Trình bày những project/case study bạn đã thực hiện.",
        image: null,
    },
    {
        title: "EXPERIENCE & SKILLS",
        description: "Kinh nghiệm và những kỹ năng liên quan.",
        image: null,
    },
    {
        title: "CONTACT / CTA",
        description: "Thông tin để client có thể dễ dàng liên hệ với bạn.",
        image: null,
    },
];

/* ============================================================
   DATA — STRATEGY
   ============================================================ */

type StrategyItem = ExploreItem & {
    number: string;
};

const strategyItems: StrategyItem[] = [
    {
        number: "01",
        title: "XÁC ĐỊNH MỤC TIÊU",
        description: "Xác định project cần đạt được điều gì.",
        image: null,
    },
    {
        number: "02",
        title: "PHÂN TÍCH THƯƠNG HIỆU",
        description: "Tìm USP, giá trị cốt lõi và những điểm có thể khai thác.",
        image: null,
    },
    {
        number: "03",
        title: "PHÂN TÍCH ĐỐI TƯỢNG",
        description: "Hiểu rõ mình đang nói chuyện với ai.",
        image: null,
    },
    {
        number: "04",
        title: "PHÂN TÍCH ĐỐI THỦ",
        description: "Nhìn thị trường và tìm cơ hội để tạo sự khác biệt.",
        image: null,
    },
    {
        number: "05",
        title: "XÂY DỰNG CONTENT STRATEGY",
        description:
            "Xác định các hướng nội dung phù hợp với mục tiêu và đối tượng.",
        image: null,
    },
    {
        number: "06",
        title: "SEO & HASHTAG PLAN",
        description:
            "Xây dựng định hướng SEO và hashtag để hỗ trợ khả năng tiếp cận.",
        image: null,
    },
    {
        number: "07",
        title: "FEED PLAN & ACTION PLAN",
        description:
            "Biến toàn bộ strategy thành những đầu việc cụ thể để triển khai.",
        image: null,
    },
];

/* ============================================================
   PORTFOLIO PREVIEW
   ============================================================ */

function PortfolioPreviewPlaceholder({ index }: { index: number }) {
    return (
        <div
            className={`smpkg1-explore-preview-demo smpkg1-explore-preview-demo--${index + 1
                }`}
        >
            <div className="smpkg1-explore-demo-top">
                <span>SOCIAL MEDIA PORTFOLIO</span>
                <span>0{index + 1} / 05</span>
            </div>

            {/* 01 — PERSONAL INTRO */}

            {index === 0 && (
                <div className="smpkg1-explore-demo-profile">
                    <div className="smpkg1-explore-demo-avatar" />

                    <div className="smpkg1-explore-demo-lines">
                        <i />
                        <i />
                        <i />
                    </div>
                </div>
            )}

            {/* 02 — SERVICES */}

            {index === 1 && (
                <div className="smpkg1-explore-demo-services">
                    <span>CONTENT</span>
                    <span>STRATEGY</span>
                    <span>PLANNING</span>
                    <span>COMMUNITY</span>
                </div>
            )}

            {/* 03 — PROJECT SHOWCASE */}

            {index === 2 && (
                <div className="smpkg1-explore-demo-projects">
                    {Array.from({ length: 6 }, (_, i) => (
                        <span key={i} />
                    ))}
                </div>
            )}

            {/* 04 — EXPERIENCE & SKILLS */}

            {index === 3 && (
                <div className="smpkg1-explore-demo-skills">
                    {[88, 72, 94, 65].map((width) => (
                        <span key={width}>
                            <i style={{ width: `${width}%` }} />
                        </span>
                    ))}
                </div>
            )}

            {/* 05 — CONTACT */}

            {index === 4 && (
                <div className="smpkg1-explore-demo-contact">
                    <span>LET&apos;S WORK TOGETHER</span>

                    <div className="smpkg1-explore-demo-contact-button">CONTACT ME →</div>
                </div>
            )}

            <div className="smpkg1-explore-demo-footer">
                {portfolioItems[index].title}
            </div>
        </div>
    );
}

/* ============================================================
   STRATEGY CREATIVE PREVIEW
   ============================================================ */

function StrategyCreativePreview({ index }: { index: number }) {
    const item = strategyItems[index];

    return (
        <div className={`smpkg1-strategy-art smpkg1-strategy-art--${index + 1}`}>
            <div className="smpkg1-strategy-art__top">
                <span>SOCIAL MEDIA STRATEGY</span>
                <span>{item.number} / 07</span>
            </div>

            {/* ======================================================
          01 — PROJECT GOALS
          ====================================================== */}

            {index === 0 && (
                <div className="smpkg1-strategy-art__goals">
                    <span className="smpkg1-strategy-art__eyebrow">
                        PROJECT OBJECTIVES
                    </span>

                    <h4>WHERE ARE WE GOING?</h4>

                    <div className="smpkg1-strategy-art__goal-main">
                        <span>01 / MAIN GOAL</span>

                        <strong>Xác định mục tiêu dự án</strong>

                        <div className="smpkg1-strategy-art__goal-line">
                            <i />
                        </div>
                    </div>

                    <div className="smpkg1-strategy-art__goal-grid">
                        <div>
                            <span>BRAND</span>
                            <strong>Awareness</strong>
                            <i />
                        </div>

                        <div>
                            <span>COMMUNITY</span>
                            <strong>Engagement</strong>
                            <i />
                        </div>

                        <div>
                            <span>BUSINESS</span>
                            <strong>Conversion</strong>
                            <i />
                        </div>
                    </div>
                </div>
            )}

            {/* ======================================================
          02 — BRAND ANALYSIS
          ====================================================== */}

            {index === 1 && (
                <div className="smpkg1-strategy-art__brand">
                    <div className="smpkg1-strategy-art__brand-cover">
                        <span>BRAND</span>
                        <strong>IDENTITY</strong>
                        <i aria-hidden="true">✳</i>
                    </div>

                    <div className="smpkg1-strategy-art__brand-bottom">
                        <div className="smpkg1-strategy-art__brand-colors">
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>

                        <div className="smpkg1-strategy-art__brand-notes">
                            <div>
                                <small>01</small>
                                <strong>USP</strong>
                            </div>

                            <div>
                                <small>02</small>
                                <strong>CORE VALUES</strong>
                            </div>

                            <div>
                                <small>03</small>
                                <strong>BRAND VOICE</strong>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ======================================================
          03 — TARGET AUDIENCE
          ====================================================== */}

            {index === 2 && (
                <div className="smpkg1-strategy-art__audience">
                    <span className="smpkg1-strategy-art__eyebrow">AUDIENCE PERSONA</span>

                    <div className="smpkg1-strategy-art__persona">
                        <div className="smpkg1-strategy-art__persona-avatar">
                            <span aria-hidden="true">☺</span>
                        </div>

                        <div className="smpkg1-strategy-art__persona-info">
                            <strong>YOUR IDEAL AUDIENCE</strong>

                            <span>WHO ARE WE TALKING TO?</span>

                            <div>
                                <i>INTERESTS</i>
                                <i>BEHAVIOR</i>
                            </div>
                        </div>
                    </div>

                    <div className="smpkg1-strategy-art__persona-insights">
                        <div>
                            <span>PAIN POINT</span>
                            <i />
                            <i />
                        </div>

                        <div>
                            <span>NEEDS</span>
                            <i />
                            <i />
                        </div>

                        <div>
                            <span>MOTIVATION</span>
                            <i />
                            <i />
                        </div>
                    </div>
                </div>
            )}

            {/* ======================================================
          04 — COMPETITOR ANALYSIS
          ====================================================== */}

            {index === 3 && (
                <div className="smpkg1-strategy-art__competitors">
                    <span className="smpkg1-strategy-art__eyebrow">
                        COMPETITOR LANDSCAPE
                    </span>

                    <h4>FIND YOUR DIFFERENCE.</h4>

                    <div className="smpkg1-strategy-art__matrix">
                        <div className="smpkg1-strategy-art__matrix-axis smpkg1-strategy-art__matrix-axis--x">
                            HIGH DIFFERENTIATION →
                        </div>

                        <div className="smpkg1-strategy-art__matrix-axis smpkg1-strategy-art__matrix-axis--y">
                            ↑ HIGH ENGAGEMENT
                        </div>

                        <span className="smpkg1-strategy-art__matrix-dot smpkg1-strategy-art__matrix-dot--1">
                            A
                        </span>

                        <span className="smpkg1-strategy-art__matrix-dot smpkg1-strategy-art__matrix-dot--2">
                            B
                        </span>

                        <span className="smpkg1-strategy-art__matrix-dot smpkg1-strategy-art__matrix-dot--3">
                            C
                        </span>

                        <div className="smpkg1-strategy-art__matrix-opportunity">
                            YOUR OPPORTUNITY ✳
                        </div>
                    </div>
                </div>
            )}

            {/* ======================================================
          05 — CONTENT STRATEGY
          ====================================================== */}

            {index === 4 && (
                <div className="smpkg1-strategy-art__content">
                    <span className="smpkg1-strategy-art__eyebrow">
                        CONTENT DIRECTION
                    </span>

                    <h4>BUILD YOUR CONTENT UNIVERSE.</h4>

                    <div className="smpkg1-strategy-art__content-center">BRAND</div>

                    <div className="smpkg1-strategy-art__content-pillars">
                        <div>
                            <span>01</span>
                            <strong>EDUCATE</strong>
                            <i>↗</i>
                        </div>

                        <div>
                            <span>02</span>
                            <strong>INSPIRE</strong>
                            <i>✳</i>
                        </div>

                        <div>
                            <span>03</span>
                            <strong>CONNECT</strong>
                            <i>↗</i>
                        </div>
                    </div>
                </div>
            )}

            {/* ======================================================
          06 — SEO & HASHTAG PLAN
          ====================================================== */}

            {index === 5 && (
                <div className="smpkg1-strategy-art__seo">
                    <span className="smpkg1-strategy-art__eyebrow">
                        SEARCH & DISCOVERABILITY
                    </span>

                    <div className="smpkg1-strategy-art__search">
                        <span aria-hidden="true">⌕</span>
                        <strong>Social Media Strategy</strong>
                        <i aria-hidden="true">↗</i>
                    </div>

                    <div className="smpkg1-strategy-art__seo-result">
                        <small>CONTENT KEYWORD</small>
                        <strong>Find the right keywords.</strong>
                        <span>Topic · Intent · Search behavior</span>
                    </div>

                    <div className="smpkg1-strategy-art__hashtags">
                        <span>#socialmedia</span>
                        <span>#contentstrategy</span>
                        <span>#brandmarketing</span>
                        <span>#contentplanning</span>
                    </div>
                </div>
            )}

            {/* ======================================================
          07 — FEED PLAN & ACTION PLAN
          ====================================================== */}

            {index === 6 && (
                <div className="smpkg1-strategy-art__plan">
                    <div className="smpkg1-strategy-art__plan-heading">
                        <div>
                            <small>EXECUTION ROADMAP</small>
                            <strong>CONTENT CALENDAR</strong>
                        </div>

                        <span>WEEK 01 ↗</span>
                    </div>

                    <div className="smpkg1-strategy-art__calendar">
                        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                            (day, dayIndex) => (
                                <div key={day}>
                                    <span>{day}</span>
                                    <i />
                                    <i />

                                    {dayIndex % 2 === 0 && <i />}
                                </div>
                            )
                        )}
                    </div>

                    <div className="smpkg1-strategy-art__tasks">
                        <div>
                            <span>✓</span>
                            <strong>CONTENT DIRECTION</strong>
                            <small>DONE</small>
                        </div>

                        <div>
                            <span>●</span>
                            <strong>PRODUCTION PLAN</strong>
                            <small>IN PROGRESS</small>
                        </div>

                        <div>
                            <span>○</span>
                            <strong>PUBLISH & REPORT</strong>
                            <small>UP NEXT</small>
                        </div>
                    </div>
                </div>
            )}

            <div className="smpkg1-strategy-art__footer">
                <span>SOCIAL MEDIA PACKAGE 01</span>
                <span aria-hidden="true">✳</span>
            </div>
        </div>
    );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export function SocialMediaPackageOneExploreSection() {
    const [activePortfolioIndex, setActivePortfolioIndex] = useState(0);

    const [activeStrategyIndex, setActiveStrategyIndex] = useState(0);
    const [activePlanIndex, setActivePlanIndex] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const targetRef = useRef({ x: 0, y: 0 });
    const currentRef = useRef({ x: 0, y: 0 });

    /* ==========================================================
       HEADER GLOW — FOLLOW MOUSE
       ========================================================== */

    useEffect(() => {
        const header = headerRef.current;
        const glow = glowRef.current;

        if (!header || !glow) return;

        const bounds = header.getBoundingClientRect();

        targetRef.current = {
            x: bounds.width * 0.24,
            y: bounds.height * 0.35,
        };

        currentRef.current = {
            ...targetRef.current,
        };

        let frameId = 0;
        let running = false;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const applyPosition = () => {
            glow.style.transform = `
        translate3d(
          ${currentRef.current.x}px,
          ${currentRef.current.y}px,
          0
        )
        translate(-50%, -50%)
      `;
        };

        const animate = () => {
            const ease = 0.075;

            currentRef.current.x +=
                (targetRef.current.x - currentRef.current.x) * ease;

            currentRef.current.y +=
                (targetRef.current.y - currentRef.current.y) * ease;

            applyPosition();

            const deltaX = Math.abs(targetRef.current.x - currentRef.current.x);

            const deltaY = Math.abs(targetRef.current.y - currentRef.current.y);

            if (deltaX < 0.2 && deltaY < 0.2) {
                currentRef.current = {
                    ...targetRef.current,
                };

                applyPosition();

                running = false;
                return;
            }

            frameId = window.requestAnimationFrame(animate);
        };

        const startAnimation = () => {
            if (reducedMotion) {
                currentRef.current = {
                    ...targetRef.current,
                };

                applyPosition();
                return;
            }

            if (running) return;

            running = true;

            frameId = window.requestAnimationFrame(animate);
        };

        const handlePointerMove = (event: PointerEvent) => {
            const rect = header.getBoundingClientRect();

            targetRef.current = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            };

            startAnimation();
        };

        const handlePointerLeave = () => {
            const rect = header.getBoundingClientRect();

            targetRef.current = {
                x: rect.width * 0.24,
                y: rect.height * 0.35,
            };

            startAnimation();
        };

        applyPosition();

        header.addEventListener("pointermove", handlePointerMove);

        header.addEventListener("pointerleave", handlePointerLeave);

        return () => {
            header.removeEventListener("pointermove", handlePointerMove);

            header.removeEventListener("pointerleave", handlePointerLeave);

            window.cancelAnimationFrame(frameId);
        };
    }, []);

    /* ==========================================================
       RENDER
       ========================================================== */

    return (
        <section className="smpkg1-explore" id="smpkg1-explore">
            {/* ======================================================
          BLACK HEADER
          ====================================================== */}

            <div ref={headerRef} className="smpkg1-explore-header">
                <div ref={glowRef} className="smpkg1-explore-glow" aria-hidden="true" />

                <div className="smpkg1-explore-header-inner">
                    <span className="smpkg1-explore-arrow" aria-hidden="true">
                        ↓
                    </span>

                    <h2>KHÁM PHÁ BÊN TRONG TÀI LIỆU</h2>
                </div>
            </div>

            {/* ======================================================
          EXPLORE CONTENT
          ====================================================== */}

            <div className="smpkg1-explore-body">
                <div className="smpkg1-explore-inner">
                    {/* ==================================================
              01 — SOCIAL MEDIA PORTFOLIO
              ================================================== */}

                    <article
                        className="smpkg1-explore-card"
                        id="smpkg1-explore-portfolio"
                    >
                        <div className="smpkg1-explore-label">
                            <span className="smpkg1-explore-label-dot" />
                            <span>01 · SOCIAL MEDIA PORTFOLIO</span>
                        </div>

                        <h3 className="smpkg1-explore-title">
                            <span>PORTFOLIO</span> KHÔNG CHỈ ĐỂ “SHOW” PROJECT
                        </h3>

                        <p className="smpkg1-explore-description">
                            Một portfolio tốt cần giúp client nhìn vào là hiểu bạn là ai, bạn
                            làm gì và những gì bạn có thể mang lại cho thương hiệu/doanh
                            nghiệp của họ.{" "}
                            <strong>
                                Trong template này, bạn có thể trình bày những phần quan trọng
                                như:
                            </strong>
                        </p>

                        <div className="smpkg1-explore-grid">
                            {/* PORTFOLIO TABS */}

                            <div
                                className="smpkg1-explore-tabs"
                                role="tablist"
                                aria-label="Nội dung Social Media Portfolio"
                            >
                                {portfolioItems.map((item, index) => (
                                    <button
                                        key={item.title}
                                        type="button"
                                        role="tab"
                                        id={`smpkg1-portfolio-tab-${index}`}
                                        aria-controls={`smpkg1-portfolio-panel-${index}`}
                                        aria-selected={activePortfolioIndex === index}
                                        className={`smpkg1-explore-tab ${activePortfolioIndex === index ? "is-active" : ""
                                            }`}
                                        onMouseEnter={() => setActivePortfolioIndex(index)}
                                        onFocus={() => setActivePortfolioIndex(index)}
                                        onClick={() => setActivePortfolioIndex(index)}
                                    >
                                        <strong>{item.title}</strong>

                                        <span>{item.description}</span>
                                    </button>
                                ))}
                            </div>

                            {/* PORTFOLIO PREVIEW */}

                            <div className="smpkg1-explore-preview">
                                {portfolioItems.map((item, index) => (
                                    <div
                                        key={item.title}
                                        id={`smpkg1-portfolio-panel-${index}`}
                                        role="tabpanel"
                                        aria-labelledby={`smpkg1-portfolio-tab-${index}`}
                                        aria-hidden={activePortfolioIndex !== index}
                                        className={`smpkg1-explore-preview-page ${activePortfolioIndex === index ? "is-active" : ""
                                            }`}
                                    >
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={`Preview ${item.title}`}
                                                fill
                                                sizes="(max-width: 760px) 90vw, 45vw"
                                                className="smpkg1-explore-preview-image"
                                            />
                                        ) : (
                                            <PortfolioPreviewPlaceholder index={index} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="smpkg1-explore-bottom">
                            <span className="smpkg1-explore-bottom-icon" aria-hidden="true">
                                ✳
                            </span>

                            <p>
                                Bạn chỉ cần thay thông tin, hình ảnh và project của mình để tạo
                                thành một portfolio của riêng bạn.
                            </p>
                        </div>
                    </article>

                    {/* ==================================================
              02 — SOCIAL MEDIA STRATEGY
              ================================================== */}

                    <article
                        className="smpkg1-explore-card smpkg1-explore-strategy"
                        id="smpkg1-explore-strategy"
                    >
                        <div className="smpkg1-explore-label">
                            <span className="smpkg1-explore-label-dot" />
                            <span>02 · SOCIAL MEDIA STRATEGY</span>
                        </div>

                        <h3 className="smpkg1-explore-title">
                            <span>CHIẾN LƯỢC</span> LÀ PHẦN MÌNH THẤY NHIỀU BẠN MỚI
                            <br className="smpkg1-explore-strategy-desktop-break" />
                            LÀM SOCIAL MEDIA DỄ BỊ THIẾU NHẤT
                        </h3>

                        <div className="smpkg1-explore-strategy-intro">
                            <p>
                                Client đưa brief thì các bạn mới bắt đầu nghĩ content lẻ tẻ, sau
                                đó lên lịch rồi đăng bài. Nhưng lại chưa thật sự trả lời được:
                            </p>

                            <ul>
                                <li>Mục tiêu của project là gì?</li>
                                <li>Khách hàng là ai? Brand đang có lợi thế gì?</li>
                                <li>Content nên đi theo hướng nào?</li>
                            </ul>

                            <p>
                                Social Media Strategy giúp bạn lần lượt đi qua những phần quan
                                trọng đó:
                            </p>
                        </div>

                        <div className="smpkg1-explore-grid smpkg1-explore-strategy-grid">
                            {/* STRATEGY TABS */}

                            <div
                                className="smpkg1-explore-tabs smpkg1-explore-strategy-tabs"
                                role="tablist"
                                aria-label="Nội dung Social Media Strategy"
                            >
                                {strategyItems.map((item, index) => (
                                    <button
                                        key={item.number}
                                        type="button"
                                        role="tab"
                                        id={`smpkg1-strategy-tab-${index}`}
                                        aria-controls={`smpkg1-strategy-panel-${index}`}
                                        aria-selected={activeStrategyIndex === index}
                                        className={`smpkg1-explore-tab smpkg1-explore-strategy-tab ${activeStrategyIndex === index ? "is-active" : ""
                                            }`}
                                        onMouseEnter={() => setActiveStrategyIndex(index)}
                                        onFocus={() => setActiveStrategyIndex(index)}
                                        onClick={() => setActiveStrategyIndex(index)}
                                    >
                                        <strong>
                                            <span className="smpkg1-explore-strategy-number">
                                                {item.number}.
                                            </span>{" "}
                                            {item.title}
                                        </strong>

                                        <span>{item.description}</span>
                                    </button>
                                ))}
                            </div>

                            {/* STRATEGY PREVIEW */}

                            <div className="smpkg1-explore-preview smpkg1-explore-strategy-preview">
                                {strategyItems.map((item, index) => (
                                    <div
                                        key={item.number}
                                        id={`smpkg1-strategy-panel-${index}`}
                                        role="tabpanel"
                                        aria-labelledby={`smpkg1-strategy-tab-${index}`}
                                        aria-hidden={activeStrategyIndex !== index}
                                        className={`smpkg1-explore-preview-page ${activeStrategyIndex === index ? "is-active" : ""
                                            }`}
                                    >
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={`Preview ${item.title}`}
                                                fill
                                                sizes="(max-width: 760px) 90vw, 45vw"
                                                className="smpkg1-explore-preview-image"
                                            />
                                        ) : (
                                            <StrategyCreativePreview index={index} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>


                    {/* ==================================================
    03 — SOCIAL MEDIA PLAN
    ================================================== */}

                    <article
                        className="smpkg1-explore-card smpkg1-explore-plan"
                        id="smpkg1-explore-plan"
                    >
                        {/* LABEL */}

                        <div className="smpkg1-explore-label">
                            <span className="smpkg1-explore-label-dot" />
                            <span>03 · SOCIAL MEDIA PLAN</span>
                        </div>

                        {/* HEADING */}

                        <h3 className="smpkg1-explore-title">
                            TRIỂN KHAI CHIẾN LƯỢC THÀNH{" "}
                            <span>KẾ HOẠCH SOCIAL MEDIA</span>
                        </h3>

                        {/* DESCRIPTION */}

                        <p className="smpkg1-explore-description">
                            Social Media Plan giúp bạn lên lịch nội dung theo
                            ngày/tuần/tháng, theo dõi tiến độ và phân chia công việc
                            rõ ràng hơn, đặc biệt khi làm team hoặc có nhiều task
                            cùng lúc cần một plan để theo dõi và update hằng ngày.
                        </p>

                        {/* CONTENT GRID */}

                        <div className="smpkg1-explore-grid smpkg1-explore-plan-grid">

                            {/* LEFT — THREE INTERACTIVE CARDS */}

                            <div
                                className="smpkg1-explore-tabs smpkg1-explore-plan-tabs"
                                role="tablist"
                                aria-label="Các nội dung trong Social Media Plan"
                            >
                                {planItems.map((item, index) => (
                                    <button
                                        key={item.title}
                                        type="button"
                                        role="tab"
                                        id={`smpkg1-plan-tab-${index}`}
                                        aria-controls={`smpkg1-plan-panel-${index}`}
                                        aria-selected={activePlanIndex === index}
                                        className={`smpkg1-explore-tab smpkg1-explore-plan-tab ${activePlanIndex === index
                                                ? "is-active"
                                                : ""
                                            }`}
                                        onMouseEnter={() => setActivePlanIndex(index)}
                                        onFocus={() => setActivePlanIndex(index)}
                                        onClick={() => setActivePlanIndex(index)}
                                    >
                                        <strong>{item.title}</strong>
                                        <span>{item.description}</span>
                                    </button>
                                ))}
                            </div>

                            {/* RIGHT — CHANGING PREVIEW */}

                            <div className="smpkg1-explore-preview smpkg1-explore-plan-preview">
                                {planItems.map((item, index) => (
                                    <div
                                        key={item.title}
                                        id={`smpkg1-plan-panel-${index}`}
                                        role="tabpanel"
                                        aria-labelledby={`smpkg1-plan-tab-${index}`}
                                        aria-hidden={activePlanIndex !== index}
                                        className={`smpkg1-explore-preview-page ${activePlanIndex === index
                                                ? "is-active"
                                                : ""
                                            }`}
                                    >
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={`Preview ${item.title}`}
                                                fill
                                                sizes="(max-width: 760px) 90vw, 45vw"
                                                className="smpkg1-explore-preview-image"
                                            />
                                        ) : (
                                            <PlanCreativePreview index={index} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
