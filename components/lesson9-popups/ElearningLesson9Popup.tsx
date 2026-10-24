"use client";

import Link from "next/link";

import {
  ArrowIcon,
  CloseIcon,
  MotionIcon,
  TalkingHeadIcon,
  WorkflowIcon,
} from "./Icons";
import PopupShell from "./PopupShell";
import styles from "./Lesson9Popup.module.css";
import useShowOncePerTab from "./useShowOncePerTab";

type Props = {
  href?: string;
  storageKey?: string;
};

const items = [
  {
    title: "WORKFLOW EDIT VỚI CLAUDE",
    number: "01",
    icon: <WorkflowIcon />,
  },
  {
    title: "EDIT TALKING HEAD + B-ROLL",
    number: "02",
    icon: <TalkingHeadIcon />,
  },
  {
    title: "EDIT MOTION GRAPHIC",
    number: "03",
    icon: <MotionIcon />,
  },
];

export default function ElearningLesson9Popup({
  href = "#",
  storageKey = "quizzy:lesson9-popup:elearning",
}: Props) {
  const {
    ready,
    open,
    close,
  } = useShowOncePerTab(
    storageKey,
  );

  if (!ready) return null;

  return (
    <PopupShell
      open={open}
      onClose={close}
      labelledBy="lesson9-elearning-title"
    >
      <button
        className={styles.close}
        type="button"
        aria-label="Đóng"
        onClick={close}
      >
        <CloseIcon />
      </button>

      <div className={styles.content}>
        <div className={styles.badge}>
          <span
            className={
              styles.badgeDot
            }
          />
          MỚI CẬP NHẬT
        </div>

        <div className={styles.lessonHero}>
          <div
            className={
              styles.lessonNumber
            }
          >
            09
          </div>

          <h2
            className={
              styles.lessonTitle
            }
            id="lesson9-elearning-title"
          >
            <strong>
              TỰ ĐỘNG HÓA EDIT VIDEO
            </strong>
            <br />
            VỚI{" "}
            <span
              className={
                styles.claudePill
              }
            >
              CLAUDE AI
            </span>
          </h2>
        </div>

        <p
          className={
            styles.description
          }
        >
          Dùng Claude để hỗ trợ edit
          video nhanh hơn, từ talking
          head đến motion graphic.
        </p>

        <ul className={styles.list}>
          {items.map((item) => (
            <li
              className={
                styles.listItem
              }
              key={item.number}
            >
              <span
                className={
                  styles.iconBox
                }
              >
                {item.icon}
              </span>

              <span
                className={
                  styles.itemTitle
                }
              >
                {item.title}
              </span>

              <span
                className={
                  styles.itemNumber
                }
              >
                {item.number}
              </span>
            </li>
          ))}
        </ul>

        <Link
          className={styles.cta}
          href={href}
          onClick={close}
        >
          Vào học ngay!
          <ArrowIcon />
        </Link>
      </div>
    </PopupShell>
  );
}
