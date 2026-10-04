"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AuthModal, type AuthMode } from "../auth/AuthModal";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useLogoutMutation } from "@/redux/features/auth/authApi";



const links = [
  ["/", "Trang chủ"],
  ["/products", "Tài liệu số"],
  ["/courses/claude-ai-mastery", "Khoá học"],
  ["/services", "Dịch vụ SMM"],
  // ["/contact", "Liên hệ"],
] as const;

type NavbarProps = {
  transactionHistoryHref?: string;
  collectionHref?: string;
};

export function Navbar({
  transactionHistoryHref = "/transaction-history",
  collectionHref = "/collections",
}: NavbarProps = {}) {
  const pathname = usePathname();
  const [logout] = useLogoutMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const displayName = user?.name || user?.email || "Tài khoản";
  const avatarInitial = displayName.trim().charAt(0).toLocaleUpperCase("vi-VN");

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const accountRef = useRef<HTMLDivElement>(null);
  const [small, setSmall] = useState(false);
  const [active, setActive] = useState(pathname);

  // AUTH MODAL
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);

  const openAuth = (mode: AuthMode) => {
    setMenuOpen(false);
    setAuthMode(mode);
  };

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    setLogoutError("");
    try {
      await logout({}).unwrap();
      setAccountOpen(false);
      setMenuOpen(false);
    } catch {
      setLogoutError("Đăng xuất chưa thành công. Vui lòng thử lại.");
    } finally {
      setLoggingOut(false);
    }
  };

  useEffect(() => {
    setAccountOpen(false);
    setLogoutError("");
  }, [pathname, user]);

  useEffect(() => {
    if (!accountOpen) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!accountRef.current?.contains(event.target as Node)) setAccountOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAccountOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [accountOpen]);

  const closeAuth = () => {
    setAuthMode(null);
  };

  useEffect(() => {
    const onScroll = () => {
      setSmall(window.scrollY > 50);

      if (pathname !== "/") {
        setActive(pathname);
        return;
      }

      let current = "/";

      [
        ["#top", "top"],
        ["#gallery", "gallery"],
        ["#services", "services"],
      ].forEach(([href, id]) => {
        const el = document.getElementById(id);

        if (el && el.getBoundingClientRect().top <= 160) {
          current = href;
        }
      });

      setActive(current);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  // LOCK SCROLL KHI MỞ MENU HOẶC AUTH MODAL
  useEffect(() => {
    document.body.style.overflow =
      menuOpen || authMode ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, authMode]);

  return (
    <>
      <header
        className={`nav ${small ? "sm" : ""}`}
        id="nav"
      >
        <div className="nav-in">
          <a
            href="/"
            className="logo"
            data-cur="hover"
          >
            <b>QUIZZY</b>
            <i>SOCIAL GALLERY</i>
          </a>

          <nav
            className="nav-links"
            aria-label="Điều hướng chính"
          >
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className={active === href ? "on" : ""}
                data-cur="hover"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="nav-right">
            {user ? (
              <div className="nav-account-wrap" ref={accountRef}>
                <button
                  type="button"
                  className="nav-account"
                  aria-label={`Tài khoản: ${displayName}`}
                  aria-expanded={accountOpen}
                  aria-haspopup="menu"
                  onClick={() => setAccountOpen((open) => !open)}
                >
                  {user.avatar?.url ? (
                    <img src={user.avatar.url} alt="" className="nav-account-avatar" />
                  ) : (
                    <span className="nav-account-avatar nav-account-avatar--fallback" aria-hidden="true">{avatarInitial}</span>
                  )}
                  <span className="nav-account-name">{displayName}</span>
                  {/* <span aria-hidden="true" className="nav-account-chevron">⌄</span> */}
                </button>
                {accountOpen && (
                  <div className="nav-account-menu" role="menu" aria-label="Tài khoản">
                    <a role="menuitem" href={transactionHistoryHref} onClick={() => setAccountOpen(false)}>Lịch sử giao dịch</a>
                    <a role="menuitem" href={collectionHref} onClick={() => setAccountOpen(false)}>Bộ sưu tập</a>
                    <button type="button" role="menuitem" onClick={handleLogout} disabled={loggingOut}>
                      {loggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
                    </button>
                    {logoutError && <p role="alert" className="nav-account-error">{logoutError}</p>}
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="ghostb"
                  data-cur="hover"
                  onClick={() => openAuth("register")}
                >
                  Đăng ký
                </button>

                <button
                  type="button"
                  className="login mag"
                  data-cur="hover"
                  onClick={() => openAuth("login")}
                >
                  Đăng nhập
                </button>
              </>
            )}

            <button
              type="button"
              className="burger"
              aria-expanded={menuOpen}
              aria-controls="mm"
              onClick={() => setMenuOpen(true)}
            >
              MENU
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}

      <div
        className={`mm ${menuOpen ? "open" : ""}`}
        id="mm"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="mm-head">
          <span className="logo">
            <b>QUIZZY</b>
            <i>SOCIAL GALLERY</i>
          </span>

          <button
            type="button"
            className="burger"
            onClick={() => setMenuOpen(false)}
          >
            ĐÓNG
          </button>
        </div>

        <nav className="mm-list">
          {[
           ["/", "Trang chủ"],
           ["/products", "Tài liệu số"],
           ["/courses/claude-ai-mastery", "Khoá học"],
           ["/services", "Dịch vụ SMM"],
          //  ["/contact", "Liên hệ"],
          ].map(([href, label], i) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                transitionDelay: menuOpen
                  ? `${0.08 * i + 0.1}s`
                  : "0s",
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="mm-foot">
          {user ? (
            <div className="mm-account-panel">
              <div className="chip mm-account" title={displayName}>
                {user.avatar?.url ? (
                  <img src={user.avatar.url} alt="" className="nav-account-avatar" />
                ) : (
                  <span className="nav-account-avatar nav-account-avatar--fallback" aria-hidden="true">{avatarInitial}</span>
                )}
                <span className="nav-account-name">{displayName}</span>
              </div>
              <a href={transactionHistoryHref} onClick={() => setMenuOpen(false)}>Lịch sử giao dịch</a>
              <a href={collectionHref} onClick={() => setMenuOpen(false)}>Bộ sưu tập</a>
              <button type="button" onClick={handleLogout} disabled={loggingOut}>
                {loggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
              </button>
              {logoutError && <p role="alert" className="nav-account-error">{logoutError}</p>}
            </div>
          ) : (
            <>
              <button
                type="button"
                className="chip"
                onClick={() => openAuth("register")}
              >
                Đăng ký
              </button>

              <button
                type="button"
                className="chip"
                style={{
                  background: "var(--lilac)",
                  color: "#fff",
                  borderColor: "var(--lilac)",
                }}
                onClick={() => openAuth("login")}
              >
                Đăng nhập
              </button>
            </>
          )}
        </div>
      </div>

      {/* AUTH MODAL */}

      {authMode && (
        <AuthModal
          mode={authMode}
          onModeChange={setAuthMode}
          onClose={closeAuth}
        />
      )}
    </>
  );
}