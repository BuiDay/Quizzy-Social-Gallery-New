"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import "./ui.css";

type ContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger: React.MutableRefObject<HTMLElement | null>;
  content: React.MutableRefObject<HTMLDivElement | null>;
  id: string;
};
const Context = React.createContext<ContextValue | null>(null);
function usePopover() {
  const context = React.useContext(Context);
  if (!context) throw new Error("Popover components must be inside <Popover>.");
  return context;
}
function assignRef<T>(ref: React.Ref<T> | undefined, node: T | null) {
  if (typeof ref === "function") ref(node);
  else if (ref) (ref as React.MutableRefObject<T | null>).current = node;
}

export function Popover({ children, open: controlledOpen, defaultOpen = false, onOpenChange }: {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const trigger = React.useRef<HTMLElement | null>(null);
  const content = React.useRef<HTMLDivElement | null>(null);
  const id = React.useId();
  const open = controlledOpen ?? internalOpen;
  const setOpen = React.useCallback((next: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }, [controlledOpen, onOpenChange]);
  return <Context.Provider value={{ open, setOpen, trigger, content, id }}>{children}</Context.Provider>;
}

export const PopoverTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }>(
  ({ asChild = false, children, onClick, ...props }, ref) => {
    const context = usePopover();
    const setRef = (node: HTMLButtonElement | null) => {
      context.trigger.current = node;
      assignRef(ref, node);
    };
    const click = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented) context.setOpen(!context.open);
    };
    const shared = { ...props, "aria-haspopup": "dialog" as const, "aria-expanded": context.open, "aria-controls": context.open ? context.id : undefined, "data-state": context.open ? "open" : "closed" };
    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement> & { ref?: React.Ref<HTMLButtonElement> }>;
      const childRef = Number.parseInt(React.version, 10) >= 19 ? child.props.ref : (child as unknown as { ref?: React.Ref<HTMLButtonElement> }).ref;
      return React.cloneElement(child, {
        ...shared,
        ref: (node: HTMLButtonElement | null) => { setRef(node); assignRef(childRef, node); },
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => { child.props.onClick?.(event); if (!event.defaultPrevented) click(event); },
      });
    }
    return <button type="button" {...shared} ref={setRef} onClick={click}>{children}</button>;
  },
);
PopoverTrigger.displayName = "PopoverTrigger";

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  side?: "top" | "bottom";
  sideOffset?: number;
}
export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ align = "center", side = "bottom", sideOffset = 6, className = "", style, children, ...props }, ref) => {
    const { open, setOpen, trigger, content, id } = usePopover();
    const [position, setPosition] = React.useState<{ top: number; left: number; ready: boolean; side: string }>({ top: 0, left: 0, ready: false, side });
    React.useEffect(() => {
      if (!open) return;
      const update = () => {
        if (!trigger.current || !content.current) return;
        const rect = trigger.current.getBoundingClientRect();
        const box = content.current.getBoundingClientRect();
        let actualSide = side;
        if (side === "bottom" && rect.bottom + sideOffset + box.height > window.innerHeight - 8 && rect.top >= box.height + sideOffset + 8) actualSide = "top";
        if (side === "top" && rect.top < box.height + sideOffset + 8 && window.innerHeight - rect.bottom >= box.height + sideOffset + 8) actualSide = "bottom";
        let left = align === "start" ? rect.left : align === "end" ? rect.right - box.width : rect.left + (rect.width - box.width) / 2;
        left = Math.max(8, Math.min(left, window.innerWidth - box.width - 8));
        const top = actualSide === "top" ? rect.top - box.height - sideOffset : rect.bottom + sideOffset;
        setPosition({ top: Math.max(8, Math.min(top, window.innerHeight - box.height - 8)), left, ready: true, side: actualSide });
      };
      update();
      const observer = new ResizeObserver(update);
      if (content.current) observer.observe(content.current);
      if (trigger.current) observer.observe(trigger.current);
      window.addEventListener("resize", update);
      window.addEventListener("scroll", update, true);
      const outside = (event: PointerEvent) => {
        const target = event.target as Node;
        if (!content.current?.contains(target) && !trigger.current?.contains(target)) setOpen(false);
      };
      const keyboard = (event: KeyboardEvent) => {
        if (event.key === "Escape") { event.preventDefault(); setOpen(false); trigger.current?.focus(); }
      };
      const focusOutside = (event: FocusEvent) => {
        const target = event.target as Node;
        if (!content.current?.contains(target) && !trigger.current?.contains(target)) setOpen(false);
      };
      document.addEventListener("pointerdown", outside);
      document.addEventListener("keydown", keyboard);
      document.addEventListener("focusin", focusOutside);
      content.current?.focus({ preventScroll: true });
      return () => {
        observer.disconnect();
        window.removeEventListener("resize", update);
        window.removeEventListener("scroll", update, true);
        document.removeEventListener("pointerdown", outside);
        document.removeEventListener("keydown", keyboard);
        document.removeEventListener("focusin", focusOutside);
      };
    }, [open, align, side, sideOffset, setOpen, trigger, content]);
    if (!open || typeof document === "undefined") return null;
    return createPortal(
      <div {...props} id={id} role={props.role ?? "dialog"} tabIndex={-1} ref={(node) => { content.current = node; assignRef(ref, node); }}
        data-state="open" data-side={position.side} className={`q-ui-popover ${className}`}
        style={{ ...style, position: "fixed", top: position.top, left: position.left, visibility: position.ready ? "visible" : "hidden" }}>
        {children}
      </div>, document.body,
    );
  },
);
PopoverContent.displayName = "PopoverContent";

export const PopoverClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, ...props }, ref) => {
    const { setOpen, trigger } = usePopover();
    return <button type="button" {...props} ref={ref} onClick={(event) => {
      onClick?.(event);
      if (!event.defaultPrevented) { setOpen(false); trigger.current?.focus(); }
    }} />;
  },
);
PopoverClose.displayName = "PopoverClose";
