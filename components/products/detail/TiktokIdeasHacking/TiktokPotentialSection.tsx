import Image from "next/image";
import TiktokIdeasIcon from "@/assets/images/TikTok Ideas Hacking/2.png";

import potential1 from "@/assets/images/TikTok Ideas Hacking/3.png";
import potential2 from "@/assets/images/TikTok Ideas Hacking/4.png";
import potential3 from "@/assets/images/TikTok Ideas Hacking/5.png";
import potential4 from "@/assets/images/TikTok Ideas Hacking/6.png";
import potential5 from "@/assets/images/TikTok Ideas Hacking/7.png";
import potential6 from "@/assets/images/TikTok Ideas Hacking/8.png";
import potential7 from "@/assets/images/TikTok Ideas Hacking/9.png";

export function TiktokPotentialSection() {
  const videos = [
    { id: 1, label: potential1 },
    { id: 2, label: potential2 },
    { id: 3, label: potential3 },
    { id: 4, label: potential4 },
    { id: 5, label: potential5 },
    { id: 6, label: potential6 },
    { id: 7, label: potential7 },
  ];

  const sliderVideos = [...videos, ...videos];

  return (
    <section className="tiktok-potential" id="tiktok-potential">
      {/* ================= TOP ================= */}

      <div className="wrap tiktok-potential-top">
        <div className="tiktok-potential-copy">
          <h2 className="tiktok-potential-title" data-rv="up">
            <span className="tiktok-potential-outline">TikTok</span> luôn là{" "}
            <span className="tiktok-potential-highlight tiktok-potential-highlight--purple">
              nơi tiềm năng
            </span>
            <br />
            cho những ai{" "}
            <span className="tiktok-potential-highlight tiktok-potential-highlight--lime">
              có ý tưởng
            </span>
            .
          </h2>

          <div
            className="tiktok-potential-description"
            data-rv="up"
            data-dl="80"
          >
            <p>
              Với <strong>5 năm kinh nghiệm làm Social Media</strong>, mình đã
              trực tiếp xây dựng chiến lược, phát triển nội dung và vận hành
              nhiều kênh, đặc biệt là TikTok.
            </p>

            <p>
              Không chỉ xây dựng kênh cho Personal Branding của mình, mình còn
              trực tiếp lên chiến lược, phát triển nội dung và triển khai
              content cho nhiều clients thuộc những ngành hàng khác nhau.
            </p>
          </div>
        </div>

        {/* ================= IMAGE PLACEHOLDER ================= */}

        <div className="tiktok-potential-sticker" data-rv="scale" data-dl="100">
          <Image
            src={TiktokIdeasIcon}
            alt="TikTok Ideas"
            fill
            className="tiktok-potential-sticker-image"
          />

          <div className="tiktok-potential-sticker-placeholder">IMAGE</div>
        </div>
      </div>

      {/* ========================================================
            VIDEO GALLERY
            ======================================================== */}

      <div className="tiktok-video-wall" data-rv="up" data-dl="150">
        <div className="tiktok-video-slider">
          <div className="tiktok-video-track">
            {sliderVideos.map((item, index) => (
              <article
                className="tiktok-video-card"
                key={`${item.id}-${index}`}
              >
                <span className="tiktok-video-pin" />

                <div className="tiktok-video-frame">
                  <Image
                    src={item.label}
                    alt={item.id.toString()}
                    fill
                    className="tiktok-video-image"
                  />

                  {/* 
                  <div className="tiktok-video-placeholder">
                    {item.label}
                  </div> */}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ================= INSIGHT ================= */}

      <div className="wrap tiktok-potential-insight" data-rv="up">
        <p>
          Nhưng sau hàng trăm video và một khoảng thời gian dài liên tục duy trì
          content
          <br />
          trên TikTok, mình nhận ra một điều:
        </p>
      </div>

      {/* ========================================================
            STATEMENT
            ======================================================== */}

      <div className="tiktok-potential-statement">
        <div className="tiktok-statement-left" data-rv="slide">
          <p>
            LÀM ĐƯỢC MỘT VIDEO
            <br />
            HAY KHÔNG KHÓ.
          </p>
        </div>

        <div className="tiktok-statement-right" data-rv="slide" data-dl="80">
          <p>
            KHÓ LÀ LÀM SAO ĐỂ
            <br />
            KÊNH LUÔN CÓ IDEA MỚI
            <br />
            ĐỂ PHÁT TRIỂN.
          </p>
        </div>
      </div>
    </section>
  );
}
