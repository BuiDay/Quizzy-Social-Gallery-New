export type ModalContent = {
  t: string;
  cat: string;
  g: any;
  meta: string;
  d: string;
  a: string[];
  b: string[];
  l1?: string;
  l2?: string;
  cta?: string;
  ch?: string;
  stats?: [string, string][];
  thumnail?:any;
  slug:string
};

export type GalleryItem = ModalContent & {
  cls: string;
};

export type ProjectItem = {
  t: string;
  c: string;
  y: string;
  g: any;
  cat: string;
  thumnail?:any;
  slug:string
};
