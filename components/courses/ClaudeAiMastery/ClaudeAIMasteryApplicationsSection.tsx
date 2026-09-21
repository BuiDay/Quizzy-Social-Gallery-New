"use client";

import Image, { type StaticImageData } from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type CourseImage = string | StaticImageData;

type ApplicationItem = {
  id: string;
  title: string;
  subtitle: string;
  image?: CourseImage;
  icon: ReactNode;
};

type Props = {
  researchImage?: CourseImage;
  contentImage?: CourseImage;
  designImage?: CourseImage;
  dataImage?: CourseImage;
  careerImage?: CourseImage;
  purchaseUrl?: string;
};

/* ============================================================
   ICONS
   ============================================================ */

function ResearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5" />
    </svg>
  );
}

function ContentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3.5h7l4 4V20H7z" />
      <path d="M14 3.5V8h4" />
      <path d="M10 12h5M10 15h5" />
    </svg>
  );
}

function DesignIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5c-4.8 0-8.5 3.2-8.5 7.3 0 4.3 3.6 7.7 8 7.7h1.1c1.1 0 1.8-.8 1.8-1.8 0-.8-.5-1.3-.5-2 0-.9.7-1.7 1.7-1.7H18c1.7 0 2.5-1.2 2.5-2.8C20.5 6.4 16.7 3.5 12 3.5Z" />
      <circle cx="8" cy="9" r=".9" />
      <circle cx="11.5" cy="7" r=".9" />
      <circle cx="15" cy="8.5" r=".9" />
    </svg>
  );
}

function DataIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 20V10M10 20V6M15 20v-8M20 20V4" />
      <path d="M3 20h19" />
    </svg>
  );
}

function CareerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M9 7V5.5c0-.8.7-1.5 1.5-1.5h3c.8 0 1.5.7 1.5 1.5V7" />
      <path d="M3 12h18M10 12v2h4v-2" />
    </svg>
  );
}

/* ============================================================
   COMPONENT
   ============================================================ */

export function ClaudeAIMasteryApplicationsSection({
  researchImage,
  contentImage,
  designImage,
  dataImage,
  careerImage,
  purchaseUrl = "#claude-register",
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  const items: ApplicationItem[] = [
    {
      id: "research",
      title: "RESEARCH",
      subtitle: "assistant",
      image: researchImage,
      icon: <ResearchIcon />,
    },
    {
      id: "content",
      title: "CONTENT",
      subtitle: "assistant",
      image: contentImage,
      icon: <ContentIcon />,
    },
    {
      id: "design",
      title: "DESIGN",
      subtitle: "assistant",
      image: designImage,
      icon: <DesignIcon />,
    },
    {
      id: "data",
      title: "DATA ANALYSIS",
      subtitle: "assistant",
      image: dataImage,
      icon: <DataIcon />,
    },
    {
      id: "career",
      title: "JOB & CAREER",
      subtitle: "assistant",
      image: careerImage,
      icon: <CareerIcon />,
    },
  ];

  const activeItem = items[activeIndex];

  /* =========================================================
     RESPONSIVE MODE
     ========================================================= */

  useEffect(() => {
    const media = window.matchMedia("(min-width: 761px)");

    const update = () => {
      setIsDesktop(media.matches);
    };

    update();

    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  /* =========================================================
     SCROLL TRIGGER
     ========================================================= */

  useEffect(() => {
    if (!isDesktop) return;

    const section = sectionRef.current;

    if (!section) return;

    let raf = 0;

    const updateActiveFromScroll = () => {
      raf = 0;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      /*
        Section có sticky stage.
        Chỉ tính phần scroll sau khi stage bắt đầu pin.
      */

      const totalScrollable =
        section.offsetHeight - viewportHeight;

      if (totalScrollable <= 0) return;

      const travelled = -rect.top;

      const progress = Math.min(
        1,
        Math.max(0, travelled / totalScrollable),
      );

      const nextIndex = Math.min(
        items.length - 1,
        Math.floor(progress * items.length),
      );

      if (activeRef.current !== nextIndex) {
        activeRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    const handleScroll = () => {
      if (raf) return;

      raf = window.requestAnimationFrame(
        updateActiveFromScroll,
      );
    };

    updateActiveFromScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (raf) {
        window.cancelAnimationFrame(raf);
      }
    };
  }, [isDesktop, items.length]);

  /* =========================================================
     MANUAL TAB CLICK
     ========================================================= */

  const selectItem = (index: number) => {
    activeRef.current = index;
    setActiveIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      className="claude-applications"
      id="claude-applications"
    >
      <div className="claude-applications__sticky">
        <div className="claude-applications__inner">

          {/* =====================================
              INTRO
              ===================================== */}

          <p className="claude-applications__intro">
            Và mình chắc chắn dưới đây là một số ứng dụng
            trong rất nhiều ứng dụng thực tế
            <br />
            bạn sẽ trực tiếp tạo ra và có thể tiếp tục sử dụng
            sau khóa học:
          </p>

          {/* =====================================
              TABS
              ===================================== */}

          <div
            className="claude-applications__tabs"
            role="tablist"
            aria-label="Ứng dụng Claude AI"
          >
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                className={`claude-application-tab ${
                  activeIndex === index
                    ? "is-active"
                    : ""
                }`}
                onClick={() => selectItem(index)}
                data-cur="OPEN"
              >
                <span className="claude-application-tab__icon">
                  {item.icon}
                </span>

                <strong>{item.title}</strong>

                <small>{item.subtitle}</small>
              </button>
            ))}
          </div>

          {/* =====================================
              VISUAL
              ===================================== */}

          <div className="claude-applications__visual-shell">
            <div
              key={activeItem.id}
              className="claude-applications__visual"
            >
              {activeItem.image ? (
                <Image
                  src={activeItem.image}
                  alt={`${activeItem.title} Claude AI application`}
                  fill
                  sizes="(max-width: 560px) 80vw, 850px"
                  className="claude-applications__image"
                />
              ) : (
                <ApplicationPlaceholder
                  item={activeItem}
                />
              )}
            </div>
          </div>

          {/* =====================================
              PROGRESS
              ===================================== */}

          <div
            className="claude-applications__progress"
            aria-hidden="true"
          >
            {items.map((item, index) => (
              <span
                key={item.id}
                className={
                  index === activeIndex
                    ? "is-active"
                    : index < activeIndex
                      ? "is-done"
                      : ""
                }
              />
            ))}
          </div>

          {/* =====================================
              CTA
              ===================================== */}

          <a
            href={purchaseUrl}
            className="claude-applications__cta"
            data-cur="OPEN"
          >
            <span>
              MÌNH MUỐN SỞ HỮU KHÓA HỌC NGAY!
            </span>

            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PLACEHOLDER
   ============================================================ */

function ApplicationPlaceholder({
  item,
}: {
  item: ApplicationItem;
}) {
  return (
    <div className="claude-applications-placeholder">
      <div className="claude-applications-placeholder__sky">
        <span className="claude-applications-placeholder__cloud claude-applications-placeholder__cloud--1" />
        <span className="claude-applications-placeholder__cloud claude-applications-placeholder__cloud--2" />
        <span className="claude-applications-placeholder__cloud claude-applications-placeholder__cloud--3" />

        <div className="claude-applications-placeholder__label">
          <span>
            {item.icon}
          </span>

          <strong>
            {item.title}
          </strong>
        </div>

        <div className="claude-applications-placeholder__hill claude-applications-placeholder__hill--back" />
        <div className="claude-applications-placeholder__hill claude-applications-placeholder__hill--front" />
      </div>
    </div>
  );
}