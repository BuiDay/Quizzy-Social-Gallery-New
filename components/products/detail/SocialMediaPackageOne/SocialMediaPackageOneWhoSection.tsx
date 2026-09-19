"use client";

import { useEffect, useRef } from "react";

const items = [
  {
    no: "01",
    title: "BẠN MỚI BẮT ĐẦU\nLÀM SOCIAL MEDIA",
    desc: "Muốn có một Portfolio/CV chỉnh chu để bắt đầu tìm việc, đồng thời hiểu cách xây Strategy và Plan cho một project.",
    featured: false,
  },
  {
    no: "02",
    title: "FREELANCER\nCHUYÊN NGHIỆP",
    desc: "Muốn vừa nâng cấp Portfolio để thể hiện năng lực, vừa có framework để triển khai project bài bản hơn.",
    featured: true,
  },
  {
    no: "03",
    title: "SOCIAL MEDIA INTERN/EXECUTIVE",
    desc: "Muốn hệ thống lại cách làm Social Media từ Portfolio, tư duy chiến lược đến kế hoạch triển khai.",
    featured: false,
  },
];

export function SocialMediaPackageOneWhoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLSpanElement | null)[]>([]);


  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
  
    if (!section || !track) return;
  
    let frameId = 0;
  
    let currentX = 0;
    let targetX = 0;
  
    const isDesktop = () => window.innerWidth > 880;
  
    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);
  
    const updateTarget = () => {
      if (!isDesktop()) {
        targetX = 0;
        return;
      }
  
      const viewportHeight = window.innerHeight;
  
      const scrollableHeight = Math.max(
        section.offsetHeight - viewportHeight,
        1,
      );
  
      const rect = section.getBoundingClientRect();
  
      const progress = clamp(
        -rect.top / scrollableHeight,
        0,
        1,
      );
  
      // Đi hết chiều dài track, không cắt mất box cuối.
      const maxTranslate = Math.max(
        track.scrollWidth - window.innerWidth,
        0,
      );
  
      targetX = -progress * maxTranslate;
  
      const active = Math.min(
        stepRefs.current.length - 1,
        Math.round(progress * (stepRefs.current.length - 1)),
      );
  
      stepRefs.current.forEach((step, index) => {
        step?.classList.toggle("is-active", index === active);
      });
    };
  
    const animate = () => {
      if (!isDesktop()) {
        currentX = 0;
        targetX = 0;
        track.style.transform = "none";
      } else {
        // Lerp: tăng lên để bám scroll nhanh hơn,
        // giảm xuống để chuyển động mềm hơn.
        const ease = 0.12;
  
        currentX += (targetX - currentX) * ease;
  
        // Tránh các sai số nhỏ khiến track rung liên tục.
        if (Math.abs(targetX - currentX) < 0.1) {
          currentX = targetX;
        }
  
        track.style.transform =
          `translate3d(${currentX}px, 0, 0)`;
      }
  
      frameId = window.requestAnimationFrame(animate);
    };
  
    const handleScroll = () => {
      updateTarget();
    };
  
    const handleResize = () => {
      updateTarget();
  
      if (!isDesktop()) {
        currentX = 0;
        targetX = 0;
        track.style.transform = "none";
      }
    };
  
    updateTarget();
  
    // Đặt đúng vị trí ban đầu để tránh track chạy từ 0
    // khi người dùng refresh ở giữa section.
    currentX = targetX;
  
    track.style.transform = isDesktop()
      ? `translate3d(${currentX}px, 0, 0)`
      : "none";
  
    frameId = window.requestAnimationFrame(animate);
  
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.cancelAnimationFrame(frameId);
  
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="smpkg1-who"
    >
      <div className="smpkg1-who__pin">
        <div className="smpkg1-who__topline">
          <h2 className="smpkg1-who__title">
            PACKAGE NÀY PHÙ HỢP VỚI AI?
          </h2>
        </div>

        <div
          ref={trackRef}
          className="smpkg1-who__track"
        >
          {items.map((item, index) => (
            <article
              key={index}
              className={`smpkg1-who__card ${
                item.featured ? "is-featured" : ""
              }`}
            >
              <div className="smpkg1-who__no">{item.no}</div>

              <div className="smpkg1-who__body">
                <h3 className="smpkg1-who__card-title">
                  {item.title.split("\n").map((line, lineIndex) => (
                    <span key={lineIndex}>
                      {line}
                      {lineIndex !== item.title.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </h3>

                <p className="smpkg1-who__card-desc">{item.desc}</p>
              </div>
            </article>
          ))}

          <article className="smpkg1-who__card smpkg1-who__card--end">
            <p className="smpkg1-who__end-text">
              Nếu bạn đang ở một trong những giai đoạn này thì mình nghĩ{" "}
              <span>Package 01</span> sẽ giúp bạn tiết kiệm được kha khá
              thời gian.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}