import { Eyebrow } from "@/components/ui/Eyebrow";
const testimonials=[
 ['pv1','Em từng học 3 khóa content rồi mà vẫn không biết bắt đầu từ đâu. Cái khác ở đây là chị bắt bọn em làm trên chính kênh của mình ngay từ buổi đầu. Sau 2 tháng em nhận được job freelance đầu tiên, 8 triệu một tháng.','Minh Thư','FREELANCE CONTENT WRITER · TP.HCM'],
 ['pv2','Bộ Content Calendar cứu team em thật sự. Trước đó mỗi sáng cả team ngồi họp 30 phút chỉ để chốt hôm nay đăng gì.','Hoàng Anh','MARKETING EXECUTIVE · HÀ NỘI'],
 ['pv3','Chị review bài của em rất thẳng, chỉ đúng chỗ sai chứ không khen cho vui. Đó là thứ em cần.','Ngọc Lan','SOCIAL MEDIA EXECUTIVE · ĐÀ NẴNG'],
 ['pv4','Mình là chủ shop, không có team marketing. Sau khóa mình tự lên plan được cho cả quý và không còn cảm giác đăng bài cho có nữa.','Thanh Trúc','CHỦ THƯƠNG HIỆU SKINCARE · CẦN THƠ'],
 ['pv5','Bộ audit 60 điểm mình đưa thẳng vào quy trình nhận khách mới của agency. Khách nhìn báo cáo là thấy chuyên nghiệp liền.','Quang Đạt','ACCOUNT MANAGER · AGENCY TP.HCM'],
 ['pv2','Trước em cứ nghĩ phải viral mới gọi là làm tốt. Học xong mới hiểu kênh nhỏ mà đúng người vẫn ra đơn đều.','Bảo Ngọc','CONTENT CREATOR · BÌNH DƯƠNG']
] as const;
export function Testimonials(){return <section className="tms sec" id="feedback"><div className="wrap"><div className="tm-head"><Eyebrow data-rv="up">Học viên nói gì</Eyebrow><h2 className="h2" data-rv="clip" data-dl="70" style={{marginTop:18}}>Điều mình vui nhất là thấy mọi người <span className="it">làm được</span>.</h2></div><div className="tm-wall">{testimonials.map(([pv,q,n,r],i)=><figure className="pola" key={n} data-rv="up" data-dl={i? [80,160,60,140,220][i-1]:undefined}><div className={`pola-img ${pv}`}><span className="ring"/><span className="qm">”</span><span className="stars" aria-label="5 trên 5"><i/><i/><i/><i/><i/></span></div><q>{q}</q><figcaption>{n}<small>{r}</small></figcaption></figure>)}</div></div></section>}
