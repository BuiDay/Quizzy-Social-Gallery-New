"use client";

import { useEffect, useState, type SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetSocialMediaMutation } from "@/redux/features/product/productApi";
import "./proposal-reader.css";

// SVG trực tiếp, không cần thư viện icon.
type IconProps = SVGProps<SVGSVGElement> & { size?: number };
type IconName = "arrowLeft" | "arrowUpRight" | "bookOpen" | "check" | "chevronLeft" | "chevronRight" | "list" | "loader";

const iconPaths: Record<IconName, string[]> = {
  arrowLeft: ["M19 12H5", "m12 19-7-7 7-7"],
  arrowUpRight: ["M7 17 17 7", "M7 7h10v10"],
  bookOpen: ["M12 7v14", "M3 3h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5v17h-5a4 4 0 0 0-4 1 4 4 0 0 0-4-1H3Z"],
  check: ["m20 6-11 11-5-5"],
  chevronLeft: ["m15 18-6-6 6-6"],
  chevronRight: ["m9 18 6-6-6-6"],
  list: ["M9 6h12", "M9 12h12", "M9 18h12", "M3 6h.01", "M3 12h.01", "M3 18h.01"],
  loader: ["M12 3a9 9 0 1 1-9 9"],
};

function Icon({ name, size = 24, ...props }: IconProps & { name: IconName }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
      {iconPaths[name].map((path, index) => <path key={index} d={path} />)}
    </svg>
  );
}

const UseCheckBoughtProduct = dynamic(() => import("@/hook/useCheckBoughtProduct"), { ssr: false });
const PRODUCT_ID = "668d076acbc728450ab5d527";
const FIRST_PAGE = 1;
const LAST_PAGE = 9;
const TOTAL_PAGES = LAST_PAGE - FIRST_PAGE + 1;
// Truy cập nhanh theo vị trí đọc; không gán mốc chương khi file gốc chưa có.
const chapters = [
  { page: 1, title: "Bắt đầu tài liệu", detail: "Trang 1" },
  { page: 5, title: "Giữa tài liệu", detail: "Trang 5" },
  { page: 9, title: "Trang cuối", detail: "Trang 9" },
];

const Page = () => {
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [image, setImage] = useState<string>();
  const [getSocialMedia, { isLoading, isError }] = useGetSocialMediaMutation();
  const [contentsOpen, setContentsOpen] = useState(false);
  const requestPage = (page: number) => getSocialMedia({ currentPage: page, forderName: "social-media-proposal", productId: PRODUCT_ID });
  const activeChapter = chapters.reduce((active, chapter, index) => currentPage >= chapter.page ? index : active, 0);

  const OnNext = () => setCurrentPage((page) => Math.min(LAST_PAGE, page + 1));
  const onPrevious = () => setCurrentPage((page) => Math.max(FIRST_PAGE, page - 1));
  const selectPage = (page: number) => {
    setCurrentPage(page);
    setContentsOpen(false);
  };
  const myLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => `${src}${src.includes("?") ? "&" : "?"}w=${width}&q=${quality || 75}`;

  useEffect(() => {
    let active = true;
    setImage(undefined);
    getSocialMedia({ currentPage, forderName: "social-media-proposal", productId: PRODUCT_ID }).then((res) => {
      if (active && "data" in res && typeof res.data === "string") setImage(res.data);
    });
    return () => { active = false; };
  }, [currentPage, getSocialMedia]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && (target.closest("input, textarea, select, [contenteditable='true'], [role='dialog']") || target.isContentEditable)) return;
      if (isLoading) return;
      if (event.key === "ArrowLeft" && currentPage > FIRST_PAGE) { event.preventDefault(); onPrevious(); }
      if (event.key === "ArrowRight" && currentPage < LAST_PAGE) { event.preventDefault(); OnNext(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, isLoading]);

  const contents = (
    <nav className="qr-chapters" aria-label="Truy cập nhanh tài liệu">
      {chapters.map((chapter, index) => (
        <button key={chapter.page} type="button" className={`qr-chapter ${activeChapter === index ? "is-active" : ""}`} aria-current={activeChapter === index ? "location" : undefined} onClick={() => selectPage(chapter.page)}>
          <span className="qr-chapter-number">{String(index + 1).padStart(2, "0")}</span>
          <span className="qr-chapter-copy"><strong>{chapter.title}</strong><small>{chapter.detail}</small></span>
          {activeChapter === index && <Icon name="arrowUpRight" size={16} className="qr-chapter-arrow" />}
        </button>
      ))}
    </nav>
  );

  return (
    <UseCheckBoughtProduct productId={PRODUCT_ID}>
      <div className="quizzy-reader">
        {/* <header className="qr-header">
          <Link href="/collections" className="qr-back"><Icon name="arrowLeft" size={18} /><span>Bộ sưu tập</span></Link>
          <Link href="/" className="qr-brand">QUIZZY <span>SOCIAL GALLERY</span><i>✦</i></Link>
          <span className="qr-owned"><Icon name="check" size={14} />Đã sở hữu</span>
        </header> */}

        <div className="qr-layout">
          <aside className="qr-sidebar">
            <div className="qr-label"><i />YOUR SOCIAL PLAYBOOK</div>
            <h1>Social Media<br /><span>Proposal.</span></h1>
            <p className="qr-description">Tài liệu Social Media Proposal trong bộ sưu tập của bạn. Đọc và khám phá theo từng trang.</p>
            <div className="qr-sidebar-divider" />
            <div className="qr-contents-title"><Icon name="list" size={16} /><span>Truy cập nhanh</span><small>03 mốc</small></div>
            {contents}
            <div className="qr-sidebar-note"><Icon name="bookOpen" size={19} /><p>Đọc theo thứ tự hoặc chọn vị trí bạn muốn tiếp tục khám phá.</p></div>
          </aside>

          <main className="qr-main">
            <div className="qr-document-heading">
              <div><span className="qr-label">SOCIAL MEDIA PROPOSAL · {TOTAL_PAGES} TRANG</span><h2>{currentPage === FIRST_PAGE ? "Mở đầu tài liệu" : `Social Media Proposal · Trang ${currentPage}`}</h2></div>
              <div className="qr-tools">
                <Popover open={contentsOpen} onOpenChange={setContentsOpen}>
                  <PopoverTrigger asChild><Button variant="outline" className="qr-tool qr-mobile-contents"><Icon name="list" size={16} /><span>Truy cập nhanh</span></Button></PopoverTrigger>
                  <PopoverContent className="qr-popover" align="end"><div className="qr-popover-title">Truy cập nhanh</div>{contents}</PopoverContent>
                </Popover>

              </div>
            </div>

            <div className="qr-viewer" aria-busy={isLoading}>
              {image && !isLoading && <Image className="qr-page-image" src={image} alt={`Social Media Proposal — Trang ${currentPage}`} width={1920} height={1200} loader={myLoader} />}
              {isLoading && <div className="qr-viewer-status" role="status"><Icon name="loader" size={26} className="qr-spinner" /><span>Đang tải trang {currentPage}...</span></div>}
              {!isLoading && (isError || !image) && <div className="qr-viewer-status" role="alert"><Icon name="bookOpen" size={28} /><p>{isError ? "Không tải được trang tài liệu." : "Trang tài liệu chưa có nội dung."}</p><Button variant="outline" className="qr-tool" onClick={() => { void requestPage(currentPage).then((res) => { if ("data" in res && typeof res.data === "string") setImage(res.data); }); }}>Thử lại</Button></div>}
            </div>

            <footer className="qr-pagination">
              <Button variant="outline" className="qr-page-button" aria-label="Trang trước" disabled={currentPage === FIRST_PAGE || isLoading} onClick={onPrevious}><Icon name="chevronLeft" size={20} /><span>Trang trước</span></Button>
              <div className="qr-page-position"><span>TRANG <strong>{String(currentPage).padStart(2, "0")}</strong><small>/ {LAST_PAGE}</small></span><div className="qr-progress" role="progressbar" aria-label="Vị trí đọc" aria-valuemin={FIRST_PAGE} aria-valuemax={LAST_PAGE} aria-valuenow={currentPage}><i style={{ width: `${(currentPage - FIRST_PAGE) / (LAST_PAGE - FIRST_PAGE) * 100}%` }} /></div></div>
              <Button variant="outline" className="qr-page-button qr-page-button--next" aria-label="Trang tiếp theo" disabled={currentPage === LAST_PAGE || isLoading} onClick={OnNext}><span>Trang tiếp</span><Icon name="chevronRight" size={20} /></Button>
            </footer>
            <p className="qr-keyboard-hint">Dùng phím <kbd>←</kbd><kbd>→</kbd> để chuyển trang <span>✦</span> Học từng chút, làm tốt hơn mỗi ngày.</p>
          </main>
        </div>
      </div>
    </UseCheckBoughtProduct>
  );
};
export default Page;
