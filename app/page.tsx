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
    </main>
    {/* <Footer /> */}
  </ModalProvider>;
}
