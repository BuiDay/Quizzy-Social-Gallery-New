
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type BundleDocument = {
  number: string;
  title: string;
  description: string;
  contents: string[];
  image: string | null;
};

const documents: BundleDocument[] = [
  {
    number: "01",
    title: "SOCIAL MEDIA\nPORTFOLIO",
    description:
      "Giúp bạn xây dựng Portfolio chuyên nghiệp và x10 cơ hội được client chú ý ngay từ lần đầu.",
    contents: [
      "Xây dựng Portfolio Social Media chuyên nghiệp.",
      "Biết cách showcase project và năng lực có giá trị nhất.",
      "Dễ dàng sáng tạo Portfolio theo cá nhân.",
      "Tạo năng lực cạnh tranh và tiếp cận khách hàng mới.",
    ],
    image: null,
  },
  {
    number: "02",
    title: "SOCIAL MEDIA\nPROPOSAL",
    description:
      "Trình bày dịch vụ chuyên nghiệp và tự tin hơn khi pitching client.",
    contents: [
      "Hiểu cấu trúc của một Social Media Proposal.",
      "Biết cách xây dựng Scope of Work cho từng dịch vụ.",
      "Tăng cơ hội biến những lead tiềm năng thành hợp đồng.",
      "Dễ dàng customize Proposal cho từng client.",
    ],
    image: null,
  },
  {
    number: "03",
    title: "SOCIAL MEDIA\nAUDIT",
    description:
      "Giúp bạn biến việc audit thành một bước tạo giá trị và tăng độ tin tưởng với client.",
    contents: [
      "Framework Social Media Audit.",
      "Hướng dẫn phân tích kênh.",
      "Phân tích điểm mạnh & điểm yếu.",
      "Tạo thêm giá trị ngay từ trước khi bắt đầu dự án.",
    ],
    image: null,
  },
  {
    number: "04",
    title: "SOCIAL MEDIA\nSTRATEGY & PLAN",
    description:
      "Biến mục tiêu của client thành một chiến lược và kế hoạch Social Media cụ thể.",
    contents: [
      "Hiểu cách xây dựng Social Media Strategy.",
      "Xác định Target Audience, Content Pillars và Content Direction.",
      "Template Social Media Plan & Content Calendar.",
      "Làm việc có hệ thống và sẵn sàng nhận nhiều client hơn.",
    ],
    image: null,
  },
  {
    number: "05",
    title: "SOCIAL MEDIA\nMONTHLY REPORT",
    description:
      "Tổng hợp, phân tích và trình bày kết quả Social Media rõ ràng.",
    contents: [
      "Monthly Report Template chuyên nghiệp.",
      "Biết những chỉ số quan trọng cần theo dõi.",
      "Biết cách trình bày và diễn giải số liệu.",
      "Tạo cơ sở để đề xuất hướng đi tiếp theo và mở rộng scope với client.",
    ],
    image: null,
  },
];

export function SocialMediaBundleDocumentSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const navRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const currentDocument = documents[activeIndex];

  /* ==========================================================
     SMOOTH PURPLE GLOW
     ========================================================== */

  useEffect(() => {
    const nav = navRef.current;
    const glow = glowRef.current;

    if (!nav || !glow) return;

    const rect = nav.getBoundingClientRect();

    targetRef.current = {
      x: rect.width * 0.22,
      y: rect.height * 0.3,
    };

    currentRef.current = { ...targetRef.current };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    let frameId = 0;

    const animate = () => {
      const ease = 1.2;

      currentRef.current.x +=
        (targetRef.current.x - currentRef.current.x) * ease;

      currentRef.current.y +=
        (targetRef.current.y - currentRef.current.y) * ease;

      glow.style.transform = `
        translate3d(
          ${currentRef.current.x}px,
          ${currentRef.current.y}px,
          0
        )
        translate(-50%, -50%)
      `;

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (!navRef.current) return;

    const rect = navRef.current.getBoundingClientRect();

    targetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <section
      className="smbundle-document"
      id="bundle-document"
    >
      {/* ======================================================
          INTRO
          ====================================================== */}

      <div className="smbundle-document-intro">
        <div className="smbundle-document-intro-inner">
          <div className="smbundle-document-intro-copy">
            <h2>
              VÀ ĐÓ CŨNG LÀ
              <br />
              LÝ DO MÌNH TẠO RA
              <br />

              <span>
                SOCIAL MEDIA
                <br />
                BUNDLE.
              </span>
            </h2>
          </div>

          <div className="smbundle-document-intro-card">
            <p>
              Bộ tài liệu thực chiến bao gồm Social Media
              Workflow giúp bạn làm Social Media bài bản hơn,
              nhanh hơn và thành công hơn.
            </p>

            <ul>
              <li>
                <span className="smbundle-document-intro-dot smbundle-document-intro-dot--lime" />
                <span>
                  Full workflow từ pitching, audit đến plan và
                  report.
                </span>
              </li>

              <li>
                <span className="smbundle-document-intro-dot smbundle-document-intro-dot--purple" />
                <span>Hướng dẫn chi tiết từng tài liệu.</span>
              </li>

              <li>
                <span className="smbundle-document-intro-dot smbundle-document-intro-dot--blue" />
                <span>
                  Template thực chiến, dễ adapt cho từng client.
                </span>
              </li>

              <li>
                <span className="smbundle-document-intro-dot smbundle-document-intro-dot--white" />
                <span>
                  Update định kỳ, luôn có tài liệu và template mới.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ======================================================
          BLACK HEADER
          ====================================================== */}

      <div
        ref={navRef}
        className="smbundle-document-nav"
        onMouseMove={handleMouseMove}
      >
        <div
          ref={glowRef}
          className="smbundle-document-glow"
          aria-hidden="true"
        />

        <div className="smbundle-document-nav-inner">
          <div
            className="smbundle-document-arrow"
            aria-hidden="true"
          >
            ↓
          </div>

          <h2>KHÁM PHÁ BÊN TRONG TÀI LIỆU</h2>

          <div
            className="smbundle-document-tabs"
            role="tablist"
            aria-label="Các tài liệu trong Social Media Bundle"
          >
            {documents.map((document, index) => (
              <button
                key={document.number}
                type="button"
                role="tab"
                id={`smbundle-document-tab-${index}`}
                aria-controls="smbundle-document-panel"
                aria-selected={activeIndex === index}
                className={`smbundle-document-tab ${
                  activeIndex === index ? "is-active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {document.number}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================
          ACTIVE DOCUMENT
          ====================================================== */}

      <div className="smbundle-document-content">
        <div className="smbundle-document-content-inner">
          <article
            key={currentDocument.number}
            id="smbundle-document-panel"
            role="tabpanel"
            aria-labelledby={`smbundle-document-tab-${activeIndex}`}
            className="smbundle-document-card"
          >
            {/* LEFT */}

            <div className="smbundle-document-card-copy">
              <span className="smbundle-document-number">
                {currentDocument.number}
              </span>

              <div className="smbundle-document-card-main">
                <h3>
                  {currentDocument.title
                    .split("\n")
                    .map((line, index, lines) => (
                      <span key={line}>
                        {line}
                        {index < lines.length - 1 && <br />}
                      </span>
                    ))}
                </h3>

                <p className="smbundle-document-description">
                  {currentDocument.description}
                </p>

                <div className="smbundle-document-list-label">
                  NỘI DUNG CHƯƠNG
                </div>

                <ul className="smbundle-document-list">
                  {currentDocument.contents.map((content) => (
                    <li key={content}>
                      <span
                        className="smbundle-document-bullet"
                        aria-hidden="true"
                      />

                      <span>{content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT: PRODUCT PREVIEW */}

            <div className="smbundle-document-preview">
              {currentDocument.image && (
                <Image
                  src={currentDocument.image}
                  alt={`Preview ${currentDocument.title.replace(
                    "\n",
                    " ",
                  )}`}
                  fill
                  sizes="(max-width: 760px) 90vw, 45vw"
                  className="smbundle-document-preview-image"
                />
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}