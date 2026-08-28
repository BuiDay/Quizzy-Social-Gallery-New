import { Eyebrow } from "@/components/ui/Eyebrow";
export function About() {
  return (
    <section className="about sec" id="about">
      <div className="wrap about-grid">
        <div className="pw" data-rv="scale">
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
        <div className="about-copy">
          <Eyebrow data-rv="up">About Quizzy</Eyebrow>
          <h2 className="h1" data-rv="clip" data-dl="70">
            Mình là <span className="cap sky">Quizzy</span>,<br />
            một <span className="cap">Social Media Manager</span>.
          </h2>
          <p className="lead" data-rv="up" data-dl="150">
            4 năm làm nghề, mình đồng hành cùng các thương hiệu và dự án tại
            Việt Nam, Canada và California. Song song đó là hệ sinh thái
            Personal Branding hơn 180K followers.
          </p>
          <p className="lead" data-rv="up" data-dl="210">
            Hiện tại mình là Founder của <strong>QCC Mastery Hub</strong> — và
            mang tất cả những gì học được từ công việc thật vào đây.
          </p>
          <div className="chips" data-rv="up" data-dl="270">
            <span className="chip">Freelance SMM</span>
            <span className="chip">Founder · QCC Mastery Hub</span>
            <span className="chip">Content Strategist</span>
          </div>
        </div>
      </div>
    </section>
  );
}
