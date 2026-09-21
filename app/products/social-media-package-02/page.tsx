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

export default function SocialMediaPackageOnePage() {
  return (
    <ModalProvider>
      <SiteEffects />
      <Navbar />
      <main>
        <SocialMediaPackageTwoHero />
        <SocialMediaPackageTwoExperienceSection />
        <SocialMediaPackageTwoWhoSection />
        <SocialMediaPackageTwoProposalSection />
        <SocialMediaPackageTwoAuditSection />
        <SocialMediaPackageTwoMonthlyReportSection />
        <SocialMediaPackageTwoFinalOfferSection
          productImageSrc="/images/products/social-media-package-2/mockup.png"
          purchaseUrl="LINK_THANH_TOAN_PACKAGE_02"
        />
        <NewsletterCTA />
      </main>
      <Footer />
    </ModalProvider>
  );
}
