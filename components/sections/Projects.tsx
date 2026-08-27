"use client";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, WheelEvent as ReactWheelEvent } from "react";
import { projects } from "@/data/content";
import { Art } from "@/components/ui/Art";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useModal } from "@/components/ui/ModalContext";

export function Projects(){
 const {openModal}=useModal(); const rail=useRef<HTMLDivElement>(null); const [bar,setBar]=useState({width:14,left:0}); const drag=useRef({down:false,x:0,scroll:0,moved:0});
 const update=()=>{const el=rail.current;if(!el)return;const max=el.scrollWidth-el.clientWidth;const width=Math.max(14,el.clientWidth/el.scrollWidth*100);setBar({width,left:max>0?(el.scrollLeft/max)*(100-width):0});};
 useEffect(()=>{update();window.addEventListener('resize',update);return()=>window.removeEventListener('resize',update)},[]);
 return <section className="sec" id="projects" style={{background:'var(--cream)'}}><div className="wrap"><div className="shead"><div><Eyebrow data-rv="up">Selected projects</Eyebrow><h2 className="h2" data-rv="clip" data-dl="70">Những <span className="cap sky">hành trình</span><br/>mình đã đồng hành.</h2></div><div><p className="lead" data-rv="up" data-dl="150">Mỗi lần hợp tác là một lần thử nghiệm và tìm ra cách làm Social Media hiệu quả hơn trong thực tế.</p><div className="dragh" style={{marginTop:16}} data-rv="up" data-dl="210">Kéo để xem <i>→</i></div></div></div>
 <div className="rail" ref={rail} onScroll={update} onPointerDown={(e:ReactPointerEvent<HTMLDivElement>)=>{const el=rail.current;if(!el)return;drag.current={down:true,x:e.clientX,scroll:el.scrollLeft,moved:0};el.classList.add('drag');el.setPointerCapture(e.pointerId)}} onPointerMove={(e:ReactPointerEvent<HTMLDivElement>)=>{const el=rail.current;if(!el||!drag.current.down)return;const dx=e.clientX-drag.current.x;drag.current.moved=Math.abs(dx);el.scrollLeft=drag.current.scroll-dx}} onPointerUp={()=>{drag.current.down=false;rail.current?.classList.remove('drag')}} onPointerCancel={()=>{drag.current.down=false;rail.current?.classList.remove('drag')}} onWheel={(e:ReactWheelEvent<HTMLDivElement>)=>{const el=rail.current;if(!el)return;if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){const max=el.scrollWidth-el.clientWidth;if(max>0&&!((el.scrollLeft<=0&&e.deltaY<0)||(el.scrollLeft>=max-1&&e.deltaY>0))){e.preventDefault();el.scrollLeft+=e.deltaY}}}}>
 {projects.map(p=><button key={p.t} className="proj" data-cur="VIEW" aria-label={`Xem case study ${p.t}`} onClick={()=>{if(drag.current.moved>8)return;openModal({g:p.g,cat:p.cat,meta:`${p.c} · ${p.y}`,t:p.t,d:p.d,ch:p.ch,stats:p.stats,l1:'Mình đã làm gì',l2:'Kết quả',a:p.work,b:p.res,cta:'Trao đổi về dự án tương tự'})}}><div className="pvis"><Art variant={p.g}/><span className="badge glass">{p.cat}</span><span className="pview">Xem case study</span></div><div className="pbody"><h3>{p.t}</h3><div className="pmeta"><span>{p.c}</span><span>{p.y}</span></div><div className="pcta"><span>Xem case study</span><span className="arc"><ArrowRightIcon/></span></div></div></button>)}
 </div><div className="railbar"><i style={{width:`${bar.width}%`,marginLeft:`${bar.left}%`}}/></div></div></section>;
}
