"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import UserAuth from "@/hook/userAuth";
import UseProtectProduct from "@/hook/useProtectProduct";
import MotionLibraryApp from "@/components/motion-library/MotionLibraryApp";

import styles from "@/components/motion-library/AccessGate.module.css";

/*
 * Product _id của "Thư viện Motion Quizzy".
 *
 * .env.local:
 * NEXT_PUBLIC_MOTION_LIBRARY_PRODUCT_ID=YOUR_PRODUCT_MONGO_ID
 */
const PRODUCT_ID =
  process.env.NEXT_PUBLIC_MOTION_LIBRARY_PRODUCT_ID ?? "";

function AccessScreen({
  eyebrow,
  title,
  text,
  loading = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  loading?: boolean;
}) {
  return (
    <main className={styles.screen}>
      <section className={styles.card}>
        <div className={styles.eyebrow}>{eyebrow}</div>
        <h1 className={styles.title}>{title}</h1>

        {loading ? (
          <div className={`${styles.text} ${styles.loading}`}>
            <span className={styles.dot} />
            {text}
          </div>
        ) : (
          <>
            <p className={styles.text}>{text}</p>
            <Link className={styles.action} href="/collections">
              Về bộ sưu tập
            </Link>
          </>
        )}
      </section>
    </main>
  );
}

export default function MotionLibraryPage() {
  const [mounted, setMounted] = useState(false);

  const isAuthenticated = UserAuth();

  /*
   * Dùng đúng ownership hook đang có trong project:
   * paid product => user được mở trang.
   */
  const hasPurchased = UseProtectProduct({
    productId: PRODUCT_ID || "__motion_library_product_not_configured__",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <AccessScreen
        eyebrow="QCC Mastery · Motion Library"
        title="Đang kiểm tra quyền truy cập"
        text="Đang xác nhận tài khoản và quyền sở hữu sản phẩm…"
        loading
      />
    );
  }

  if (!PRODUCT_ID) {
    return (
      <AccessScreen
        eyebrow="Configuration"
        title="Chưa cấu hình Product ID"
        text="Thêm NEXT_PUBLIC_MOTION_LIBRARY_PRODUCT_ID vào .env.local bằng _id của sản phẩm Thư viện Motion Quizzy."
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <AccessScreen
        eyebrow="Members only"
        title="Bạn cần đăng nhập"
        text="Trang Thư viện Motion Quizzy chỉ hiển thị cho tài khoản đã đăng nhập và sở hữu sản phẩm."
      />
    );
  }

  if (!hasPurchased) {
    return (
      <AccessScreen
        eyebrow="Purchase required"
        title="Bạn chưa sở hữu sản phẩm này"
        text="Tài khoản hiện tại chưa có quyền truy cập Thư viện Motion Quizzy."
      />
    );
  }

  return <MotionLibraryApp />;
}
