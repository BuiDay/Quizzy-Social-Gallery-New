"use client"
import { SocialMediaPackageTwoAuditSection } from "@/components/products/detail/SocialMediaPackageTwo/SocialMediaPackageTwoAuditSection";
import { SocialMediaPackageTwoExperienceSection } from "@/components/products/detail/SocialMediaPackageTwo/SocialMediaPackageTwoExperienceSection";
import { SocialMediaPackageTwoFinalOfferSection } from "@/components/products/detail/SocialMediaPackageTwo/SocialMediaPackageTwoFinalOfferSection";
import { SocialMediaPackageTwoHero } from "@/components/products/detail/SocialMediaPackageTwo/SocialMediaPackageTwoHero";
import { SocialMediaPackageTwoMonthlyReportSection } from "@/components/products/detail/SocialMediaPackageTwo/SocialMediaPackageTwoMonthlyReportSection";
import { SocialMediaPackageTwoProposalSection } from "@/components/products/detail/SocialMediaPackageTwo/SocialMediaPackageTwoProposalSection";
import { SocialMediaPackageTwoWhoSection } from "@/components/products/detail/SocialMediaPackageTwo/SocialMediaPackageTwoWhoSection";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { SiteEffects } from "@/components/SiteEffects";
import { ModalProvider } from "@/components/ui/ModalContext";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import "@/styles/social-media-package-two.css";
import productImage from "@/assets/images/Social Media Package 2/1.png";
import { useGetByIdMutation } from "@/redux/features/product/productApi";
import { RootState } from "@/redux/store";
import { PurchaseModal, PurchaseProduct } from "@/components/ui/PurchaseModal";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
      <SiteEffects />
      <Navbar />
      <main>
        <SocialMediaPackageTwoHero productImageSrc={productImage} handleBuy={handleBuy}
          product={product} />
        <SocialMediaPackageTwoExperienceSection />
        <SocialMediaPackageTwoWhoSection />
        <SocialMediaPackageTwoProposalSection />
        <SocialMediaPackageTwoAuditSection />
        <SocialMediaPackageTwoMonthlyReportSection />
        <SocialMediaPackageTwoFinalOfferSection
          productImageSrc={productImage}
          purchaseUrl="LINK_THANH_TOAN_PACKAGE_02"
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
