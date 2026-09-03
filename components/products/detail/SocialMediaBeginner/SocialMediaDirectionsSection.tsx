"use client";

import { useEffect, useRef, useState } from "react";

const directions = [
    {
        label: "Agency",
        className: "agency",
        tone: "purple",
        rotate: "-8deg",
        hoverRotate: "4deg",
    },
    {
        label: "Freelance",
        className: "freelance",
        tone: "white",
        rotate: "5deg",
        hoverRotate: "-3deg",
    },
    {
        label: "Content Creator",
        className: "creator",
        tone: "lime",
        rotate: "-4deg",
        hoverRotate: "4deg",
    },
    {
        label: "Personal Branding",
        className: "branding",
        tone: "black",
        rotate: "14deg",
        hoverRotate: "-4deg",
    },
    {
        label: "Big Corporation",
        className: "corporation",
        tone: "blue",
        rotate: "0deg",
        hoverRotate: "3deg",
    },
    {
        label: "Social Media Specialist",
        className: "specialist",
        tone: "purple",
        rotate: "-1deg",
        hoverRotate: "-4deg",
    },
    {
        label: "SMEs",
        className: "smes",
        tone: "white",
        rotate: "4deg",
        hoverRotate: "4deg",
    },
    {
        label: "Start-up",
        className: "startup",
        tone: "purple",
        rotate: "-8deg",
        hoverRotate: "3deg",
    },
    {
        label: "Influencer Marketing",
        className: "influencer",
        tone: "blue",
        rotate: "7deg",
        hoverRotate: "-4deg",
    },
    {
        label: "Community Management",
        className: "community",
        tone: "lime",
        rotate: "-5deg",
        hoverRotate: "4deg",
    },
];

export function SocialMediaDirectionsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.22,
            },
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`smb-directions ${isVisible ? "is-visible" : ""
                }`}
        >
            <div className="wrap smb-directions-inner">

                {/* ================= HEADING ================= */}

                <h2 className="smb-directions-title">
                    Và{" "}

                    <span className="smb-directions-outline">
                        Social Media Marketing
                    </span>{" "}

                    cũng sẽ giúp bạn

                    <br />

                    <span className="smb-directions-highlight smb-directions-highlight--purple">
                        sẵn sàng
                    </span>{" "}

                    cho bất kỳ{" "}

                    <span className="smb-directions-highlight smb-directions-highlight--lime">
                        hướng đi nào
                    </span>
                    .
                </h2>


                {/* ================= BOX CLOUD ================= */}

                <div className="smb-directions-cloud">
                    {directions.map((item, index) => (
                        <div
                            key={item.label}
                            className={`
                                smb-direction-chip
                                smb-direction-chip--${item.className}
                                smb-direction-chip--${item.tone}
                            `}
                            style={
                                {
                                    "--chip-rotate": item.rotate,
                                    "--chip-hover-rotate": item.hoverRotate,
                                    "--chip-delay": `${0.04 + index * 0.065}s`,
                                } as React.CSSProperties
                            }
                        >
                            <div className="smb-direction-chip-inner">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}