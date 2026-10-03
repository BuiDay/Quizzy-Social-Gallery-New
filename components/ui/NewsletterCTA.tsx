"use client";

import { useCreateContactUsMutation } from "@/redux/features/contactUs/contactUsApi";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
export function NewsletterCTA() {
  const [email, setEmail] = useState<string>("")
  const [createContactUs, { isSuccess, isError, isLoading, error }] = useCreateContactUsMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: connect Mailchimp / Brevo / API của bạn
    console.log("Newsletter:", email);
  };

  const handleRegisterEmail = () => {
    const checkMail = email.length === 0
    if (checkMail) {
      toast.error('Vui lòng điền email!')
      return
    }
    const checkInvalidEmail = email.match(emailRegex)
    if (!checkInvalidEmail) {
      toast.error('Email không hợp lệ!')
      return
    }
    createContactUs({ email })
  }

  useEffect(() => {
    if (isLoading) {
      toast.loading('Đang chạy')
    }
    if (isSuccess) {
      toast.success('Bạn đã đăng kí thành công !')
      toast.dismiss()
    }

    if (isError) {
      const { data } = error as any
      toast.dismiss()
      toast.error(data.message ? data.message : 'Đã có lỗi! Vui lòng thử lại.')
    }
  }, [isLoading, isSuccess, isError])


  return (
    <section className="products-newsletter">
      <div className="wrap products-newsletter-wrap">
        <div
          className="products-newsletter-shell"
          data-rv="up"
        >
          {/* ================= LEFT ================= */}
          <div className="products-newsletter-copy">
            <h2
              className="products-newsletter-title"
              data-rv="up"
              data-dl="60"
            >
              Tài liệu{" "}
              <span className="products-newsletter-highlight products-newsletter-highlight--sky">
                Social Media
              </span>

              <br />

              luôn được{" "}
              <span className="products-newsletter-highlight products-newsletter-highlight--lime">
                cập nhật liên tục
              </span>
            </h2>

            <p
              className="products-newsletter-description"
              data-rv="up"
              data-dl="120"
            >
              Những tài liệu luôn được cập nhật từ công việc thực tế,
              những gì mình đang làm, đang thử và thấy hữu ích.
            </p>

            <a
              href="#courses"
              className="products-newsletter-course-btn"
              data-rv="up"
              data-dl="170"
              data-cur="OPEN"
            >
              <span>Xem các khóa học đang mở</span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m15 8 4 4-4 4" />
              </svg>
            </a>
          </div>

          {/* ================= NEWSLETTER CARD ================= */}
          <div
            className="products-newsletter-card"
            data-rv="up"
            data-dl="120"
          >
            <h3>Đăng ký Newsletter</h3>

            <p>
              Theo dõi mình để nghe chuyện làm nghề &amp; nhận tài liệu
              mới mỗi tháng sớm nhất.
            </p>

            <form
              className="products-newsletter-form"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email của bạn"
                aria-label="Email của bạn"
                required
              />

              <button
                className="products-newsletter-submit"
                data-cur="Send"
                onClick={handleRegisterEmail}
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}