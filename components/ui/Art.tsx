import Image from "next/image";
export function Art({
  variant,
  url,
  alt,
  className = "",
}: {
  url?:any,
  alt:string,
  variant: string;
  className?: string;
}) {
  return (
    <div className={`art ${variant} ${className}`.trim()}>
      <Image src={url} alt={alt} className="gallery-product-visual--thumnail"></Image>
      <div><span className="b1"/><span className="b2"/></div>
    </div>
  );
}
