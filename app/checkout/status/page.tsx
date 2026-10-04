import {
  Suspense,
} from "react";

import { Navbar } from "@/components/sections/Navbar";

import { Footer } from "@/components/sections/Footer";

import { SiteEffects } from "@/components/SiteEffects";

import "@/styles/checkout-status.css";
import CheckoutPage from "@/components/checkout/CheckoutStatus";


export default function Page() {
  return (
    <>
      <SiteEffects />

      <Navbar />

      <main>
        <Suspense
          fallback={
            <div className="checkout-status-page-loading">
              Đang tải giao dịch...
            </div>
          }
        >
          <CheckoutPage />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}