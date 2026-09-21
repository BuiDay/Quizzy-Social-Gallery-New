"use client";

import Image, { type StaticImageData } from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type ProjectImage = string | StaticImageData;

type Project = {
  id: string;
  name: string;
  category: string;
  location: string;
  year: string;
  group: "partnership" | "personal";
  tone: "pink" | "blue" | "lime" | "cream" | "purple";
  image?: ProjectImage;

  description: string;
  role: string;
  platforms: string;
};

type Props = {
  images?: Partial<Record<string, ProjectImage>>;
};

/* ============================================================
   PROJECT DATA
   ============================================================ */

const projectBase: Omit<Project, "image">[] = [
  /* ----------------------------------------------------------
     SOCIAL MEDIA PARTNERSHIP
     ---------------------------------------------------------- */

  {
    id: "pandora",
    name: "PANDORA Vietnam",
    category: "Jewelry",
    location: "Vietnam",
    year: "2025–2026",
    group: "partnership",
    tone: "pink",

    description:
      "Đồng hành cùng thương hiệu trong các hoạt động Social Media, phát triển nội dung phù hợp với định hướng hình ảnh và mục tiêu truyền thông.",
    role:
      "Social Media Content & Creative Direction",
    platforms:
      "Facebook · Instagram",
  },

  {
    id: "benri",
    name: "BENRI Homestay",
    category: "Homestay",
    location: "Vietnam",
    year: "2025–2026",
    group: "partnership",
    tone: "blue",

    description:
      "Xây dựng định hướng nội dung Social Media giúp thương hiệu truyền tải rõ hơn trải nghiệm lưu trú và hình ảnh điểm đến.",
    role:
      "Content Strategy · Social Media",
    platforms:
      "Facebook · Instagram",
  },

  {
    id: "bm-living",
    name: "BM Living",
    category: "Construction & Interiors",
    location: "Vietnam",
    year: "2026",
    group: "partnership",
    tone: "lime",

    description:
      "Triển khai nội dung Social Media và video marketing cho thương hiệu trong lĩnh vực xây dựng, nhôm kính và không gian sống.",
    role:
      "Social Media Strategy · Video Content",
    platforms:
      "Facebook · TikTok",
  },

  {
    id: "ck-coffee",
    name: "CK Coffee Bar & Wholefoods",
    category: "F&B",
    location: "Australia",
    year: "2026",
    group: "partnership",
    tone: "pink",

    description:
      "Định hướng nội dung giúp thương hiệu F&B truyền tải rõ phong cách, sản phẩm và trải nghiệm tại cửa hàng.",
    role:
      "Content Strategy · Social Media",
    platforms:
      "Instagram · Facebook",
  },

  {
    id: "yoko",
    name: "YOKO Sushi · Thai · Sake",
    category: "F&B",
    location: "USA",
    year: "2025–2026",
    group: "partnership",
    tone: "lime",

    description:
      "Phát triển Social Media cho thương hiệu F&B với định hướng nội dung tập trung vào món ăn, trải nghiệm và nhận diện thương hiệu.",
    role:
      "Social Media Content · Creative",
    platforms:
      "Instagram · Facebook",
  },

  /* ----------------------------------------------------------
     PERSONAL BRANDING
     ---------------------------------------------------------- */

  {
    id: "hannah-tu",
    name: "Hannah Tu Lash & Brows",
    category: "PMU/Lash",
    location: "USA",
    year: "2025–2026",
    group: "personal",
    tone: "pink",

    description:
      "Xây dựng định hướng Personal Branding giúp chuyên gia thể hiện rõ chuyên môn, dịch vụ và dấu ấn cá nhân trên Social Media.",
    role:
      "Personal Branding · Content Strategy",
    platforms:
      "Facebook · Instagram",
  },

  {
    id: "tien-si-yen",
    name: "Tiến sĩ Yến",
    category: "Education",
    location: "Vietnam",
    year: "2025–2026",
    group: "personal",
    tone: "blue",

    description:
      "Định hướng nội dung Personal Branding dựa trên chuyên môn, kinh nghiệm và hệ thống chủ đề phù hợp với nhóm khán giả mục tiêu.",
    role:
      "Personal Branding Strategy",
    platforms:
      "Facebook · TikTok",
  },

  {
    id: "vinny-tran",
    name: "Vinny Trần",
    category: "Fitness Coach",
    location: "Canada",
    year: "2026",
    group: "personal",
    tone: "lime",

    description:
      "Phát triển nội dung Personal Branding xoay quanh fitness, dinh dưỡng, kiến thức thực chiến và hành trình của coach.",
    role:
      "Personal Branding · Content Direction",
    platforms:
      "Instagram · TikTok",
  },

  {
    id: "sophie-nga-lee",
    name: "Sophie Nga Lee",
    category: "PMU/Lash",
    location: "USA",
    year: "2026",
    group: "personal",
    tone: "pink",

    description:
      "Xây dựng hệ thống nội dung giúp cá nhân định vị chuyên môn và gia tăng độ tin cậy trong lĩnh vực beauty.",
    role:
      "Personal Branding · Social Content",
    platforms:
      "Facebook · Instagram",
  },

  {
    id: "jenni-jkb",
    name: "Jenni Jkb",
    category: "Financial",
    location: "USA",
    year: "2026",
    group: "personal",
    tone: "cream",

    description:
      "Định hướng Personal Branding trong lĩnh vực tài chính theo hướng gần gũi, dễ hiểu nhưng vẫn giữ được chuyên môn.",
    role:
      "Personal Branding Strategy",
    platforms:
      "Facebook · Instagram",
  },

  {
    id: "tiffany-nghi-la",
    name: "Tiffany Nghi La",
    category: "Marketing",
    location: "USA",
    year: "2026",
    group: "personal",
    tone: "blue",

    description:
      "Xây dựng nội dung và định vị Personal Brand dựa trên chuyên môn Marketing và trải nghiệm làm nghề.",
    role:
      "Personal Branding · Content Strategy",
    platforms:
      "Facebook · Instagram",
  },

  {
    id: "phuong-cao",
    name: "Phương Cao",
    category: "PMU/Lash",
    location: "Vietnam",
    year: "2026",
    group: "personal",
    tone: "pink",

    description:
      "Phát triển Personal Branding và hệ thống social video nhằm tăng khả năng tiếp cận khách hàng và củng cố vị thế chuyên gia.",
    role:
      "Personal Branding · Social Video",
    platforms:
      "Facebook · TikTok",
  },

  {
    id: "hau-luon-dau",
    name: "Hậu Luôn Đậu",
    category: "Study abroad",
    location: "Australia",
    year: "2026",
    group: "personal",
    tone: "blue",

    description:
      "Xây dựng nội dung Personal Branding xoay quanh trải nghiệm du học, kiến thức thực tế và câu chuyện cá nhân.",
    role:
      "Personal Branding · Content Strategy",
    platforms:
      "TikTok · Instagram",
  },
];

/* ============================================================
   COMPONENT
   ============================================================ */

export function SocialMediaMarketingProjectsSection({
  images = {},
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] =
    useState<Project | null>(null);

  const projects: Project[] =
    projectBase.map((project) => ({
      ...project,
      image: images[project.id],
    }));

  const partnerships = projects.filter(
    (project) =>
      project.group === "partnership",
  );

  const personal = projects.filter(
    (project) =>
      project.group === "personal",
  );

  /* =========================================================
     LOCAL REVEAL
     ========================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (
      !(
        "IntersectionObserver" in
        window
      )
    ) {
      setIsVisible(true);
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting)
            return;

          setIsVisible(true);

          observer.disconnect();
        },
        {
          threshold: 0.06,
          rootMargin:
            "0px 0px -5% 0px",
        },
      );

    observer.observe(section);

    return () =>
      observer.disconnect();
  }, []);

  /* =========================================================
     BODY LOCK FOR MODAL
     ========================================================= */

  useEffect(() => {
    if (!activeProject) return;

    const previous =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const onKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };

    window.addEventListener(
      "keydown",
      onKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previous;

      window.removeEventListener(
        "keydown",
        onKeyDown,
      );
    };
  }, [activeProject]);

  return (
    <>
      <section
        ref={sectionRef}
        className={`smm-projects ${
          isVisible
            ? "is-visible"
            : ""
        }`}
        id="smm-projects"
      >
        <div className="smm-projects-inner">

          {/* =======================================
              TOP INTRO
              ======================================= */}

          <div className="smm-projects-kicker">
            <i />
            <span>
              CÁC THƯƠNG HIỆU MÌNH ĐÃ
              ĐỒNG HÀNH
            </span>
          </div>

          <p className="smm-projects-intro">
            Từ doanh nghiệp, local
            business đến personal brand,
            Quizzy đã có kinh nghiệm đồng
            hành cùng nhiều client trong
            việc xây dựng và phát triển
            Social Media.
          </p>

          {/* =======================================
              SOCIAL MEDIA PARTNERSHIP
              ======================================= */}

          <ProjectGroup
            title="Social Media"
            highlight="Partnership"
            projects={partnerships}
            delayOffset={0}
            onOpen={setActiveProject}
          />

          {/* =======================================
              PERSONAL BRANDING
              ======================================= */}

          <ProjectGroup
            title="Personal"
            highlight="Branding"
            projects={personal}
            delayOffset={0.1}
            personal
            onOpen={setActiveProject}
          />
        </div>
      </section>

      {/* =========================================
          PROJECT MODAL
          ========================================= */}

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() =>
            setActiveProject(null)
          }
        />
      )}
    </>
  );
}

/* ============================================================
   PROJECT GROUP
   ============================================================ */

function ProjectGroup({
  title,
  highlight,
  projects,
  delayOffset,
  personal = false,
  onOpen,
}: {
  title: string;
  highlight: string;
  projects: Project[];
  delayOffset: number;
  personal?: boolean;
  onOpen: (project: Project) => void;
}) {
  return (
    <div
      className={`smm-project-group ${
        personal
          ? "smm-project-group--personal"
          : ""
      }`}
    >
      <h2 className="smm-project-group__title">
        <span
          className="smm-project-group__star"
          aria-hidden="true"
        >
          ✱
        </span>

        {title}{" "}

        <span className="smm-project-group__highlight">
          {highlight}
        </span>
      </h2>

      <div className="smm-project-grid">
        {projects.map(
          (project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={onOpen}
              delay={
                delayOffset +
                index * 0.055
              }
            />
          ),
        )}
      </div>
    </div>
  );
}

/* ============================================================
   CARD
   ============================================================ */

function ProjectCard({
  project,
  delay,
  onOpen,
}: {
  project: Project;
  delay: number;
  onOpen: (project: Project) => void;
}) {
  return (
    <button
      type="button"
      className="smm-project-card"
      onClick={() =>
        onOpen(project)
      }
      data-cur="VIEW"
      style={
        {
          "--smm-project-delay": `${delay}s`,
        } as CSSProperties
      }
      aria-label={`Xem project ${project.name}`}
    >
      {/* VISUAL */}

      <div
        className={`smm-project-card__visual smm-project-card__visual--${project.tone}`}
      >
        <span className="smm-project-card__category">
          {project.group ===
          "personal"
            ? "Personal Branding"
            : "Social Media"}
        </span>

        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 700px) 90vw, (max-width: 1000px) 45vw, 31vw"
            className="smm-project-card__image"
          />
        ) : (
          <div className="smm-project-card__placeholder">
            <strong>
              {project.name}
            </strong>
          </div>
        )}
      </div>

      {/* INFORMATION */}

      <div className="smm-project-card__info">
        <h3>{project.name}</h3>

        <div className="smm-project-card__meta">
          <span>
            {project.category} ·{" "}
            {project.location}
          </span>

          <span>
            {project.year}
          </span>
        </div>

        <div className="smm-project-card__footer">
          <span>Xem project</span>

          <span
            className="smm-project-card__arrow"
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </div>
    </button>
  );
}

/* ============================================================
   MODAL
   ============================================================ */

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <div
      className="smm-project-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="smm-project-modal-title"
    >
      <button
        type="button"
        className="smm-project-modal__backdrop"
        onClick={onClose}
        aria-label="Đóng project"
      />

      <div className="smm-project-modal__panel">
        <button
          ref={closeButtonRef}
          type="button"
          className="smm-project-modal__close"
          onClick={onClose}
          data-cur="CLOSE"
        >
          ĐÓNG ✕
        </button>

        {/* VISUAL */}

        <div
          className={`smm-project-modal__visual smm-project-card__visual--${project.tone}`}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(max-width: 700px) 90vw, 65vw"
              className="smm-project-modal__image"
            />
          ) : (
            <div className="smm-project-card__placeholder">
              <strong>
                {project.name}
              </strong>
            </div>
          )}
        </div>

        {/* CONTENT */}

        <div className="smm-project-modal__content">
          <span className="smm-project-modal__eyebrow">
            {project.group ===
            "personal"
              ? "PERSONAL BRANDING"
              : "SOCIAL MEDIA PARTNERSHIP"}
          </span>

          <h2 id="smm-project-modal-title">
            {project.name}
          </h2>

          <p>
            {project.description}
          </p>

          <div className="smm-project-modal__details">
            <div>
              <span>NGÀNH HÀNG</span>
              <strong>
                {project.category}
              </strong>
            </div>

            <div>
              <span>THỊ TRƯỜNG</span>
              <strong>
                {project.location}
              </strong>
            </div>

            <div>
              <span>VAI TRÒ</span>
              <strong>
                {project.role}
              </strong>
            </div>

            <div>
              <span>NỀN TẢNG</span>
              <strong>
                {project.platforms}
              </strong>
            </div>

            <div>
              <span>THỜI GIAN</span>
              <strong>
                {project.year}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}