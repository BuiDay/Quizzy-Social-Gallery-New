"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useGetAllMutation } from "@/redux/features/product/productApi";
import { ProductsHero } from "@/components/products/ProductsHero";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { SiteEffects } from "@/components/SiteEffects";
import { ModalProvider } from "@/components/ui/ModalContext";
import "../../styles/products.css";
import { PaidProductsSection, type PaidProduct } from "@/components/products/PaidProductsSection";
import { FreeProductsSection } from "@/components/products/FreeProductsSection";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";

export default function ProductsPage() {
  const [getAll, { isLoading, isError }] = useGetAllMutation();
  const { products } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    void getAll({ charge: "", keywords: "" });
  }, [getAll]);

  return <ModalProvider>
    <SiteEffects />
    <Navbar />
    <main>
      <ProductsHero />
      <PaidProductsSection products={(products ?? []) as PaidProduct[]} isLoading={isLoading} isError={isError} />
      <FreeProductsSection products={(products ?? []) as PaidProduct[]} isLoading={isLoading} isError={isError} />
      <NewsletterCTA />
    </main>
    <Footer />
  </ModalProvider>

}