"use client";

import "@/styles/auth-modal.css";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { createPortal } from "react-dom";
import {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
} from "@/redux/features/auth/authApi";

import toast from "react-hot-toast";

export type AuthMode = "login" | "register" | "forgot";

type AuthModalProps = {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onClose: () => void;
};

export function AuthModal({
  mode,
  onModeChange,
  onClose,
}: AuthModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [forgotPassword] = useForgotPasswordMutation();

  const isLogin = mode === "login";
  const isRegister = mode === "register";
  const isForgot = mode === "forgot";

  /* ============================================================
     PORTAL
     ============================================================ */

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  /* ============================================================
     RESET FORM WHEN SWITCHING MODES
     ============================================================ */

  useEffect(() => {
    setShowPassword(false);

    if (!mounted) return;

    dialogRef.current
      ?.querySelector<HTMLInputElement>("input")
      ?.focus();
  }, [mode, mounted]);

  /* ============================================================
     CUSTOM CURSOR
     ============================================================ */

  const hideModalCursor = () => {
    const cursor = cursorRef.current;
    const overlay = overlayRef.current;

    if (cursor) {
      cursor.style.opacity = "0";
      cursor.classList.remove("is-hover", "is-input");
    }

    overlay?.classList.remove("authm-cursor-ready");
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType !== "mouse") {
      hideModalCursor();
      return;
    }

    const cursor = cursorRef.current;
    const overlay = overlayRef.current;

    if (!cursor || !overlay) return;

    const target = event.target;

    if (!(target instanceof Element)) return;

    const isInput = Boolean(
      target.closest(
        'input, textarea, select, [contenteditable="true"]',
      ),
    );

    const isInteractive = Boolean(
      target.closest("button, a, [data-cur]"),
    );

    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;

    cursor.classList.toggle("is-hover", isInteractive);
    cursor.classList.toggle("is-input", isInput);

    cursor.style.opacity = isInput ? "0" : "1";

    overlay.classList.add("authm-cursor-ready");
  };

  /* ============================================================
     KEYBOARD
     ============================================================ */

  useEffect(() => {
    if (!mounted) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (!isSubmitting) {
          onClose();
        }

        return;
      }

      if (event.key !== "Tab") return;

      const focusable =
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not(:disabled), input:not(:disabled), a[href]',
        );

      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [mounted, isSubmitting, onClose]);

  /* ============================================================
     SWITCH MODE
     ============================================================ */

  const changeMode = (nextMode: AuthMode) => {
    if (isSubmitting) return;

    onModeChange(nextMode);
  };

  /* ============================================================
     SUBMIT
     ============================================================ */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);

    const name = String(
      formData.get("name") ?? "",
    ).trim();

    const email = String(
      formData.get("email") ?? "",
    ).trim();

    const password = String(
      formData.get("password") ?? "",
    );

    try {
      setIsSubmitting(true);

      /* =========================
         LOGIN
         ========================= */

      if (isLogin) {
        await login({
          email,
          password,
        }).unwrap();

        toast.success("Đăng nhập thành công!", {
          duration: 3000,
        });

        onClose();

        return;
      }

      /* =========================
         REGISTER
         ========================= */

      if (isRegister) {
        await register({
          name,
          email,
          password,
        }).unwrap();

        toast.success(
          "Đăng ký thành công. Vui lòng đăng nhập!",
          {
            duration: 3000,
          },
        );

        onModeChange("login");

        return;
      }

      /* =========================
         FORGOT PASSWORD
         ========================= */

      await forgotPassword({
        email,
      }).unwrap();

      toast.success(
        "Vui lòng kiểm tra email để đặt lại mật khẩu.",
        {
          duration: 4000,
        },
      );

      onModeChange("login");
    } catch (error) {
      const apiError = error as {
        data?: {
          message?: string;
        };
        message?: string;
      };

      const errorMessage =
        apiError?.data?.message ??
        apiError?.message ??
        "Có lỗi xảy ra. Vui lòng thử lại.";

      toast.error(errorMessage, {
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ============================================================
     RENDER
     ============================================================ */

  if (!mounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="authm-overlay"
      onPointerMove={handlePointerMove}
      onPointerLeave={hideModalCursor}
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isSubmitting
        ) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="authm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="authm-title"
      >
        {/* CLOSE */}

        <button
          type="button"
          className="authm-close"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Đóng cửa sổ"
          data-cur="hover"
        >
          ×
        </button>

        {/* ====================================================
            LEFT
            ==================================================== */}

        <div className="authm-brand">
          <a
            href="/"
            className="authm-brand__logo"
            data-cur="hover"
          >
            <strong>QUIZZY</strong>
            <span>SOCIAL GALLERY</span>
          </a>

          <div className="authm-brand__content">
            <span
              className="authm-brand__star"
              aria-hidden="true"
            >
              ✱
            </span>

            <h2>
              CREATE.
              <br />
              LEARN.
              <br />
              <span>GROW.</span>
            </h2>

            <p>
              Không gian học tập và tài liệu dành cho những
              người yêu thích Social Media Marketing.
            </p>
          </div>

          <div className="authm-brand__bottom">
            <span>QUIZZY SOCIAL GALLERY</span>
            <span>✦</span>
          </div>
        </div>

        {/* ====================================================
            RIGHT
            ==================================================== */}

        <div className="authm-content">
          {/* MOBILE LOGO */}

          <div className="authm-mobile-logo">
            <strong>QUIZZY</strong>
            <span>SOCIAL GALLERY</span>
          </div>

          {/* LOGIN / REGISTER SWITCH */}

          {!isForgot && (
            <div className="authm-switch">
              <button
                type="button"
                className={
                  isLogin ? "is-active" : ""
                }
                onClick={() =>
                  changeMode("login")
                }
                disabled={isSubmitting}
              >
                Đăng nhập
              </button>

              <button
                type="button"
                className={
                  isRegister ? "is-active" : ""
                }
                onClick={() =>
                  changeMode("register")
                }
                disabled={isSubmitting}
              >
                Đăng ký
              </button>
            </div>
          )}

          {/* HEADING */}

          <div className="authm-heading">
            <span className="authm-eyebrow">
              {isLogin
                ? "WELCOME BACK ✦"
                : isRegister
                  ? "JOIN THE GALLERY ✦"
                  : "RESET PASSWORD ✦"}
            </span>

            <h2 id="authm-title">
              {isLogin
                ? "Chào mừng bạn trở lại!"
                : isRegister
                  ? "Tạo tài khoản mới"
                  : "Quên mật khẩu?"}
            </h2>

            <p>
              {isLogin
                ? "Đăng nhập để tiếp tục hành trình học tập cùng Quizzy."
                : isRegister
                  ? "Tạo tài khoản để khám phá tài liệu và khóa học dành cho bạn."
                  : "Nhập email đã đăng ký để nhận hướng dẫn đặt lại mật khẩu."}
            </p>
          </div>

          {/* ==================================================
              FORM
              ================================================== */}

          <form
            key={mode}
            className="authm-form"
            onSubmit={handleSubmit}
          >
            {/* NAME */}

            {isRegister && (
              <label className="authm-field">
                <span>Họ và tên</span>

                <input
                  type="text"
                  name="name"
                  placeholder="Nhập họ và tên của bạn"
                  autoComplete="name"
                  minLength={2}
                  required
                  disabled={isSubmitting}
                />
              </label>
            )}

            {/* EMAIL */}

            <label className="authm-field">
              <span>Email</span>

              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                autoComplete="email"
                required
                disabled={isSubmitting}
              />
            </label>

            {/* PASSWORD */}

            {!isForgot && (
              <label className="authm-field">
                <span>Mật khẩu</span>

                <div className="authm-password">
                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder={
                      isRegister
                        ? "Tạo mật khẩu (ít nhất 8 ký tự)"
                        : "Nhập mật khẩu"
                    }
                    autoComplete={
                      isRegister
                        ? "new-password"
                        : "current-password"
                    }
                    minLength={
                      isRegister
                        ? 8
                        : undefined
                    }
                    required
                    disabled={isSubmitting}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current,
                      )
                    }
                    disabled={isSubmitting}
                    aria-label={
                      showPassword
                        ? "Ẩn mật khẩu"
                        : "Hiện mật khẩu"
                    }
                  >
                    {showPassword
                      ? "Ẩn"
                      : "Hiện"}
                  </button>
                </div>
              </label>
            )}

            {/* FORGOT PASSWORD */}

            {isLogin && (
              <button
                type="button"
                className="authm-forgot"
                onClick={() =>
                  changeMode("forgot")
                }
                disabled={isSubmitting}
              >
                Quên mật khẩu?
              </button>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              className="authm-submit"
              disabled={isSubmitting}
              data-cur="hover"
            >
              <span>
                {isSubmitting
                  ? "Đang xử lý..."
                  : isLogin
                    ? "ĐĂNG NHẬP"
                    : isRegister
                      ? "TẠO TÀI KHOẢN"
                      : "GỬI EMAIL KHÔI PHỤC"}
              </span>

              <span aria-hidden="true">
                ↗
              </span>
            </button>

            {/* FOOTER */}

            <div className="authm-footer">
              {isLogin ? (
                <>
                  Chưa có tài khoản?{" "}

                  <button
                    type="button"
                    onClick={() =>
                      changeMode("register")
                    }
                    disabled={isSubmitting}
                  >
                    Đăng ký ngay
                  </button>
                </>
              ) : isRegister ? (
                <>
                  Đã có tài khoản?{" "}

                  <button
                    type="button"
                    onClick={() =>
                      changeMode("login")
                    }
                    disabled={isSubmitting}
                  >
                    Đăng nhập
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    changeMode("login")
                  }
                  disabled={isSubmitting}
                >
                  ← Quay lại đăng nhập
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* CUSTOM CURSOR */}

      <div
        ref={cursorRef}
        className="authm-modal-cursor"
        aria-hidden="true"
      >
        <span>OPEN</span>
      </div>
    </div>,
    document.body,
  );
}