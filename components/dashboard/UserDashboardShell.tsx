"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  FiBookOpen,
  FiCreditCard,
  FiFileText,
  FiGrid,
  FiHome,
  FiLogOut,
  FiMenu,
  FiUser,
  FiX,
} from "react-icons/fi";

import {
  AuthModal,
  type AuthMode,
} from "@/components/auth/AuthModal";

import {
  useLogoutMutation,
} from "@/redux/features/auth/authApi";

import {
  useDashboardData,
} from "./DashboardDataProvider";


const navigation = [
  // {
  //   href: "/collections",
  //   label: "Tổng quan",
  //   icon: FiGrid,
  //   exact: true,
  // },

  {
    href:
      "/collections/documents",
    label: "Tài liệu của tôi",
    icon: FiFileText,
    exact: true,
  },

  // {
  //   href:
  //     "/collections/courses",
  //   label: "Khóa học của tôi",
  //   icon: FiBookOpen,
  // },

  // {
  //   href:
  //     "/collections/transactions",
  //   label: "Giao dịch",
  //   icon: FiCreditCard,
  // },

  // {
  //   href:
  //     "/collections/account",
  //   label: "Tài khoản",
  //   icon: FiUser,
  // },
];


function pageTitle(
  pathname: string,
) {
  if (
    pathname.includes(
      "/courses/",
    )
  ) {
    return "Học khóa học";
  }

  if (
    pathname.includes(
      "/transactions/",
    )
  ) {
    return "Chi tiết giao dịch";
  }

  if (
    pathname.endsWith(
      "/documents",
    )
  ) {
    return "Tài liệu của tôi";
  }

  if (
    pathname.endsWith(
      "/courses",
    )
  ) {
    return "Khóa học của tôi";
  }

  if (
    pathname.endsWith(
      "/transactions",
    )
  ) {
    return "Lịch sử giao dịch";
  }

  if (
    pathname.endsWith(
      "/account",
    )
  ) {
    return "Tài khoản";
  }

  return "My Library";
}


export function UserDashboardShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname =
    usePathname();

  const router =
    useRouter();

  const { user } =
    useDashboardData();

  const [logout] =
    useLogoutMutation();

  const [
    mounted,
    setMounted,
  ] = useState(false);

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const [
    authMode,
    setAuthMode,
  ] =
    useState<
      AuthMode | null
    >(null);

  const [
    loggingOut,
    setLoggingOut,
  ] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const displayName =
    user?.name ||
    user?.email ||
    "Học viên";

  const initial =
    displayName
      .trim()
      .charAt(0)
      .toUpperCase();

  const avatar =
    user?.avatar?.url ||
    user?.avatarUrl ||
    "";

  const handleLogout =
    async () => {
      if (loggingOut) {
        return;
      }

      setLoggingOut(true);

      try {
        await logout(
          {},
        ).unwrap();

        router.push("/");
      } finally {
        setLoggingOut(false);
      }
    };


  /* ============================================================
     HYDRATING
     ============================================================ */

  if (!mounted) {
    return (
      <div className="ud-loading-screen">
        <span />
        <p>
          Đang tải thư viện...
        </p>
      </div>
    );
  }


  /* ============================================================
     NOT LOGGED IN
     ============================================================ */

  if (!user) {
    return (
      <>
        <main className="ud-auth-gate">
          <div className="ud-auth-gate__card">
            <div className="ud-auth-gate__logo">
              <strong>
                QUIZZY
              </strong>

              <span>
                SOCIAL GALLERY
              </span>
            </div>

            <span className="ud-auth-gate__star">
              ✱
            </span>

            <h1>
              THƯ VIỆN
              <br />

              <span>
                CỦA BẠN.
              </span>
            </h1>

            <p>
              Đăng nhập để xem
              tài liệu đã sở hữu,
              khóa học, tiến độ
              học tập và lịch sử
              giao dịch.
            </p>

            <div className="ud-auth-gate__actions">
              <button
                type="button"
                onClick={() =>
                  setAuthMode(
                    "login",
                  )
                }
                data-cur="OPEN"
              >
                ĐĂNG NHẬP
                <span>→</span>
              </button>

              <Link
                href="/"
                data-cur="hover"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        </main>

        {authMode && (
          <AuthModal
            mode={authMode}
            onModeChange={
              setAuthMode
            }
            onClose={() =>
              setAuthMode(null)
            }
          />
        )}
      </>
    );
  }


  /* ============================================================
     APP
     ============================================================ */

  return (
    <div className="ud-shell">

      {/* ======================================================
          SIDEBAR
          ====================================================== */}

      <aside
        className={`ud-sidebar ${
          mobileOpen
            ? "is-open"
            : ""
        }`}
      >
        <div className="ud-sidebar__top">
          <Link
            href="/"
            className="ud-logo"
            data-cur="hover"
          >
            <strong>
              QUIZZY
            </strong>

            <span>
              SOCIAL GALLERY
            </span>
          </Link>

          <button
            type="button"
            className="ud-sidebar__close"
            aria-label="Đóng menu"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <FiX />
          </button>
        </div>


        <div className="ud-sidebar__label">
          MY LIBRARY
        </div>


        <nav className="ud-nav">
          {navigation.map(
            ({
              href,
              label,
              icon: Icon,
              exact,
            }) => {
              const active =
                exact
                  ? pathname ===
                    href
                  : pathname.startsWith(
                      href,
                    );

              return (
                <Link
                  key={href}
                  href={href}
                  className={`ud-nav__item ${
                    active
                      ? "is-active"
                      : ""
                  }`}
                  data-cur="hover"
                >
                  <Icon />

                  <span>
                    {label}
                  </span>
                </Link>
              );
            },
          )}
        </nav>


        <div className="ud-sidebar__bottom">
          <Link
            href="/"
            className="ud-back-site"
            data-cur="hover"
          >
            <FiHome />

            <span>
              Về website
            </span>
          </Link>

          <div className="ud-mini-profile">
            <div className="ud-mini-profile__avatar">
              {avatar ? (
                <img
                  src={avatar}
                  alt=""
                />
              ) : (
                initial
              )}
            </div>

            <div className="ud-mini-profile__copy">
              <strong>
                {displayName}
              </strong>

              <span>
                {user.email}
              </span>
            </div>

            <button
              type="button"
              aria-label="Đăng xuất"
              onClick={
                handleLogout
              }
              disabled={
                loggingOut
              }
            >
              <FiLogOut />
            </button>
          </div>
        </div>
      </aside>


      {/* MOBILE OVERLAY */}

      <button
        type="button"
        className={`ud-sidebar-overlay ${
          mobileOpen
            ? "is-visible"
            : ""
        }`}
        aria-label="Đóng menu"
        onClick={() =>
          setMobileOpen(false)
        }
      />


      {/* ======================================================
          MAIN
          ====================================================== */}

      <main className="ud-main">

        <div className="ud-content">
          {children}
        </div>

      </main>
    </div>
  );
}