"use client";

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import "@/styles/purchase-modal.css";

import { createPortal } from "react-dom";

export type PurchaseProduct = {
  id: string;
  title: string;
  category?: string[];
  description?: string;

  price: number;
  originalPrice?: number;

  image?: string;
};

export type PurchaseCoupon = {
  code: string;

  type: "percent" | "fixed";

  value: number;

  minOrder?: number;

  maxDiscount?: number;

  label?: string;
};

export type PurchasePaymentMethod = {
  id: string;

  name: string;

  description?: string;

  disabled?: boolean;
};

type CheckoutPayload = {
  product: PurchaseProduct;

  customer: {
    name: string;
    email: string;
    phone: string;
  };

  coupon?: PurchaseCoupon;

  discount: number;

  total: number;

  paymentMethod: string;
};

type PurchaseModalProps = {
  product: PurchaseProduct | null;

  open: boolean;

  onClose: () => void;

  coupons?: PurchaseCoupon[];

  paymentMethods?: PurchasePaymentMethod[];

  onCheckout?: (
    payload: CheckoutPayload,
  ) => Promise<void> | void;
};

const defaultPaymentMethods: PurchasePaymentMethod[] = [
  {
    id: "bank",
    name: "Chuyển khoản ngân hàng",
    description:
      "Thanh toán qua QR hoặc Internet Banking.",
  },

  {
    id: "online",
    name: "Thanh toán online",
    description:
      "Thanh toán qua cổng thanh toán được kết nối.",
  },
];

const formatVND = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

export function PurchaseModal({
  product,
  open,
  onClose,
  coupons = [],
  paymentMethods = defaultPaymentMethods,
  onCheckout,
}: PurchaseModalProps) {
  const [mounted, setMounted] =
    useState(false);

  const [couponInput, setCouponInput] =
    useState("");

  const [activeCoupon, setActiveCoupon] =
    useState<PurchaseCoupon | null>(null);

  const [couponMessage, setCouponMessage] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitMessage, setSubmitMessage] =
    useState("");

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleKeydown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeydown,
    );

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        handleKeydown,
      );
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    setCouponInput("");
    setActiveCoupon(null);
    setCouponMessage("");
    setSubmitMessage("");

    const firstPayment =
      paymentMethods.find(
        (method) => !method.disabled,
      );

    setPaymentMethod(
      firstPayment?.id ?? "",
    );
  }, [
    open,
    product?.id,
    paymentMethods,
  ]);

  const discount = useMemo(() => {
    if (!product || !activeCoupon) {
      return 0;
    }

    if (
      activeCoupon.minOrder &&
      product.price <
        activeCoupon.minOrder
    ) {
      return 0;
    }

    if (
      activeCoupon.type === "fixed"
    ) {
      return Math.min(
        activeCoupon.value,
        product.price,
      );
    }

    let result =
      product.price *
      (activeCoupon.value / 100);

    if (
      activeCoupon.maxDiscount
    ) {
      result = Math.min(
        result,
        activeCoupon.maxDiscount,
      );
    }

    return Math.round(result);
  }, [
    product,
    activeCoupon,
  ]);

  const total = useMemo(() => {
    if (!product) return 0;

    return Math.max(
      0,
      product.price - discount,
    );
  }, [
    product,
    discount,
  ]);

  const applyCoupon = () => {
    if (!product) return;

    const code = couponInput
      .trim()
      .toUpperCase();

    if (!code) {
      setActiveCoupon(null);

      setCouponMessage(
        "Bạn chưa nhập mã giảm giá.",
      );

      return;
    }

    const found =
      coupons.find(
        (coupon) =>
          coupon.code.toUpperCase() ===
          code,
      );

    if (!found) {
      setActiveCoupon(null);

      setCouponMessage(
        "Mã giảm giá không hợp lệ.",
      );

      return;
    }

    if (
      found.minOrder &&
      product.price < found.minOrder
    ) {
      setActiveCoupon(null);

      setCouponMessage(
        `Đơn hàng tối thiểu ${formatVND(
          found.minOrder,
        )} để sử dụng mã này.`,
      );

      return;
    }

    setActiveCoupon(found);

    setCouponMessage(
      found.label
        ? found.label
        : "Áp dụng mã giảm giá thành công.",
    );
  };

  const removeCoupon = () => {
    setCouponInput("");
    setActiveCoupon(null);
    setCouponMessage("");
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      !product ||
      isSubmitting
    ) {
      return;
    }

    const formData =
      new FormData(event.currentTarget);

    const customer = {
      name: String(
        formData.get("name") ?? "",
      ).trim(),

      email: String(
        formData.get("email") ?? "",
      ).trim(),

      phone: String(
        formData.get("phone") ?? "",
      ).trim(),
    };

    if (!paymentMethod) {
      setSubmitMessage(
        "Vui lòng chọn phương thức thanh toán.",
      );

      return;
    }

    if (!onCheckout) {
      setSubmitMessage(
        "Giao diện thanh toán đã sẵn sàng. Cần kết nối API tạo đơn hàng để tiếp tục thanh toán.",
      );

      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitMessage("");

      await onCheckout({
        product,

        customer,

        coupon:
          activeCoupon ?? undefined,

        discount,

        total,

        paymentMethod,
      });
    } catch (error) {
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra khi tạo đơn hàng.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (
    !mounted ||
    !open ||
    !product
  ) {
    return null;
  }

  return createPortal(
    <div
      className="purchase-modal-overlay"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className="purchase-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="purchase-modal-title"
      >
        {/* CLOSE */}

        <button
          type="button"
          className="purchase-modal-close"
          aria-label="Đóng"
          onClick={onClose}
          data-cur="hover"
        >
          ×
        </button>

        {/* ================================
            LEFT
            ================================ */}

        <div className="purchase-modal-product">
          <div className="purchase-modal-label">
            <i />
            ĐƠN HÀNG CỦA BẠN
          </div>

          <div className="purchase-modal-product-card">
            {product.image && (
              <div className="purchase-modal-product-image">
                <img
                  src={product.image}
                  alt={product.title}
                />
              </div>
            )}

            <div className="purchase-modal-product-copy">
              {product.category && (
                <span className="purchase-modal-category">
                  {product.category}
                </span>
              )}

              <h2
                id="purchase-modal-title"
              >
                {product.title}
              </h2>

              {product.description && (
                <p>
                  {
                    product.description
                  }
                </p>
              )}

              <div className="purchase-modal-product-price">
                <strong>
                  {formatVND(
                    product.price,
                  )}
                </strong>

                {product.originalPrice &&
                  product.originalPrice >
                    product.price && (
                    <del>
                      {formatVND(
                        product.originalPrice,
                      )}
                    </del>
                  )}
              </div>
            </div>
          </div>

          <div className="purchase-modal-note">
            <span>✦</span>

            <p>
              Sau khi thanh toán thành
              công, sản phẩm sẽ được gửi
              theo thông tin đơn hàng của
              bạn.
            </p>
          </div>
        </div>

        {/* ================================
            RIGHT
            ================================ */}

        <form
          className="purchase-modal-checkout"
          onSubmit={handleSubmit}
        >
          {/* BUYER INFO */}

          <div className="purchase-modal-block">
            <div className="purchase-modal-block-head">
              <span>01</span>

              <h3>
                Thông tin người mua
              </h3>
            </div>

            <div className="purchase-modal-fields">
              <label className="purchase-modal-field">
                <span>Họ và tên</span>

                <input
                  name="name"
                  type="text"
                  placeholder="Nhập họ và tên"
                  required
                />
              </label>

              <label className="purchase-modal-field">
                <span>Email</span>

                <input
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  required
                />
              </label>

              <label className="purchase-modal-field">
                <span>
                  Số điện thoại
                </span>

                <input
                  name="phone"
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  required
                />
              </label>
            </div>
          </div>

          {/* COUPON */}

          <div className="purchase-modal-block">
            <div className="purchase-modal-block-head">
              <span>02</span>

              <h3>
                Mã giảm giá
              </h3>
            </div>

            <div className="purchase-modal-coupon">
              <input
                type="text"
                value={couponInput}
                placeholder="Nhập mã giảm giá"
                onChange={(event) =>
                  setCouponInput(
                    event.target.value,
                  )
                }
              />

              {activeCoupon ? (
                <button
                  type="button"
                  onClick={removeCoupon}
                >
                  Xóa mã
                </button>
              ) : (
                <button
                  type="button"
                  onClick={applyCoupon}
                >
                  Áp dụng
                </button>
              )}
            </div>

            {couponMessage && (
              <p
                className={`purchase-modal-coupon-message ${
                  activeCoupon
                    ? "is-success"
                    : "is-error"
                }`}
              >
                {couponMessage}
              </p>
            )}
          </div>

          {/* PAYMENT */}

          <div className="purchase-modal-block">
            <div className="purchase-modal-block-head">
              <span>03</span>

              <h3>
                Phương thức thanh toán
              </h3>
            </div>

            <div className="purchase-modal-payments">
              {paymentMethods.map(
                (method) => (
                  <label
                    key={method.id}
                    className={`purchase-modal-payment ${
                      paymentMethod ===
                      method.id
                        ? "is-active"
                        : ""
                    } ${
                      method.disabled
                        ? "is-disabled"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={
                        paymentMethod ===
                        method.id
                      }
                      disabled={
                        method.disabled
                      }
                      onChange={() =>
                        setPaymentMethod(
                          method.id,
                        )
                      }
                    />

                    <span className="purchase-modal-radio" />

                    <span className="purchase-modal-payment-copy">
                      <strong>
                        {method.name}
                      </strong>

                      {method.description && (
                        <small>
                          {
                            method.description
                          }
                        </small>
                      )}
                    </span>

                    <span className="purchase-modal-payment-check">
                      ✓
                    </span>
                  </label>
                ),
              )}
            </div>
          </div>

          {/* TOTAL */}

          <div className="purchase-modal-summary">
            <div>
              <span>
                Giá sản phẩm
              </span>

              <strong>
                {formatVND(
                  product.price,
                )}
              </strong>
            </div>

            {discount > 0 && (
              <div className="purchase-modal-summary-discount">
                <span>
                  Giảm giá
                </span>

                <strong>
                  −
                  {formatVND(
                    discount,
                  )}
                </strong>
              </div>
            )}

            <div className="purchase-modal-summary-total">
              <span>
                Tổng thanh toán
              </span>

              <strong>
                {formatVND(total)}
              </strong>
            </div>
          </div>

          {submitMessage && (
            <p className="purchase-modal-submit-message">
              {submitMessage}
            </p>
          )}

          <button
            type="submit"
            className="purchase-modal-submit"
            disabled={isSubmitting}
            data-cur="OPEN"
          >
            <span>
              {isSubmitting
                ? "ĐANG XỬ LÝ..."
                : "THANH TOÁN NGAY"}
            </span>

            <span>→</span>
          </button>

          <p className="purchase-modal-secure">
            🔒 Thông tin đơn hàng được bảo
            mật.
          </p>
        </form>
      </div>
    </div>,
    document.body,
  );
}