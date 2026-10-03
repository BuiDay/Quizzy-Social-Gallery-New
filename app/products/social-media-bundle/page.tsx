import { SocialMediaBundleClientProofSection } from "@/components/products/detail/SocialMediaBundle/SocialMediaBundleClientProofSection";
import { SocialMediaBundleDocumentSection } from "@/components/products/detail/SocialMediaBundle/SocialMediaBundleDocumentSection";
import { SocialMediaBundleFinalOfferSection } from "@/components/products/detail/SocialMediaBundle/SocialMediaBundleFinalOfferSection";
import { SocialMediaBundleHero } from "@/components/products/detail/SocialMediaBundle/SocialMediaBundleHero";
import { SocialMediaBundleNewsletter } from "@/components/products/detail/SocialMediaBundle/SocialMediaBundleNewsletter";
import { SocialMediaBundleTemplateValueSection } from "@/components/products/detail/SocialMediaBundle/SocialMediaBundleTemplateValueSection";
import { SocialMediaBundleWorkflowSection } from "@/components/products/detail/SocialMediaBundle/SocialMediaBundleWorkflowSection";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { SiteEffects } from "@/components/SiteEffects";
import { ModalProvider } from "@/components/ui/ModalContext";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import "@/styles/social-media-bundle.css";
import Thumnail from "@/assets/images/Social Media Bundle/1.png"

export default function SocialMediaBundlePage() {
  return (
    <ModalProvider>
      <Navbar />
      <SiteEffects />
      <main>
        <SocialMediaBundleHero />
        <SocialMediaBundleWorkflowSection />
        <SocialMediaBundleClientProofSection />
        <SocialMediaBundleDocumentSection/>
        <SocialMediaBundleTemplateValueSection/>
        <SocialMediaBundleFinalOfferSection productImageSrc={Thumnail}/>
        <SocialMediaBundleNewsletter />
      </main>

      <Footer />


    </ModalProvider>
  );
}