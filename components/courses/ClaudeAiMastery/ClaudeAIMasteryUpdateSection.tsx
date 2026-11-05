"use client";

import Image, { type StaticImageData } from "next/image";
import { PaidProductAction } from "@/components/ui/PaidProductAction";
import EditStudioImage from "@/assets/images/claude ai/edit-studio.webp";

type ClaudeAIMasteryUpdateSectionProps = {
  studioImage?: StaticImageData;
  purchaseUrl?: string;
  curriculumUrl?: string;
  product?: any;
  handleBuy?: any;
};

export function ClaudeAIMasteryUpdateSection({
  studioImage = EditStudioImage,
  purchaseUrl = "#claude-register",
  curriculumUrl = "#claude-curriculum",
  product,
  handleBuy,
}: ClaudeAIMasteryUpdateSectionProps) {
  return (
    <section className="claude-update" id="claude-update">
      <div className="claude-update__inner">
        <div className="claude-update__head">
          <span className="claude-update__eyebrow">
            <span className="claude-update__dot" />
            Mới cập nhật vào khoá học
          </span>
          <h2 className="claude-update__title">
            Cập nhật kỹ năng <span className="claude-update__pill">edit video</span>
            <br />
            như một{" "}
            <span className="claude-update__pill claude-update__pill--lime">
              editor chuyên nghiệp
            </span>
          </h2>
          <p className="claude-update__sub">
            Không cần thành thạo CapCut hay phần mềm edit chuyên nghiệp, cũng
            không cần kỹ năng của một editor. Bạn chỉ cần đưa video thô, Claude
            sẽ cắt ghép, thêm phụ đề, hiệu ứng theo đúng style bạn muốn.
          </p>
        </div>

        <div className="claude-update__grid">
          <article className="cu-card cu-card--a">
            <div className="cu-num">01</div>
            <div className="cu-big">
              <b>20</b>
              <span>phút</span>
            </div>
            <h3>Edit xong một video</h3>
            <p>
              Đưa video thô vào, khoảng 20 phút là có bản hoàn chỉnh: đã cắt
              gọn, có phụ đề, hiệu ứng và nhạc.
            </p>
          </article>

          <article className="cu-card cu-card--b">
            <div className="cu-num">02</div>
            <h3>Làm theo video mẫu</h3>
            <p>
              Thích video của ai, gửi cho Claude. Claude học font chữ, màu, hiệu
              ứng của video đó rồi làm lại cho video của bạn.
            </p>
            <div className="cu-chips">
              <span>Font</span>
              <span>Màu</span>
              <span>Chuyển cảnh</span>
              <span>Text effect</span>
            </div>
          </article>

          <article className="cu-card cu-card--c">
            <div className="cu-num">03</div>
            <h3>Thành phẩm chuyên nghiệp</h3>
            <p>
              Video nói có chèn cảnh minh hoạ (B-roll), chữ động, motion
              graphic. Đúng khung TikTok, Reels, Shorts.
            </p>
            <div className="cu-chips">
              <span>Talking Head</span>
              <span>B-roll</span>
              <span>Motion Graphic</span>
            </div>
          </article>

          <article className="cu-card cu-card--d">
            <div className="cu-num">04</div>
            <h3>Có sẵn bộ tài liệu</h3>
            <p>
              Skill edit đi kèm website motion graphic và bộ hiệu ứng video, lấy
              ra dùng ngay cho mọi dự án.
            </p>
            <div className="cu-stat">
              <div>
                <b>30+</b>
                <small>Hiệu ứng chữ</small>
              </div>
              <div>
                <b>20+</b>
                <small>Hiệu ứng cảnh</small>
              </div>
            </div>
          </article>

          <article className="cu-card cu-card--e cu-card--hi">
            <div className="cu-num">05</div>
            <h3>Hệ thống Edit Studio</h3>
            <p>
              Muốn sửa chữ, đổi màu hay dời hiệu ứng? Chỉnh thẳng trên giao diện
              edit trong Claude, không cần mở phần mềm khác.
            </p>
            <figure className="cu-shot">
              <Image
                src={studioImage}
                alt="Giao diện Reel Studio 2 – chỉnh video trực tiếp trong Claude"
                sizes="(max-width: 620px) 100vw, (max-width: 960px) 90vw, 740px"
              />
            </figure>
          </article>
        </div>

        <div className="claude-update__actions">
          {product ? (
            <PaidProductAction
              product={product}
              buttonText="Đăng ký học ngay"
              onBuy={handleBuy}
              className="cu-cta"
            />
          ) : (
            <a className="cu-cta" href={purchaseUrl}>
              <span>Đăng ký học ngay</span>
              <span aria-hidden="true">→</span>
            </a>
          )}
          <a className="cu-ghost" href={curriculumUrl}>
            Xem module khoá học <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
