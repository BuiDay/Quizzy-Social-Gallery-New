"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    MotionQuizzyMount?: () => void | (() => void);
    MG?: unknown;
  }
}

function loadScript(id: string, src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(id) as HTMLScriptElement | null;

    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }

      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(src)), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = false;

    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true },
    );

    script.addEventListener(
      "error",
      () => reject(new Error(`Không tải được ${src}`)),
      { once: true },
    );

    document.body.appendChild(script);
  });
}

export default function MotionLibraryRuntime() {
  useEffect(() => {
    let disposed = false;
    let unmountRuntime: void | (() => void);

    const boot = async () => {
      await loadScript(
        "motion-quizzy-engine",
        "/motion-library/engine.js",
      );

      await loadScript(
        "motion-quizzy-app",
        "/motion-library/app.js",
      );

      if (disposed) return;

      unmountRuntime = window.MotionQuizzyMount?.();
    };

    boot().catch((error) => {
      console.error("[Motion Quizzy]", error);
    });

    return () => {
      disposed = true;

      if (typeof unmountRuntime === "function") {
        unmountRuntime();
      }
    };
  }, []);

  return null;
}
