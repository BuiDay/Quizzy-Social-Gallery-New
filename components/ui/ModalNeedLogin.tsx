"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { AuthModal, AuthMode } from "../auth/AuthModal";

type ModalNeedLoginProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

/** Mở luồng đăng nhập của giao diện mới khi khách muốn mua tài liệu. */
export default function ModalNeedLogin({ open, setOpen }: ModalNeedLoginProps) {
  const [mode, setMode] = useState<AuthMode>("login");

  if (!open) return null;

  return (
    <AuthModal
      mode={mode}
      onModeChange={setMode}
      onClose={() => {
        setOpen(false);
        setMode("login");
      }}
    />
  );
}
