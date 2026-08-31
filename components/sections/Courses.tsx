"use client";
import type { KeyboardEvent } from "react";
import { course } from "@/data/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { useModal } from "@/components/ui/ModalContext";
import ClaudeAIMastery from "@/assets/images/1.png"
import Image from "next/image";

export function Courses() {
    const { openModal } = useModal();
    return (
        <section className="courses sec" id="courses">
            <div className="wrap">
                <Eyebrow data-rv="up">02 / Khóa học</Eyebrow>
                <div className="courses-head">
                    <div className="courses-head-inner">
                        <h2 className="courses-main-title" data-rv="up" data-dl="70">
                            Biến kỹ năng{" "}
                            <span className="courses-highlight">Social Media</span>
                            <br />
                            thành cơ hội tăng thu nhập
                        </h2>

                        <p className="courses-head-desc" data-rv="up" data-dl="150">
                            Dù bạn là <strong>Social Media Executive</strong>,{" "}
                            <strong>Freelancer</strong>, <strong>Content Creator</strong> hay
                            đang xây dựng thương hiệu cá nhân, các khóa học sẽ giúp bạn củng
                            cố kiến thức, trang bị công cụ và định hình hướng đi rõ ràng hơn
                            trong công việc.
                        </p>
                    </div>
                </div>
                <article
                    className="course"
                    data-rv="up"
                    tabIndex={0}
                    data-cur="OPEN"
                >
                    <div className="course-vis">
                        <Image
                            src={ClaudeAIMastery}
                            alt="Claude AI Mastery"
                            className="course-image"
                        />

                        <span
                            className="mesh m1"
                            style={{
                                width: "70%",
                                top: "-16%",
                                left: "-10%",
                                background: "var(--lilac)",
                                opacity: 0.75,
                            }}
                        />

                        <span
                            className="mesh m2"
                            style={{
                                width: "55%",
                                bottom: "-12%",
                                right: "-8%",
                                background: "var(--sky)",
                                opacity: 0.8,
                            }}
                        />

                        <span className="cbadge glass">
                            Khoá học Online
                        </span>

                        <span className="cnum">
                            01
                        </span>
                    </div>
                    <div className="course-body">
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Eyebrow>AI</Eyebrow>
                            <Eyebrow>SOCIAL MEDIA</Eyebrow>
                        </div>

                        <h3 className="h2">Claude AI Mastery</h3>
                        <p className="lead">
                            Tự động hóa công việc Social Media với Claude AI — từ xây
                            workflow, xử lý tài liệu, nghiên cứu, lên ý tưởng đến sản xuất nội
                            dung, thay vì làm mọi thứ thủ công từ đầu.
                        </p>
                        <div className="cmeta">
                            <span>8 module</span>
                            <span>+20 tài liệu truy cập vĩnh viễn</span>
                        </div>
                        <div>
                            <span className="btn solid mag" data-cur="OPEN">
                                <span>
                                    Xem chi tiết khóa học <ArrowRightIcon />
                                </span>
                            </span>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}
