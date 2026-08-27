import type { HTMLAttributes, ReactNode } from "react";

export function Eyebrow({ children, className = "", ...props }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLSpanElement>) {
  return <span className={`eyebrow ${className}`.trim()} {...props}><span className="d"/>{children}</span>;
}
