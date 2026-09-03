const reasonItems = [
    {
      label: "Hiểu Social Media Marketing thực chiến, dễ hiểu",
      tone: "lime",
    },
    {
      label: "Biết Social Media Marketer cần làm gì",
      tone: "purple",
    },
    {
      label: "Nắm kiến thức nền tảng quan trọng nhất",
      tone: "blue",
    },
    {
      label: "Hướng dẫn thực chiến và ví dụ cụ thể",
      tone: "white",
    },
  ];
  
  export function SocialMediaBeginnerReasonSection() {
    return (
      <section
        className="smb-reason"
        id="smb-reason"
      >
        {/* =====================================================
            TOP
            ===================================================== */}
        <div className="smb-reason-top">
          <div
            className="smb-reason-glow"
            aria-hidden="true"
          />
  
          <div className="wrap smb-reason-top-inner">
            <h2
              className="smb-reason-heading"
              data-rv="up"
            >
              Bắt đầu với Social Media không khó,
              <br />
  
              <span className="smb-reason-heading-highlight">
                Khó là bạn không biết nên bắt đầu từ đâu.
              </span>
            </h2>
  
            <p
              className="smb-reason-description"
              data-rv="up"
              data-dl="90"
            >
              Thông tin thì có rất nhiều, nhưng lại nằm rải rác ở khắp nơi.
              Bạn có thể xem hàng
              <br />
              chục video, đọc rất nhiều bài viết, nhưng vẫn không biết mình
              cần học gì trước,
              <br />
              học gì sau và mọi thứ liên kết với nhau như thế nào.
            </p>
          </div>
        </div>
  
        {/* =====================================================
            BOTTOM
            ===================================================== */}
        <div className="smb-reason-bottom">
          <div className="wrap smb-reason-bottom-inner">
            {/* LEFT */}
            <div
              className="smb-reason-statement"
              data-rv="up"
            >
              <h3>
                VÀ ĐÓ CŨNG LÀ
                <br />
                LÝ DO MÌNH TẠO RA
                <br />
                <span>SOCIAL MEDIA</span>
                <br />
                <span>BEGINNER EBOOK.</span>
              </h3>
            </div>
  
            {/* RIGHT */}
            <div
              className="smb-reason-framework"
              data-rv="up"
              data-dl="110"
            >
              <p className="smb-reason-framework-intro">
                Không học thuật, không nhồi nhét tất cả mà tập
           
                trung vào những gì một người mới thật sự cần biết
                
                để <strong>hiểu ngành, hiểu công việc và bắt đầu đúng cách.</strong>
              </p>
  
              <div className="smb-reason-framework-list">
                {reasonItems.map((item) => (
                  <div
                    className="smb-reason-framework-item"
                    key={item.label}
                  >
                    <span
                      className={`
                        smb-reason-framework-dot
                        smb-reason-framework-dot--${item.tone}
                      `}
                    />
  
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }