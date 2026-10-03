"use client";
import { SocialMediaPackageOneExploreSection } from "@/components/products/detail/SocialMediaPackageOne/SocialMediaPackageOneExploreSection";
import { SocialMediaPackageOneFeedbackSection } from "@/components/products/detail/SocialMediaPackageOne/SocialMediaPackageOneFeedbackSection";
import { SocialMediaPackageOneFinalOfferSection } from "@/components/products/detail/SocialMediaPackageOne/SocialMediaPackageOneFinalOfferSection";
import { SocialMediaPackageOneHero } from "@/components/products/detail/SocialMediaPackageOne/SocialMediaPackageOneHero";
import { SocialMediaPackageOneIntroSection } from "@/components/products/detail/SocialMediaPackageOne/SocialMediaPackageOneIntroSection";
import { SocialMediaPackageOneWhoSection } from "@/components/products/detail/SocialMediaPackageOne/SocialMediaPackageOneWhoSection";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { SiteEffects } from "@/components/SiteEffects";
import { ModalProvider } from "@/components/ui/ModalContext";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import "@/styles/social-media-package-one.css";
import productImageSrc from "@/assets/images/Social Media Package 1/1.png";
import { useGetByIdMutation } from "@/redux/features/product/productApi";
import { PurchaseModal, PurchaseProduct } from "@/components/ui/PurchaseModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UserAuth from "@/hook/userAuth";
import { Product } from "@/components/ui/PaidProductAction";
import ModalNeedLogin from "@/components/ui/ModalNeedLogin";

export default function SocialMediaPackageOnePage() {
  const [getById, { isLoading }] = useGetByIdMutation();
  const [selectedPurchaseProduct, setSelectedPurchaseProduct] =
    useState<PurchaseProduct | null>(null);
  const { product } = useSelector((item: RootState) => item.product);
  useEffect(() => {
    const getData = async () => await getById("668d8e4363bbb90322e96df2");
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
      originalPrice: product.discount?.discountPrice != null && product.discount.discountPrice < product.price ? product.price : undefined,
      image: product.thumnail,
    });
  };

  return (
    <ModalProvider>
      <SiteEffects />
      <Navbar />
      <main>
        <SocialMediaPackageOneHero
          productImageSrc={productImageSrc}
          handleBuy={handleBuy}
          product={product}
        />
        <SocialMediaPackageOneIntroSection />
        <SocialMediaPackageOneWhoSection />
        <SocialMediaPackageOneFeedbackSection />
        <SocialMediaPackageOneExploreSection />
        <SocialMediaPackageOneFinalOfferSection
          productImageSrc={productImageSrc}
          handleBuy={handleBuy}
          product={product}
        />
        {needLogin && (
          <ModalNeedLogin open={needLogin} setOpen={setNeedLogin} />
        )}
        <PurchaseModal
          open={Boolean(selectedPurchaseProduct)}
          product={selectedPurchaseProduct}
          onClose={() => setSelectedPurchaseProduct(null)}
        />
        <NewsletterCTA />
      </main>
      <Footer />
    </ModalProvider>
  );
}
