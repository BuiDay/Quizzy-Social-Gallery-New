
import { ContactPageContent } from "@/components/contact/ContactPageContent";

import "@/styles/contact.css";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export default function ContactPage() {
  return (
    <>
      {/* <SiteChrome /> */}

      <Navbar />

      <main>
        <ContactPageContent />

        <Footer />
      </main>

      {/* <HomeInteractions /> */}
    </>
  );
}