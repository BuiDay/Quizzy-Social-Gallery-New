"use client";
import { useEffect, useRef, useState } from "react";
import type {
  PointerEvent as ReactPointerEvent,
  WheelEvent as ReactWheelEvent,
} from "react";
import { projects } from "@/data/content";
import { Art } from "@/components/ui/Art";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useModal } from "@/components/ui/ModalContext";

export function Projects() {
  const { openModal } = useModal();
  const rail = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState({ width: 14, left: 0 });
  const drag = useRef({ down: false, x: 0, scroll: 0, moved: 0 });
  const update = () => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const width = Math.max(14, (el.clientWidth / el.scrollWidth) * 100);
    setBar({
      width,
      left: max > 0 ? (el.scrollLeft / max) * (100 - width) : 0,
    });
  };
  const socialProjects = projects.filter(
    (p) => !p.cat.toLowerCase().includes("personal")
  );
  
  const personalProjects = projects.filter(
    (p) => p.cat.toLowerCase().includes("personal")
  );
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return (
    <section
      className="sec projects-section"
      id="projects"
    >
      <div className="wrap">
  
        {/* ================= TOP ================= */}
        <div className="projects-top">
          <Eyebrow data-rv="up">
            CÁC THƯƠNG HIỆU MÌNH ĐÃ ĐỒNG HÀNH
          </Eyebrow>
        </div>
  
  
        {/* ====================================================
            SOCIAL MEDIA PARTNERSHIP
        ==================================================== */}
        <div className="projects-group">
          <h2
            className="projects-group-title"
            data-rv="up"
          >
            <span className="projects-star">✱</span>
  
            Social Media
  
            <span className="projects-title-highlight">
              Partnership
            </span>
          </h2>
  
          <div
            className="projects-grid"
            data-rv="up"
            data-dl="100"
          >
            {socialProjects.map((p) => (
              <button
                key={p.t}
                className="project-card"
                data-cur="VIEW"
                aria-label={`Xem case study ${p.t}`}
                onClick={() =>
                  openModal({
                    g: p.g,
                    cat: p.cat,
                    meta: `${p.c} · ${p.y}`,
                    t: p.t,
                    d: p.d,
                    ch: p.ch,
                    stats: p.stats,
                    l1: "Mình đã làm gì",
                    l2: "Kết quả",
                    a: p.work,
                    b: p.res,
                    cta: "Trao đổi về dự án tương tự",
                  })
                }
              >
                {/* IMAGE */}
                <div className="project-card-visual">
                  <Art variant={p.g} />
  
                  <span className="project-card-badge glass">
                    Social Media
                  </span>
                </div>
  
                {/* CONTENT */}
                <div className="project-card-body">
                  <h3>{p.t}</h3>
  
                  <div className="project-card-meta">
                    <span>{p.c}</span>
                    <span>{p.y}</span>
                  </div>
  
                  <div className="project-card-footer">
                    <span>Xem project</span>
  
                    <span className="project-card-arrow">
                      <ArrowRightIcon />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
  
  
        {/* ====================================================
            PERSONAL BRANDING
        ==================================================== */}
        <div className="projects-group projects-group--personal">
          <h2
            className="projects-group-title"
            data-rv="up"
          >
            <span className="projects-star">✱</span>
  
            Personal
  
            <span className="projects-title-highlight">
              Branding
            </span>
          </h2>
  
          <div
            className="projects-grid"
            data-rv="up"
            data-dl="100"
          >
            {personalProjects.map((p) => (
              <button
                key={p.t}
                className="project-card"
                data-cur="VIEW"
                aria-label={`Xem case study ${p.t}`}
                onClick={() =>
                  openModal({
                    g: p.g,
                    cat: p.cat,
                    meta: `${p.c} · ${p.y}`,
                    t: p.t,
                    d: p.d,
                    ch: p.ch,
                    stats: p.stats,
                    l1: "Mình đã làm gì",
                    l2: "Kết quả",
                    a: p.work,
                    b: p.res,
                    cta: "Trao đổi về dự án tương tự",
                  })
                }
              >
                <div className="project-card-visual">
                  <Art variant={p.g} />
  
                  <span className="project-card-badge glass">
                    Personal Branding
                  </span>
                </div>
  
                <div className="project-card-body">
                  <h3>{p.t}</h3>
  
                  <div className="project-card-meta">
                    <span>{p.c}</span>
                    <span>{p.y}</span>
                  </div>
  
                  <div className="project-card-footer">
                    <span>Xem project</span>
  
                    <span className="project-card-arrow">
                      <ArrowRightIcon />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
  
      </div>
    </section>
  );
}
