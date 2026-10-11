import { SiteEffects } from "@/components/SiteEffects";
import { ModalProvider } from "@/components/ui/ModalContext";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { Gallery } from "@/components/sections/Gallery";
import { Courses } from "@/components/sections/Courses";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Outcome } from "@/components/sections/Outcome";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { Newsletter } from "@/components/sections/Newsletter";
import { FloatingCoursePromo } from "@/components/ui/FloatingCoursePromo";

export default function Home(){
  return <ModalProvider>
    <SiteEffects />
    <Navbar />
    <main>
      <Hero />
      <About />
      <Stats />
      <Gallery />
      <Courses />
      <Services />
      <Projects />
      <Outcome />
      <Testimonials />
      <FinalCTA />
      <Newsletter />
      <FloatingCoursePromo
            title="Claude AI Mastery "
            title1="Tự động hóa công việc với Claude AI"
            price="1.090.000đ"
            oldPrice="1.590.000đ"
            href="/courses/claude-ai-mastery"
      />
    </main>
    <Footer />
  </ModalProvider>;
}
