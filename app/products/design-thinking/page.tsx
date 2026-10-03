"use client";
import { DesignThinkingBeforeAfterSection } from "@/components/products/detail/DesignThinking/DesignThinkingBeforeAfterSection";
import { DesignThinkingDocumentInsideSection } from "@/components/products/detail/DesignThinking/DesignThinkingDocumentInsideSection";
import { DesignThinkingFinalOfferSection } from "@/components/products/detail/DesignThinking/DesignThinkingFinalOfferSection";
import { DesignThinkingHero } from "@/components/products/detail/DesignThinking/DesignThinkingHero";
import { DesignThinkingMindsetSection } from "@/components/products/detail/DesignThinking/DesignThinkingMindsetSection";
import { DesignThinkingVisualEraSection } from "@/components/products/detail/DesignThinking/DesignThinkingVisualEraSection";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { SiteEffects } from "@/components/SiteEffects";
import { ModalProvider } from "@/components/ui/ModalContext";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import "@/styles/design-thinking.css";
import productImage from "@/assets/images/Tu duy Thiet Ke/tu duy thiet ke.png";
import { useGetByIdMutation } from "@/redux/features/product/productApi";
import { useEffect, useState } from "react";
import { PurchaseModal, PurchaseProduct } from "@/components/ui/PurchaseModal";

import UserAuth from "@/hook/userAuth";
import ModalNeedLogin from "@/components/ui/ModalNeedLogin";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Product } from "@/components/ui/PaidProductAction";

export default function DesignThinkingPage() {
  const [getById, { isLoading }] = useGetByIdMutation();
  const [selectedPurchaseProduct, setSelectedPurchaseProduct] =
    useState<PurchaseProduct | null>(null);
  const { product } = useSelector((item: RootState) => item.product);
  useEffect(() => {
    const getData = async () => await getById("662cb32eaae33d8a651a3d25");
    getData();
  }, []);

  const [needLogin, setNeedLogin] = useState(false);
  const isAuthenticated = UserAuth();

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
      image: product.thumnail,
    });
  };

  return (
    <ModalProvider>
      <SiteEffects />
      <Navbar />
      <main>
        <DesignThinkingHero
          productImageSrc={productImage}
          handleBuy={handleBuy}
          product={product}
        />
        <DesignThinkingVisualEraSection />
        <DesignThinkingBeforeAfterSection />
        <DesignThinkingMindsetSection />
        <DesignThinkingDocumentInsideSection />
        <DesignThinkingFinalOfferSection
          productImageSrc={productImage}
          handleBuy={handleBuy}
          product={product}
        />
        <NewsletterCTA />

        {needLogin && (
          <ModalNeedLogin open={needLogin} setOpen={setNeedLogin} />
        )}
        <PurchaseModal
          open={Boolean(selectedPurchaseProduct)}
          product={selectedPurchaseProduct}
          onClose={() => setSelectedPurchaseProduct(null)}
        />
      </main>
      <Footer />
    </ModalProvider>
  );
}
