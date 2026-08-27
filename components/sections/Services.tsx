"use client";
import { useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { Art } from "@/components/ui/Art";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";

const services=[
 ['01','g1','Xây dựng chiến lược nội dung','Nghiên cứu khách hàng, định vị thương hiệu trên nền tảng, xác định tuyến nội dung và thông điệp cốt lõi — bản đồ để cả team biết mình đang đăng vì điều gì.'],
 ['02','g2','Lên kế hoạch & quản lý Social Media','Content calendar hàng tháng, sản xuất nội dung, đăng bài, tương tác cộng đồng và báo cáo hiệu quả theo tuần.'],
 ['03','g3','Tối ưu hệ thống nội dung','Audit kênh hiện tại, tìm điểm rò rỉ trong hành trình nội dung, chuẩn hóa format và cải thiện tỷ lệ tiếp cận — chuyển đổi.'],
 ['04','g5','Hỗ trợ tăng trưởng kênh','Đồng hành theo giai đoạn: thử nghiệm định dạng mới, khai thác trend đúng chất brand và xây nhịp tăng trưởng bền thay vì viral một lần.']
] as const;

export function Services(){const [preview,setPreview]=useState<string|null>(null); const [pos,setPos]=useState({x:0,y:0}); return <><section className="sec" id="services"><div className="wrap"><div className="shead"><div><Eyebrow data-rv="up">03 / Social media services</Eyebrow><h2 className="h2" data-rv="clip" data-dl="70">Social Media<br/>không chỉ là <span className="cap">đăng bài</span>.</h2></div><p className="lead" data-rv="up" data-dl="150">Giải pháp Social Media Marketing cho doanh nghiệp và Personal Brand — từ chiến lược đến vận hành và tối ưu nội dung trên từng nền tảng.</p></div><div className="svcs" id="svcs" onMouseMove={(e:ReactMouseEvent<HTMLDivElement>)=>setPos({x:e.clientX,y:e.clientY})}>{services.map(([idx,g,t,d],i)=><div className="svc" key={idx} data-cur="VIEW" tabIndex={0} data-rv="slide" data-dl={i*70} onMouseEnter={()=>setPreview(g)} onMouseLeave={()=>setPreview(null)}><span className="idx">{idx}</span><div><h3 className="h3">{t}</h3><p className="d">{d}</p></div><span className="arc"><ArrowUpRightIcon/></span></div>)}</div><div style={{marginTop:36}} data-rv="up"><a href="#footer" className="btn mag" data-cur="OPEN"><span>Work with me <ArrowUpRightIcon/></span></a></div></div></section><div className={`pv ${preview?'show':''}`} id="pv" style={{transform:`translate(${pos.x}px,${pos.y}px) translate(-50%,-50%) scale(${preview?1:.86})`}}>{preview&&<Art variant={preview}/>}</div></>}
