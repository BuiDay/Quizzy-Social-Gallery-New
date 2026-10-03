"use client";
import { SocialMediaBundleClientProofSection } from "@/components/products/detail/SocialMediaBundle/SocialMediaBundleClientProofSection";
import { SocialMediaBundleDocumentSection } from "@/components/products/detail/SocialMediaBundle/SocialMediaBundleDocumentSection";
import { SocialMediaBundleFinalOfferSection } from "@/components/products/detail/SocialMediaBundle/SocialMediaBundleFinalOfferSection";
import { SocialMediaBundleHero } from "@/components/products/detail/SocialMediaBundle/SocialMediaBundleHero";
import { SocialMediaBundleNewsletter } from "@/components/products/detail/SocialMediaBundle/SocialMediaBundleNewsletter";
import { SocialMediaBundleTemplateValueSection } from "@/components/products/detail/SocialMediaBundle/SocialMediaBundleTemplateValueSection";
import { SocialMediaBundleWorkflowSection } from "@/components/products/detail/SocialMediaBundle/SocialMediaBundleWorkflowSection";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { SiteEffects } from "@/components/SiteEffects";
import { ModalProvider } from "@/components/ui/ModalContext";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import "@/styles/social-media-bundle.css";
import Thumnail from "@/assets/images/Social Media Bundle/1.png";
import { useGetByIdMutation } from "@/redux/features/product/productApi";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Product } from "@/components/ui/PaidProductAction";
import { PurchaseModal, PurchaseProduct } from "@/components/ui/PurchaseModal";
import UserAuth from "@/hook/userAuth";
import { useState, useEffect } from "react";
import ModalNeedLogin from "@/components/ui/ModalNeedLogin";

export default function SocialMediaBundlePage() {
  const [getById, { isLoading }] = useGetByIdMutation();
  const [selectedPurchaseProduct, setSelectedPurchaseProduct] =
    useState<PurchaseProduct | null>(null);
  const { product } = useSelector((item: RootState) => item.product);
  useEffect(() => {
    const getData = async () => await getById("668d8c63116eb91095afb089");
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
      price: product.discount?.discountPrice ?? product.price,
      originalPrice:
        product.discount?.discountPrice != null &&
          product.discount.discountPrice < product.price
          ? product.price
          : undefined,
      image: product.thumnail,
    });
  };
  return (
    <ModalProvider>
      <Navbar />
      <SiteEffects />
      <main>
        <SocialMediaBundleHero handleBuy={handleBuy}
          product={product} />
        <SocialMediaBundleWorkflowSection />
        <SocialMediaBundleClientProofSection />
        <SocialMediaBundleDocumentSection />
        <SocialMediaBundleTemplateValueSection />
        <SocialMediaBundleFinalOfferSection productImageSrc={Thumnail} handleBuy={handleBuy}
          product={product} />
        <SocialMediaBundleNewsletter />
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
