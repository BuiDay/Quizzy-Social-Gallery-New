"use client";

import {
  type MouseEvent,
  type ReactNode,
  useEffect,
} from "react";

import styles from "./Lesson9Popup.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  modalClassName?: string;
  labelledBy: string;
};

export default function PopupShell({
  open,
  onClose,
  children,
  modalClassName,
  labelledBy,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const onKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      onKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        onKeyDown,
      );
    };
  }, [open, onClose]);

  if (!open) return null;

  const onBackdropClick = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    if (
      event.target ===
      event.currentTarget
    ) {
      onClose();
    }
  };

  return (
    <div
      className={styles.overlay}
      onMouseDown={onBackdropClick}
    >
      <div
        className={[
          styles.modal,
          modalClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
      >
        {children}
      </div>
    </div>
  );
}
