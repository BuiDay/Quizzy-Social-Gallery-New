"use client";

import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import chapters1 from "@/assets/images/TikTok Ideas Hacking/chapter1 (1).png";
import chapters2 from "@/assets/images/TikTok Ideas Hacking/chapter1 (2).png";
import chapters3 from "@/assets/images/TikTok Ideas Hacking/chapter1 (3).png";
import chapters4 from "@/assets/images/TikTok Ideas Hacking/chapter1 (4).png";
import chapters5 from "@/assets/images/TikTok Ideas Hacking/chapter1 (5).png";
import chapters6 from "@/assets/images/TikTok Ideas Hacking/chapter1 (6).png";
import chapters7 from "@/assets/images/TikTok Ideas Hacking/chapter1 (7).png";
import chapters8 from "@/assets/images/TikTok Ideas Hacking/chapter1 (8).png";

type DocumentChapter = {
  image: any;
  number: string;
  title: string;
  description: string;
  contents: string[];
};

const chapters: DocumentChapter[] = [
  {
    image: chapters1,
    number: "01",
    title: "TIKTOK: TẠI SAO ĐÂY\nLÀ NỀN TẢNG SỐ 1?",
    description:
      "Hiểu rõ hơn về TikTok và cách tận dụng nền tảng này để phát triển content.",
    contents: [
      "TikTok hoạt động như thế nào?",
      "Vì sao TikTok có khả năng lan tỏa content mạnh?",
      "TikTok có thể phục vụ những mục tiêu gì?",
      "Cách nhìn TikTok như một công cụ xây thương hiệu và tạo cơ hội kinh doanh.",
    ],
  },
  {
    image: chapters2,
    number: "02",
    title: "IDEAS\nHACKING",
    description:
      "Học cách tìm kiếm và phát triển ý tưởng thay vì ngồi chờ idea tự xuất hiện.",
    contents: [
      "Quan sát và nhận diện những content có tiềm năng.",
      "Khai thác trend, viral content và insight.",
      "Hack một idea thành nhiều hướng.",
      "Tái sử dụng và phát triển từ những content sẵn có.",
    ],
  },
  {
    image: chapters3,
    number: "03",
    title: "CÔNG THỨC HOOK –\nBODY – CTA",
    description: "Biến một idea thành một video hoàn chỉnh.",
    contents: [
      "Cách xây dựng Hook để thu hút người xem.",
      "Công thức triển khai phần Body rõ ràng, dễ theo dõi.",
      "Cách sử dụng CTA phù hợp với từng mục tiêu content.",
      "Template Hook và template triển khai nội dung có thể áp dụng ngay.",
    ],
  },
  {
    image: chapters4,
    number: "04",
    title: "XÂY DỰNG CONCEPT\nKÊNH TIKTOK",
    description: "Để kênh không chỉ là tập hợp của những video ngẫu nhiên.",
    contents: [
      "Xác định concept phù hợp với cá nhân/thương hiệu.",
      "Xây dựng các nhóm nội dung cho kênh.",
      "Tạo sự nhất quán trong cách triển khai content.",
      "Phát triển những series có thể làm lâu dài.",
    ],
  },
  {
    image: chapters5,
    number: "05",
    title: "GIẢI PHÁP KHI BÍ Ý\nTƯỞNG",
    description: "Khi không biết đăng gì, bạn vẫn biết tìm idea ở đâu.",
    contents: [
      "Khai thác trend và các cuộc hội thoại trên mạng xã hội.",
      "Tìm insight từ khách hàng và người xem.",
      "Biến content cũ thành những ý tưởng mới.",
      "Dùng công cụ để tìm kiếm và phát triển idea.",
    ],
  },
  {
    image: chapters6,
    number: "06",
    title: "30+ TIKTOK SCRIPTS\nCHO 10 NGÀNH HÀNG",
    description: "Tham khảo cách một idea được biến thành nội dung thực tế.",
    contents: [
      "30+ TikTok Scripts mẫu.",
      "10 ngành hàng khác nhau.",
      "Nhiều hướng triển khai content để tham khảo.",
      "Dễ dàng ứng dụng cho sản phẩm, thương hiệu của bạn.",
    ],
  },
  {
    image: chapters7,
    number: "07",
    title: "ĐO LƯỜNG & TỐI ƯU\nKÊNH TIKTOK",
    description: "Biết đọc dữ liệu để làm content tốt hơn.",
    contents: [
      "Những chỉ số quan trọng cần theo dõi.",
      "Cách đọc Retention, Engagement và Conversion.",
      "Xác định content nào đang thực sự hiệu quả.",
      "Tìm điểm cần tối ưu cho video tiếp theo.",
    ],
  },
  {
    image: chapters8,
    number: "08",
    title: "RESOURCE\nLIBRARY",
    description:
      "Một thư viện tài nguyên hỗ trợ bạn trong quá trình xây dựng TikTok.",
    contents: [
      "Các công cụ hỗ trợ làm content.",
      "Nguồn tìm kiếm trend và idea.",
      "Template và tài nguyên hữu ích.",
      "Giúp tiết kiệm thời gian trong quá trình lên và triển khai content.",
    ],
  },
];

export function TiktokDocumentInsideSection() {
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

  const currentChapter = useMemo(
    () =>
      chapters.find((chapter) => chapter.number === activeChapter) ??
      chapters[0],
    [activeChapter]
  );

  /* ============================================================
       PURPLE GLOW FOLLOW MOUSE
       ============================================================ */

  const handleNavMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const nav = navRef.current;

    if (!nav) return;

    const rect = nav.getBoundingClientRect();

    targetPosition.current.x = event.clientX - rect.left;

    targetPosition.current.y = event.clientY - rect.top;
  };

  useEffect(() => {
    const animateGlow = () => {
      const glow = glowRef.current;

      if (!glow) {
        animationFrame.current = requestAnimationFrame(animateGlow);

        return;
      }

      /*
              LERP
        
              0.06 = chậm, mềm
              0.1 = cân bằng
              0.15 = nhanh hơn
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

      animationFrame.current = requestAnimationFrame(animateGlow);
    };

    animationFrame.current = requestAnimationFrame(animateGlow);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <section className="tiktok-document-inside" id="document-inside">
      {/* ========================================================
          NAV
          ======================================================== */}

      <div
        ref={navRef}
        className="tiktok-document-nav"
        onMouseMove={handleNavMouseMove}
      >
        {/* mouse-follow purple glow */}
        <div
          ref={glowRef}
          className="tiktok-document-mouse-glow"
          aria-hidden="true"
        />

        <div className="wrap tiktok-document-nav-inner">
          <div className="tiktok-document-down" data-rv="up" aria-hidden="true">
            ↓
          </div>

          <h2 className="tiktok-document-nav-title" data-rv="up" data-dl="60">
            KHÁM PHÁ BÊN TRONG TÀI LIỆU
          </h2>

          {/* ================= CHAPTER BUTTONS ================= */}

          <div className="tiktok-document-tabs" data-rv="up" data-dl="120">
            {chapters.map((chapter) => (
              <button
                key={chapter.number}
                type="button"
                className={`tiktok-document-tab ${
                  activeChapter === chapter.number ? "is-active" : ""
                }`}
                aria-pressed={activeChapter === chapter.number}
                onClick={() => setActiveChapter(chapter.number)}
              >
                {chapter.number}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================
          ONLY ACTIVE CHAPTER
          ======================================================== */}

      <div className="tiktok-document-content">
        <div className="wrap tiktok-document-single">
          <article
            key={currentChapter.number}
            className="tiktok-document-card tiktok-document-card--active"
          >
            {/* ================= LEFT ================= */}

            <div className="tiktok-document-card-copy">
              <span className="tiktok-document-number">
                {currentChapter.number}
              </span>

              <div className="tiktok-document-card-main">
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

                <p className="tiktok-document-card-description">
                  {currentChapter.description}
                </p>

                <div className="tiktok-document-content-label">
                  NỘI DUNG CHƯƠNG
                </div>

                <ul className="tiktok-document-points">
                  {currentChapter.contents.map((content) => (
                    <li key={content}>
                      <i />

                      <span>{content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ================= RIGHT IMAGE ================= */}

            <div className="tiktok-document-preview">
              <Image
                src={currentChapter.image}
                alt={currentChapter.title}
                fill
                className="tiktok-document-preview-image"
              />

            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
