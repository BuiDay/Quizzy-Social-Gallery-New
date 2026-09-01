import { TiktokDocumentInsideSection } from "@/components/products/detail/TiktokIdeasHacking/TiktokDocumentInsideSection";
import { TiktokFinalOfferSection } from "@/components/products/detail/TiktokIdeasHacking/TiktokFinalOfferSection";
import { TiktokIdeasHero } from "@/components/products/detail/TiktokIdeasHacking/TiktokIdeasHero";
import { TiktokPotentialSection } from "@/components/products/detail/TiktokIdeasHacking/TiktokPotentialSection";
import { TiktokSystemSection } from "@/components/products/detail/TiktokIdeasHacking/TiktokSystemSection";

import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { SiteEffects } from "@/components/SiteEffects";
import { ModalProvider } from "@/components/ui/ModalContext";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import "@/styles/tiktok-idea-hacking.css";



export default function TiktokIdeasHackingPage() {
    return (
        <ModalProvider>
            <SiteEffects />
            <Navbar />

            <main>
                <TiktokIdeasHero />
                <TiktokPotentialSection />
                <TiktokSystemSection  />
                <TiktokDocumentInsideSection  />
                <TiktokFinalOfferSection />
                <NewsletterCTA />
            </main>

            <Footer />
        </ModalProvider>
    );
}