
"use client";

import { useEffect, useRef, useState } from "react";

const clamp = (value: number) =>
    Math.min(Math.max(value, 0), 1);

export function SocialMediaPackageOneIntroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const illustrationRef = useRef<HTMLDivElement>(null);

    const [isVisible, setIsVisible] = useState(false);

    /* ==========================================================
       SECTION REVEAL
       ========================================================== */

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

    /* ==========================================================
       SCROLL-DRIVEN DOCUMENT PACKING
  
       Scroll xuống: tài liệu thu vào folder.
       Scroll lên: tài liệu mở ra.
  
       Không dùng data-rv hoặc animation một chiều.
       ========================================================== */

    useEffect(() => {
        const illustration = illustrationRef.current;

        if (!illustration) return;

        const portfolio =
            illustration.querySelector<HTMLElement>(
                ".smpkg1-intro-paper--portfolio",
            );

        const strategy =
            illustration.querySelector<HTMLElement>(
                ".smpkg1-intro-paper--strategy",
            );

        const plan =
            illustration.querySelector<HTMLElement>(
                ".smpkg1-intro-paper--plan",
            );

        if (!portfolio || !strategy || !plan) return;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        let frameId: number | null = null;

        const updatePacking = () => {
            frameId = null;

            if (reducedMotion) return;

            const rect = illustration.getBoundingClientRect();

            const viewportHeight = window.innerHeight;

            /*
              Bắt đầu đóng khi illustration đi vào viewport.
      
              Hoàn tất đóng khi illustration tiến lên
              gần khu vực giữa viewport.
            */

            const start = viewportHeight * 0.4;
            const end = viewportHeight * 0.1;

            const rawProgress = clamp(
                (start - rect.top) / (start - end),
            );

            /*
              Smoothstep:
              chuyển động mềm ở đầu và cuối nhưng vẫn
              chạy trực tiếp theo tiến độ scroll.
            */

            const progress =
                rawProgress *
                rawProgress *
                (3 - 2 * rawProgress);

            illustration.style.setProperty(
                "--pack-progress",
                String(progress),
            );

            illustration.classList.toggle(
                "is-packing",
                progress > 0.02,
            );

            /*
              Target khi đóng:
              cả 3 tài liệu gom về giữa folder.
      
              Tài liệu vẫn nhô lên một phần khỏi miệng
              folder, phần dưới nằm sau mặt trước folder.
            */

            const width = illustration.clientWidth;
            const height = illustration.clientHeight;

            const papers = [
                {
                    element: portfolio,
                    x: width * 0.255,
                    y: height * 0.135,
                    rotation: -24,
                    scale: 0.72,
                },
                {
                    element: strategy,
                    x: -width * 0.005,
                    y: height * 0.265,
                    rotation: 0,
                    scale: 0.72,
                },
                {
                    element: plan,
                    x: -width * 0.265,
                    y: height * 0.135,
                    rotation: 19,
                    scale: 0.72,
                },
            ];

            papers.forEach(
                ({ element, x, y, rotation, scale }) => {
                    element.style.setProperty(
                        "--pack-x",
                        `${x * progress}px`,
                    );

                    element.style.setProperty(
                        "--pack-y",
                        `${y * progress}px`,
                    );

                    element.style.setProperty(
                        "--pack-rotate",
                        `${rotation * (1 - progress)}deg`,
                    );

                    element.style.setProperty(
                        "--pack-scale",
                        String(1 - (1 - scale) * progress),
                    );
                },
            );
        };

        const requestUpdate = () => {
            if (frameId !== null) return;

            frameId = window.requestAnimationFrame(
                updatePacking,
            );
        };

        updatePacking();

        window.addEventListener(
            "scroll",
            requestUpdate,
            { passive: true },
        );

        window.addEventListener(
            "resize",
            requestUpdate,
        );

        return () => {
            window.removeEventListener(
                "scroll",
                requestUpdate,
            );

            window.removeEventListener(
                "resize",
                requestUpdate,
            );

            if (frameId !== null) {
                window.cancelAnimationFrame(frameId);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`smpkg1-intro ${isVisible ? "is-visible" : ""
                }`}
            id="smpkg1-intro"
        >
            <div className="smpkg1-intro-inner">

                {/* =====================================================
            HEADING
            ===================================================== */}

                <h2 className="smpkg1-intro-heading smpkg1-intro-reveal">
                    Biết{" "}
                    <span className="smpkg1-intro-highlight smpkg1-intro-highlight--blue">
                        viết content
                    </span>
                    , biết{" "}
                    <span className="smpkg1-intro-highlight smpkg1-intro-highlight--blue">
                        lên idea
                    </span>

                    <br />

                    nhưng bạn đã{" "}
                    <span className="smpkg1-intro-highlight smpkg1-intro-highlight--lime">
                        sẵn sàng để nhận client
                    </span>
                    {" "}chưa?
                </h2>

                {/* =====================================================
            CONTENT BOX
            ===================================================== */}

                <div className="smpkg1-intro-note-wrap smpkg1-intro-reveal smpkg1-intro-reveal--2">
                    <div
                        className="smpkg1-intro-tape"
                        aria-hidden="true"
                    />

                    <div className="smpkg1-intro-note">
                        <p>
                            Có thể bạn đã biết cách viết content, lên idea,
                            bắt trend... Nhưng khi bắt đầu nhận client, bạn
                            sẽ nhận ra công việc không chỉ có vậy.
                        </p>

                        <p>
                            Client không chỉ cần bạn “nghĩ content hay”, mà
                            còn cần bạn biết giới thiệu năng lực, xây dựng
                            hướng đi cho project và biến nó thành một kế
                            hoạch cụ thể để triển khai. Đó là lúc bạn cần
                            một bộ khung để biến những gì mình biết thành
                            một quy trình làm việc rõ ràng:
                        </p>

                        <ul>
                            <li>
                                <strong>Một Portfolio</strong>
                                {" "}– Để client biết bạn làm được gì.
                            </li>

                            <li>
                                <strong>Một Strategy</strong>
                                {" "}– Để xác định project nên đi hướng nào.
                            </li>

                            <li>
                                <strong>Một Monthly Plan</strong>
                                {" "}– Để biến chiến lược thành những việc cụ
                                thể cần làm.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* =====================================================
            DOCUMENT ILLUSTRATION
            ===================================================== */}

                <div
                    ref={illustrationRef}
                    className="smpkg1-intro-illustration smpkg1-intro-reveal smpkg1-intro-reveal--3"
                >
                    <div
                        className="smpkg1-intro-illustration-glow"
                        aria-hidden="true"
                    />

                    {/* ===================================================
              PORTFOLIO
              =================================================== */}

                    <div className="smpkg1-intro-paper smpkg1-intro-paper--portfolio">
                        <div className="smpkg1-intro-paper-inner">
                            <div className="smpkg1-intro-paper-heading smpkg1-intro-paper-heading--purple">
                                PORTFOLIO
                            </div>

                            <div className="smpkg1-intro-portfolio-lines">
                                <span />
                                <span />
                                <span />
                            </div>

                            <div className="smpkg1-intro-portfolio-cover" />

                            <div className="smpkg1-intro-portfolio-lines smpkg1-intro-portfolio-lines--bottom">
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    </div>

                    {/* ===================================================
              STRATEGY
              =================================================== */}

                    <div className="smpkg1-intro-paper smpkg1-intro-paper--strategy">
                        <div className="smpkg1-intro-paper-inner">
                            <div className="smpkg1-intro-paper-heading smpkg1-intro-paper-heading--green">
                                STRATEGY
                            </div>

                            <div className="smpkg1-intro-strategy-block">
                                <span />
                                <span />
                                <span />
                            </div>

                            <div className="smpkg1-intro-strategy-lines">
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    </div>

                    {/* ===================================================
              MONTHLY PLAN
              =================================================== */}

                    <div className="smpkg1-intro-paper smpkg1-intro-paper--plan">
                        <div className="smpkg1-intro-paper-inner">
                            <div className="smpkg1-intro-paper-heading smpkg1-intro-paper-heading--blue">
                                MONTHLY PLAN
                            </div>

                            <div className="smpkg1-intro-plan-lines">
                                <span />
                                <span />
                            </div>

                            <div className="smpkg1-intro-plan-calendar">
                                {Array.from({ length: 9 }, (_, index) => (
                                    <span key={index} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ===================================================
              FOLDER — SOCIAL MEDIA PACKAGE 01
              =================================================== */}

                    <div className="smpkg1-intro-package-card">
                        <span>
                            SOCIAL MEDIA
                            <br />
                            PACKAGE 01
                        </span>
                    </div>

                    {/* ===================================================
              PURPLE CURSOR
              =================================================== */}
                  <svg
  className="smpkg1-intro-pointer"
  viewBox="0 0 96 92"
  fill="none"
  aria-hidden="true"
>
  <path
    d="M8 6L27 76C28.5 81.4 34.9 82.8 38.4 78.7L49.5 65.8L69.2 84.6C71.6 86.8 75.3 86.8 77.7 84.4L85.3 76.8C87.7 74.4 87.7 70.7 85.2 68.4L65.7 49.9L82.4 42.8C87.2 40.8 87 34 82.1 32.3L15 4.1C10.7 2.3 6.8 2.9 8 6Z"
    fill="#7C3AED"
  />
</svg>
                </div>

                {/* =====================================================
            BOTTOM STATEMENT
            ===================================================== */}

                <p className="smpkg1-intro-bottom smpkg1-intro-reveal smpkg1-intro-reveal--4">
                    Và đó cũng là những gì mình đã gom lại trong{" "}

                    <strong>Social Media Package 01</strong>

                    {" "}để giúp bạn tự tin
                    <br className="smpkg1-intro-desktop-break" />

                    trên con đường chinh phục những client Social Media
                    đầu tiên một cách chuyên nghiệp.
                </p>
            </div>
        </section>
    );
}