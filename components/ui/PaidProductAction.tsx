import type { ReactNode } from "react";
import UseProtectProduct from "@/hook/useProtectProduct";

export type PaidProduct = {
  _id: string;
  name: string;
  description?: string;
  thumnail?: string;
  price: number;
  discount?: { discountPrice?: number } | null;
  category?: string;
  descriptionLink?: string;
  url?: string;
  charge?: boolean;
  isShow?: boolean;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string[];
  thumnail?: string;
  meta: string;
  image?: string;
  accent?: "lime" | "cream";
   discount?: { discountPrice?: number } | null;
};

type PaidProductActionProps = {
  product: Product;
  onBuy: (product: Product) => void;
  className?: string;
  buttonText?: ReactNode;
  ownedButtonText?: ReactNode;
};

export function PaidProductAction({
  product,
  onBuy,
  className = "",
  buttonText = "Mua ngay",
  ownedButtonText = "Đã sở hữu",
}: PaidProductActionProps) {
  const isOwned = UseProtectProduct({ productId: product.id });

  return isOwned ? (
    <a href="/collections/documents" className={`products-paid-action__single products-paid-action--buy ${className}`.trim()} data-cur="OPEN">
      <span>{ownedButtonText}</span>  <span
        className="products-paid-action__buy-arrow"
        aria-hidden="true"
      >
        →
      </span>
    </a>
  ) : (
    <button
      type="button"
      className={`products-paid-action__single products-paid-action--buy ${className}`.trim()}
      data-cur="OPEN"
      onClick={() => onBuy(product)}
    >
      <span>{buttonText}</span>  <span
        className="products-paid-action__dth-buy-arrow"
        aria-hidden="true"
      >
        →
      </span>
    </button>
  );
}