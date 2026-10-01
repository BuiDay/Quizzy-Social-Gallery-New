import { Suspense } from "react";

import { SiteEffects } from "@/components/SiteEffects";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

import { CheckoutStatus } from "@/components/checkout/CheckoutStatus";

import "@/styles/checkout-status.css";


export default function CheckoutStatusPage() {
  return (
    <>
      <SiteEffects />

      <Navbar />

      <main>
        <Suspense
          fallback={
            <div className="checkout-status-loading">
              Đang kiểm tra giao dịch...
            </div>
          }
        >
          <CheckoutStatus />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}