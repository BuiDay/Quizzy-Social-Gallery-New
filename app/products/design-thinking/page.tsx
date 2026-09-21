
import { DesignThinkingHero } from "@/components/products/detail/DesignThinking/DesignThinkingHero";
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
        <NewsletterCTA />
      </main>
      <Footer />
    </ModalProvider>
  );
}
