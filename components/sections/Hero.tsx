"use client";
import { useEffect, useState } from "react";
import {
  ArrowRightIcon,
  FacebookIcon,
  FileIcon,
  GraduationIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  TrendIcon,
} from "@/components/ui/Icons";

export function Hero() {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setGo(true), reduce ? 60 : 950);
    return () => clearTimeout(t);
  }, []);
  return (
    <section className={`hero ${go ? "go" : ""}`} id="top">
      <div className="wrap" style={{ width: "min(1300px,94vw)" }}>
        <div className="hero-frame">
          <div className="visual">
            <span className="mesh m1" />
            <span className="mesh m2" />
            <span className="mesh m3" />

            {/* SOCIAL ICONS — TOP RIGHT */}
            <div className="hero-social-row" aria-label="Social media">
              <span
                className="hero-social-chip glass"
                data-cur="hover"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </span>

              <span
                className="hero-social-chip glass"
                data-cur="hover"
                aria-label="TikTok"
              >
                <TikTokIcon />
              </span>

              <span
                className="hero-social-chip glass"
                data-cur="hover"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </span>

              <span
                className="hero-social-chip glass"
                data-cur="hover"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </span>
            </div>

            {/* IMAGE / PORTRAIT */}
            <div className="photo" data-d="7">
              <div className="fig">
                <div className="body">
                  <div className="head" />
                  <div className="hair" />
                </div>
              </div>
            </div>

           

          </div>
          <div className="intro hero-reference-copy">
            <div className="hero-welcome">CHÀO MỪNG BẠN ĐẾN VỚI</div>
            <div
              className="hero-display"
              aria-label="Quizzy Social Gallery"
            >
              {/* QUIZZY */}
              <div className="hero-display-row hero-display-row--quizzy">
                <span
                  className="hero-star"
                  aria-hidden="true"
                >
                  ✱
                </span>

                <span className="hero-display-pill">
                  QUIZZY
                </span>
              </div>

              {/* SOCIAL */}
              <div className="hero-display-row hero-display-row--social">
                <span className="hero-display-pill">
                  SOCIAL
                </span>

                <a
                  href="#gallery"
                  className="hero-arrow mag"
                  aria-label="Khám phá Quizzy Social Gallery"
                  data-cur="OPEN"
                >
                  <ArrowRightIcon />
                </a>
              </div>

              {/* GALLERY */}
              <div className="hero-display-row hero-display-row--gallery">
                <span className="hero-display-pill hero-display-pill--lime">
                  GALLERY
                </span>
              </div>
            </div>
            <ul className="hero-list">
              <li>
                <span className="ic i-a">
                  <FileIcon />
                </span>
                Tài liệu & sản phẩm số cho người làm Social Media
              </li>
              <li>
                <span className="ic i-b">
                  <GraduationIcon />
                </span>
                Khóa học Content Strategy & Personal Branding
              </li>
              <li>
                <span className="ic i-c">
                  <TrendIcon />
                </span>
                Dịch vụ SMM cho doanh nghiệp & Personal Brand
              </li>
            </ul>
            <div className="hero-cta">
              <a href="#gallery" className="btn solid mag" data-cur="OPEN">
                <span>
                  Khám phá tài liệu và khoá học <ArrowRightIcon />
                </span>
              </a>
          
            </div>
            <div className="social-proof">
              <span className="avatars">
                <i />
                <i />
                <i />
              </span>
              <p className="small">
                500+ học viên đang áp dụng mỗi ngày
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mq" aria-hidden="true">
        <div className="mq-t">
          <span>
            Social media strategy <em>✦</em> Community management <em>✦</em>{" "}
            Content marketing <em>✦</em> Personal branding <em>✦</em>{" "}
          </span>
          <span>
            Social media strategy <em>✦</em> Community management <em>✦</em>{" "}
            Content marketing <em>✦</em> Personal branding <em>✦</em>{" "}
          </span>
        </div>
      </div>
    </section>
  );
}
