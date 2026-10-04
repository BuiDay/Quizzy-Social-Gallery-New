"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import { useSearchParams } from "next/navigation";

import { useSelector } from "react-redux";

import type { RootState } from "@/redux/store";

import {
  useCheckPaidMutation,
  useCheckPaymentLinkInfomationMutation,
} from "@/redux/features/checkout/checkoutApi";

import {
  useLoadUserByIdMutation,
} from "@/redux/features/auth/authApi";


type CheckoutViewStatus =
  | "success"
  | "failed"
  | "cancel";


function getViewStatus(
  status?: string,
): CheckoutViewStatus {
  const value =
    String(status ?? "")
      .trim()
      .toUpperCase();

  if (value === "PAID") {
    return "success";
  }

  if (
    value === "CANCELLED" ||
    value === "CANCELED"
  ) {
    return "cancel";
  }

  return "failed";
}


function getApiErrorMessage(
  error: unknown,
) {
  if (
    error &&
    typeof error === "object" &&
    "data" in error
  ) {
    const data = (
      error as {
        data?: unknown;
      }
    ).data;

    if (
      data &&
      typeof data === "object" &&
      "message" in data
    ) {
      const message = (
        data as {
          message?: unknown;
        }
      ).message;

      if (
        typeof message ===
        "string"
      ) {
        return message;
      }
    }
  }

  return "Không thể xác nhận giao dịch. Vui lòng thử lại.";
}


export default function CheckoutPage() {
  const searchParams =
    useSearchParams();


  /* ============================================================
     QUERY
     ============================================================ */

  const orderCode =
    searchParams
      .get("orderCode")
      ?.trim() ?? "";


  /* ============================================================
     REDUX
     ============================================================ */

  const {
    paymentLinkInfomation,
  } =
    useSelector(
      (state: RootState) =>
        state.checkout,
    );


  /* ============================================================
     API
     ============================================================ */

  const [
    checkPaymentLinkInfomation,
    {
      isLoading:
        isCheckingPaymentInfo,

      isError:
        isPaymentInfoError,

      error:
        paymentInfoError,
    },
  ] =
    useCheckPaymentLinkInfomationMutation();


  const [
    checkPaid,
    {
      isLoading:
        isCheckingPaid,
    },
  ] =
    useCheckPaidMutation();


  const [
    loadUserById,
  ] =
    useLoadUserByIdMutation();


  /* ============================================================
     LOCAL STATE
     ============================================================ */

  const [
    isConfirmed,
    setIsConfirmed,
  ] = useState(false);

  const [
    confirmError,
    setConfirmError,
  ] = useState("");

  const handledRef =
    useRef("");


  /* ============================================================
     ONLY USE PAYMENT INFO OF CURRENT ORDER
     tránh Redux giữ data của đơn trước
     ============================================================ */

  const currentPaymentInfo =
    useMemo(() => {
      if (
        !paymentLinkInfomation ||
        !orderCode
      ) {
        return null;
      }

      const infoOrderCode =
        String(
          paymentLinkInfomation
            .orderCode ?? "",
        );

      if (
        infoOrderCode !==
        orderCode
      ) {
        return null;
      }

      return paymentLinkInfomation;
    }, [
      paymentLinkInfomation,
      orderCode,
    ]);


  /* ============================================================
     STEP 1
     GET PAYMENT INFO BY ORDER CODE

     Logic cũ:
     checkPaymentLinkInfomation({
       paymentId: orderCode
     })
     ============================================================ */

  useEffect(() => {
    if (!orderCode) {
      return;
    }

    setIsConfirmed(false);
    setConfirmError("");

    handledRef.current = "";

    void checkPaymentLinkInfomation({
      paymentId:
        orderCode,
    });
  }, [
    checkPaymentLinkInfomation,
    orderCode,
  ]);


  /* ============================================================
     STEP 2
     CONFIRM PAYMENT WITH BACKEND

     Logic cũ:
     checkPaid({
       codeOrder,
       status
     })
     ============================================================ */

  useEffect(() => {
    const status =
      currentPaymentInfo?.status;

    const apiOrderCode =
      currentPaymentInfo
        ?.orderCode;

    if (
      !status ||
      !apiOrderCode
    ) {
      return;
    }

    const requestKey =
      `${apiOrderCode}:${status}`;

    if (
      handledRef.current ===
      requestKey
    ) {
      return;
    }

    handledRef.current =
      requestKey;


    const confirmPayment =
      async () => {
        try {
          setConfirmError("");

          await checkPaid({
            codeOrder:
              apiOrderCode,

            status,
          }).unwrap();


          /*
            Quan trọng:
            đến đây backend đã xử lý
            trạng thái thanh toán.
          */

          setIsConfirmed(true);


          /*
            Reload user để cập nhật
            products/course ownership.

            Việc reload user fail
            KHÔNG được biến một payment
            thành failed.
          */

          try {
            await loadUserById(
              {},
            ).unwrap();
          } catch (
            reloadError
          ) {
            console.error(
              "Reload user failed:",
              reloadError,
            );
          }

        } catch (error) {
          handledRef.current =
            "";

          setConfirmError(
            getApiErrorMessage(
              error,
            ),
          );
        }
      };


    void confirmPayment();

  }, [
    checkPaid,
    currentPaymentInfo,
    loadUserById,
  ]);


  /* ============================================================
     UI STATUS
     status hiển thị lấy từ API,
     KHÔNG lấy status trên URL.
     ============================================================ */

  const viewStatus =
    getViewStatus(
      currentPaymentInfo
        ?.status,
    );


  const isSuccess =
    viewStatus ===
    "success";

  const isCancel =
    viewStatus ===
    "cancel";


  /* ============================================================
     INVALID URL
     ============================================================ */

  if (!orderCode) {
    return (
      <CheckoutMessage
        title="KHÔNG TÌM THẤY"
        highlight="ĐƠN HÀNG."
        description="URL thanh toán không có mã đơn hàng hợp lệ."
        actionHref="/products"
        actionLabel="VỀ TRANG SẢN PHẨM"
        variant="failed"
      />
    );
  }


  /* ============================================================
     API ERROR — GET PAYMENT INFO
     ============================================================ */

  if (
    isPaymentInfoError
  ) {
    return (
      <CheckoutMessage
        title="KHÔNG THỂ"
        highlight="XÁC NHẬN."
        description={
          getApiErrorMessage(
            paymentInfoError,
          )
        }
        orderCode={
          orderCode
        }
        actionHref="/products"
        actionLabel="VỀ TRANG SẢN PHẨM"
        variant="failed"
      />
    );
  }


  /* ============================================================
     API ERROR — CHECK PAID
     ============================================================ */

  if (confirmError) {
    return (
      <CheckoutMessage
        title="XÁC NHẬN"
        highlight="CHƯA XONG."
        description={
          confirmError
        }
        orderCode={
          orderCode
        }
        actionHref="/transaction-history"
        actionLabel="KIỂM TRA ĐƠN HÀNG"
        variant="failed"
      />
    );
  }


  /* ============================================================
     LOADING
     ============================================================ */

  if (
    isCheckingPaymentInfo ||
    !currentPaymentInfo ||
    isCheckingPaid ||
    !isConfirmed
  ) {
    return (
      <CheckoutLoading
        orderCode={
          orderCode
        }
      />
    );
  }


  /* ============================================================
     FINAL CONTENT
     ============================================================ */

  const eyebrow =
    isSuccess
      ? "PAYMENT COMPLETED ✦"
      : isCancel
        ? "PAYMENT CANCELLED ✦"
        : "PAYMENT FAILED ✦";


  const titleTop =
    isCancel
      ? "GIAO DỊCH"
      : "THANH TOÁN";


  const titleHighlight =
    isSuccess
      ? "THÀNH CÔNG."
      : isCancel
        ? "ĐÃ HỦY."
        : "THẤT BẠI.";


  const description =
    isSuccess
      ? "Cảm ơn bạn đã thanh toán. Giao dịch đã được xác nhận và quyền truy cập nội dung đã mua sẽ được cập nhật cho tài khoản của bạn."
      : isCancel
        ? "Bạn đã hủy quá trình thanh toán. Đơn hàng chưa được hoàn tất và bạn có thể quay lại để thanh toán sau."
        : "Giao dịch chưa được hoàn tất. Bạn có thể kiểm tra lại đơn hàng và thử thanh toán lại.";


  return (
    <section
      className={`checkout-status ${
        isSuccess
          ? "checkout-status--success"
          : "checkout-status--failed"
      }`}
    >

      {/* DECOR */}

      <span
        className="checkout-status__shape checkout-status__shape--one"
        aria-hidden="true"
      />

      <span
        className="checkout-status__shape checkout-status__shape--two"
        aria-hidden="true"
      />


      <div className="checkout-status__wrap">

        {/* EYEBROW */}

        <div className="checkout-status__eyebrow">
          <i />

          <span>
            CHECKOUT STATUS
          </span>
        </div>


        {/* MAIN CARD */}

        <div className="checkout-status__card">

          {/* =========================
              LEFT VISUAL
              ========================= */}

          <div className="checkout-status__visual">

            <div className="checkout-status__icon">

              {isSuccess ? (
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M14 25.5L21 32.5L35 17.5"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : isCancel ? (
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="15"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />

                  <path
                    d="M16 24H32"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M17 17L31 31"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  <path
                    d="M31 17L17 31"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              )}

            </div>


            <span className="checkout-status__star">
              ✱
            </span>

          </div>


          {/* =========================
              RIGHT CONTENT
              ========================= */}

          <div className="checkout-status__content">

            <span className="checkout-status__mini">
              {eyebrow}
            </span>


            <h1>
              {titleTop}

              <br />

              <strong>
                {titleHighlight}
              </strong>
            </h1>


            <p>
              {description}
            </p>


            {/* ORDER */}

            <div className="checkout-status__order">

              <div>
                <span>
                  Mã đơn hàng
                </span>

                <strong>
                  {
                    currentPaymentInfo
                      .orderCode
                  }
                </strong>
              </div>


              <div>
                <span>
                  Trạng thái
                </span>

                <strong>
                  {
                    currentPaymentInfo
                      .status
                  }
                </strong>
              </div>

            </div>


            {/* SUCCESS NOTE */}

            {isSuccess && (
              <div className="checkout-status__note">

                <span>
                  ✦
                </span>

                <p>
                  Tài liệu hoặc khóa học
                  bạn vừa mua đã được
                  cập nhật vào thư viện
                  tài khoản.
                </p>

              </div>
            )}


            {/* ACTION */}

            <div className="checkout-status__actions">

              {isSuccess ? (
                <>
                  <Link
                    href="/collections"
                    className="checkout-status__primary"
                    data-cur="OPEN"
                  >
                    <span>
                      VÀO THƯ VIỆN
                      CỦA TÔI
                    </span>

                    <span>
                      →
                    </span>
                  </Link>


                  <Link
                    href="/transaction-history"
                    className="checkout-status__secondary"
                    data-cur="hover"
                  >
                    Xem giao dịch
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/transaction-history"
                    className="checkout-status__primary"
                    data-cur="OPEN"
                  >
                    <span>
                      KIỂM TRA ĐƠN HÀNG
                    </span>

                    <span>
                      ↗
                    </span>
                  </Link>


                  <Link
                    href="/products"
                    className="checkout-status__secondary"
                    data-cur="hover"
                  >
                    Về trang sản phẩm
                  </Link>
                </>
              )}

            </div>

          </div>

        </div>


        {/* BOTTOM */}

        <div className="checkout-status__bottom">

          <span>
            QUIZZY SOCIAL GALLERY
          </span>

          <span>
            SECURE CHECKOUT ✦
          </span>

        </div>

      </div>

    </section>
  );
}


/* ============================================================
   LOADING
   ============================================================ */

function CheckoutLoading({
  orderCode,
}: {
  orderCode: string;
}) {
  return (
    <section className="checkout-status checkout-status--success">

      <span
        className="checkout-status__shape checkout-status__shape--one"
        aria-hidden="true"
      />

      <span
        className="checkout-status__shape checkout-status__shape--two"
        aria-hidden="true"
      />


      <div className="checkout-status__wrap">

        <div className="checkout-status__eyebrow">
          <i />

          <span>
            VERIFY PAYMENT
          </span>
        </div>


        <div className="checkout-status__card checkout-status__card--loading">

          <div className="checkout-status__visual">

            <div className="checkout-status__loader">
              <i />
            </div>

            <span className="checkout-status__star">
              ✱
            </span>

          </div>


          <div className="checkout-status__content">

            <span className="checkout-status__mini">
              PLEASE WAIT ✦
            </span>

            <h1>
              ĐANG XÁC NHẬN

              <br />

              <strong>
                GIAO DỊCH.
              </strong>
            </h1>


            <p>
              Hệ thống đang kiểm tra
              trạng thái thanh toán.
              Vui lòng không đóng trang
              trong lúc xử lý.
            </p>


            <div className="checkout-status__order">

              <div>
                <span>
                  Mã đơn hàng
                </span>

                <strong>
                  {orderCode}
                </strong>
              </div>


              <div>
                <span>
                  Trạng thái
                </span>

                <strong>
                  ĐANG KIỂM TRA...
                </strong>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}


/* ============================================================
   GENERIC ERROR
   ============================================================ */

function CheckoutMessage({
  title,
  highlight,
  description,
  orderCode,

  actionHref,
  actionLabel,

  variant,
}: {
  title: string;
  highlight: string;
  description: string;

  orderCode?: string;

  actionHref: string;
  actionLabel: string;

  variant:
    | "success"
    | "failed";
}) {
  return (
    <section
      className={`checkout-status checkout-status--${variant}`}
    >

      <span
        className="checkout-status__shape checkout-status__shape--one"
        aria-hidden="true"
      />

      <span
        className="checkout-status__shape checkout-status__shape--two"
        aria-hidden="true"
      />


      <div className="checkout-status__wrap">

        <div className="checkout-status__eyebrow">
          <i />

          <span>
            CHECKOUT STATUS
          </span>
        </div>


        <div className="checkout-status__card">

          <div className="checkout-status__visual">

            <div className="checkout-status__icon">

              <svg
                viewBox="0 0 48 48"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M17 17L31 31"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <path
                  d="M31 17L17 31"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>

            </div>

            <span className="checkout-status__star">
              ✱
            </span>

          </div>


          <div className="checkout-status__content">

            <span className="checkout-status__mini">
              PAYMENT STATUS ✦
            </span>


            <h1>
              {title}

              <br />

              <strong>
                {highlight}
              </strong>
            </h1>


            <p>
              {description}
            </p>


            {orderCode && (
              <div className="checkout-status__order">

                <div>
                  <span>
                    Mã đơn hàng
                  </span>

                  <strong>
                    {orderCode}
                  </strong>
                </div>

              </div>
            )}


            <div className="checkout-status__actions">

              <Link
                href={actionHref}
                className="checkout-status__primary"
                data-cur="OPEN"
              >
                <span>
                  {actionLabel}
                </span>

                <span>
                  →
                </span>
              </Link>


              <Link
                href="/"
                className="checkout-status__secondary"
                data-cur="hover"
              >
                Về trang chủ
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}