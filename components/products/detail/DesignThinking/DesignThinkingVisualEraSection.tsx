"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type VisualTile =
  | {
      type: "image";
      src?: string;
      alt: string;
    }
  | {
      type: "text";
      label: string;
      tone: "lime" | "purple" | "dark" | "lilac";
    };

/* ============================================================
   VISUAL WALL DATA

   Khi có ảnh thật, chỉ cần thêm:
   src: "/images/products/design-thinking/visual-01.jpg"
   ============================================================ */

const rowOne: VisualTile[] = [
  {
    type: "text",
    label: "BRAND\nGUIDELINE",
    tone: "lilac",
  },
  {
    type: "image",
    alt: "Social Media visual example 01",
  },
  {
    type: "text",
    label: "TYPOGRAPHY",
    tone: "lime",
  },
  {
    type: "image",
    alt: "Social Media visual example 02",
  },
  {
    type: "text",
    label: "VISUAL CUE",
    tone: "dark",
  },
  {
    type: "image",
    alt: "Social Media visual example 03",
  },
];

const rowTwo: VisualTile[] = [
  {
    type: "image",
    alt: "Social Media visual example 04",
  },
  {
    type: "text",
    label: "LOGO",
    tone: "dark",
  },
  {
    type: "image",
    alt: "Social Media visual example 05",
  },
  {
    type: "text",
    label: "ELEMENT",
    tone: "purple",
  },
  {
    type: "image",
    alt: "Social Media visual example 06",
  },
  {
    type: "text",
    label: "LAYOUT",
    tone: "lime",
  },
];

/* ============================================================
   TILE
   ============================================================ */

function VisualTileCard({
  item,
  index,
}: {
  item: VisualTile;
  index: number;
}) {
  if (item.type === "text") {
    return (
      <div
        className={`dth-visual-era-tile dth-visual-era-tile--text dth-visual-era-tile--${item.tone}`}
      >
        <span>
          {item.label.split("\n").map((line, lineIndex) => (
            <span key={lineIndex}>
              {line}
              {lineIndex < item.label.split("\n").length - 1 && (
                <br />
              )}
            </span>
          ))}
        </span>
      </div>
    );
  }

  return (
    <div className="dth-visual-era-tile dth-visual-era-tile--image">
      {item.src ? (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="220px"
          className="dth-visual-era-tile__image"
        />
      ) : (
        <div
          className={`dth-visual-era-placeholder dth-visual-era-placeholder--${
            (index % 4) + 1
          }`}
        >
          <span>QCC</span>

          <strong>
            SOCIAL
            <br />
            VISUAL
          </strong>

          <small>POST DESIGN</small>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   LOOPING ROW
   ============================================================ */

function VisualRow({
  items,
  direction,
}: {
  items: VisualTile[];
  direction: "left" | "right";
}) {
  return (
    <div
      className={`dth-visual-era-row dth-visual-era-row--${direction}`}
    >
      <div className="dth-visual-era-track">
        {Array.from({ length: 2 }, (_, group) => (
          <div
            className="dth-visual-era-group"
            key={group}
            aria-hidden={group === 1}
          >
            {items.map((item, index) => (
              <VisualTileCard
                key={`${group}-${index}`}
                item={item}
                index={index}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   SECTION
   ============================================================ */

export function DesignThinkingVisualEraSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
        rootMargin: "0px 0px -4% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`dth-visual-era ${
        isVisible ? "is-visible" : ""
      }`}
      id="design-thinking-visual-era"
    >
      {/* ======================================================
          TOP HERO
          ====================================================== */}

      <div className="dth-visual-era-top">
        {/* LEFT FLOATING CARDS */}

        <div
          className="dth-visual-era-float dth-visual-era-float--left"
          aria-hidden="true"
        >
          <div
            className="dth-visual-era-float-card dtftag"
            data-d="13"
          >
            <div className="dth-visual-era-float-card__inner dth-visual-era-float-card__inner--purple">
              VISUAL
              <br />
              POST
            </div>
          </div>

          <div
            className="dth-visual-era-float-card dtftag"
            data-d="20"
          >
            <div className="dth-visual-era-float-card__inner dth-visual-era-float-card__inner--lime">
              VISUAL
              <br />
              POST
            </div>
          </div>

          <div
            className="dth-visual-era-float-card dtftag"
            data-d="26"
          >
            <div className="dth-visual-era-float-card__inner dth-visual-era-float-card__inner--pink">
              VISUAL
              <br />
              POST
            </div>
          </div>
        </div>

        {/* CENTER TITLE */}

        <h2 className="dth-visual-era-title">
          <span className="dth-visual-era-title__outline">
            LÀM SOCIAL MEDIA
            <span
              className="dth-visual-era-eyes"
              aria-hidden="true"
            >
              👀
            </span>
          </span>

          <span className="dth-visual-era-title__lime">
            THỜI ĐẠI VISUAL
          </span>
        </h2>

        {/* RIGHT FLOATING CARDS */}

        <div
          className="dth-visual-era-float dth-visual-era-float--right"
          aria-hidden="true"
        >
          <div
            className="dth-visual-era-float-card dtftag"
            data-d="16"
          >
            <div className="dth-visual-era-float-card__inner dth-visual-era-float-card__inner--lime">
              VISUAL
              <br />
              POST
            </div>
          </div>

          <div
            className="dth-visual-era-float-card dtftag"
            data-d="22"
          >
            <div className="dth-visual-era-float-card__inner dth-visual-era-float-card__inner--pink">
              VISUAL
              <br />
              POST
            </div>
          </div>

          <div
            className="dth-visual-era-float-card dtftag"
            data-d="27"
          >
            <div className="dth-visual-era-float-card__inner dth-visual-era-float-card__inner--purple">
              VISUAL
              <br />
              POST
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          COPY
          ====================================================== */}

      <div className="dth-visual-era-copy">
        <h3>
          <span>VISUAL ĐI TRƯỚC,</span>
          <br />
          CON CHỮ THEO SAU
        </h3>

        <p>
          Người dùng lướt Facebook, Instagram, TikTok rất nhanh.
          Trước khi đọc caption hay quan tâm bạn đang nói gì,
          thứ họ nhìn thấy đầu tiên vẫn là{" "}
          <strong>Visual.</strong>
        </p>
      </div>

      {/* ======================================================
          VISUAL WALL
          ====================================================== */}

      <div className="dth-visual-era-wall">
        <VisualRow
          items={rowOne}
          direction="left"
        />

        <VisualRow
          items={rowTwo}
          direction="right"
        />
      </div>
    </section>
  );
}