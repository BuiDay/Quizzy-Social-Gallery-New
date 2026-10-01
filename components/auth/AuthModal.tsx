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
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useActivationMutation,
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
  const [verificationPending, setVerificationPending] = useState(false);
  const [activationCode, setActivationCode] = useState("");
  const token = useSelector((state: RootState) => state.auth.token);
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [activation] = useActivationMutation();

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const isLogin = mode === "login" && !verificationPending;
  const isRegister = mode === "register" && !verificationPending;
  const isForgot = mode === "forgot" && !verificationPending;

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
    setVerificationPending(false);
    setActivationCode("");
    setMessage("");
    setIsError(false);

    if (!mounted) return;

    dialogRef.current
      ?.querySelector<HTMLInputElement>("input")
      ?.focus();
  }, [mode, mounted]);

  /* ============================================================
     CUSTOM CURSOR — MODAL ONLY
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

    // Chỉ ẩn cursor mặc định khi cursor riêng đã được định vị.
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
        if (!isSubmitting) onClose();
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

      if (event.shiftKey && document.activeElement === first) {
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

    setVerificationPending(false);
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

    setMessage("");
    setIsError(false);

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (verificationPending && !/^\d{4}$/.test(activationCode)) {
      setIsError(true);
      setMessage("Vui lòng nhập mã xác minh gồm 4 chữ số.");
      return;
    }

    try {
      setIsSubmitting(true);

      if (verificationPending) {
        if (!token) throw new Error("Không tìm thấy phiên đăng ký. Vui lòng đăng ký lại.");
        await activation({ activation_token: token, activation_code: activationCode }).unwrap();
        toast.success("Bạn đã kích hoạt tài khoản thành công!");
        setVerificationPending(false);
        onModeChange("login");
        return;
      }

      if (isLogin) {
        await login({ email, password }).unwrap();
        toast.success("Đăng nhập thành công");
        onClose();
        return;
      }

      if (isRegister) {
        await register({ name, email, password }).unwrap();
        toast.success("Đăng ký thành công. Vui lòng nhập mã xác minh.");
        setActivationCode("");
        setVerificationPending(true);
        return;
      }

      await forgotPassword({ email }).unwrap();
      setIsError(false);
      setMessage("Vui lòng kiểm tra email để đặt lại mật khẩu.");
    } catch (error) {
      setIsError(true);

      const apiError = error as { data?: { message?: string }; message?: string };
      setMessage(apiError?.data?.message ?? apiError?.message ?? "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ============================================================
     RENDER PORTAL
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
      {/* ======================================================
          DIALOG
          ====================================================== */}

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
            LEFT — BRAND PANEL
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
            RIGHT — AUTH FORM
            ==================================================== */}

        <div className="authm-content">
          {/* MOBILE LOGO */}

          <div className="authm-mobile-logo">
            <strong>QUIZZY</strong>
            <span>SOCIAL GALLERY</span>
          </div>

          {/* LOGIN / REGISTER SWITCH */}

          {!isForgot && !verificationPending && (
            <div className="authm-switch">
              <button
                type="button"
                className={isLogin ? "is-active" : ""}
                onClick={() => changeMode("login")}
                disabled={isSubmitting}
              >
                Đăng nhập
              </button>

              <button
                type="button"
                className={isRegister ? "is-active" : ""}
                onClick={() => changeMode("register")}
                disabled={isSubmitting}
              >
                Đăng ký
              </button>
            </div>
          )}

          {/* HEADING */}

          <div className="authm-heading">
            <span className="authm-eyebrow">
              {verificationPending
                ? "VERIFY ACCOUNT ✦"
                : isLogin
                ? "WELCOME BACK ✦"
                : isRegister
                  ? "JOIN THE GALLERY ✦"
                  : "RESET PASSWORD ✦"}
            </span>

            <h2 id="authm-title">
              {verificationPending
                ? "Xác minh tài khoản"
                : isLogin
                ? "Chào mừng bạn trở lại!"
                : isRegister
                  ? "Tạo tài khoản mới"
                  : "Quên mật khẩu?"}
            </h2>

            <p>
              {verificationPending
                ? "Nhập mã gồm 4 chữ số được gửi đến email của bạn."
                : isLogin
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

            {!verificationPending && <label className="authm-field">
              <span>Email</span>

              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                autoComplete="email"
                required
                disabled={isSubmitting}
              />
            </label>}

            {verificationPending && (
              <label className="authm-field">
                <span>Mã xác minh</span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{4}"
                  maxLength={4}
                  autoComplete="one-time-code"
                  placeholder="Nhập mã 4 chữ số"
                  value={activationCode}
                  onChange={(event) => setActivationCode(event.target.value.replace(/\D/g, "").slice(0, 4))}
                  required
                  disabled={isSubmitting}
                />
              </label>
            )}

            {/* PASSWORD */}

            {!isForgot && !verificationPending && (
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
                      isRegister ? 8 : undefined
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
              >
                Quên mật khẩu?
              </button>
            )}

            {/* FORM MESSAGE */}

            {message && (
              <p
                className={`authm-message ${
                  isError
                    ? "is-error"
                    : "is-success"
                }`}
                role={
                  isError
                    ? "alert"
                    : "status"
                }
              >
                {message}
              </p>
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
                  : verificationPending
                    ? "XÁC MINH OTP"
                    : isLogin
                    ? "ĐĂNG NHẬP"
                    : isRegister
                      ? "TẠO TÀI KHOẢN"
                      : "GỬI EMAIL KHÔI PHỤC"}
              </span>

              <span aria-hidden="true">↗</span>
            </button>

            {/* FOOTER */}

            <div className="authm-footer">
              {verificationPending ? (
                <button type="button" onClick={() => changeMode("login")}>← Quay lại đăng nhập</button>
              ) : isLogin ? (
                <>
                  Chưa có tài khoản?{" "}
                  <button
                    type="button"
                    onClick={() =>
                      changeMode("register")
                    }
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
                >
                  ← Quay lại đăng nhập
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* ======================================================
          LOCAL CUSTOM CURSOR — ABOVE MODAL
          ====================================================== */}

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