"use client"
import { TiktokDocumentInsideSection } from "@/components/products/detail/TiktokIdeasHacking/TiktokDocumentInsideSection";
import { TiktokFinalOfferSection } from "@/components/products/detail/TiktokIdeasHacking/TiktokFinalOfferSection";
import { TiktokIdeasHero } from "@/components/products/detail/TiktokIdeasHacking/TiktokIdeasHero";
import { TiktokPotentialSection } from "@/components/products/detail/TiktokIdeasHacking/TiktokPotentialSection";
import { TiktokSystemSection } from "@/components/products/detail/TiktokIdeasHacking/TiktokSystemSection";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { SiteEffects } from "@/components/SiteEffects";
import { ModalProvider } from "@/components/ui/ModalContext";
import ModalNeedLogin from "@/components/ui/ModalNeedLogin";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import { Product } from "@/components/ui/PaidProductAction";
import { PurchaseModal, PurchaseProduct } from "@/components/ui/PurchaseModal";
import UserAuth from "@/hook/userAuth";
import { useGetByIdMutation } from "@/redux/features/product/productApi";
import { RootState } from "@/redux/store";
import "@/styles/tiktok-idea-hacking.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function TiktokIdeasHackingPage() {
  const [getById, { isLoading }] = useGetByIdMutation();
  const [selectedPurchaseProduct, setSelectedPurchaseProduct] =
    useState<PurchaseProduct | null>(null);
  const { product } = useSelector((item: RootState) => item.product);
  useEffect(() => {
    const getData = async () => await getById("67fde32f87c5130621888b6b");
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
        <TiktokIdeasHero     handleBuy={handleBuy}
          product={product}/>
        <TiktokPotentialSection />
        <TiktokSystemSection />
        <TiktokDocumentInsideSection />
        <TiktokFinalOfferSection     handleBuy={handleBuy}
          product={product}/>
        <NewsletterCTA />
      </main>
      {needLogin && <ModalNeedLogin open={needLogin} setOpen={setNeedLogin} />}
      <PurchaseModal
        open={Boolean(selectedPurchaseProduct)}
        product={selectedPurchaseProduct}
        onClose={() => setSelectedPurchaseProduct(null)}
      />
      <Footer />
    </ModalProvider>
  );
}
