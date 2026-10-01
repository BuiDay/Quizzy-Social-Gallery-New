"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";


type CheckoutState =
  | "success"
  | "failed"
  | "cancel";


export function CheckoutStatus() {
  const searchParams =
    useSearchParams();

  const rawStatus =
    searchParams.get("status");

  const status: CheckoutState =
    rawStatus === "success" ||
    rawStatus === "failed" ||
    rawStatus === "cancel"
      ? rawStatus
      : "failed";

  const orderCode =
    searchParams.get("orderCode");

  const sessionId =
    searchParams.get("session_id");


  const isSuccess =
    status === "success";

  const isCancel =
    status === "cancel";


  const eyebrow =
    isSuccess
      ? "PAYMENT COMPLETED ✦"
      : isCancel
        ? "PAYMENT CANCELLED ✦"
        : "PAYMENT FAILED ✦";


  const titleTop =
    isSuccess
      ? "THANH TOÁN"
      : isCancel
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
      ? "Cảm ơn bạn đã đăng ký. Hệ thống đang hoàn tất xác nhận giao dịch và mở quyền truy cập nội dung cho tài khoản của bạn."
      : isCancel
        ? "Bạn đã thoát khỏi quá trình thanh toán. Đơn hàng chưa được thanh toán và bạn có thể quay lại để tiếp tục bất cứ lúc nào."
        : "Giao dịch chưa được hoàn tất. Bạn có thể kiểm tra lại thông tin thanh toán và thử lại.";


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

        <div className="checkout-status__eyebrow">
          <i />

          <span>
            CHECKOUT STATUS
          </span>
        </div>


        <div className="checkout-status__card">

          {/* =========================
              VISUAL
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
              ) : (
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                >
                  {isCancel ? (
                    <>
                      <path
                        d="M16 24H32"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      <circle
                        cx="24"
                        cy="24"
                        r="15"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      />
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </svg>
              )}

            </div>


            <span className="checkout-status__star">
              ✱
            </span>

          </div>


          {/* =========================
              CONTENT
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


            {/* =========================
                ORDER INFO
                ========================= */}

            {(orderCode ||
              sessionId) && (
              <div className="checkout-status__order">

                {orderCode && (
                  <div>
                    <span>
                      Mã đơn hàng
                    </span>

                    <strong>
                      {orderCode}
                    </strong>
                  </div>
                )}


                {sessionId && (
                  <div>
                    <span>
                      Payment Session
                    </span>

                    <strong>
                      {sessionId.length >
                      26
                        ? `${sessionId.slice(
                            0,
                            22,
                          )}...`
                        : sessionId}
                    </strong>
                  </div>
                )}

              </div>
            )}


            {/* =========================
                SUCCESS NOTE
                ========================= */}

            {isSuccess && (
              <div className="checkout-status__note">
                <span>
                  ✦
                </span>

                <p>
                  Nếu khóa học chưa xuất
                  hiện ngay, vui lòng chờ
                  vài giây để hệ thống
                  hoàn tất xác nhận thanh
                  toán.
                </p>
              </div>
            )}


            {/* =========================
                ACTIONS
                ========================= */}

            <div className="checkout-status__actions">

              {isSuccess ? (
                <>
                  <Link
                    href="/collections/courses"
                    className="checkout-status__primary"
                    data-cur="OPEN"
                  >
                    <span>
                      VÀO KHÓA HỌC
                      CỦA TÔI
                    </span>

                    <span>
                      →
                    </span>
                  </Link>


                  <Link
                    href="/collections/transactions"
                    className="checkout-status__secondary"
                    data-cur="hover"
                  >
                    Xem giao dịch
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/collections/transactions"
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
                    href="/courses"
                    className="checkout-status__secondary"
                    data-cur="hover"
                  >
                    Quay lại khóa học
                  </Link>
                </>
              )}

            </div>

          </div>

        </div>


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