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

const features = [
  {
    title: "WORKFLOW EDIT VỚI CLAUDE",
    icon: <WorkflowIcon />,
  },
  {
    title: "EDIT TALKING HEAD + B-ROLL",
    icon: <TalkingHeadIcon />,
  },
  {
    title: "EDIT MOTION GRAPHIC",
    icon: <MotionIcon />,
  },
];

export default function CourseLesson9Popup({
  href = "#",
  storageKey = "quizzy:lesson9-popup:course-website",
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
      modalClassName={
        styles.websiteModal
      }
      labelledBy="lesson9-course-title"
    >
      <div
        className={
          styles.websiteHeader
        }
      >
        <svg
          className={styles.spark}
          aria-hidden="true"
          viewBox="0 0 100 100"
        >
          <rect
            x="6"
            y="43"
            width="88"
            height="14"
            fill="#A97FE0"
          />
          <rect
            x="6"
            y="43"
            width="88"
            height="14"
            fill="#A97FE0"
            transform="rotate(60 50 50)"
          />
          <rect
            x="6"
            y="43"
            width="88"
            height="14"
            fill="#A97FE0"
            transform="rotate(-60 50 50)"
          />
        </svg>

        <button
          className={[
            styles.close,
            styles.closeDark,
          ].join(" ")}
          type="button"
          aria-label="Đóng"
          onClick={close}
        >
          <CloseIcon />
        </button>

        <div
          className={[
            styles.badge,
            styles.badgeOutline,
          ].join(" ")}
        >
          <span
            className={
              styles.badgeDot
            }
          />
          MỚI CẬP NHẬT
        </div>

        <h2
          className={
            styles.updateTitle
          }
          id="lesson9-course-title"
        >
          CLAUDE AI MASTERY
          <br />
          <span
            className={
              styles.highlight
            }
          >
            ĐÃ CẬP NHẬT THÊM!
          </span>
        </h2>

        <div
          className={
            styles.newLesson
          }
        >
          +1 buổi mới
        </div>
      </div>

      <div
        className={
          styles.websiteBody
        }
      >
        <div>
          <div
            className={
              styles.sessionLabel
            }
          >
            BUỔI 9
          </div>

          <div
            className={
              styles.sessionTitle
            }
          >
            TỰ ĐỘNG HÓA EDIT VIDEO
            VỚI CLAUDE AI
          </div>
        </div>

        <div
          className={
            styles.featureGrid
          }
        >
          {features.map((feature) => (
            <div
              className={
                styles.featureCard
              }
              key={feature.title}
            >
              <span
                className={
                  styles.iconBox
                }
              >
                {feature.icon}
              </span>

              <span
                className={
                  styles.itemTitle
                }
              >
                {feature.title}
              </span>
            </div>
          ))}
        </div>

        <Link
          className={styles.cta}
          href={href}
          onClick={close}
        >
          Tìm hiểu khóa học ngay!
          <ArrowIcon />
        </Link>
      </div>
    </PopupShell>
  );
}
