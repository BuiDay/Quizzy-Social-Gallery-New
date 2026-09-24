"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AuthHandlers, AuthModal, AuthMode } from "../auth/AuthModal";



const links = [
  ["/", "Trang chủ"],
  ["/products", "Tài liệu số"],
  ["/courses", "Khoá học"],
  ["/services", "Dịch vụ SMM"],
  ["/contact", "Liên hệ"],
] as const;

export function Navbar({
  onLogin,
  onRegister,
  onForgotPassword,
}: AuthHandlers) {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [small, setSmall] = useState(false);
  const [active, setActive] = useState(pathname);

  // AUTH MODAL
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);

  const openAuth = (mode: AuthMode) => {
    setMenuOpen(false);
    setAuthMode(mode);
  };

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
            ["#top", "Trang chủ"],
            ["#gallery", "Tài liệu số"],
            ["#courses", "Khóa học"],
            ["#services", "Dịch vụ SMM"],
            ["#projects", "Projects"],
            ["#footer", "Liên hệ"],
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
        </div>
      </div>

      {/* AUTH MODAL */}

      {authMode && (
        <AuthModal
          mode={authMode}
          onModeChange={setAuthMode}
          onClose={closeAuth}
          onLogin={onLogin}
          onRegister={onRegister}
          onForgotPassword={onForgotPassword}
        />
      )}
    </>
  );
}