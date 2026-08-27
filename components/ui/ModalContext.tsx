"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { ModalContent } from "@/types/content";
import { Modal } from "./Modal";

type ModalContextValue = {
  openModal: (content: ModalContent) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ModalContent | null>(null);
  const value = useMemo(() => ({ openModal: setContent, closeModal: () => setContent(null) }), []);

  return <ModalContext.Provider value={value}>{children}<Modal content={content} onClose={() => setContent(null)} /></ModalContext.Provider>;
}

export function useModal() {
  const value = useContext(ModalContext);
  if (!value) throw new Error("useModal must be used inside ModalProvider");
  return value;
}
