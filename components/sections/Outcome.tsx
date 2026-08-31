import Image from "next/image";
// import QuizzyOutcome from "@/assets/images/quizzy-outcome.jpg";

export function Outcome() {
  return (
    <section className="outcome sec" id="outcome">
      <div className="wrap">
        {/* ================= HEADER ================= */}
        <div className="outcome-head">
          <h2
            className="outcome-main-title"
            data-rv="up"
            data-dl="70"
          >
            Muốn học{" "}
            <span className="outcome-highlight outcome-highlight--lime">
              Social Media
            </span>

            <br />

            nhưng{" "}
            <span className="outcome-highlight outcome-highlight--outline">
              chưa biết
            </span>{" "}
            bắt đầu từ đâu?
          </h2>

          <p
            className="outcome-intro"
            data-rv="up"
            data-dl="140"
          >
            <strong>Quizzy Social Gallery</strong> là nơi mình gom lại những
            kiến thức, framework, templates và kinh nghiệm thực tế mình đã tích
            lũy trong quá trình làm Social Media để bạn có
            <br />
            <b>
              một nền tảng để bắt đầu, dễ học và dễ áp dụng vào công việc.
            </b>
          </p>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="outcome-layout">
          {/* LEFT PHOTO */}
          <div
            className="outcome-photo-card"
            data-rv="scale"
          >
            {/* <Image
              src={QuizzyOutcome}
              alt="Quizzy Social Media"
              className="outcome-photo"
              fill
              sizes="(max-width: 768px) 100vw, 35vw"
            /> */}

            <div className="outcome-income-card">
              <span className="outcome-income-label">
                <span className="outcome-income-dot" />
                MỨC THU NHẬP
              </span>

              <div className="outcome-income-number">
                50–100
                <small>triệu/tháng</small>
              </div>

              <p>
                Thu nhập tiềm năng từ công việc
                <br />
                Social Media.
              </p>
            </div>
          </div>

          {/* RIGHT STATS */}
          <div className="outcome-stats">
            <article
              className="outcome-stat-card outcome-stat-card--purple"
              data-rv="up"
              data-dl="90"
            >
              <strong>1000+</strong>

              <p>
                Học viên đã học và ứng dụng vào
                <br />
                công việc.
              </p>
            </article>

            <article
              className="outcome-stat-card outcome-stat-card--blue"
              data-rv="up"
              data-dl="150"
            >
              <strong>30+</strong>

              <p>
                Tài liệu, templates và digital
                <br />
                products có thể dùng ngay.
              </p>
            </article>

            <article
              className="outcome-stat-card outcome-stat-card--black"
              data-rv="up"
              data-dl="210"
            >
              <strong>100% thực chiến</strong>

              <p>
                Kiến thức từ những gì mình đã làm và trải nghiệm thực tế.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}