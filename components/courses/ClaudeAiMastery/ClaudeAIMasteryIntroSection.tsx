"use client";

import Image, { type StaticImageData } from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";

type ClaudeAIMasteryIntroSectionProps = {
  profileImage?: string | StaticImageData;
  videoPoster?: string | StaticImageData;
  videoSrc?: string;
};

export function ClaudeAIMasteryIntroSection({
  profileImage,
  videoPoster,
  videoSrc,
}: ClaudeAIMasteryIntroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] =
    useState(false);

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
        threshold: 0.14,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`claude-intro ${
        isVisible ? "is-visible" : ""
      }`}
      id="claude-intro"
    >
      <div className="claude-intro__inner">
        {/* =========================================
            HEADLINE
            ========================================= */}

        <h2 className="claude-intro__heading">
          Từ tư duy{" "}
          <span className="claude-intro__outline">
            đóng gói quy trình Social Media
          </span>{" "}
          đến
          <br />
          ứng dụng Claude để{" "}
          <span className="claude-intro__lime">
            tự động hóa công việc
          </span>
          .
        </h2>

        {/* =========================================
            BODY
            ========================================= */}

        <div className="claude-intro__body">
          {/* PROFILE */}

          <article className="claude-intro-profile">
            <div className="claude-intro-profile__header">
              <div className="claude-intro-profile__avatar">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Quizzy Nguyen"
                    fill
                    sizes="100px"
                    className="claude-intro-profile__avatar-image"
                  />
                ) : (
                  <span>Q</span>
                )}
              </div>

              <div className="claude-intro-profile__identity">
                <h3>QUIZZY NGUYEN</h3>

                <span>
                  5+ năm kinh nghiệm Social Media Marketing
                </span>
              </div>
            </div>

            <div className="claude-intro-profile__statement">
              <strong>
                1SCALE UP 15+ CLIENT / THÁNG
              </strong>{" "}
              CHỈ BẰNG CÁCH ĐỔI TƯ DUY LÀM VIỆC VỚI CLAUDE
            </div>

            <div className="claude-intro-profile__divider" />

            <p className="claude-intro-profile__description">
              Hơn hai tháng qua, Quizzy nghiên cứu và bắt đầu
              đưa Claude vào từng bước trong workflow để giảm
              những việc có thể tự động hóa, giải phóng hàng giờ
              làm việc và dành thời gian cho những phần thực sự
              cần tư duy.
            </p>

            <p className="claude-intro-profile__highlight">
              Làm được nhiều việc hơn, nhận thêm client mà không
              có nghĩa là phải làm việc nhiều giờ hơn.
            </p>
          </article>

          {/* VIDEO */}

          <div className="claude-intro-video-wrap">
            <div className="claude-intro-video">
              {videoSrc ? (
                <video
                  className="claude-intro-video__media"
                  controls
                  playsInline
                  preload="metadata"
                  poster={
                    typeof videoPoster === "string"
                      ? videoPoster
                      : undefined
                  }
                >
                  <source
                    src={videoSrc}
                    type="video/mp4"
                  />
                </video>
              ) : videoPoster ? (
                <Image
                  src={videoPoster}
                  alt="Video giới thiệu khóa học Claude AI Mastery"
                  fill
                  sizes="(max-width: 760px) 90vw, 52vw"
                  className="claude-intro-video__poster"
                />
              ) : (
                <div className="claude-intro-video__placeholder">
                  <div className="claude-intro-video__cloud">
                    <i />
                    <i />
                    <i />
                  </div>

                  <strong>
                    VIDEO GIỚI THIỆU KHÓA HỌC
                  </strong>

                  <div className="claude-intro-video__hill claude-intro-video__hill--back" />
                  <div className="claude-intro-video__hill claude-intro-video__hill--front" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}