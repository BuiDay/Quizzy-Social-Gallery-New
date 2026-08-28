export function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-grid">

        {/* 01 */}
        <div className="stats-item" data-rv="up">
          <div className="stats-number stats-number--lime">
            <span className="num" data-t="5">
              0
            </span>
            +
          </div>

          <p className="stats-description">
            Năm kinh nghiệm Social Media
            <br />
            Marketing &amp; Personal Branding.
          </p>
        </div>

        {/* 02 */}
        <div
          className="stats-item"
          data-rv="up"
          data-dl="90"
        >
          <div className="stats-number">
            <span className="num" data-t="230">
              0
            </span>
            K+
          </div>

          <p className="stats-description">
            Followers trên các nền tảng
            <br />
            mạng xã hội.
          </p>
        </div>

        {/* 03 */}
        <div
          className="stats-item"
          data-rv="up"
          data-dl="180"
        >
          <div className="stats-number">
            <span className="num" data-t="20">
              0
            </span>
            +
          </div>

          <p className="stats-description">
            Dự án và thương hiệu đã hợp
            <br />
            tác, đồng hành.
          </p>
        </div>

        {/* 04 */}
        <div
          className="stats-item"
          data-rv="up"
          data-dl="270"
        >
          <div className="stats-number stats-number--revenue">
            <span className="num" data-t="200">
              0
            </span>

            <sup>tr</sup>

            <span className="stats-dash">–</span>

            <span>2</span>

            <sup>tỷ</sup>
          </div>

          <p className="stats-description">
            Doanh thu từ các dự án đã triển
            <br />
            khai thành công.
          </p>
        </div>

      </div>
    </section>
  );
}