"use client";

import { useCallback, useEffect, useState } from "react";

export default function useShowOncePerTab(storageKey: string) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const alreadyShown =
        window.sessionStorage.getItem(storageKey) === "1";

      if (!alreadyShown) {
        setOpen(true);
      }
    } catch {
      // Nếu sessionStorage bị chặn, vẫn cho popup hiện.
      setOpen(true);
    } finally {
      setReady(true);
    }
  }, [storageKey]);

  const close = useCallback(() => {
    try {
      window.sessionStorage.setItem(storageKey, "1");
    } catch {
      // Không cần chặn thao tác đóng nếu storage bị lỗi.
    }

    setOpen(false);
  }, [storageKey]);

  return {
    ready,
    open,
    close,
  };
}
