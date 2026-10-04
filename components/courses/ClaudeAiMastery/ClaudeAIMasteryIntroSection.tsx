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
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isVisible, setIsVisible] =
    useState(false);
  const [isMuted, setIsMuted] =
    useState(true);
  const [isPlaying, setIsPlaying] =
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

  useEffect(() => {
    if (!isVisible || !videoRef.current) return;

    const video = videoRef.current;

    video.muted = true;
    setIsMuted(true);

    video.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      setIsPlaying(false);
      // Autoplay muted is normally allowed, but safely ignore if blocked.
    });
  }, [isVisible]);

  const handleEnableSound = () => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = false;
    setIsMuted(false);

    video.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      setIsPlaying(false);
      // This click counts as user interaction, so playback should normally work.
    });
  };

  const togglePlayPause = () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      video.play().catch(() => { });
    } else {
      video.pause();
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`claude-intro ${isVisible ? "is-visible" : ""
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
                TĂNG QUY MÔ QUẢN LÝ KHÁCH HÀNG LÊN ĐẾN 20 CLIENT/THÁNG
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
                <>
                  <video
                    ref={videoRef}
                    className="claude-intro-video__media"
                    playsInline
                    muted
                    preload="metadata"
                    poster={
                      typeof videoPoster === "string"
                        ? videoPoster
                        : undefined
                    }
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src={videoSrc} type="video/mp4" />
                  </video>

                  <button
                    type="button"
                    className="claude-intro-video__playpause"
                    onClick={togglePlayPause}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? (
                      <span className="pause-icon">
                        <i />
                        <i />
                      </span>
                    ) : (
                      <span className="play-icon" />
                    )}
                  </button>

                  {isMuted && isVisible && (
                  <button
                    type="button"
                    onClick={handleEnableSound}
                    aria-label="Bật âm thanh video"
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: "20px",
                      zIndex: 5,
                      transform: "translateX(-50%)",
                      border: "1px solid rgba(255, 255, 255, 0.24)",
                      borderRadius: "999px",
                      padding: "10px 16px",
                      background: "rgba(0, 0, 0, 0.72)",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: 700,
                      cursor: "pointer",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                    }}
                  >
                    🔊 Bật âm thanh
                  </button>
                )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}