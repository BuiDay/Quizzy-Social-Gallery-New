"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type Chapter = {
  number: string;
  title: string;
  description: string;
  bullets: string[];
  image?: string;
};

const chapters: Chapter[] = [
  {
    number: "01",
    title: "NHẬP MÔN THIẾT KẾ CHO NEWBIE",
    description:
      "Giúp bạn làm quen với tư duy thẩm mỹ cơ bản và thiết lập tiêu chuẩn đánh giá ấn phẩm hiệu quả.",
    bullets: [
      "Xác định mục tiêu truyền tải thông điệp.",
      "Phân tích các thiết kế mẫu để hiểu insight ngành.",
      "Quan sát thực tế để cải thiện tư duy thị giác.",
      "Đánh giá ấn phẩm qua tính hiệu quả.",
    ],
  },
  {
    number: "02",
    title: "QUY TRÌNH BRIEF THIẾT KẾ CHUẨN",
    description:
      "Chuẩn hóa 4 bước biến ý tưởng sơ khai thành sản phẩm thiết kế hoàn chỉnh.",
    bullets: [
      "Nghiên cứu kỹ tài liệu và phong cách thương hiệu.",
      "Phác thảo các ý tưởng bố cục ra giấy.",
      "Tạo bảng Moodboard để định hình màu sắc, font.",
      "Thực hành trực tiếp Canva.",
    ],
  },
  {
    number: "03",
    title: "NẮM VỮNG NGUYÊN TẮC TRONG THIẾT KẾ",
    description:
      "Nắm các nguyên tắc cốt lõi về bố cục, phối màu và trình bày văn bản trên Social Post.",
    bullets: [
      "Tối ưu khoảng trắng và căn lề hợp lý.",
      "Tối giản câu từ giúp nắm bắt thông tin.",
      "Phối màu chuẩn xác bằng bánh xe màu sắc.",
      "Phân cấp chữ rõ ràng và sửa lỗi hiển thị.",
    ],
  },
  {
    number: "04",
    title: "THAM KHẢO CÁC ẤN PHẨM SOCIAL POSTS",
    description:
      "Áp dụng phong cách thiết kế thực tế được tối ưu hóa cho từng ngành hàng.",
    bullets: [
      "Thiết kế bài F&B.",
      "Thiết kế bài Healthcare.",
      "Thiết kế bài Giáo dục.",
      "Thiết kế Social Post trên nền tảng Instagram và TikTok.",
    ],
  },
  {
    number: "05",
    title: "CÁC NGUỒN HỌC THIẾT KẾ",
    description:
      "Tổng hợp các nguồn tài nguyên uy tín để nâng cao tư duy sáng tạo mỗi ngày.",
    bullets: [
      "Học hỏi các mẹo xử lý hiệu ứng nhanh.",
      "Trau dồi nguyên tắc qua bài viết chuyên sâu.",
      "Khám phá nguồn cảm hứng phong cách Trung Hoa.",
      "Tìm kiếm và ứng dụng bộ font Việt hóa.",
    ],
  },
  {
    number: "06",
    title: "HƯỚNG DẪN CÁC TÁC VỤ CANVA",
    description:
      "Làm chủ kỹ thuật và áp dụng các mẹo xử lý tác vụ thiết kế cực nhanh trên Canva.",
    bullets: [
      "Căn lề chuẩn xác bằng tính năng hiển thị.",
      "Xử lý xóa nền ảnh và kiểm tra tương phản.",
      "Quản lý tải lên font chữ và tra cứu font.",
      "Tìm kiếm thành phần thiết kế qua từ khóa.",
    ],
  },
];

export function DesignThinkingDocumentInsideSection() {
  const headerRef = useRef<HTMLDivElement>(null);

  const glowTarget = useRef({
    x: 50,
    y: 50,
  });

  const glowCurrent = useRef({
    x: 50,
    y: 50,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [renderKey, setRenderKey] = useState(0);

  const activeChapter = chapters[activeIndex];

  /* ============================================================
     MOUSE FOLLOW GLOW
     ============================================================ */

  useEffect(() => {
    const header = headerRef.current;

    if (!header) return;

    let rafId = 0;

    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      const rect =
        header.getBoundingClientRect();

      glowTarget.current.x =
        ((event.clientX - rect.left) /
          rect.width) *
        100;

      glowTarget.current.y =
        ((event.clientY - rect.top) /
          rect.height) *
        100;
    };

    const animate = () => {
      const ease = 0.075;

      glowCurrent.current.x +=
        (glowTarget.current.x -
          glowCurrent.current.x) *
        ease;

      glowCurrent.current.y +=
        (glowTarget.current.y -
          glowCurrent.current.y) *
        ease;

      header.style.setProperty(
        "--dth-explore-x",
        `${glowCurrent.current.x}%`,
      );

      header.style.setProperty(
        "--dth-explore-y",
        `${glowCurrent.current.y}%`,
      );

      rafId =
        window.requestAnimationFrame(
          animate,
        );
    };

    header.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    rafId =
      window.requestAnimationFrame(
        animate,
      );

    return () => {
      header.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      window.cancelAnimationFrame(
        rafId,
      );
    };
  }, []);

  /* ============================================================
     CHANGE CHAPTER
     ============================================================ */

  const selectChapter = (
    index: number,
  ) => {
    if (index === activeIndex) return;

    setActiveIndex(index);

    setRenderKey(
      (current) => current + 1,
    );
  };

  return (
    <section
      className="dth-explore"
      id="design-thinking-document-inside"
    >
      {/* ======================================================
          BLACK HEADER
          ====================================================== */}

      <div
        ref={headerRef}
        className="dth-explore-header"
      >
        <div className="dth-explore-header__glow" />

        <div className="dth-explore-header__inner">
          <div
            className="dth-explore-header__arrow"
            aria-hidden="true"
          >
            ↓
          </div>

          <h2>
            KHÁM PHÁ BÊN TRONG TÀI LIỆU
          </h2>

          {/* TABS */}

          <div
            className="dth-explore-tabs"
            role="tablist"
            aria-label="Các chương trong tài liệu"
          >
            {chapters.map(
              (chapter, index) => (
                <button
                  key={
                    chapter.number
                  }
                  type="button"
                  role="tab"
                  aria-selected={
                    index ===
                    activeIndex
                  }
                  className={`dth-explore-tab ${
                    index ===
                    activeIndex
                      ? "is-active"
                      : ""
                  }`}
                  onClick={() =>
                    selectChapter(
                      index,
                    )
                  }
                >
                  {
                    chapter.number
                  }
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      {/* ======================================================
          ACTIVE CHAPTER
          ====================================================== */}

      <div className="dth-explore-body">
        <article
          key={renderKey}
          className="dth-explore-card"
        >
          {/* LEFT */}

          <div className="dth-explore-card__content">
            <div className="dth-explore-number">
              {activeChapter.number}
            </div>

            <h3 className="dth-explore-title">
              {activeChapter.title}
            </h3>

            <p className="dth-explore-description">
              {
                activeChapter.description
              }
            </p>

            <div className="dth-explore-subtitle">
              NỘI DUNG CHƯƠNG
            </div>

            <ul className="dth-explore-list">
              {activeChapter.bullets.map(
                (
                  bullet,
                  index,
                ) => (
                  <li
                    key={bullet}
                    style={
                      {
                        "--dth-explore-item-delay": `${
                          0.16 +
                          index *
                            0.055
                        }s`,
                      } as CSSProperties
                    }
                  >
                    <span
                      aria-hidden="true"
                    />
                    <p>
                      {bullet}
                    </p>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* RIGHT */}

          <div className="dth-explore-card__visual">
            {activeChapter.image ? (
              <Image
                src={
                  activeChapter.image
                }
                alt={`Nội dung chương ${activeChapter.number} ${activeChapter.title}`}
                fill
                sizes="(max-width: 760px) 90vw, 45vw"
                className="dth-explore-card__image"
              />
            ) : (
              <div className="dth-explore-card__placeholder">
                <span>
                  IMAGE CHAPTER{" "}
                  {
                    activeChapter.number
                  }
                </span>
              </div>
            )}
          </div>
        </article>

        {/* MOBILE CHAPTER NAV */}

        <div className="dth-explore-mobile-nav">
          <button
            type="button"
            disabled={
              activeIndex === 0
            }
            onClick={() =>
              selectChapter(
                Math.max(
                  activeIndex - 1,
                  0,
                ),
              )
            }
          >
            ←
          </button>

          <span>
            {activeChapter.number} /{" "}
            {String(
              chapters.length,
            ).padStart(2, "0")}
          </span>

          <button
            type="button"
            disabled={
              activeIndex ===
              chapters.length - 1
            }
            onClick={() =>
              selectChapter(
                Math.min(
                  activeIndex + 1,
                  chapters.length -
                    1,
                ),
              )
            }
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}