
"use client";

import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import { useEffect, useRef } from "react";


export function SocialMediaBundleNewsletter() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const section = wrapper.querySelector<HTMLElement>(
      ".products-newsletter"
    );

    if (!section) return;

    // Chỉ tìm các phần tử reveal bên trong Newsletter của trang này.
    const revealElements = Array.from(
      section.querySelectorAll<HTMLElement>("[data-rv]")
    );

    const revealNewsletter = () => {
      revealElements.forEach((element) => {
        // Giữ lại delay đang khai báo bằng data-dl.
        const delay = Number(element.dataset.dl ?? 0);

        if (Number.isFinite(delay) && delay > 0) {
          element.style.transitionDelay = `${delay}ms`;
        }

        // Kích hoạt animation reveal có sẵn trong global CSS.
        element.classList.add("in");
      });
    };

    if (!("IntersectionObserver" in window)) {
      revealNewsletter();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        revealNewsletter();
        observer.disconnect();
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="smbundle-newsletter">
      <NewsletterCTA />
    </div>
  );
}