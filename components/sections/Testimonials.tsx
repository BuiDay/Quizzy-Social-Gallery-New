"use client";

import { Eyebrow } from "@/components/ui/Eyebrow";

const testimonials = [
  [
    "pv1",
    "Em từng học 3 khóa content rồi mà vẫn không biết bắt đầu từ đâu. Cái khác ở đây là chị bắt bọn em làm trên chính kênh của mình ngay từ buổi đầu. Sau 2 tháng em nhận được job freelance đầu tiên, 8 triệu một tháng.",
    "Minh Thư",
    "FREELANCE CONTENT WRITER · TP.HCM",
  ],

  [
    "pv2",
    "Bộ Content Calendar cứu team em thật sự. Trước đó mỗi sáng cả team ngồi họp 30 phút chỉ để chốt hôm nay đăng gì.",
    "Hoàng Anh",
    "MARKETING EXECUTIVE · HÀ NỘI",
  ],

  [
    "pv3",
    "Chị review bài của em rất thẳng, chỉ đúng chỗ sai chứ không khen cho vui. Đó là thứ em cần.",
    "Ngọc Lan",
    "SOCIAL MEDIA EXECUTIVE · ĐÀ NẴNG",
  ],

  [
    "pv4",
    "Mình là chủ shop, không có team marketing. Sau khóa mình tự lên plan được cho cả quý và không còn cảm giác đăng bài cho có nữa.",
    "Thanh Trúc",
    "CHỦ THƯƠNG HIỆU SKINCARE · CẦN THƠ",
  ],

  [
    "pv5",
    "Bộ audit 60 điểm mình đưa thẳng vào quy trình nhận khách mới của agency. Khách nhìn báo cáo là thấy chuyên nghiệp liền.",
    "Quang Đạt",
    "ACCOUNT MANAGER · AGENCY TP.HCM",
  ],

  [
    "pv2",
    "Trước em cứ nghĩ phải viral mới gọi là làm tốt. Học xong mới hiểu kênh nhỏ mà đúng người vẫn ra đơn đều.",
    "Bảo Ngọc",
    "CONTENT CREATOR · BÌNH DƯƠNG",
  ],
] as const;

export function Testimonials() {
  const row1 = testimonials.filter((_, index) => index % 2 === 0);
  const row2 = testimonials.filter((_, index) => index % 2 !== 0);

  /*
    Duplicate để rail dài hơn, nhìn giống reference
    và không bị khoảng trắng lớn ở bên phải.
  */
  const row1Display = [...row1, ...row1];
  const row2Display = [...row2, ...row2];

  return (
    <section
      className="testimonials sec"
      id="testimonials"
    >
      {/* ================= HEADER ================= */}
      <div className="wrap testimonials-head">
        <div className="testimonials-head-left">
          <Eyebrow data-rv="up">
            CẢM NHẬN &amp; KẾT QUẢ
          </Eyebrow>

          <h2
            className="testimonials-title"
            data-rv="up"
            data-dl="70"
          >
            Điều mình vui nhất
            <br />
            là thấy mọi người{" "}
            <span className="testimonials-highlight">
              làm được
            </span>
            .
          </h2>
        </div>

        <p
          className="testimonials-intro"
          data-rv="up"
          data-dl="140"
        >
          Đây là những feedback mình nhận được từ các học viên
          sau khi áp dụng kiến thức vào công việc thật.
        </p>
      </div>

      {/* ================= FEEDBACK WALL ================= */}
      <div
        className="testimonials-wall"
        data-rv="up"
        data-dl="180"
      >
        {/* ROW 1 */}
        <div className="testimonials-rail testimonials-rail--top">
  <div className="testimonials-track testimonials-track--left">
    {row1Display.map(
      ([variant, quote, name, role], index) => (
        <article
          className="testimonial-card"
          key={`top-${index}-${name}`}
        >
          <div className="testimonial-card-dots">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>

          <div className={`testimonial-card-media ${variant}`}>
            <div className="testimonial-message-preview">
              {quote}
            </div>
          </div>

          <div className="testimonial-card-body">
            <p className="testimonial-quote">
              {quote}
            </p>

            <div className="testimonial-author">
              <strong>{name}</strong>
              <span>{role}</span>
            </div>
          </div>
        </article>
      ),
    )}
  </div>
</div>


{/* ROW 2 */}
<div className="testimonials-rail testimonials-rail--bottom">
  <div className="testimonials-track testimonials-track--right">
    {row2Display.map(
      ([variant, quote, name, role], index) => (
        <article
          className="testimonial-card"
          key={`bottom-${index}-${name}`}
        >
          <div className="testimonial-card-dots">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>

          <div className={`testimonial-card-media ${variant}`}>
            <div className="testimonial-message-preview">
              {quote}
            </div>
          </div>

          <div className="testimonial-card-body">
            <p className="testimonial-quote">
              {quote}
            </p>

            <div className="testimonial-author">
              <strong>{name}</strong>
              <span>{role}</span>
            </div>
          </div>
        </article>
      ),
    )}
  </div>
</div>
      </div>
    </section>
  );
}