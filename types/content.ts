export type ModalContent = {
  t: string;
  cat: string;
  g: string;
  meta: string;
  d: string;
  a: string[];
  b: string[];
  l1?: string;
  l2?: string;
  cta?: string;
  ch?: string;
  stats?: [string, string][];
};

export type GalleryItem = ModalContent & {
  cls: string;
};

export type ProjectItem = {
  t: string;
  c: string;
  y: string;
  g: string;
  cat: string;
  role: string;
  d: string;
  ch: string;
  work: string[];
  res: string[];
  stats: [string, string][];
};
