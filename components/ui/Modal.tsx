"use client";

import { useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import type { ModalContent } from "@/types/content";
import { Art } from "./Art";
import { ArrowRightIcon } from "./Icons";

export function Modal({ content, onClose }: { content: ModalContent | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!content) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [content, onClose]);

  if (!content) return <div className="bd" aria-hidden="true" />;

  return (
    <div className="bd open" role="dialog" aria-modal="true" aria-hidden="false" onMouseDown={(event: ReactMouseEvent<HTMLDivElement>) => event.target === event.currentTarget && onClose()}>
      <div className="modal" id="modal">
        <button className="mclose" onClick={onClose} aria-label="Đóng" ref={closeRef}>✕</button>
        <div className="mhero"><Art variant={content.g} /></div>
        <div className="mbody">
          <div className="tags"><span className="tagp">{content.cat}</span><span className="tagp">{content.meta}</span></div>
          <h3>{content.t}</h3>
          <p className="lead">{content.d}</p>
          {content.stats?.length ? <div className="mstats">{content.stats.map(([n, l]) => <div key={`${n}-${l}`}><b>{n}</b><span>{l}</span></div>)}</div> : null}
          {content.ch ? <div className="mch"><h4>Bối cảnh</h4><p>{content.ch}</p></div> : null}
          <div className="mcols">
            <div><h4>{content.l1 ?? "Bao gồm những gì"}</h4><ul>{content.a.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h4>{content.l2 ?? "Dành cho ai"}</h4><ul>{content.b.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
          <div style={{ marginTop: 26 }}><a href="#" className="btn solid mag" data-cur="OPEN"><span>{content.cta ?? "Xem tài liệu"} <ArrowRightIcon /></span></a></div>
        </div>
      </div>
    </div>
  );
}
