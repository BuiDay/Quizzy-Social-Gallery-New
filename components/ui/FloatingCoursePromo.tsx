"use client";
import "@/styles/floating-course-promo.css";
import {
  useEffect,
  useState,
} from "react";

import productImage from "@/assets/images/claude ai/intro.png"
import Image from "next/image";

type FloatingCoursePromoProps = {
  title?: string;
  title1?: string;
  price?: string;
  oldPrice?: string;
  href?: string;
  image?: any;
};

export function FloatingCoursePromo({
  title = "Claude AI Mastery ",
  title1 = "Tự động hóa công việc với Claude AI",
  price = "X.XXX.000đ",
  oldPrice = "X.XXX.000đ",
  href = "/courses/claude-ai-mastery",
  image = productImage,
}: FloatingCoursePromoProps) {
  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    let hideTimer:
      | ReturnType<
          typeof setTimeout
        >
      | undefined;

    // lần đầu hiện sau 5s
    const firstTimer =
      setTimeout(() => {
        setVisible(true);

        hideTimer = setTimeout(
          () => {
            setVisible(false);
          },
          4000,
        );
      }, 5000);

    // sau đó cứ mỗi 9s:
    // 5s ẩn + 4s hiện
    const interval =
      setInterval(() => {
        setVisible(true);

        hideTimer = setTimeout(
          () => {
            setVisible(false);
          },
          4000,
        );
      }, 9000);

    return () => {
      clearTimeout(firstTimer);

      if (hideTimer) {
        clearTimeout(hideTimer);
      }

      clearInterval(interval);
    };
  }, []);

  return (
    <aside
      className={`floating-course-promo ${
        visible
          ? "is-visible"
          : ""
      }`}
      aria-hidden={!visible}
    >
      <div className="floating-course-promo__image">
        {image ? (
          <Image
            src={image}
            alt=""
          />
        ) : (
          <div
            className="floating-course-promo__art"
            aria-hidden="true"
          >
            <span className="floating-course-promo__cloud floating-course-promo__cloud--1" />

            <span className="floating-course-promo__cloud floating-course-promo__cloud--2" />

            <span className="floating-course-promo__hill floating-course-promo__hill--back" />

            <span className="floating-course-promo__hill floating-course-promo__hill--front" />
          </div>
        )}
      </div>

      <div className="floating-course-promo__content">
        <p className="floating-course-promo__title">
          {title}
        </p>
        <p className="floating-course-promo__title">
          {title1}
        </p>

        <div className="floating-course-promo__price">
          <strong>
            {price}
          </strong>

          <del>
            {oldPrice}
          </del>
        </div>

        <div className="floating-course-promo__actions">
          <span className="floating-course-promo__offer">
            ĐĂNG KÝ NGAY · ƯU ĐÃI
            ĐẾN 30%
          </span>

          <a
            href={href}
            className="floating-course-promo__button"
            data-cur="OPEN"
            tabIndex={
              visible ? 0 : -1
            }
          >
            Xem chi tiết

            <span>
              ↗
            </span>
          </a>
        </div>
      </div>
    </aside>
  );
}