import type { GalleryItem, ModalContent, ProjectItem } from "@/types/content";
import Thumnail1 from "@/assets/images/TikTok Ideas Hacking/1.png"
import Thumnail2 from "@/assets/images/Social Media Package 1/1.png"

import Pandora from "@/assets/images/service/Pandora-Logo.png"
import Benri from "@/assets/images/service/benri.png"
import BMLiving from "@/assets/images/service/bmliving.png"
import Hannah from "@/assets/images/service/6.png"
import Yen from "@/assets/images/service/7.png"
import Vinny from "@/assets/images/service/8.png"

export const galleryItems: GalleryItem[] = [
  {
    slug:"tiktok-ideas-hacking",
    thumnail:Thumnail1,
    t: "TIKTOK IDEAS HACKING",
    cat: "TRẢ PHÍ",
    g: "g1",
    cls: "s8 tall",
    meta: "Ý tưởng TikTok thực chiến, bắt trend và dễ triển khai.",
    d: "Khung chiến lược Social Media hoàn chỉnh: phân tích thị trường, chân dung khách hàng, định vị kênh, hệ thống tuyến nội dung và chỉ số đo lường. Đây là tài liệu mình dùng để mở đầu mọi dự án với khách hàng.",
    a: ["Framework chiến lược 6 bước", "Template phân tích đối thủ", "Bảng định vị kênh & tuyến nội dung", "Bộ chỉ số đo lường theo tháng"],
    b: ["Social Media Executive mới lên plan", "Freelancer nhận dự án đầu tiên", "Chủ doanh nghiệp tự làm kênh"],
  },
  {
    slug:"social-media-package-01",
    thumnail:Thumnail2,
    t: "SOCIAL MEDIA PACKAGE 1",
    cat: "TRẢ PHÍ",
    g: "g3",
    cls: "s4 tall",
    meta: "Gồm Social Media Portfolio, Strategy và Plan.",
    d: "Hệ thống lịch nội dung vận hành được cho cả team: phân loại tuyến bài, trạng thái sản xuất, người phụ trách và ngày đăng — không còn cảnh sáng ra mới nghĩ hôm nay đăng gì.",
    a: ["Lịch nội dung theo tháng & quý", "Bảng trạng thái sản xuất", "Thư viện ý tưởng theo tuyến", "Hướng dẫn vận hành 15 phút"],
    b: ["Team content 2–5 người", "Người quản lý nhiều kênh cùng lúc"],
  },
  { 
    slug:"tiktok-ideas-hacking",
    thumnail:Thumnail1,
    t: "25 CONTENT IDEAS",
    cat: "MIỄN PHÍ",
    g: "g2",
    cls: "s4",
    meta: "Tổng hợp 25 Content Ideas giúp bạn không bao giờ bí ý tưởng.",
    d: "Bộ checklist audit kênh mình dùng khi tiếp nhận một tài khoản mới: hồ sơ, nhận diện, cấu trúc nội dung, hiệu suất từng định dạng — kèm cách đọc số để biết nên sửa gì trước.",
    a: ["Checklist audit 60 điểm", "Bảng chấm điểm kênh", "Mẫu báo cáo audit gửi khách"],
    b: ["Freelancer cần quy trình nhận kênh", "Marketer muốn đánh giá lại kênh cũ"],
  },
  {
    slug:"tiktok-ideas-hacking",
    thumnail:Thumnail1,
    t: "AI for Social Media",
    cat: "AI",
    g: "g5",
    cls: "s8",
    meta: "90+ prompt thực chiến",
    d: "Cách dùng AI như một trợ lý thật trong quy trình social: nghiên cứu insight, phác ý tưởng, viết nháp và kiểm tra chất lượng — kèm nguyên tắc giữ giọng thương hiệu để nội dung không bị nhạt.",
    a: ["90+ prompt theo từng đầu việc", "Quy trình AI + người 5 bước", "Bộ tiêu chí kiểm tra chất lượng"],
    b: ["Marketer muốn tăng tốc sản xuất", "Team nhỏ, khối lượng bài lớn"],
  },
];


export const projects: ProjectItem[] = [
  {
    t: "PANDORA Vietnam",
    c: "Jewelry · Vietnam",
    y: "2025–2026",
    g: "g1",
    cat: "Social management",
    slug:"https://www.tiktok.com/@theofficialpandora_vn",
    thumnail:Pandora,
  },
  {
    t: "BENRI Homestay",
    c: "Homestay · Vietnam",
    y: "2025-2026",
    g: "g4",
    cat: "Social management",
    slug:"https://www.tiktok.com/@benrihomestay",
    thumnail:Benri,
  },
  {
    t: "BM Living",
    c: "Construction & Interiors · Vietnam",
    y: "2026",
    g: "g3",
    cat: "Social management",
    slug:"https://www.tiktok.com/@benrihomestay",
    thumnail:BMLiving,
  },
  {
    t: "Hannah Tu Lash & Brows",
    c: "PMU/Lash · USA",
    y: "2025-2026",
    g: "g1",
    cat: "Personal brand",
    slug:"https://www.facebook.com/hannahtulashbrows",
    thumnail:Hannah,
  },
  
  {
    t: "Tiến sĩ Yến",
    c: "Education · Vietnam",
    y: "2025-2026",
    g: "g5",
    cat: "Personal brand",
    slug:"https://www.tiktok.com/@tiensi_yen",
    thumnail:Yen,
  },
  {
    t: "Vinny Trần",
    c: "Fitness Coach · Canada",
    y: "2026",
    g: "g5",
    cat: "Personal brand",
    slug:"https://www.instagram.com/vinny2111/",
    thumnail:Vinny,
  }
];
