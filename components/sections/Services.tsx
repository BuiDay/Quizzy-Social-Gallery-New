"use client";
import { useRef, useState } from "react";
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

export function Services(){
  const [preview,setPreview]=useState<string|null>(null);
  const previewRef=useRef<HTMLDivElement>(null);

  const movePreview=(e:ReactMouseEvent<HTMLDivElement>)=>{
    const el=previewRef.current;
    if(!el)return;
    const halfW=106,halfH=132,gap=132,edge=18;
    let x=e.clientX+gap;
    if(x+halfW>window.innerWidth-edge)x=e.clientX-gap;
    const y=Math.min(window.innerHeight-halfH-edge,Math.max(halfH+edge,e.clientY));
    el.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(1)`;
  };

  const hidePreview=()=>{
    setPreview(null);
    const el=previewRef.current;
    if(el)el.style.transform=el.style.transform.replace('scale(1)','scale(.94)');
  };

  return <>
    <section className="sec" id="services">
      <div className="wrap">
        <div className="shead">
          <div><Eyebrow data-rv="up">03 / Social media services</Eyebrow><h2 className="h2" data-rv="clip" data-dl="70">Social Media<br/>không chỉ là <span className="cap">đăng bài</span>.</h2></div>
          <p className="lead" data-rv="up" data-dl="150">Giải pháp Social Media Marketing cho doanh nghiệp và Personal Brand — từ chiến lược đến vận hành và tối ưu nội dung trên từng nền tảng.</p>
        </div>
        <div className="svcs" id="svcs" onMouseMove={movePreview} onMouseLeave={hidePreview}>
          {services.map(([idx,g,t,d],i)=><div className="svc" key={idx} data-cur="VIEW" tabIndex={0} data-rv="slide" data-dl={i*70} onMouseEnter={()=>setPreview(g)}>
            <span className="idx">{idx}</span><div><h3 className="h3">{t}</h3><p className="d">{d}</p></div><span className="arc"><ArrowUpRightIcon/></span>
          </div>)}
        </div>
        <div style={{marginTop:36}} data-rv="up"><a href="#footer" className="btn mag" data-cur="OPEN"><span>Work with me <ArrowUpRightIcon/></span></a></div>
      </div>
    </section>
    <div ref={previewRef} className={`pv ${preview?'show':''}`} id="pv">{preview&&<Art variant={preview}/>}</div>
  </>;
}
