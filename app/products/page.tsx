import { ProductsHero } from "@/components/products/ProductsHero";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { SiteEffects } from "@/components/SiteEffects";
import { ModalProvider } from "@/components/ui/ModalContext";
import "../../styles/products.css";
import { PaidProductsSection } from "@/components/products/PaidProductsSection";
import { FreeProductsSection } from "@/components/products/FreeProductsSection";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";

export default function ProductsPage() {
  return <ModalProvider>
    <SiteEffects />
    <Navbar />
    <main>
      <ProductsHero />
      <PaidProductsSection />
      <FreeProductsSection />
      <NewsletterCTA />
    </main>
    <Footer />
  </ModalProvider>

}