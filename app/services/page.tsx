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

import Quizzy from "@/assets/images/service/ảnh quizzy.png"
import coachingImage from "@/assets/images/service/1.png"
import consultationImage from "@/assets/images/service/2.png"
import personalBrandingImage from "@/assets/images/service/3.png"
import Pandora from "@/assets/images/service/Pandora-Logo.png"
import Benri from "@/assets/images/service/benri.png"
import BMLiving from "@/assets/images/service/bmliving.png"
import CK from "@/assets/images/service/4.png"
import Yoko from "@/assets/images/service/5.png"
import Hannah from "@/assets/images/service/6.png"
import Yen from "@/assets/images/service/7.png"
import Vinny from "@/assets/images/service/8.png"
import NgaLee from "@/assets/images/service/9.png"
import Tiff from "@/assets/images/service/11.png"
import PhuongCao from "@/assets/images/service/12.png"
import HauLuonDau from "@/assets/images/service/13.png"

const images = {
    "pandora": Pandora,
    "benri": Benri,
    "bm-living": BMLiving,
    "ck-coffee": CK,
    "yoko": Yoko,
    "hannah-tu": Hannah,
    "tien-si-yen": Yen,
    "vinny-tran": Vinny,
    "sophie-nga-lee": NgaLee,
    "tiffany-nghi-la": Tiff,
    "phuong-cao": PhuongCao,
    "hau-luon-dau": HauLuonDau
};

export default function SocialMediaMarketingServicePage() {
    return (
        <ModalProvider>
            <SiteEffects />
            <Navbar />
            <main>
                <SocialMediaMarketingServiceHero imageSrc={Quizzy} />
                <SocialMediaMarketingExpertiseSection coachingImage={coachingImage} consultationImage={consultationImage} personalBrandingImage={personalBrandingImage} />

                <SocialMediaMarketingServicesSection
                    contactUrl="#contact"
                />
                <SocialMediaMarketingProjectsSection images={images} />
                <SocialMediaMarketingFinalCTASection />
            </main>
            <Footer />
        </ModalProvider>
    );
}