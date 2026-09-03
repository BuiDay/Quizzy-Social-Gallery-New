import "@/styles/social-media-beginner.css";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ModalProvider } from "@/components/ui/ModalContext";
import { SiteEffects } from "@/components/SiteEffects";
import { SocialMediaBeginnerHero } from "@/components/products/detail/SocialMediaBeginner/SocialMediaBeginnerHero";
import { SocialMediaJourneySection } from "@/components/products/detail/SocialMediaBeginner/SocialMediaJourneySection";
import { SocialMediaDirectionsSection } from "@/components/products/detail/SocialMediaBeginner/SocialMediaDirectionsSection";
import { SocialMediaBeginnerReasonSection } from "@/components/products/detail/SocialMediaBeginner/SocialMediaBeginnerReasonSection";
import { SocialMediaSalarySection } from "@/components/products/detail/SocialMediaBeginner/SocialMediaSalarySection";
import { SocialMediaDocumentInsideSection } from "@/components/products/detail/SocialMediaBeginner/SocialMediaDocumentInsideSection";
import { SocialMediaBeginnerFinalOfferSection } from "@/components/products/detail/SocialMediaBeginner/SocialMediaBeginnerFinalOfferSection";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";

export default function SocialMediaBeginnerEbookPage() {
  return (
    <ModalProvider>
      <SiteEffects />

      <Navbar />

      <main>
        <SocialMediaBeginnerHero />
        <SocialMediaJourneySection  />
        <SocialMediaDirectionsSection />
        <SocialMediaBeginnerReasonSection />
        <SocialMediaSalarySection  />
        <SocialMediaDocumentInsideSection />
        <SocialMediaBeginnerFinalOfferSection />
        <NewsletterCTA />
      </main>

      <Footer />
    </ModalProvider>
  );
}
