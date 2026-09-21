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

export default function ClaudeAIMasteryPage() {
    return (
        <ModalProvider>
            <SiteEffects />
            <Navbar />
            <main>
                <ClaudeAIMasteryHero
                    purchaseUrl="#claude-register"
                    curriculumUrl="#claude-curriculum"
                />

                <ClaudeAIMasteryIntroSection />
                <ClaudeAIMasteryProblemsSection />
                <ClaudeAIMasterySolutionSection

                    curriculumUrl="#claude-curriculum"
                />

                <ClaudeAIMasteryApplicationsSection
                    // researchImage={researchImage}
                    // contentImage={contentImage}
                    // designImage={designImage}
                    // dataImage={dataImage}
                    // careerImage={careerImage}
                    purchaseUrl="#claude-register"
                />

                <ClaudeAIMasteryCurriculumSection
                // moduleImages={{
                //     "01": module01Image,
                //     "02": module02Image,
                //     "03": module03Image,
                //     "04": module04Image,
                //     "05": module05Image,
                //     "06": module06Image,
                //     "07": module07Image,
                //     "08": module08Image,
                // }}
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
