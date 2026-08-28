import { Eyebrow } from "@/components/ui/Eyebrow";

export function About() {
  return (
    <section className="about sec" id="about">
      <div className="wrap about-grid">
        {/* ================= LEFT: CONTENT ================= */}
        <div className="about-copy">
          <Eyebrow data-rv="up">GIỚI THIỆU</Eyebrow>

          {/* NEW HEADING */}
          <h2 className="about-title" data-rv="up" data-dl="70">
            <span className="about-title-line about-title-line--first">
              <span className="about-star" aria-hidden="true">
                ✱
              </span>

              <span>Mình là</span>

              <span className="about-quizzy">Quizzy</span>

              <span>-</span>
            </span>

            <span className="about-title-line about-title-line--second">
              <span className="about-role">Social Media Manager</span>
            </span>
          </h2>

          {/* GIỮ NGUYÊN CONTENT CŨ */}
          <p className="lead" data-rv="up" data-dl="150">
            Hơn 5 năm làm Social Media, mình đã đồng hành cùng nhiều thương hiệu
            và dự án tại Việt Nam và các thị trường quốc tế như Mỹ, Úc, Canada.
          </p>

          <p className="lead" data-rv="up" data-dl="210">
            Hiện tại, mình là Founder của <strong> QCC Mastery Hub</strong>, nơi
            mình hệ thống hóa những kinh nghiệm và bài học thực tế từ quá trình
            làm nghề thành các tài liệu, công cụ và sản phẩm có thể áp dụng trực
            tiếp vào công việc.
          </p>

        </div>

        {/* ================= RIGHT: PORTRAIT ================= */}
        {/* GIỮ NGUYÊN UI / EFFECT CŨ */}
        <div className="pw about-portrait-wrap" data-rv="scale">
          <div className="portrait">
            <div className="in-fig">
              <div className="body" />
              <div className="head" />
              <div className="hair" />
            </div>
          </div>

          <span className="ftag f1 glass" data-d="18">
            Social Media Manager
          </span>

          <span className="ftag f2 glass" data-d="13">
            4+ năm làm nghề
          </span>

          <span className="ftag f3 glass" data-d="22">
            Việt Nam · Canada · Mỹ
          </span>
        </div>
      </div>
    </section>
  );
}
