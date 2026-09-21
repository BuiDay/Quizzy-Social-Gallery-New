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

export default function SocialMediaPackageOnePage() {
  return (
    <ModalProvider>
      <SiteEffects />
      <Navbar />
      <main>
        <SocialMediaPackageOneHero />
        <SocialMediaPackageOneIntroSection />
        <SocialMediaPackageOneWhoSection />
        <SocialMediaPackageOneFeedbackSection />
        <SocialMediaPackageOneExploreSection />
        <SocialMediaPackageOneFinalOfferSection />
        <NewsletterCTA />
      </main>
      <Footer />
    </ModalProvider>
  );
}
