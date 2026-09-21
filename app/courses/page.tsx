import "@/styles/courses.css";

import { SocialMediaCoursesHero } from "@/components/courses/SocialMediaCoursesHero";
import { ModalProvider } from "@/components/ui/ModalContext";
import { SiteEffects } from "@/components/SiteEffects";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import { SocialMediaCoursesSkillsSection } from "@/components/courses/SocialMediaCoursesSkillsSection";
import { SocialMediaCoursesOpenSection } from "@/components/courses/SocialMediaCoursesOpenSection";
import { SocialMediaCoursesComingSoonSection } from "@/components/courses/SocialMediaCoursesComingSoonSection";

export default function CoursesPage() {
  return (
    <ModalProvider>
      <SiteEffects />
      <Navbar />
      <main>
        <SocialMediaCoursesHero />
        <SocialMediaCoursesSkillsSection />
        <SocialMediaCoursesOpenSection courseUrl="/courses/claude-ai-mastery"/>
        <SocialMediaCoursesComingSoonSection />
        <NewsletterCTA />
      </main>
      <Footer />
    </ModalProvider>
  );
}
