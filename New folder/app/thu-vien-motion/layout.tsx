import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./motion-library.css";

export const metadata: Metadata = {
  title: "Thư viện Motion Quizzy",
  description:
    "Thư viện motion graphic, chữ động và hiệu ứng dựng video của Quizzy Social Gallery.",
};

export default function MotionLibraryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
