"use client";

import { useEffect, useState, type SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetThinkingDesignMutation } from "@/redux/features/product/productApi";
import { page12, page38, page79, page80, page81, page87, page88 } from "@/lib/attachlink";

import "./design-reader.css";

// SVG trực tiếp, không cần thư viện icon.
type IconProps = SVGProps<SVGSVGElement> & { size?: number };
type IconName = "arrowLeft" | "arrowUpRight" | "bookOpen" | "check" | "chevronLeft" | "chevronRight" | "list" | "loader" | "paperclip" | "star";

const iconPaths: Record<IconName, string[]> = {
  arrowLeft: ["M19 12H5", "m12 19-7-7 7-7"],
  arrowUpRight: ["M7 17 17 7", "M7 7h10v10"],
  bookOpen: ["M12 7v14", "M3 3h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5v17h-5a4 4 0 0 0-4 1 4 4 0 0 0-4-1H3Z"],
  check: ["m20 6-11 11-5-5"],
  chevronLeft: ["m15 18-6-6 6-6"],
  chevronRight: ["m9 18 6-6-6-6"],
  list: ["M9 6h12", "M9 12h12", "M9 18h12", "M3 6h.01", "M3 12h.01", "M3 18h.01"],
  loader: ["M12 3a9 9 0 1 1-9 9"],
  paperclip: ["m21 11-8.5 8.5a6 6 0 0 1-8.5-8.5l9-9a4 4 0 0 1 5.7 5.7l-9 9a2 2 0 0 1-2.8-2.8l8.5-8.5"],
  star: ["m12 3 2.8 5.7 6.3.9-4.55 4.43 1.07 6.27L12 17.34l-5.62 2.96 1.07-6.27L2.9 9.6l6.3-.9Z"],
};

function Icon({ name, size = 24, ...props }: IconProps & { name: IconName }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
      {iconPaths[name].map((path, index) => <path key={index} d={path} />)}
    </svg>
  );
}

const UseCheckBoughtProduct = dynamic(() => import("@/hook/useCheckBoughtProduct"), { ssr: false });
const PRODUCT_ID = "662cb32eaae33d8a651a3d25";
const TOTAL_PAGES = 89;
const indexPage = [12, 38, 79, 80, 81, 87, 88];
const chapters = [
  { page: 1, title: "Những điều bạn cần biết khi bạn là Newbie Canvanians" },
  { page: 7, title: "Các bước cơ bản trong thiết kế" },
  { page: 20, title: "Một số thông tin cần thiết khi thiết kế ấn phẩm" },
  { page: 64, title: "Tham khảo các ấn phẩm Social Posts" },
  { page: 78, title: "Các kênh tham khảo khi học Design" },
  { page: 82, title: "Hướng dẫn các tác vụ Canva" },
  { page: 89, title: "Đánh giá sản phẩm" },
];

type Attachment = { title?: string; link?: string };

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [image, setImage] = useState<string>();
  const [getThinkingDesign, { isLoading, isSuccess, isError }] = useGetThinkingDesignMutation();
  const [contentsOpen, setContentsOpen] = useState(false);
  const activeChapter = chapters.reduce((active, chapter, index) => currentPage >= chapter.page ? index : active, 0);

  const OnNext = () => setCurrentPage((page) => Math.min(TOTAL_PAGES, page + 1));
  const onPrevious = () => setCurrentPage((page) => Math.max(1, page - 1));
  const selectPage = (page: number) => {
    setCurrentPage(page);
    setContentsOpen(false);
  };
  const myLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => `${src}?w=${width}&q=${quality || 75}`;

  useEffect(() => {
    let active = true;
    setImage(undefined);
    getThinkingDesign(currentPage).then((res) => {
      if (active && "data" in res && typeof res.data === "string") setImage(res.data);
    });
    return () => { active = false; };
  }, [currentPage, getThinkingDesign]);

  const handleAttachLink = (page: number) => {
    let data: Attachment[] = [];
    switch (page) {
      case 12: data = page12; break;
      case 38: data = page38; break;
      case 79: data = page79; break;
      case 80: data = page80; break;
      case 81: data = page81; break;
      case 87: data = page87; break;
      case 88: data = page88; break;
      default: break;
    }
    return data.map((item, index) => item.link ? (
      <Link className="qr-attachment" key={index} href={item.link} target="_blank" rel="noopener noreferrer">
        <span>{item.title || `Tài nguyên ${index + 1}`}</span><Icon name="arrowUpRight" size={17} />
      </Link>
    ) : null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && (target.closest("input, textarea, select, [contenteditable='true'], [role='dialog']") || target.isContentEditable)) return;
      if (isLoading) return;
      if (event.key === "ArrowLeft" && currentPage > 1) { event.preventDefault(); onPrevious(); }
      if (event.key === "ArrowRight" && currentPage <= 88) { event.preventDefault(); OnNext(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, isLoading]);

  const contents = (
    <nav className="qr-chapters" aria-label="Mục lục tài liệu">
      {chapters.map((chapter, index) => (
        <button key={chapter.page} type="button" className={`qr-chapter ${activeChapter === index ? "is-active" : ""}`} aria-current={activeChapter === index ? "location" : undefined} onClick={() => selectPage(chapter.page)}>
          <span className="qr-chapter-number">{index === 6 ? <Icon name="star" size={16} /> : String(index + 1).padStart(2, "0")}</span>
          <span className="qr-chapter-copy"><strong>{chapter.title}</strong><small>Trang {chapter.page}{index < 6 ? ` — ${chapters[index + 1].page - 1}` : ""}</small></span>
          {activeChapter === index && <Icon name="arrowUpRight" size={16} className="qr-chapter-arrow" />}
        </button>
      ))}
    </nav>
  );

  return (
    <UseCheckBoughtProduct productId={PRODUCT_ID}>
      <div className="quizzy-reader">
        <header className="qr-header">
          <Link href="/collections/documents" className="qr-back"><Icon name="arrowLeft" size={18} /><span>Bộ sưu tập</span></Link>
          <Link href="/" className="qr-brand">QUIZZY <span>SOCIAL GALLERY</span><i>✦</i></Link>
          <span className="qr-owned"><Icon name="check" size={14} />Đã sở hữu</span>
        </header>

        <div className="qr-layout">
          <aside className="qr-sidebar">
            <div className="qr-label"><i />YOUR DESIGN PLAYBOOK</div>
            <h1>Tư duy<br /><span>thiết kế.</span></h1>
            <p className="qr-description">Từ những bước đầu đến thiết kế ấn phẩm và ứng dụng Canva.</p>
            <div className="qr-sidebar-divider" />
            <div className="qr-contents-title"><Icon name="list" size={16} /><span>Mục lục</span><small>07 phần</small></div>
            {contents}
            <div className="qr-sidebar-note"><Icon name="bookOpen" size={19} /><p>Đọc theo thứ tự hoặc chọn phần bạn muốn khám phá.</p></div>
          </aside>

          <main className="qr-main">
            <div className="qr-document-heading">
              <div><span className="qr-label">{currentPage === 89 ? "YOUR FEEDBACK" : `CHƯƠNG ${String(activeChapter + 1).padStart(2, "0")}`}</span><h2>{chapters[activeChapter].title}</h2></div>
              <div className="qr-tools">
                <Popover open={contentsOpen} onOpenChange={setContentsOpen}>
                  <PopoverTrigger asChild><Button variant="outline" className="qr-tool qr-mobile-contents"><Icon name="list" size={16} /><span>Mục lục</span></Button></PopoverTrigger>
                  <PopoverContent className="qr-popover" align="end"><div className="qr-popover-title">Mục lục tài liệu</div>{contents}</PopoverContent>
                </Popover>
                {indexPage.includes(currentPage) && isSuccess && <Popover>
                  <PopoverTrigger asChild><Button variant="outline" className="qr-tool"><Icon name="paperclip" size={16} /><span>Link đính kèm</span></Button></PopoverTrigger>
                  <PopoverContent className="qr-popover" align="end"><div className="qr-popover-title"><Icon name="paperclip" size={16} />Tài nguyên · Trang {currentPage}</div>{handleAttachLink(currentPage)}</PopoverContent>
                </Popover>}
              </div>
            </div>

            <div className={`qr-viewer ${currentPage === 89 ? "qr-viewer--reviews" : ""}`} aria-busy={currentPage < 89 && isLoading}>
              {currentPage > 0 && currentPage < 89 && image && <Image className="qr-page-image" src={image} alt={`Tư duy thiết kế — Trang ${currentPage}`} width={1920} height={1200} loader={myLoader} />}
              {currentPage < 88 && isLoading && <div className="qr-viewer-status" role="status"><Icon name="loader" size={26} className="qr-spinner" /><span>Đang tải trang {currentPage}...</span></div>}
              {currentPage < 88 && !isLoading && (isError || !image) && <div className="qr-viewer-status" role="alert"><Icon name="bookOpen" size={28} /><p>{isError ? "Không tải được trang tài liệu." : "Trang tài liệu chưa có nội dung."}</p><Button variant="outline" className="qr-tool" onClick={() => { void getThinkingDesign(currentPage).then((res) => { if ("data" in res && typeof res.data === "string") setImage(res.data); }); }}>Thử lại</Button></div>}
      
            </div>

            <footer className="qr-pagination">
              <Button variant="outline" className="qr-page-button" aria-label="Trang trước" disabled={currentPage === 1 || isLoading} onClick={onPrevious}><Icon name="chevronLeft" size={20} /><span>Trang trước</span></Button>
              <div className="qr-page-position"><span>TRANG <strong>{String(currentPage).padStart(2, "0")}</strong><small>/ {TOTAL_PAGES}</small></span><div className="qr-progress" role="progressbar" aria-label="Vị trí đọc" aria-valuemin={1} aria-valuemax={TOTAL_PAGES} aria-valuenow={currentPage}><i style={{ width: `${currentPage / TOTAL_PAGES * 100}%` }} /></div></div>
              <Button variant="outline" className="qr-page-button qr-page-button--next" aria-label="Trang tiếp theo" disabled={currentPage === TOTAL_PAGES || isLoading} onClick={OnNext}><span>Trang tiếp</span><Icon name="chevronRight" size={20} /></Button>
            </footer>
            <p className="qr-keyboard-hint">Dùng phím <kbd>←</kbd><kbd>→</kbd> để chuyển trang <span>✦</span> Học từng chút, làm tốt hơn mỗi ngày.</p>
          </main>
        </div>
      </div>
    </UseCheckBoughtProduct>
  );
};
export default Page;
