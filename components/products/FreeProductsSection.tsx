"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import UserAuth from "@/hook/userAuth";
import UseProtectProduct from "@/hook/useProtectProduct";
import ModalNeedLogin from "../ui/ModalNeedLogin";
import type { PaidProduct } from "./PaidProductsSection";
import { PurchaseModal, type PurchaseProduct } from "../ui/PurchaseModal";

type FreeProduct = {
  id: string;
  title: string;
  description: string;
  category: string[];
  meta: string;
  image?: string;
};

type FreeProductsSectionProps = {
  products: PaidProduct[];
  isLoading?: boolean;
  isError?: boolean;
};

function FreeProductAction({ product, onAcquire }: { product: FreeProduct; onAcquire: (product: FreeProduct) => void }) {
  const isOwned = UseProtectProduct({ productId: product.id });

  return (
    <a
      href="/collections"
      data-cur="OPEN"
      onClick={(event) => {
        if (!isOwned) {
          event.preventDefault();
          onAcquire(product);
        }
      }}
    >
      <span>{isOwned ? "Đã sở hữu" : "Tải tài liệu"}</span>
      {isOwned ? <span aria-hidden="true">↗</span> : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" />
        </svg>
      )}
    </a>
  );
}

const freeFilters = [
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

export function FreeProductsSection({ products: apiProducts, isLoading = false, isError = false }: FreeProductsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [needLogin, setNeedLogin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<PurchaseProduct | null>(null);
  const isAuthenticated = UserAuth();

  const handleAcquire = (product: FreeProduct) => {
    if (!isAuthenticated) {
      setNeedLogin(true);
      return;
    }
    setSelectedProduct({
      id: product.id,
      title: product.title,
      description: product.description,
      category: product.category,
      image: product.image,
      price: 0,
      charge: false,
    });
  };

  const freeProducts = useMemo<FreeProduct[]>(() => apiProducts
    .filter((product) => !product.charge)
    .map((product) => ({
      id: product._id,
      title: product.name,
      description: product.description ?? "",
      category: product.category ? [product.category] : [],
      meta: product.category ?? "Tài liệu miễn phí",
      image: product.thumnail,
    })), [apiProducts]);

  const filteredProducts = useMemo(() => {
    if (activeFilter === "Tất cả") {
      return freeProducts;
    }

    return freeProducts.filter((product) =>
      product.category.includes(activeFilter),
    );
  }, [activeFilter, freeProducts]);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".products-free-card[data-rv]");
    if (!cards?.length) return;
    if (typeof IntersectionObserver === "undefined") {
      cards.forEach((card) => card.classList.add("in"));
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
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [filteredProducts]);

  return (
    <section
      ref={sectionRef}
      className="products-free"
      id="free-products"
    >
      <div className="wrap products-free-wrap">

        {/* ================= HEADER ================= */}

        <div className="products-free-head">
          <div className="products-free-head-left">

            <div
              className="products-free-eyebrow"
              data-rv="up"
            >
              <i />

              <span>
                02 / TÀI LIỆU MIỄN PHÍ
              </span>
            </div>

            <h2
              className="products-free-title"
              data-rv="up"
              data-dl="70"
            >
              Tài liệu{" "}
              <span className="products-free-highlight products-free-highlight--sky">
                cô đọng
              </span>
              ,

              <br />

              template{" "}
              <span className="products-free-highlight products-free-highlight--lime">
                thực chiến
              </span>
              .
            </h2>

          </div>


          <div
            className="products-free-head-right"
            data-rv="up"
            data-dl="130"
          >
            <p>
              Không cần tự mày mò từ con số 0. Các tài liệu
              được xây dựng từ quy trình Social Media thực tế,
              cô đọng những phần quan trọng nhất và đi kèm
              template có sẵn.
            </p>
          </div>
        </div>


        {/* ================= FILTER ================= */}

        {/* <div
          className="products-free-filter"
          data-rv="up"
          data-dl="150"
        >
          <span className="products-free-filter-label">
            FILTER BY
          </span>

          <div className="products-free-filter-list">
            {freeFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`products-free-filter-button ${activeFilter === filter
                    ? "is-active"
                    : ""
                  }`}
                aria-pressed={
                  activeFilter === filter
                }
                onClick={() =>
                  setActiveFilter(filter)
                }
              >
                {filter}
              </button>
            ))}
          </div>

          <span className="products-free-filter-count">
            {filteredProducts.length} tài liệu
          </span>
        </div> */}


        {/* ================= PRODUCT GRID ================= */}

        {isLoading && <p role="status">Đang tải tài liệu...</p>}
        {isError && <p role="alert">Không tải được tài liệu. Vui lòng thử lại.</p>}
        {!isLoading && !isError && filteredProducts.length === 0 && <p>Chưa có tài liệu miễn phí.</p>}

        <div className="products-free-grid">
          {filteredProducts.map(
            (product, index) => (
              <article
                className="products-free-card"
                key={product.id}
                data-rv="up"
                data-dl={String(
                  (index % 4) * 60,
                )}
              >

                {/* COPY */}

                <div className="products-free-card-copy">
                  <span className="products-free-tag">
                    MIỄN PHÍ
                  </span>

                  <h3>
                    {product.title}
                  </h3>

                  <p>
                    {product.description}
                  </p>

                  <span className="products-free-meta">
                    {product.meta}
                  </span>
                </div>


                {/* IMAGE */}

                <div className="products-free-card-visual">
                  {product.image && <Image
                    src={product.image}
                    alt={product.title}
                    width={400}
                    height={400}
                    unoptimized
                    className="products-free-card-image"
                  />}
                </div>


                {/* CTA */}

                <div className="products-free-card-footer">
                  <FreeProductAction product={product} onAcquire={handleAcquire} />
                </div>

              </article>
            ),
          )}
        </div>

      </div>
      {needLogin && <ModalNeedLogin open={needLogin} setOpen={setNeedLogin} />}
      <PurchaseModal open={Boolean(selectedProduct)} product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
