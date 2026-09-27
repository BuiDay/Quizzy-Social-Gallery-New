"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

const contactTypes = [
  "Booking Creator",
  "Dịch vụ Social Media",
  "Khóa học & tài liệu",
  "Hợp tác khác",
];

const budgets = [
  "Dưới 10 triệu",
  "10 – 30 triệu",
  "30 – 50 triệu",
  "Trên 50 triệu",
  "Chưa xác định",
];

export function ContactPageContent() {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  const [contactType, setContactType] =
    useState("Booking Creator");

  const [budget, setBudget] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  /* ============================================================
     REVEAL
     ============================================================ */

  useEffect(() => {
    const root =
      sectionRef.current;

    if (!root) return;

    const items =
      root.querySelectorAll<HTMLElement>(
        ".contact-reveal",
      );

    if (
      !(
        "IntersectionObserver" in
        window
      )
    ) {
      items.forEach((item) =>
        item.classList.add(
          "is-visible",
        ),
      );

      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                !entry.isIntersecting
              ) {
                return;
              }

              entry.target.classList.add(
                "is-visible",
              );

              observer.unobserve(
                entry.target,
              );
            },
          );
        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -5% 0px",
        },
      );

    items.forEach((item) =>
      observer.observe(item),
    );

    return () =>
      observer.disconnect();
  }, []);

  /* ============================================================
     SUBMIT
     ============================================================ */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    setStatus("");

    const formData =
      new FormData(
        event.currentTarget,
      );

    const payload = {
      name: String(
        formData.get("name") ?? "",
      ).trim(),

      email: String(
        formData.get("email") ?? "",
      ).trim(),

      phone: String(
        formData.get("phone") ?? "",
      ).trim(),

      company: String(
        formData.get("company") ?? "",
      ).trim(),

      type: contactType,

      budget,

      message: String(
        formData.get("message") ?? "",
      ).trim(),
    };

    try {
      setIsSubmitting(true);

      /*
        CONNECT API SAU:

        const response = await fetch(
          "/api/contact",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              payload,
            ),
          },
        );

        if (!response.ok) {
          throw new Error(
            "Không thể gửi form.",
          );
        }
      */

      console.log(
        "CONTACT:",
        payload,
      );

      setStatus(
        "Thông tin đã được ghi nhận trên giao diện. Khi kết nối API, form sẽ gửi trực tiếp về hệ thống.",
      );
    } catch {
      setStatus(
        "Có lỗi xảy ra. Bạn vui lòng thử lại.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={sectionRef}
      className="contact-page"
    >
      {/* ======================================================
          HERO
          ====================================================== */}

      {/* <section className="contact-hero">
        <div className="contact-hero__inner">


          <div className="contact-hero__main">
            <div className="contact-eyebrow contact-reveal">
              <i />
              CONTACT QUIZZY
            </div>

            <h1>
              <span className="contact-title-line contact-reveal">
                LET&apos;S
              </span>

              <span className="contact-title-line contact-title-line--second contact-reveal">
                <span className="contact-title-star">
                  ✱
                </span>

                <span className="contact-title-pill contact-title-pill--purple">
                  WORK
                </span>
              </span>

              <span className="contact-title-line contact-title-line--third contact-reveal">
                <span className="contact-title-pill contact-title-pill--lime">
                  TOGETHER
                </span>

                <span className="contact-title-arrow">
                  ↗
                </span>
              </span>
            </h1>
          </div>


          <div className="contact-hero__aside contact-reveal">
            <p>
              Bạn đang muốn booking
              Quizzy, cần tư vấn Social
              Media, tìm hiểu khóa học
              hoặc đơn giản là muốn kết
              nối?
            </p>

            <p>
              Gửi thông tin bên dưới,
              team sẽ xem brief và phản
              hồi sớm nhất có thể.
            </p>

            <a
              href="#contact-form"
              className="contact-hero__cta"
              data-cur="OPEN"
            >
              <span>
                GỬI THÔNG TIN
              </span>

              <span>↓</span>
            </a>
          </div>
        </div>



        <div
          className="contact-hero__orb contact-hero__orb--one"
          aria-hidden="true"
        />

        <div
          className="contact-hero__orb contact-hero__orb--two"
          aria-hidden="true"
        />
      </section> */}

      {/* ======================================================
          QUICK CONTACT
          ====================================================== */}

      {/* <section className="contact-quick">
        <div className="contact-quick__inner">
          <div className="contact-quick__label contact-reveal">
            OR REACH ME HERE
          </div>

          <div className="contact-quick__grid">

            <a
              href="mailto:YOUR_EMAIL@gmail.com"
              className="contact-quick-card contact-reveal"
              data-cur="OPEN"
            >
              <span className="contact-quick-card__number">
                01
              </span>

              <div>
                <small>
                  EMAIL
                </small>

                <strong>
                  YOUR_EMAIL@gmail.com
                </strong>
              </div>

              <span className="contact-quick-card__arrow">
                ↗
              </span>
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="contact-quick-card contact-quick-card--purple contact-reveal"
              data-cur="OPEN"
            >
              <span className="contact-quick-card__number">
                02
              </span>

              <div>
                <small>
                  INSTAGRAM
                </small>

                <strong>
                  @quizzy.socialtime
                </strong>
              </div>

              <span className="contact-quick-card__arrow">
                ↗
              </span>
            </a>

            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noreferrer"
              className="contact-quick-card contact-quick-card--lime contact-reveal"
              data-cur="OPEN"
            >
              <span className="contact-quick-card__number">
                03
              </span>

              <div>
                <small>
                  TIKTOK
                </small>

                <strong>
                  @quizzy.socialtime
                </strong>
              </div>

              <span className="contact-quick-card__arrow">
                ↗
              </span>
            </a>
          </div>
        </div>
      </section> */}

      {/* ======================================================
          CONTACT FORM
          ====================================================== */}

      <section
        className="contact-form-section"
        id="contact-form"
      >
        <div className="contact-form-section__inner">

          {/* LEFT */}

          <div className="contact-form-intro contact-reveal">
            <span>
              START A CONVERSATION
            </span>

            <h2>
              TELL ME
              <br />

              <span>
                ABOUT YOUR
              </span>

              <br />

              <strong>
                PROJECT.
              </strong>
            </h2>

            <p>
              Một vài thông tin ban đầu
              sẽ giúp team hiểu nhanh hơn
              về nhu cầu và chuẩn bị nội
              dung phản hồi phù hợp.
            </p>

            <div className="contact-form-intro__note">
              <span>✦</span>

              <p>
                Bạn chưa có brief hoàn
                chỉnh cũng không sao.
                Chỉ cần chia sẻ nhu cầu
                hiện tại.
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <form
            className="contact-form contact-reveal"
            onSubmit={handleSubmit}
          >
            {/* TYPE */}

            <div className="contact-form-block">
              <div className="contact-form-block__head">
                <span>01</span>

                <h3>
                  Bạn muốn liên hệ về?
                </h3>
              </div>

              <div className="contact-choice-list">
                {contactTypes.map(
                  (item) => (
                    <button
                      type="button"
                      key={item}
                      className={
                        contactType ===
                        item
                          ? "is-active"
                          : ""
                      }
                      onClick={() =>
                        setContactType(
                          item,
                        )
                      }
                      data-cur="hover"
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* INFO */}

            <div className="contact-form-block">
              <div className="contact-form-block__head">
                <span>02</span>

                <h3>
                  Thông tin của bạn
                </h3>
              </div>

              <div className="contact-fields">
                <label className="contact-field">
                  <span>
                    Họ và tên *
                  </span>

                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Tên của bạn"
                  />
                </label>

                <label className="contact-field">
                  <span>
                    Email *
                  </span>

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="example@gmail.com"
                  />
                </label>

                <label className="contact-field">
                  <span>
                    Số điện thoại
                  </span>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="0xxx xxx xxx"
                  />
                </label>

                <label className="contact-field">
                  <span>
                    Brand / Công ty
                  </span>

                  <input
                    type="text"
                    name="company"
                    placeholder="Tên thương hiệu"
                  />
                </label>
              </div>
            </div>

            {/* BUDGET */}

            <div className="contact-form-block">
              <div className="contact-form-block__head">
                <span>03</span>

                <h3>
                  Ngân sách dự kiến
                </h3>
              </div>

              <div className="contact-choice-list">
                {budgets.map(
                  (item) => (
                    <button
                      type="button"
                      key={item}
                      className={
                        budget === item
                          ? "is-active"
                          : ""
                      }
                      onClick={() =>
                        setBudget(item)
                      }
                      data-cur="hover"
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* MESSAGE */}

            <div className="contact-form-block">
              <div className="contact-form-block__head">
                <span>04</span>

                <h3>
                  Chia sẻ thêm về nhu cầu
                </h3>
              </div>

              <label className="contact-field">
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Bạn có thể chia sẻ về brand, mục tiêu, deliverables, timeline hoặc bất kỳ thông tin nào team cần biết..."
                />
              </label>
            </div>

            {status && (
              <div
                className="contact-form-status"
                role="status"
              >
                {status}
              </div>
            )}

            <button
              type="submit"
              className="contact-submit"
              disabled={
                isSubmitting
              }
              data-cur="OPEN"
            >
              <span>
                {isSubmitting
                  ? "ĐANG GỬI..."
                  : "GỬI YÊU CẦU"}
              </span>

              <span>↗</span>
            </button>
          </form>
        </div>
      </section>

      {/* ======================================================
          BOTTOM
          ====================================================== */}

      {/* <section className="contact-bottom">
        <div className="contact-bottom__inner">

          <div className="contact-bottom__headline contact-reveal">
            <span>
              HAVE SOMETHING
            </span>

            <strong>
              INTERESTING?
            </strong>
          </div>

          <div className="contact-bottom__copy contact-reveal">
            <p>
              Một dự án hay thường bắt
              đầu từ một cuộc trò chuyện
              đơn giản.
            </p>

            <a
              href="#contact-form"
              data-cur="OPEN"
            >
              LET&apos;S TALK
              <span>↗</span>
            </a>
          </div>

        </div>
      </section> */}
    </div>
  );
}