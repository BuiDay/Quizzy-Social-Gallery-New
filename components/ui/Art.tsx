export function Art({ variant, className = "" }: { variant: string; className?: string }) {
  return <div className={`art ${variant} ${className}`.trim()}><span className="b1"/><span className="b2"/></div>;
}
