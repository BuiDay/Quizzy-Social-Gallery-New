"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/redux/store";
import { useCreatePaymentLinkMutation, usePaymentFreeMutation } from "@/redux/features/checkout/checkoutApi";
import { useGetCouponMutation } from "@/redux/features/coupon/couponApi";
import { useLoadUserByIdMutation } from "@/redux/features/auth/authApi";
import "@/styles/purchase-modal.css";

export type PurchaseProduct = {
  id: string;
  title: string;
  category?: string[];
  description?: string;
  price: number;
  originalPrice?: number;
  image?: string;
  charge?: boolean;
};

type PurchaseModalProps = {
  product: PurchaseProduct | null;
  open: boolean;
  onClose: () => void;
};

type ApiCoupon = { discount: number; name?: string };

const formatVND = (value: number) => new Intl.NumberFormat("vi-VN", {
  style: "currency", currency: "VND", maximumFractionDigits: 0,
}).format(value);

const errorMessage = (error: unknown) => {
  if (error && typeof error === "object" && "data" in error) {
    const data = error.data;
    if (data && typeof data === "object" && "message" in data && typeof data.message === "string") return data.message;
  }
  return "Đã có lỗi. Vui lòng thử lại.";
};

export function PurchaseModal({ product, open, onClose }: PurchaseModalProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [activeCoupon, setActiveCoupon] = useState<ApiCoupon | null>(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createPaymentLink] = useCreatePaymentLinkMutation();
  const [paymentFree] = usePaymentFreeMutation();
  const [getCouponByName, { isLoading: isApplyingCoupon }] = useGetCouponMutation();
  const [loadUserById] = useLoadUserByIdMutation();
  const apiCoupon = useSelector((state: RootState) => state.coupon.coupon);
  const paymentLink = useSelector((state: RootState) => state.checkout.paymentLink);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeydown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeydown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeydown);
    };
  }, [open, onClose]);
  useEffect(() => {
    if (!open) return;
    setCouponInput("");
    setActiveCoupon(null);
    setCouponMessage("");
    setSubmitMessage("");
  }, [open, product?.id]);

  const discount = useMemo(() => product && activeCoupon
    ? Math.min(product.price, Math.max(0, Math.round(product.price * Number(activeCoupon.discount) / 100)))
    : 0, [product, activeCoupon]);
  const total = Math.max(0, (product?.price ?? 0) - discount);

  const applyCoupon = async () => {
    if (!product || isApplyingCoupon) return;
    const code = couponInput.trim();
    if (!code) { setCouponMessage("Bạn chưa nhập mã giảm giá."); return; }
    // Keep the product restriction used by the old cart.
    if (code.toLowerCase().includes("sinhvienuel") && product.id !== "67e0dc5eec49e1d578e75ff6") {
      setActiveCoupon(null);
      setCouponMessage("Không áp dụng được cho sản phẩm này!");
      return;
    }
    try {
      setCouponMessage("");
      await getCouponByName(code).unwrap();
      // Coupon is stored in the Redux slice by the existing API endpoint.
      setCouponMessage("Áp dụng mã thành công!");
    } catch (error) {
      setActiveCoupon(null);
      setCouponMessage(errorMessage(error));
    }
  };
  useEffect(() => {
    if (!open || !couponInput.trim() || !apiCoupon) return;
    // Only accept the result after a successful lookup for this modal.
    if (couponMessage === "Áp dụng mã thành công!") setActiveCoupon(apiCoupon);
  }, [apiCoupon, couponMessage, open]);
  const removeCoupon = () => { setCouponInput(""); setActiveCoupon(null); setCouponMessage(""); };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!product || isSubmitting) return;
    const order = {
      product: product.id,
      amount: total,
      description: "Thanh toan don hang",
      items: [{ name: product.title, quantity: 1, price: total }],
    };
    try {
      setIsSubmitting(true);
      setSubmitMessage("");
      if (product.charge === false || total === 0) {
        await paymentFree(order).unwrap();
        await loadUserById({});
        setSubmitMessage("Đã mở khóa tài liệu thành công.");
        onClose();
      } else {
        const response = await createPaymentLink(order).unwrap();
        const result = response as { checkoutUrl?: string; data?: { checkoutUrl?: string } };
        const url = result?.checkoutUrl ?? result?.data?.checkoutUrl ?? paymentLink?.checkoutUrl;
        if (!url) throw new Error("Chưa nhận được liên kết thanh toán. Vui lòng thử lại.");
        window.location.assign(url);
      }
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : errorMessage(error));
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
              {/* {product.category && (
                <span className="purchase-modal-category">
                  {product.category.join(" · ")}
                </span>
              )} */}

              <h2
                id="purchase-modal-title"
              >
                {product.title}
              </h2>


              <div className="purchase-modal-product-price">
                <strong>
                  {product.charge === false ? "Miễn phí" : formatVND(product.price)}
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
              {product.charge === false
                ? "Sau khi mở khóa, tài liệu sẽ có trong bộ sưu tập của bạn."
                : "Sau khi thanh toán thành công, tài liệu sẽ có trong bộ sưu tập của bạn."}
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
          {/* COUPON */}

          {product.charge !== false && <div className="purchase-modal-block">
        
            <div className="purchase-modal-coupon">
              <input
                type="text"
                value={couponInput}
                placeholder="Nhập mã giảm giá"
                onChange={(event) => {
                  setCouponInput(event.target.value);
                  setActiveCoupon(null);
                  setCouponMessage("");
                }}
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
          </div>}

          {/* TOTAL */}

          <div className="purchase-modal-summary">
            <div>
              <span>
                Giá sản phẩm
              </span>

              <strong>
                {product.charge === false ? "Miễn phí" : formatVND(product.price)}
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
                {product.charge === false ? "Miễn phí" : formatVND(total)}
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
            disabled={isSubmitting || isApplyingCoupon}
            data-cur="OPEN"
          >
            <span>
              {isSubmitting
                ? "ĐANG XỬ LÝ..."
                : product.charge === false || total === 0 ? "MỞ KHÓA MIỄN PHÍ" : "THANH TOÁN NGAY"}
            </span>

            <span>→</span>
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}
