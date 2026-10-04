"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";


type ClaudeAIMasteryPricingSectionProps = {
  originalPrice?: string;
  currentPrice?: string;
  purchaseUrl?: string;

  savingPrice?: string;

  offerStartLabel?: string;
  offerPeriod?: string;

  secondPrice?: string;
  secondPeriod?: string;

  finalPrice?: string;
  finalPeriod?: string;

  offerEndAt?: string;
};


const moduleTags = [
  "Hệ sinh thái Claude",
  "Skills & Token",
  "Research",
  "Content",
  "Design",
  "Data",
  "Vibe coding & CV",
];


const benefits = [
  {
    title:
      "8 module học, từ nền tảng đến thực chiến",

    description: "",
  },

  {
    title:
      "20+ tài liệu & template dùng ngay",

    description:
      "30+ AI Skills cho Social Media, 50+ prompt thực chiến, thư viện Knowledge Base và tài nguyên Claude.",
  },

  {
    title:
      "Cộng đồng Social Media 6.000+ thành viên",

    description:
      "Hỏi đáp, chia sẻ workflow và cập nhật tính năng mới của Claude.",
  },

  {
    title:
      "Certificate và 6 tháng xem lại",

    description:
      "Học theo tốc độ của bạn trên hệ thống e-learning.",
  },
];


function pad(value: number) {
  return String(value).padStart(
    2,
    "0",
  );
}


export function ClaudeAIMasteryPricingSection({
  originalPrice = "1.590.000đ",

  currentPrice = "790.000đ",

  purchaseUrl = "#claude-register",

  savingPrice = "800.000đ",

  offerStartLabel =
    "MỞ BÁN NGÀY 19H 05/10",

  offerPeriod =
    "05/10 – 10/10",

  secondPrice =
    "1.090.000đ",

  secondPeriod =
    "11/10 – 17/10",

  finalPrice =
    "1.590.000đ",

  finalPeriod =
    "Từ 15/10",

  offerEndAt =
    "2026-10-05T19:00:00+07:00",
}: ClaudeAIMasteryPricingSectionProps) {

  const sectionRef =
    useRef<HTMLElement>(null);


  const [
    now,
    setNow,
  ] = useState(
    () => Date.now(),
  );


  /* ============================================================
     REVEAL
     ============================================================ */

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;


    const items =
      section.querySelectorAll<HTMLElement>(
        ".claude-pricing-reveal",
      );


    if (
      !(
        "IntersectionObserver" in
        window
      )
    ) {
      items.forEach(
        (item) =>
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


    items.forEach(
      (item) =>
        observer.observe(item),
    );


    return () =>
      observer.disconnect();

  }, []);


  /* ============================================================
     COUNTDOWN
     ============================================================ */

  useEffect(() => {
    const timer =
      window.setInterval(
        () => {
          setNow(
            Date.now(),
          );
        },
        1000,
      );

    return () =>
      window.clearInterval(
        timer,
      );

  }, []);


  const countdown =
    useMemo(() => {

      const target =
        new Date(
          offerEndAt,
        ).getTime();


      const difference =
        Math.max(
          0,
          target - now,
        );


      const totalSeconds =
        Math.floor(
          difference /
            1000,
        );


      const days =
        Math.floor(
          totalSeconds /
            86400,
        );


      const hours =
        Math.floor(
          (totalSeconds %
            86400) /
            3600,
        );


      const minutes =
        Math.floor(
          (totalSeconds %
            3600) /
            60,
        );


      const seconds =
        totalSeconds %
        60;


      return {
        days,
        hours,
        minutes,
        seconds,
      };

    }, [
      now,
      offerEndAt,
    ]);


  return (
    <section
      ref={sectionRef}
      className="claude-pricing"
      id="claude-register"
    >

      <div className="claude-pricing__inner">

        {/* ====================================================
            HEAD
            ==================================================== */}

        <header className="claude-pricing-head">

          <div className="claude-pricing__kicker claude-pricing-reveal">
            <i />

            <span>
              HỌC PHÍ &amp; ƯU ĐÃI
              MỞ BÁN
            </span>
          </div>


          <h2 className="claude-pricing-head__title claude-pricing-reveal">

            Vào học sớm,{" "}

            <span className="claude-pricing-head__outline">
              trả ít hơn
            </span>{" "}

            <span className="claude-pricing-head__lime">
              tới {savingPrice}
            </span>

          </h2>


          <p className="claude-pricing-head__description claude-pricing-reveal">
            Học phí tăng theo từng đợt
            mở bán. Mức giá bên dưới
            chỉ giữ đến hết đợt hiện
            tại.
          </p>

        </header>


        {/* ====================================================
            MAIN GRID
            ==================================================== */}

        <div className="claude-pricing-main">

          {/* ==================================================
              LEFT — BENEFITS
              ================================================== */}

          <article
            className="claude-pricing-benefits claude-pricing-reveal"

            style={
              {
                "--pricing-delay":
                  "0.08s",
              } as CSSProperties
            }
          >

            <div className="claude-pricing-benefits__head">

              <span>
                BẠN NHẬN ĐƯỢC GÌ
              </span>

              <h3>
                Một lần đăng ký,
                <br />
                dùng trọn bộ
                trong 6 tháng.
              </h3>

            </div>


            <div className="claude-pricing-benefits__list">

              {benefits.map(
                (
                  item,
                  index,
                ) => (

                  <div
                    key={
                      item.title
                    }
                    className="claude-pricing-benefit"
                  >

                    <span className="claude-pricing-benefit__check">
                      ✓
                    </span>


                    <div className="claude-pricing-benefit__copy">

                      <strong>
                        {item.title}
                      </strong>


                      {index ===
                        0 && (

                        <div className="claude-pricing-benefit__tags">

                          {moduleTags.map(
                            (
                              tag,
                            ) => (
                              <span
                                key={
                                  tag
                                }
                              >
                                {
                                  tag
                                }
                              </span>
                            ),
                          )}

                        </div>
                      )}


                      {item.description && (
                        <p>
                          {
                            item.description
                          }
                        </p>
                      )}

                    </div>

                  </div>

                ),
              )}

            </div>

          </article>


          {/* ==================================================
              RIGHT — OFFER
              ================================================== */}

          <article
            className="claude-pricing-offer claude-pricing-reveal"

            style={
              {
                "--pricing-delay":
                  "0.16s",
              } as CSSProperties
            }
          >

            {/* DECOR */}

            <span className="claude-pricing-offer__circle" />


            <div className="claude-pricing-offer__top">

              <span className="claude-pricing-offer__badge">
                {offerStartLabel}
              </span>

            </div>


            {/* PRICE */}

            <div className="claude-pricing-offer__price-wrap">

              <strong className="claude-pricing-offer__price">
                {currentPrice}
              </strong>


              <div className="claude-pricing-offer__price-meta">

                <del>
                  {originalPrice}
                </del>


                <span>
                  Tiết kiệm{" "}
                  {savingPrice}
                </span>

              </div>

            </div>


            {/* COUNTDOWN LABEL */}

            <div className="claude-pricing-offer__countdown-label">
              Giá Early Bird mở sau
            </div>


            {/* COUNTDOWN */}

            <div className="claude-pricing-countdown">

              <div>
                <strong>
                  {pad(
                    countdown.days,
                  )}
                </strong>

                <span>
                  Ngày
                </span>
              </div>


              <div>
                <strong>
                  {pad(
                    countdown.hours,
                  )}
                </strong>

                <span>
                  Giờ
                </span>
              </div>


              <div>
                <strong>
                  {pad(
                    countdown.minutes,
                  )}
                </strong>

                <span>
                  Phút
                </span>
              </div>


              <div>
                <strong>
                  {pad(
                    countdown.seconds,
                  )}
                </strong>

                <span>
                  Giây
                </span>
              </div>

            </div>


            {/* BUTTON */}

            <div className="claude-pricing-offer__cta-wrap">

              <a
                href={
                  purchaseUrl
                }
                className="claude-pricing-offer__button"
                // data-cur="MUA"
              >

                <span>
                  Giữ suất giá{" "}
                  {currentPrice}
                </span>

                <span
                  aria-hidden="true"
                >
                  →
                </span>

              </a>


              <span className="claude-pricing-offer__discount">
                GIẢM 50%
              </span>

            </div>


            <p className="claude-pricing-offer__footnote">
              Giá {currentPrice} áp
              dụng từ 19H 05/10 đến hết
              ngày 10/10.
            </p>

          </article>

        </div>


        {/* ====================================================
            PRICE JOURNEY
            ==================================================== */}

        <div className="claude-pricing-roadmap claude-pricing-reveal">

          <h3>
            Lộ trình học phí
          </h3>


          <div className="claude-pricing-roadmap__grid">

            {/* CURRENT */}

            <article className="claude-pricing-stage claude-pricing-stage--current">

              <div className="claude-pricing-stage__head">

                <span>
                  Early Bird
                </span>

                <small>
                  Mở 19H 05/10
                </small>

              </div>


              <strong>
                {currentPrice}
              </strong>


              <p>
                {offerPeriod}
              </p>


              <span className="claude-pricing-stage__status">
                GIÁ HIỆN TẠI
              </span>

            </article>


            {/* PHASE 2 */}

            <article className="claude-pricing-stage">

              <div className="claude-pricing-stage__head">

                <span>
                  Ưu đãi đợt 2
                </span>

                <small>
                  Sắp tới
                </small>

              </div>


              <strong>
                {secondPrice}
              </strong>


              <p>
                {secondPeriod}
              </p>

            </article>


            {/* ORIGINAL */}

            <article className="claude-pricing-stage">

              <div className="claude-pricing-stage__head">

                <span>
                  Giá gốc
                </span>

                <small>
                  Sắp tới
                </small>

              </div>


              <strong>
                {finalPrice}
              </strong>


              <p>
                {finalPeriod}
              </p>

            </article>

          </div>

        </div>

      </div>

    </section>
  );
}