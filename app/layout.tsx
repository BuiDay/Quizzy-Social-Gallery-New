import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { FloatingCoursePromo } from "@/components/ui/FloatingCoursePromo";
import RootLayouts from "./RootLayouts";
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: "QUIZZY SOCIAL GALLERY — Social Media Manager & Educator",
  description: "Quizzy Social Gallery — tài liệu, khóa học và dịch vụ Social Media Marketing.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..600;1,400..600&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <RootLayouts>
        <Toaster position="bottom-center" reverseOrder={false} />
          {children}
          {/* <FloatingCoursePromo
            title="Claude AI Mastery "
            title1="Tự động hóa công việc với Claude AI"
            price="X.XXX.000đ"
            oldPrice="X.XXX.000đ"
            href="/courses/claude-ai-mastery"
          /> */}
        </RootLayouts>
      </body>
    </html>
  );
}
//Xia Yuhe