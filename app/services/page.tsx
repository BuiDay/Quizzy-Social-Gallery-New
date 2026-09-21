import "@/styles/social-media-marketing-service.css";

import { SocialMediaMarketingServiceHero } from "@/components/services/SocialMediaMarketingServiceHero";
import { ModalProvider } from "@/components/ui/ModalContext";
import { SiteEffects } from "@/components/SiteEffects";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SocialMediaMarketingExpertiseSection } from "@/components/services/SocialMediaMarketingExpertiseSection";
import { SocialMediaMarketingServicesSection } from "@/components/services/SocialMediaMarketingServicesSection";
import { SocialMediaMarketingProjectsSection } from "@/components/services/SocialMediaMarketingProjectsSection";
import { SocialMediaMarketingFinalCTASection } from "@/components/services/SocialMediaMarketingFinalCTASection";

export default function SocialMediaMarketingServicePage() {
    return (
        <ModalProvider>
            <SiteEffects />
            <Navbar />
            <main>
                <SocialMediaMarketingServiceHero />
                <SocialMediaMarketingExpertiseSection />

                <SocialMediaMarketingServicesSection
                    contactUrl="#contact"
                />
                <SocialMediaMarketingProjectsSection />
                <SocialMediaMarketingFinalCTASection />
            </main>
            <Footer />
        </ModalProvider>
    );
}