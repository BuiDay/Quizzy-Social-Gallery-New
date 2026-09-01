import { TiktokIdeasHero } from "@/components/products/detail/TiktokIdeasHacking/TiktokIdeasHero";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { SiteEffects } from "@/components/SiteEffects";
import { ModalProvider } from "@/components/ui/ModalContext";
import "@/styles/tiktok-idea-hacking.css";



export default function TiktokIdeasHackingPage() {
    return (
        <ModalProvider>
            <SiteEffects />
            <Navbar />

            <main>
                <TiktokIdeasHero />
            </main>

            <Footer />
        </ModalProvider>
    );
}