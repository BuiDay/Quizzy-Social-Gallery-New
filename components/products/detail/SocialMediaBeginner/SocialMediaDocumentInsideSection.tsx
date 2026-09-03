"use client";

import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import Image1 from "@/assets/images/Social Media Beginner/2.png"
import Image2 from "@/assets/images/Social Media Beginner/3.png"
import Image3 from "@/assets/images/Social Media Beginner/4.png"
import Image4 from "@/assets/images/Social Media Beginner/5.png"
import Image5 from "@/assets/images/Social Media Beginner/6.png"
import Image6 from "@/assets/images/Social Media Beginner/7.png"

type Chapter = {
    image:any;
  number: string;
  title: string;
  description: string;
  contents: string[];
};

const chapters: Chapter[] = [
  {
    number: "01",
    image:Image1,
    title: "SOCIAL MEDIA\nMARKETING LÀ GÌ?",

    description:
      "Hiểu rõ hơn về Social Media và cách tận dụng các nền tảng để phát triển content.",

    contents: [
      "Social Media Marketing là gì?",
      "Vai trò của Social Media trong Marketing.",
      "Các nền tảng Social phổ biến hiện nay.",
      "Tổng quan về ngành Social Media.",
    ],
  },

  {
    number: "02",
    image:Image2,
    title: "SCOPE OF WORK CỦA\nNGƯỜI LÀM SOCIAL MEDIA",

    description:
      "Nắm rõ được các đầu việc của một người làm Social Media, và phân biệt rõ Social Media Marketing.",

    contents: [
      "Các công việc phổ biến của người làm Social Media.",
      "Các đầu việc cơ bản trong Social Media Marketing.",
      "Social Media vs. Content vs. Digital Marketing.",
      "Những skill cần có cho người làm Social Media Marketing khi mới bắt đầu.",
    ],
  },

  {
    number: "03",
    image:Image3,
    title: "CONTENT PILLAR &\nAUDIENCE",

    description:
      "Xác định đúng khách hàng mục tiêu và dựng bộ Content Pillar cơ bản làm xương sống cho nội dung.",

    contents: [
      "Target Audience là gì?",
      "Cách xác định khách hàng mục tiêu.",
      "Content Pillar là gì?",
      "Xây dựng Content Pillar cơ bản.",
    ],
  },

  {
    number: "04",
    image:Image4,
    title: "XÂY DỰNG SOCIAL\nMEDIA STRATEGY",

    description:
      "Các bước dựng một chiến lược Social Media: Từ mục tiêu, đối tượng, kênh và Content Direction.",

    contents: [
      "Social Media Strategy là gì?",
      "Các bước xây dựng Social Media Strategy.",
      "Xác định Mục tiêu & Đối tượng hướng đến.",
      "Chọn Kênh & xây dựng Content Direction phù hợp với Kênh.",
    ],
  },

  {
    number: "05",
    image:Image5,
    title: "TÌM HIỂU SOCIAL\nMEDIA METRI & KPI",

    description:
      "Các chỉ số quan trọng và cách đánh giá hiệu quả nội dung đúng cách.",

    contents: [
      "Các Metrics quan trọng cần biết.",
      "Cách đọc các báo cáo chỉ số Social Media.",
      "Cách phân tích hiệu quả chiến dịch Social Media.",
      "Từ đó, rút ra các insight đúng đắn cho chiến lược tiếp theo.",
    ],
  },

  {
    number: "06",
    image:Image6,
    title: "XÂY DỰNG CONTENT\nPLAN PHÙ HỢP",

    description:
      "Từ chiến lược, bắt đầu lên kế hoạch, phân bổ pillar và dựng một Content Plan trong 1 tuần.",

    contents: [
      "Content Plan là gì?",
      "Cách lên kế hoạch Content.",
      "Phân bổ Content Pillar.",
      "Xây dựng Content Plan trong 1 tuần.",
    ],
  },
];

export function SocialMediaDocumentInsideSection() {
  const [activeChapter, setActiveChapter] = useState("01");

  const navRef = useRef<HTMLDivElement>(null);

  const glowRef = useRef<HTMLDivElement>(null);

  const targetPosition = useRef({
    x: 0,
    y: 0,
  });

  const currentPosition = useRef({
    x: 0,
    y: 0,
  });

  const animationFrame = useRef<number | null>(null);

  /* ==========================================================
       CURRENT CHAPTER
       ========================================================== */

  const currentChapter = useMemo(
    () =>
      chapters.find((chapter) => chapter.number === activeChapter) ??
      chapters[0],

    [activeChapter]
  );

  /* ==========================================================
       PURPLE GLOW TARGET
       ========================================================== */

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const nav = navRef.current;

    if (!nav) return;

    const rect = nav.getBoundingClientRect();

    targetPosition.current.x = event.clientX - rect.left;

    targetPosition.current.y = event.clientY - rect.top;
  };

  /* ==========================================================
       SMOOTH FOLLOW
       ========================================================== */

  useEffect(() => {
    const nav = navRef.current;

    if (nav) {
      const rect = nav.getBoundingClientRect();

      targetPosition.current = {
        x: rect.width * 0.2,
        y: rect.height * 0.22,
      };

      currentPosition.current = {
        ...targetPosition.current,
      };
    }

    const animateGlow = () => {
      const glow = glowRef.current;

      if (glow) {
        /*
                  nhỏ hơn = trôi mềm hơn
                  0.055 khá hợp style website hiện tại
                */

        const ease = 0.15;

        currentPosition.current.x +=
          (targetPosition.current.x - currentPosition.current.x) * ease;

        currentPosition.current.y +=
          (targetPosition.current.y - currentPosition.current.y) * ease;

        glow.style.transform = `
          translate3d(
            ${currentPosition.current.x}px,
            ${currentPosition.current.y}px,
            0
          )
          translate(-50%, -50%)
        `;
      }

      animationFrame.current = requestAnimationFrame(animateGlow);
    };

    animationFrame.current = requestAnimationFrame(animateGlow);

    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <section className="smb-document" id="smb-document">
      {/* ======================================================
          NAV
          ====================================================== */}

      <div
        ref={navRef}
        className="smb-document-nav"
        onMouseMove={handleMouseMove}
      >
        {/* purple follow mouse */}

        <div
          ref={glowRef}
          className="smb-document-mouse-glow"
          aria-hidden="true"
        />

        {/* content */}

        <div className="wrap smb-document-nav-inner">
          <div className="smb-document-down" aria-hidden="true">
            ↓
          </div>

          <h2 className="smb-document-nav-title">
            KHÁM PHÁ BÊN TRONG TÀI LIỆU
          </h2>

          {/* TABS */}

          <div
            className="smb-document-tabs"
            role="tablist"
            aria-label="Các chương trong Social Media Beginner Ebook"
          >
            {chapters.map((chapter) => (
              <button
                key={chapter.number}
                type="button"
                role="tab"
                aria-selected={activeChapter === chapter.number}
                className={`
                    smb-document-tab
                    ${activeChapter === chapter.number ? "is-active" : ""}
                  `}
                onClick={() => setActiveChapter(chapter.number)}
              >
                {chapter.number}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================
          ACTIVE CHAPTER
          ====================================================== */}

      <div className="smb-document-content">
        <div className="wrap smb-document-content-inner">
          <article key={currentChapter.number} className="smb-document-card">
            {/* ================================================
                LEFT
                ================================================ */}

            <div className="smb-document-copy">
              <span className="smb-document-number">
                {currentChapter.number}
              </span>

              <div className="smb-document-main">
                <h3>
                  {currentChapter.title
                    .split("\n")
                    .map((line, index, array) => (
                      <span key={index}>
                        {line}

                        {index < array.length - 1 && <br />}
                      </span>
                    ))}
                </h3>

                <p className="smb-document-description">
                  {currentChapter.description}
                </p>

                <div className="smb-document-content-label">
                  NỘI DUNG CHƯƠNG
                </div>

                <ul className="smb-document-points">
                  {currentChapter.contents.map((item) => (
                    <li key={item}>
                      <i />

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ================================================
                RIGHT
                ================================================ */}

            <div className="smb-document-preview">
        
                <Image
                  src={currentChapter.image}
                  alt={currentChapter.title}
                  fill
                  className="smb-document-preview-image"
                />
          
             
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
