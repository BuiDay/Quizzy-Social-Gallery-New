import { SocialMediaPackageTwoExperienceSection } from "@/components/products/detail/SocialMediaPackageTwo/SocialMediaPackageTwoExperienceSection";
import { SocialMediaPackageTwoHero } from "@/components/products/detail/SocialMediaPackageTwo/SocialMediaPackageTwoHero";
import { SocialMediaPackageTwoWhoSection } from "@/components/products/detail/SocialMediaPackageTwo/SocialMediaPackageTwoWhoSection";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { SiteEffects } from "@/components/SiteEffects";
import { ModalProvider } from "@/components/ui/ModalContext";
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
      </main>
      <Footer />
    </ModalProvider>
  );
}
