"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import UserAuth from "@/hook/userAuth";
import UseProtectProduct from "@/hook/useProtectProduct";

import Image from "next/image";
import { PurchaseModal, type PurchaseProduct } from "../ui/PurchaseModal";
import ModalNeedLogin from "../ui/ModalNeedLogin";

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

type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string[];
  meta: string;
  image?: string;
  thumnail?:string;
  accent?: "lime" | "cream";
};

const money = (price: number) => `${new Intl.NumberFormat("vi-VN").format(price)}đ`;

const detailHref = (product: PaidProduct) => {
  const href = product.descriptionLink || product.url;
  return href ? (href.startsWith("/") ? href : `/${href}`) : `/products/${product._id}`;
};

const filters = [
  "Tất cả",
  "Content Marketing",
  "Social Media",
  "Brainstorm",
  "Career & Job",
  "AI",
  "Template",
  "Ebook",
  "Design",
];

type PaidProductsSectionProps = {
  products: PaidProduct[];
  isLoading?: boolean;
  isError?: boolean;
};

function PaidProductAction({ product, onBuy }: { product: Product; onBuy: (product: Product) => void }) {
  const isOwned = UseProtectProduct({ productId: product.id });

  return isOwned ? (
    <a  href="/collections" className="products-paid-action products-paid-action--paid" data-cur="OPEN">
      <span>Đã sở hữu</span><span>↗</span>
    </a>
  ) : (
    <button
      type="button"
      className="products-paid-action products-paid-action--buy"
      data-cur="OPEN"
      onClick={() => onBuy(product)}
    >
      <span>Mua ngay</span><span>↗</span>
    </button>
  );
}

export function PaidProductsSection({ products: apiProducts, isLoading = false, isError = false }: PaidProductsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const [selectedPurchaseProduct, setSelectedPurchaseProduct] =
    useState<PurchaseProduct | null>(null);
  const [needLogin, setNeedLogin] = useState(false);
  const isAuthenticated = UserAuth();

  const products = useMemo<Product[]>(() => apiProducts
    .filter((product) => product.charge && product.isShow)
    .map((product, index) => ({
      id: product._id,
      slug: detailHref(product),
      title: product.name,
      description: product.description ?? "",
      price: product.discount?.discountPrice ?? product.price,
      oldPrice: product.discount?.discountPrice != null && product.discount.discountPrice < product.price ? product.price : undefined,
      category: [product.category ?? "Tài liệu"],
      meta: product.category ?? "Tài liệu số",
      image: product.thumnail,
      accent: index === 0 ? "lime" : "cream",
    })), [apiProducts]);

  const featured = products.find((product) => /social media beginner/i.test(product.title)) ?? products[0];

  const handleBuy = (product: Product) => {
    if (!isAuthenticated) {
      setNeedLogin(true);
      return;
    }
    setSelectedPurchaseProduct({
      id: product.id,
      title: product.title,
      category: product.category,
      description: product.description,
      price: product.price,
      originalPrice: product.oldPrice,
      image: product.image,
    });
  };

  const filteredProducts = useMemo(() => {
    if (activeFilter === "Tất cả") return products;

    return products.filter((product) =>
      product.category.includes(activeFilter)
    );
  }, [activeFilter, products]);

  // API products arrive after SiteEffects has observed the initial DOM.
  // Observe newly rendered cards so the existing reveal CSS can show them.
  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll<HTMLElement>(
      ".products-featured[data-rv], .products-paid-card[data-rv]"
    );
    if (!elements?.length) return;

    if (typeof IntersectionObserver === "undefined") {
      elements.forEach((element) => element.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px 80px 0px", threshold: 0.05 });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [filteredProducts, featured]);

  return (
    <section ref={sectionRef} className="products-paid" id="products-library">
      <div className="wrap products-paid-wrap">
        {/* ================= HEADING ================= */}

        <div className="products-paid-head">
          <div className="products-paid-eyebrow" data-rv="up">
            <i />
            <span>01 / TÀI LIỆU CÓ PHÍ</span>
          </div>

          <h2 className="products-paid-title" data-rv="up" data-dl="70">
            Tài liệu{" "}
            <span className="products-paid-highlight products-paid-highlight--sky">
              chuyên sâu
            </span>{" "}
            để tiến gần hơn
            <br />
            đến{" "}
            <span className="products-paid-highlight products-paid-highlight--lime">
              mức thu nhập bạn muốn
            </span>
            .
          </h2>

          <p className="products-paid-intro" data-rv="up" data-dl="130">
            Nâng cấp kỹ năng, chuẩn hóa cách làm việc và tăng giá trị chuyên môn
            Social Media. Từ strategy, planning đến portfolio, proposal, audit
            và reporting đều có hướng dẫn, có framework, có template để áp dụng
            ngay.
          </p>
        </div>

        {/* ================= FEATURED ================= */}

        {featured && <article className="products-featured" data-rv="up" data-dl="180">
          <div className="products-featured-visual">
            {featured.image && <Image src={featured.image} alt={featured.title} width={600} height={600} unoptimized className="products-featured-image" />}
          </div>
          <div className="products-featured-content">
            <div className="products-featured-badge"><span>★</span> TÀI LIỆU NỔI BẬT</div>
            <div className="products-buyers">
              <div className="products-buyers-avatars"><i /><i /><i /><i /></div>
              <span>Khám phá tài liệu</span>
            </div>
            <h3>{featured.title}</h3>
            <p>{featured.description}</p>
            <div className="products-featured-price">
              <strong>{money(featured.price)}</strong>
              {featured.oldPrice && featured.oldPrice > featured.price && <>
                <del>{money(featured.oldPrice)}</del>
                <span className="products-discount">-{Math.round((1 - featured.price / featured.oldPrice) * 100)}%</span>
              </>}
            </div>
            <div className="products-featured-divider" />
            <a href={featured.slug} className="products-featured-button" data-cur="OPEN">
              <span>Xem chi tiết tài liệu</span><span>↗</span>
            </a>
            
          </div>
        </article>}

        {/* ================= FILTER ================= */}

        {/* <div className="products-filter" data-rv="up">
          <span className="products-filter-label">FILTER BY</span>

          <div className="products-filter-list">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`products-filter-button ${
                  activeFilter === filter ? "is-active" : ""
                }`}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <span className="products-filter-count">
            {filteredProducts.length} tài liệu
          </span>
        </div> */}

        {/* ================= GRID ================= */}

        {isLoading && <p role="status">Đang tải sản phẩm...</p>}
        {isError && <p role="alert">Không tải được sản phẩm. Vui lòng thử lại.</p>}
        {!isLoading && !isError && filteredProducts.length === 0 && <p>Chưa có sản phẩm có phí.</p>}

        <div className="products-paid-grid">
          {filteredProducts.map((product, index) => (
            <article
              className={`products-paid-card products-paid-card--${
                product.accent ?? "cream"
              }`}
              key={product.id}
              data-rv="up"
              data-dl={String((index % 4) * 70)}
            >
              <div className="products-paid-card-copy">
                <span className="products-paid-tag">TRẢ PHÍ</span>

                <h3>{product.title}</h3>

                <p>{product.description}</p>

                <div className="products-paid-price">
                  <strong>{money(product.price)}</strong>

                  {product.oldPrice && <del>{money(product.oldPrice)}</del>}
                </div>

                <span className="products-paid-meta">{product.meta}</span>
              </div>

              <div className="products-paid-card-visual">
                {product.image && <Image src={product.image} alt={product.title} width={400} height={400} unoptimized className="products-featured-image" />}
              </div>

              <div className="products-paid-card-footer">
                <div className="products-paid-actions">
                  <a
                    href={product.slug}
                    className="products-paid-action products-paid-action--detail"
                    data-cur="OPEN"
                  >
                    <span>Xem chi tiết</span>
                    <span>→</span>
                  </a>

                  <PaidProductAction product={product} onBuy={handleBuy} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      {needLogin && <ModalNeedLogin open={needLogin} setOpen={setNeedLogin} />}
      <PurchaseModal
        open={Boolean(selectedPurchaseProduct)}
        product={selectedPurchaseProduct}
        onClose={() => setSelectedPurchaseProduct(null)}
      />
    </section>
  );
}
