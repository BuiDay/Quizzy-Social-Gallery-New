"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";


import Portfolio from "@/assets/images/Social Media Bundle/01/3.png"
import Proposal from "@/assets/images/Social Media Bundle/02/5.png"
import Audit from "@/assets/images/Social Media Bundle/03/7.png"
import Strategy from "@/assets/images/Social Media Bundle/04/9.png"
import Report from "@/assets/images/Social Media Bundle/05/13.png"
import Plan from "@/assets/images/Social Media Package 1/Social Media Plan/14.png"

type WorkItem = {
  title: string;
  src: string | any;
};

const rowOne: WorkItem[] = [
  {
    title: "Proposal",
    src: Proposal,
  },
  {
    title: "Audit",
    src: Audit,
  },
  {
    title: "Strategy",
    src: Strategy,
  },
  {
    title: "Plan",
    src: Plan,
  },
  {
    title: "Monthly Report",
    src: Report,
  },
  {
    title: "Portfolio",
    src: Portfolio,
  },
];

const rowTwo: WorkItem[] = [
  {
    title: "Plan",
    src: Plan,
  },
  {
    title: "Audit",
    src: Audit,
  },
  {
    title: "Proposal",
    src: Proposal,
  },
  {
    title: "Report",

    src: Report,
  },
  {
    title: "Strategy",

    src: Strategy,
  },
];


/* ============================================================
   WORK CARD
   ============================================================ */

function WorkCard({
  item,
}: {
  item: WorkItem;
}) {
  return (
    <figure className="smbundle-ww-card">
      <div className="smbundle-ww-photo">

        {item.src ? (
          <Image
            src={item.src}
            alt={item.title}
            fill
            sizes="232px"
            className="smbundle-ww-image"
          />
        ) : (
          <div className="smbundle-ww-placeholder">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.2l1-1.6A1 1 0 0 1 8.5 4h7a1 1 0 0 1 .8.4l1 1.6h1.2A2.5 2.5 0 0 1 21 8.5v9A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5z" />
              <circle
                cx="12"
                cy="13"
                r="3.5"
              />
            </svg>

          </div>
        )}

      </div>

      <figcaption>
        {item.title}
      </figcaption>
    </figure>
  );
}


/* ============================================================
   SECTION
   ============================================================ */

export function SocialMediaBundleClientProofSection() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] =
    useState(false);


  /* ==========================================================
     LOCAL REVEAL
     ========================================================== */

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;


    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting
          ) {
            setIsVisible(true);

            observer.disconnect();
          }
        },
        {
          threshold: 0.12,
        },
      );


    observer.observe(section);


    return () => {
      observer.disconnect();
    };
  }, []);


  /*
    Duplicate giống source HTML
    để animation chạy loop
  */

  const rowOneLoop = [
    ...rowOne,
    ...rowOne,
  ];

  const rowTwoLoop = [
    ...rowTwo,
    ...rowTwo,
  ];


  return (
    <section
      ref={sectionRef}
      id="bundle-client-proof"
      className={`smbundle-client-proof ${
        isVisible
          ? "is-visible"
          : ""
      }`}
    >

      {/* ======================================================
          TOP CONTENT
          ====================================================== */}

      <div className="wrap smbundle-client-proof-copy">

        {/* INTRO */}

        <div className="smbundle-client-proof-intro smbundle-proof-reveal smbundle-proof-reveal--1">

          <p>
            Và càng làm, mình càng nhận ra:{" "}

            <strong>
              Kỹ năng Social Media Marketing thôi
              <br />
              chưa đủ, bạn còn cần đúng tài liệu và công cụ để làm việc.
            </strong>
          </p>


          <p>
            Vì nếu bạn đang làm{" "}

            <strong>
              mỗi bước
            </strong>

            {" "}bằng những file template nhặt mỗi nơi
            <br />

            một chút thì vừa mất thời gian, vừa dễ rơi vào cảnh không biết{" "}

            <strong>
              nên
              <br />
              bắt đầu từ đâu và làm thế nào cho đúng!
            </strong>
          </p>

        </div>


        {/* ARROW */}

        <div className="smbundle-client-proof-arrow smbundle-proof-reveal smbundle-proof-reveal--2">

          <span
            className="smbundle-client-proof-arrow-icon"
            aria-hidden="true"
          >
            ↓
          </span>

        </div>


        {/* TITLE */}

        <h2 className="smbundle-client-proof-title smbundle-proof-reveal smbundle-proof-reveal--3">

          ĐÓNG GÓI TRỌN BỘ TÀI LIỆU SOCIAL MEDIA

          <br />

          <span>
            ĐỂ X10 CƠ HỘI TIẾP CẬN CLIENT
          </span>

        </h2>


        {/* DESCRIPTION */}

        <p className="smbundle-client-proof-description smbundle-proof-reveal smbundle-proof-reveal--4">

          Trong 5 năm làm Social Media, mình đã không ngừng đúc kết cách làm hiệu quả.

          <br />

          Từ đó chinh phục{" "}

          <strong>
            20+ clients lớn nhỏ
          </strong>

          {" "}trong và ngoài nước, từ Pandora, BM Living

          <br />

          đến nhiều local businesses khác.

        </p>

      </div>


      {/* ======================================================
          WORK WALL
          giống ww-rows trong HTML
          ====================================================== */}

      <div className="smbundle-ww smbundle-proof-wall-reveal">

        <div className="smbundle-ww-rows">

          {/* ==================================================
              ROW 01
              ================================================== */}

          <div className="smbundle-ww-row">

            <div className="smbundle-ww-track">

              {rowOneLoop.map(
                (
                  item,
                  index,
                ) => (
                  <WorkCard
                    item={item}
                    key={`row-one-${index}`}
                  />
                ),
              )}

            </div>

          </div>


          {/* ==================================================
              ROW 02
              ================================================== */}

          <div className="smbundle-ww-row smbundle-ww-row--reverse">

            <div className="smbundle-ww-track">

              {rowTwoLoop.map(
                (
                  item,
                  index,
                ) => (
                  <WorkCard
                    item={item}
                    key={`row-two-${index}`}
                  />
                ),
              )}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}