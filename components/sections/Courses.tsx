"use client";
import type { KeyboardEvent } from "react";
import { course } from "@/data/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { useModal } from "@/components/ui/ModalContext";

export function Courses() {
  const { openModal } = useModal();
  return (
    <section className="courses sec" id="courses">
      <div className="wrap">
        <div className="shead">
          <div>
            <Eyebrow data-rv="up">02 / Khóa học</Eyebrow>
            <h2 className="h2" data-rv="clip" data-dl="70">
              Học <span className="cap lil">Social Media</span>
              <br />
              và làm ra thứ chạy thật.
            </h2>
          </div>
          <p className="lead" data-rv="up" data-dl="150">
            Khóa học nền tảng, mở đăng ký theo đợt. Mỗi lớp giới hạn số lượng để
            mình review được bài của từng người.
          </p>
        </div>
        <article
          className="course"
          data-rv="up"
          tabIndex={0}
          data-cur="OPEN"
          onClick={() => openModal(course)}
          onKeyDown={(e: KeyboardEvent<HTMLElement>) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openModal(course);
            }
          }}
        >
          <div className="course-vis">
            <span
              className="mesh m1"
              style={{
                width: "70%",
                top: "-16%",
                left: "-10%",
                background: "var(--lilac)",
                opacity: 0.75,
              }}
            />
            <span
              className="mesh m2"
              style={{
                width: "55%",
                bottom: "-12%",
                right: "-8%",
                background: "var(--sky)",
                opacity: 0.8,
              }}
            />
            <span className="cbadge glass">Đang mở đăng ký</span>
            <span className="cnum">01</span>
          </div>
          <div className="course-body">
            <Eyebrow>Khóa nền tảng</Eyebrow>
            <h3 className="h2">Content Strategy</h3>
            <p className="lead">
              Xây dựng chiến lược nội dung có gốc rễ: hiểu khách hàng, chọn góc
              nhìn thương hiệu và dựng khung nội dung chạy được cả quý — thay vì
              sáng ra mới nghĩ hôm nay đăng gì.
            </p>
            <div className="cmeta">
              <span>6 buổi live</span>
              <span>Review bài 1:1</span>
              <span>Tài liệu trọn đời</span>
              <span>Tối & cuối tuần</span>
            </div>
            <div>
              <span className="btn solid mag" data-cur="OPEN">
                <span>
                  Xem chi tiết khóa học <ArrowRightIcon />
                </span>
              </span>
            </div>
            <p className="cnote">
              <i />
              Social Media Management & Personal Branding sẽ mở trong các đợt
              tiếp theo.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
