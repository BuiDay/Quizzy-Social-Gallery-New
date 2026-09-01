export function TiktokSystemSection() {
    const framework = [
      {
        color: "lime",
        label: "Tìm & “hack” ý tưởng",
      },
      {
        color: "purple",
        label: "Hook · Body · CTA",
      },
      {
        color: "blue",
        label: "Concept kênh",
      },
      {
        color: "white",
        label: "Đo lường & tối ưu",
      },
    ];
  
    return (
      <section
        className="tiktok-system"
        id="tiktok-system"
      >
        {/* ========================================================
            TOP
            ======================================================== */}
  
        <div className="tiktok-system-top">
          <div className="wrap tiktok-system-top-inner">
            <h2
              className="tiktok-system-heading"
              data-rv="up"
            >
              Bởi vì xây một kênh TikTok
  
              <br />
  
              <span className="tiktok-system-heading-highlight">
                không chỉ là có một vài video viral
              </span>
            </h2>
  
            <p
              className="tiktok-system-description"
              data-rv="up"
              data-dl="80"
            >
              Mà là bạn phải liên tục tìm ra những ý tưởng mới,
              biết idea nào đáng để triển khai,
              <br />
              biết cách biến một ý tưởng thành nhiều nội dung khác nhau
              và quan trọng hơn,
              <br />
              <strong>
                biết mình đang làm content đó để đạt được mục tiêu gì.
              </strong>
            </p>
          </div>
        </div>
  
  
        {/* ========================================================
            BOTTOM
            ======================================================== */}
  
        <div className="tiktok-system-bottom">
          <div className="wrap tiktok-system-bottom-inner">
  
            {/* ================= LEFT ================= */}
  
            <div
              className="tiktok-system-statement"
              data-rv="up"
            >
              <h3>
                ĐÓ CŨNG CHÍNH LÀ
                <br />
  
                NHỮNG GÌ MÌNH MUỐN
                <br />
  
                HỆ THỐNG LẠI TRONG
                <br />
  
                <span>
                  TIKTOK IDEAS HACKING.
                </span>
              </h3>
            </div>
  
  
            {/* ================= RIGHT ================= */}
  
            <div
              className="tiktok-system-framework"
              data-rv="scale"
              data-dl="100"
            >
              <p className="tiktok-system-framework-intro">
                Từ cách tìm và “hack” ý tưởng, xây dựng
                Hook · Body · CTA, phát triển concept kênh,
                cho đến đo lường và tối ưu content.
              </p>
  
              <div className="tiktok-system-framework-list">
                {framework.map((item) => (
                  <div
                    className="tiktok-system-framework-item"
                    key={item.label}
                  >
                    <span
                      className={`tiktok-system-framework-dot tiktok-system-framework-dot--${item.color}`}
                    />
  
                    <span>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
  
          </div>
        </div>
      </section>
    );
  }