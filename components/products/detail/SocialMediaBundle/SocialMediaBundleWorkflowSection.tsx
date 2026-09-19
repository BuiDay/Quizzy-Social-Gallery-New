"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

const workflowSteps = [
    {
        number: "01",
        node: "PORTFOLIO",
        title: "THU HÚT KHÁCH HÀNG",
        description:
            "Làm sao để khách thấy bạn, biết bạn làm gì và muốn tìm hiểu thêm.",
    },
    {
        number: "02",
        node: "PROPOSAL",
        title: "PITCHING & CHỐT DEAL",
        description:
            "Trình bày giải pháp, báo giá và thuyết phục khách hàng chọn bạn.",
    },
    {
        number: "03",
        node: "AUDIT",
        title: "PHÂN TÍCH KÊNH ",
        description:
            "Đánh giá hiệu suất kênh để xác định vấn đề, cơ hội và hướng cải thiện.",
    },
    {
        number: "04",
        node: "STRATEGY",
        title: "XÂY DỰNG CHIẾN LƯỢC",
        description:
            "Xác định mục tiêu, đối tượng và định hướng nội dung phù hợp với từng thương hiệu.",
    },
    {
        number: "05",
        node: " PLAN",
        title: "LÊN KẾ HOẠCH & TRIỂN KHAI",
        description:
            "Biến strategy thành content plan cụ thể.",
    },
    {
        number: "06",
        node: "REPORT",
        title: "ĐO LƯỜNG KẾT QUẢ",
        description:
            "Theo dõi và tổng hợp các chỉ số để đánh giá hiệu quả của hoạt động Social Media.",
    }
];

export function SocialMediaBundleWorkflowSection() {
    const workflowRef =
        useRef<HTMLDivElement>(null);

    const progressRef =
        useRef<SVGCircleElement>(null);

    const rafRef =
        useRef<number | null>(null);

    const [activeStep, setActiveStep] =
        useState(0);


    /* ==========================================================
       SCROLLYTELLING
       ========================================================== */

    useEffect(() => {
        const workflow =
            workflowRef.current;

        if (!workflow) return;


        const updateWorkflow = () => {
            const rect =
                workflow.getBoundingClientRect();

            const scrollableHeight =
                rect.height -
                window.innerHeight;

            const progress =
                scrollableHeight > 0
                    ? Math.min(
                        Math.max(
                            -rect.top /
                            scrollableHeight,
                            0,
                        ),
                        1,
                    )
                    : 0;


            /* ring progress */

            if (progressRef.current) {
                progressRef.current.style.strokeDashoffset =
                    `${100 * (1 - progress)}`;
            }


            /* active step */

            const nextStep =
                Math.min(
                    workflowSteps.length - 1,

                    Math.floor(
                        progress *
                        workflowSteps.length,
                    ),
                );


            setActiveStep((current) =>
                current === nextStep
                    ? current
                    : nextStep,
            );
        };


        const handleScroll = () => {
            if (rafRef.current !== null) {
                return;
            }

            rafRef.current =
                requestAnimationFrame(() => {
                    updateWorkflow();

                    rafRef.current = null;
                });
        };


        updateWorkflow();

        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true,
            },
        );

        window.addEventListener(
            "resize",
            updateWorkflow,
        );


        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll,
            );

            window.removeEventListener(
                "resize",
                updateWorkflow,
            );

            if (rafRef.current !== null) {
                cancelAnimationFrame(
                    rafRef.current,
                );
            }
        };
    }, []);


    /* ==========================================================
       CLICK NODE
       ========================================================== */

    const goToStep = (
        stepIndex: number,
    ) => {
        const workflow =
            workflowRef.current;

        if (!workflow) return;


        const rect =
            workflow.getBoundingClientRect();

        const sectionTop =
            window.scrollY +
            rect.top;

        const scrollableHeight =
            workflow.offsetHeight -
            window.innerHeight;


        /*
          đưa vị trí scroll vào giữa segment
          tương ứng
        */

        const progress =
            (stepIndex + 0.5) /
            workflowSteps.length;


        window.scrollTo({
            top:
                sectionTop +
                scrollableHeight *
                progress,

            behavior: "smooth",
        });
    };


    const currentStep =
        workflowSteps[activeStep];


    return (
        <section
            className="smbundle-workflow"
            id="bundle-workflow"
        >

            {/* ======================================================
          SCROLL CONTAINER
          ====================================================== */}

            <div
                ref={workflowRef}
                className="smbundle-workflow-scroll"
            >

                <div className="smbundle-workflow-sticky">

                    <div className="smbundle-workflow-shell">

                        {/* =================================================
                INTRO
                ================================================= */}

                        <div className="smbundle-workflow-intro">

                            <h2>
                                Hệ thống hóa{" "}

                                <span className="smbundle-workflow-outline">
                                    quy trình
                                </span>

                                {" "}làm{" "}

                                <span className="smbundle-workflow-purple">
                                    Social Media Marketing
                                </span>

                                <br />

                                với client{" "}

                                <span className="smbundle-workflow-lime">
                                    chuyên nghiệp từ A-Z
                                </span>
                                .
                            </h2>


                            <p>
                                Để đi từ một Newbie chưa có client đến việc chinh phục,
                                làm việc và duy trì
                                <br />

                                dự án Social Media Marketing chuyên nghiệp, bạn sẽ phải
                                đi qua cả một
                                <br />

                                quy trình rất nhiều bước.
                            </p>

                        </div>


                        {/* =================================================
                WORKFLOW BODY
                ================================================= */}

                        <div className="smbundle-workflow-grid">

                            {/* ===============================================
                  LEFT
                  =============================================== */}

                            <div className="smbundle-workflow-copy">

                                <div className="smbundle-workflow-eyebrow">

                                    <span />

                                    QUY TRÌNH LÀM VIỆC VỚI CLIENT

                                </div>


                                {/* dynamic content */}

                                <div
                                    key={currentStep.number}
                                    className="smbundle-workflow-dynamic"
                                >

                                    <div className="smbundle-workflow-number">
                                        {
                                            currentStep.number
                                        }
                                    </div>


                                    <h3>
                                        {currentStep.title
                                            .split("\n")
                                            .map(
                                                (
                                                    line,
                                                    index,
                                                    array,
                                                ) => (
                                                    <span
                                                        key={line}
                                                    >
                                                        {line}

                                                        {index <
                                                            array.length -
                                                            1 && (
                                                                <br />
                                                            )}
                                                    </span>
                                                ),
                                            )}
                                    </h3>


                                    <p>
                                        {
                                            currentStep.description
                                        }
                                    </p>

                                </div>


                                {/* progress mini bars */}

                                <div className="smbundle-workflow-mini-progress">

                                    {workflowSteps.map(
                                        (step, index) => (
                                            <button
                                                type="button"
                                                key={step.number}
                                                aria-label={`Đi đến bước ${step.number}`}
                                                className={
                                                    activeStep ===
                                                        index
                                                        ? "is-active"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    goToStep(index)
                                                }
                                            />
                                        ),
                                    )}

                                </div>

                            </div>


                            {/* ===============================================
                  RIGHT CIRCULAR MAP
                  =============================================== */}

                            <div className="smbundle-workflow-stage">

                                {/* RING */}

                                <svg
                                    className="smbundle-workflow-ring"
                                    viewBox="0 0 100 100"
                                    aria-hidden="true"
                                >

                                    {/* dotted base */}

                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="41"
                                        fill="none"
                                        stroke="rgba(27,20,37,.14)"
                                        strokeWidth=".55"
                                        strokeDasharray="1.6 2.4"
                                    />


                                    {/* animated purple progress */}

                                    <circle
                                        ref={progressRef}
                                        className="smbundle-workflow-ring-progress"
                                        cx="50"
                                        cy="50"
                                        r="41"
                                        fill="none"
                                        stroke="#A97FDD"
                                        strokeWidth="1.35"
                                        strokeLinecap="round"
                                        pathLength="100"
                                        strokeDasharray="100"
                                        strokeDashoffset="100"
                                        transform="rotate(-90 50 50)"
                                    />

                                </svg>


                                {/* CENTER */}

                                <div className="smbundle-workflow-center">

                                    <span>
                                        SOCIAL MEDIA
                                    </span>

                                    <strong>
                                        WORKFLOW
                                    </strong>

                                </div>


                                {/* NODES */}

                                {workflowSteps.map(
                                    (step, index) => (
                                        <button
                                            type="button"
                                            key={step.number}
                                            onClick={() =>
                                                goToStep(index)
                                            }
                                            className={`
                        smbundle-workflow-node
                        smbundle-workflow-node--${index + 1
                                                }
                        ${activeStep ===
                                                    index
                                                    ? "is-active"
                                                    : ""
                                                }
                      `}
                                        >

                                            <b>
                                                {step.number}
                                            </b>

                                            <span>
                                                {step.node}
                                            </span>

                                        </button>
                                    ),
                                )}

                            </div>


                            {/* ===============================================
                  MOBILE LIST
                  =============================================== */}

                            <div className="smbundle-workflow-mobile-list">

                                {workflowSteps.map(
                                    (step) => (
                                        <article
                                            key={
                                                step.number
                                            }
                                        >
                                            <b>
                                                {
                                                    step.number
                                                }
                                            </b>

                                            <div>
                                                <h4>
                                                    {step.node}
                                                </h4>

                                                <p>
                                                    {
                                                        step.description
                                                    }
                                                </p>
                                            </div>
                                        </article>
                                    ),
                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}