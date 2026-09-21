
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

export default function DesignThinkingPage() {
  return (
    <ModalProvider>
      <SiteEffects />
      <Navbar />
      <main>
        <DesignThinkingHero />
        <DesignThinkingVisualEraSection />
        <DesignThinkingBeforeAfterSection />
        <DesignThinkingMindsetSection />
        <DesignThinkingDocumentInsideSection />
        <DesignThinkingFinalOfferSection />
        <NewsletterCTA />
      </main>
      <Footer />
    </ModalProvider>
  );
}
