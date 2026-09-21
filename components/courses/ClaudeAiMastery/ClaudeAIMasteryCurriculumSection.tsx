"use client";

import Image, { type StaticImageData } from "next/image";
import {
  useEffect,
  useRef,
  type CSSProperties,
} from "react";

type CourseImage = string | StaticImageData;

type ModuleItem = {
  number: string;
  title: string;
  description: string;
  bullets: string[];
};

type PhaseItem = {
  phase: string;
  title: string;
  count: string;
  modules: ModuleItem[];
};

type Props = {
  moduleImages?: Partial<Record<string, CourseImage>>;
};

const phases: PhaseItem[] = [
  {
    phase: "Phase 1",
    title: "Làm quen với Claude AI",
    count: "03 Bài giảng nền tảng",
    modules: [
      {
        number: "01",
        title: "HỆ SINH THÁI CLAUDE AI",
        description:
          "Làm quen với hệ sinh thái Claude và những nền tảng cần thiết trước khi đưa Claude vào công việc.",
        bullets: [
          "Hiểu toàn bộ hệ sinh thái và những công cụ quan trọng của Claude.",
          "Thiết lập môi trường làm việc phù hợp với nhu cầu.",
          "Làm quen với Projects, Integrations và Cowork.",
          "Tư duy sử dụng AI hiệu quả trong công việc.",
        ],
      },
      {
        number: "02",
        title: "SCHEDULED TASK · ARTIFACT & PROMPT",
        description:
          "Những công cụ và workflow đầu tiên có thể ứng dụng vào công việc.",
        bullets: [
          "Hiểu cách giao việc cho Claude rõ ràng và hiệu quả hơn.",
          "Làm quen với Artifact và Scheduled Task.",
          "Biến Prompt thành những workflow có thể sử dụng lại.",
          "Thực hành với những tình huống thực tế.",
        ],
      },
      {
        number: "03",
        title: "CLAUDE SKILLS & TỐI ƯU TOKEN",
        description:
          "Cách tạo bộ Skills cá nhân hóa cho workflow trong các công việc.",
        bullets: [
          "Hiểu Skills và cách Claude sử dụng những tiêu chuẩn được thiết lập sẵn.",
          "Biết cách thiết lập Skills từ tài liệu và quy trình thực tế.",
          "Tạo những Skills cơ bản phục vụ công việc.",
          "Biết cách sử dụng Token hiệu quả hơn.",
        ],
      },
    ],
  },

  {
    phase: "Phase 2",
    title: "Thực hành ứng dụng Claude AI vào Quy trình Social Media",
    count: "05 Bài giảng cốt lõi",
    modules: [
      {
        number: "04",
        title: "QUY TRÌNH NGHIÊN CỨU VỚI CLAUDE AI",
        description:
          "Xây dựng quy trình Research Social Media hoàn chỉnh với Claude AI.",
        bullets: [
          "Nghiên cứu Brand, Customer và Competitor với Claude.",
          "Tìm kiếm và tổng hợp thông tin từ nhiều nguồn.",
          "Phân tích nội dung và quảng cáo của đối thủ.",
          "Biến Research thành Insight và Recommendation.",
        ],
      },
      {
        number: "05",
        title: "QUY TRÌNH VIẾT CONTENT VỚI CLAUDE AI",
        description:
          "Bộ Content Assistant cá nhân hóa theo workflow của bạn.",
        bullets: [
          "Thiết lập Brand Voice để Claude hiểu cách thương hiệu giao tiếp.",
          "Tạo trợ lý cho Content Strategy và Content Writing.",
          "Phát triển Hook và Repurpose Content.",
          "Xây dựng quy trình Content từ Brief đến Output.",
        ],
      },
      {
        number: "06",
        title: "QUY TRÌNH THIẾT KẾ VỚI CLAUDE AI",
        description:
          "Một workflow phát triển Visual từ Content đến Design.",
        bullets: [
          "Đưa Claude vào quá trình phát triển Concept và Visual.",
          "Tạo Moodboard và Storyboard từ một Brief.",
          "Kết hợp Claude với các công cụ Design.",
          "Phát triển Visual theo định hướng Brand.",
        ],
      },
      {
        number: "07",
        title: "QUY TRÌNH PHÂN TÍCH DỮ LIỆU VỚI CLAUDE AI",
        description:
          "Một quy trình phân tích Data và Dashboard với Claude.",
        bullets: [
          "Đưa Social Media Data vào Claude để phân tích.",
          "Hỗ trợ xử lý Ads Performance và Report.",
          "Tìm Insight từ dữ liệu thay vì chỉ đọc số liệu.",
          "Biến Data thành Dashboard trực quan.",
        ],
      },
      {
        number: "08",
        title: "VIBE CODING & JOB APPLICATION ASSISTANT",
        description:
          "Một bộ sản phẩm cá nhân gồm App, Project hoặc Portfolio.",
        bullets: [
          "Làm quen với cách tạo công cụ bằng Claude mà không cần nền tảng Code chuyên sâu.",
          "Tạo những App đơn giản phục vụ công việc.",
          "Ứng dụng Claude vào CV, Job Application và Portfolio.",
          "Tạo Project thực tế với thương hiệu bất kỳ với Claude AI.",
        ],
      },
    ],
  },
];

export function ClaudeAIMasteryCurriculumSection({
  moduleImages = {},
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const revealItems =
      section.querySelectorAll<HTMLElement>(
        ".claude-curriculum-reveal",
      );

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) =>
        item.classList.add("is-visible"),
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    revealItems.forEach((item) =>
      observer.observe(item),
    );

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="claude-curriculum"
      id="claude-curriculum"
    >
      <div className="claude-curriculum__inner">
        {/* =========================================
            TOP LABEL
            ========================================= */}

        <div className="claude-curriculum__kicker claude-curriculum-reveal">
          <i />
          <span>
            LỘ TRÌNH HỌC TẬP - CHI TIẾT NỘI DUNG KHÓA HỌC
          </span>
        </div>

        {/* =========================================
            PHASES
            ========================================= */}

        {phases.map((phase, phaseIndex) => (
          <div
            className="claude-curriculum-phase"
            key={phase.phase}
          >
            {/* PHASE HEADER */}

            <div className="claude-curriculum-phase__header claude-curriculum-reveal">
              <div className="claude-curriculum-phase__title">
                <span
                  className="claude-curriculum-phase__star"
                  aria-hidden="true"
                >
                  ✱
                </span>

                <h2>
                  {phase.phase} -{" "}
                  <span>{phase.title}</span>
                </h2>
              </div>

              <span className="claude-curriculum-phase__count">
                {phase.count}
              </span>
            </div>

            {/* MODULES */}

            <div className="claude-curriculum-phase__modules">
              {phase.modules.map(
                (module, moduleIndex) => (
                  <article
                    key={module.number}
                    className="claude-curriculum-card claude-curriculum-reveal"
                    style={
                      {
                        "--curriculum-card-delay": `${
                          moduleIndex * 0.04
                        }s`,
                      } as CSSProperties
                    }
                  >
                    {/* LEFT */}

                    <div className="claude-curriculum-card__content">
                      <span className="claude-curriculum-card__number">
                        {module.number}
                      </span>

                      <h3>{module.title}</h3>

                      <p className="claude-curriculum-card__description">
                        {module.description}
                      </p>

                      <div className="claude-curriculum-card__lesson-label">
                        NỘI DUNG CHƯƠNG
                      </div>

                      <ul>
                        {module.bullets.map(
                          (bullet) => (
                            <li key={bullet}>
                              <i />
                              <span>
                                {bullet}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>

                    {/* RIGHT VISUAL */}

                    <div className="claude-curriculum-card__visual">
                      {moduleImages[
                        module.number
                      ] ? (
                        <Image
                          src={
                            moduleImages[
                              module.number
                            ]!
                          }
                          alt={module.title}
                          fill
                          sizes="(max-width: 700px) 90vw, 45vw"
                          className="claude-curriculum-card__image"
                        />
                      ) : (
                        <div className="claude-curriculum-card__placeholder">
                          <span>
                            MODULE{" "}
                            {module.number}
                          </span>

                          <strong>
                            CLAUDE AI
                          </strong>
                        </div>
                      )}
                    </div>
                  </article>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}