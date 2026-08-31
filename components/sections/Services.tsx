"use client";
import { useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { Art } from "@/components/ui/Art";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";

const services = [
  [
    "01",
    "g1",
    "Xây dựng chiến lược nội dung",
    "Nghiên cứu khách hàng, định hướng nội dung và xây dựng thông điệp phù hợp với thương hiệu trên từng nền tảng.",
  ],
  [
    "02",
    "g2",
    "Lên kế hoạch & quản lý Social Media",
    "Lập content calendar, phát triển nội dung, quản lý kênh và theo dõi hiệu quả theo từng giai đoạn.",
  ],
  [
    "03",
    "g3",
    "Audit & tối ưu nội dung",
    "Đánh giá kênh hiện tại, tìm điểm chưa hiệu quả và đưa ra hướng cải thiện về nội dung, format và cách triển khai.",
  ],
  [
    "04",
    "g5",
    "Đồng hành tăng trưởng kênh",
    "Thử nghiệm format mới, cập nhật trend phù hợp và tối ưu cách làm để kênh phát triển bền vững.",
  ],
] as const;

export function Services() {
  const [preview, setPreview] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const movePreview = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = previewRef.current;
    if (!el) return;
    const halfW = 106,
      halfH = 132,
      gap = 132,
      edge = 18;
    let x = e.clientX + gap;
    if (x + halfW > window.innerWidth - edge) x = e.clientX - gap;
    const y = Math.min(
      window.innerHeight - halfH - edge,
      Math.max(halfH + edge, e.clientY)
    );
    el.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(1)`;
  };

  const hidePreview = () => {
    setPreview(null);
    const el = previewRef.current;
    if (el)
      el.style.transform = el.style.transform.replace("scale(1)", "scale(.94)");
  };

  return (
    <>
      <section className="sec" id="services">
        <div className="wrap">
          <div className="services-head-top">
            <Eyebrow data-rv="up">
              03/ DỊCH VỤ SOCIAL MEDIA MARKETING
            </Eyebrow>
          </div>
          <div className="services-head">
            <div className="services-head-inner">
              <h2
                className="services-main-title"
                data-rv="up"
                data-dl="70"
              >
                Giải pháp{" "}
                <span className="services-highlight services-highlight--sky">
                  Social Media Marketing
                </span>
                <br />
                <span className="services-highlight services-highlight--lime">
                  toàn diện
                </span>{" "}
                cho doanh nghiệp
              </h2>

              <p
                className="services-head-desc"
                data-rv="up"
                data-dl="150"
              >
                Tư vấn &amp; Coaching Social Media và Personal Branding — dành cho
                doanh nghiệp và cá nhân muốn xây dựng thương hiệu trên Social Media
                bài bản và hiệu quả.
              </p>
            </div>
          </div>
          <div
            className="svcs"
            id="svcs"
            onMouseMove={movePreview}
            onMouseLeave={hidePreview}
          >
            {services.map(([idx, g, t, d], i) => (
              <div
                className="svc"
                key={idx}
                data-cur="VIEW"
                tabIndex={0}
                data-rv="slide"
                data-dl={i * 70}
                // onMouseEnter={() => setPreview(g)}
              >
                <span className="idx">{idx}</span>
                <div>
                  <h3 className="h3">{t}</h3>
                  <p className="d">{d}</p>
                </div>
                <span className="arc">
                  <ArrowUpRightIcon />
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 36 }} data-rv="up">
            <a href="#footer" className="btn mag" data-cur="OPEN">
              <span>
              Liên hệ làm việc<ArrowUpRightIcon />
              </span>
            </a>
          </div>
        </div>
      </section>
      {/* <div ref={previewRef} className={`pv ${preview ? "show" : ""}`} id="pv">
        {preview && <Art variant={preview} />}
      </div> */}
    </>
  );
}
