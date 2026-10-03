
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
import productImage from "@/assets/images/Tu duy Thiet Ke/tu duy thiet ke.png"
export default function DesignThinkingPage() {
  return (
    <ModalProvider>
      <SiteEffects />
      <Navbar />
      <main>
        <DesignThinkingHero productImageSrc={productImage}/>
        <DesignThinkingVisualEraSection />
        <DesignThinkingBeforeAfterSection />
        <DesignThinkingMindsetSection />
        <DesignThinkingDocumentInsideSection />
        <DesignThinkingFinalOfferSection productImageSrc={productImage}/>
        <NewsletterCTA />
      </main>
      <Footer />
    </ModalProvider>
  );
}
