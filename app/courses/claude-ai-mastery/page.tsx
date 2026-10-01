import "@/styles/claude-ai-mastery.css";

import { ModalProvider } from "@/components/ui/ModalContext";
import { SiteEffects } from "@/components/SiteEffects";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ClaudeAIMasteryHero } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasteryHero";
import { ClaudeAIMasteryIntroSection } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasteryIntroSection";
import { ClaudeAIMasteryProblemsSection } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasteryProblemsSection";
import { ClaudeAIMasterySolutionSection } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasterySolutionSection";
import { ClaudeAIMasteryApplicationsSection } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasteryApplicationsSection";
import { ClaudeAIMasteryCurriculumSection } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasteryCurriculumSection";
import { ClaudeAIMasteryBenefitsSection } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasteryBenefitsSection";
import { ClaudeAIMasteryPricingSection } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasteryPricingSection";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import { ClaudeAIMasteryFeedbackSection } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasteryFeedbackSection";
import { ClaudeAIMasteryFAQSection } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasteryFAQSection";

import HeroImage from '@/assets/images/claude ai/1.png'
import QuizzyProfile from "@/assets/images/claude ai/1. Ảnh Quizzy png.png"

import researchImage from '@/assets/images/claude ai/Research asssistant.png'
import contentImage from '@/assets/images/claude ai/Content assistant.png'
import designImage from '@/assets/images/claude ai/Design assitant png.png'
import dataImage from '@/assets/images/claude ai/Data assistant.png'
import careerImage from '@/assets/images/claude ai/Job Assistant.png'

import productImage from '@/assets/images/claude ai/intro.png'

import module01Image from '@/assets/images/claude ai/Buổi 1/10.png'
import module02Image from '@/assets/images/claude ai/Buổi 2/12.png'
import module03Image from '@/assets/images/claude ai/Buổi 3/14.png'
import module04Image from '@/assets/images/claude ai/Buổi 4/16.png'
import module05Image from '@/assets/images/claude ai/Buổi 5/18.png'
import module06Image from '@/assets/images/claude ai/Buổi 6/20.png'
import module07Image from '@/assets/images/claude ai/Buổi 7/22.png'
import module08Image from '@/assets/images/claude ai/Buổi 8/24.png'

export default function ClaudeAIMasteryPage() {
    return (
        <ModalProvider>
            <SiteEffects />
            <Navbar />
            <main>
                <ClaudeAIMasteryHero
                    imageSrc={HeroImage}
                    purchaseUrl="#claude-register"
                    curriculumUrl="#claude-curriculum"
                />

                <ClaudeAIMasteryIntroSection profileImage={QuizzyProfile} />
                <ClaudeAIMasteryProblemsSection />
                <ClaudeAIMasterySolutionSection
                    productImage={productImage}
                    curriculumUrl="#claude-curriculum"
                />

                <ClaudeAIMasteryApplicationsSection
                    researchImage={researchImage}
                    contentImage={contentImage}
                    designImage={designImage}
                    dataImage={dataImage}
                    careerImage={careerImage}
                    purchaseUrl="#claude-register"
                />

                <ClaudeAIMasteryCurriculumSection
                    moduleImages={{
                        "01": module01Image,
                        "02": module02Image,
                        "03": module03Image,
                        "04": module04Image,
                        "05": module05Image,
                        "06": module06Image,
                        "07": module07Image,
                        "08": module08Image,
                    }}
                />

                <ClaudeAIMasteryBenefitsSection />
                <ClaudeAIMasteryPricingSection
                    originalPrice="xxx.xxx.xxxđ"
                    currentPrice="xxx.xxx.xxxđ"
                    purchaseUrl="#checkout"
                />
                <ClaudeAIMasteryFeedbackSection />
                <ClaudeAIMasteryFAQSection />
                <NewsletterCTA />
            </main>
            <Footer />
        </ModalProvider>
    );
}
