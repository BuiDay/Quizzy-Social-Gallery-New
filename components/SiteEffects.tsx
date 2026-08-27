"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@/components/ui/Icons";

export function SiteEffects(){
  const [loaded,setLoaded]=useState(false);
  const [progress,setProgress]=useState(0);
  const [showTop,setShowTop]=useState(false);

  useEffect(()=>{
    const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
    const timeout=setTimeout(()=>setLoaded(true),reduce?60:950);

    const onScroll=()=>{
      const y=window.scrollY,h=document.documentElement.scrollHeight-window.innerHeight;
      setProgress(h>0?y/h*100:0);setShowTop(y>700);
    };
    window.addEventListener('scroll',onScroll,{passive:true});onScroll();

    const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){const el=entry.target as HTMLElement;setTimeout(()=>el.classList.add('in'),Number(el.dataset.dl||0));revealObserver.unobserve(el);}
    }),{threshold:.14,rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll<HTMLElement>('[data-rv]').forEach(el=>revealObserver.observe(el));

    const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;const el=entry.target as HTMLElement;counterObserver.unobserve(el);const target=Number(el.dataset.t);if(!Number.isFinite(target))return;
      if(reduce){el.textContent=target.toLocaleString('vi-VN');return;}
      const t0=performance.now();const tick=(t:number)=>{const p=Math.min(1,(t-t0)/1400),v=1-Math.pow(1-p,3);el.textContent=Math.round(target*v).toLocaleString('vi-VN');if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);
    }),{threshold:.6});
    document.querySelectorAll<HTMLElement>('.num[data-t]').forEach(el=>counterObserver.observe(el));

    const cleanups:Array<()=>void>=[];
    if(fine&&!reduce){
      const cur=document.getElementById('cur') as HTMLElement|null,ring=document.getElementById('ring') as HTMLElement|null,rt=document.getElementById('ringTxt');
      let mx=window.innerWidth/2,my=window.innerHeight/2,rx=mx,ry=my,raf=0;
      const move=(e:MouseEvent)=>{mx=e.clientX;my=e.clientY;if(cur)cur.style.transform=`translate3d(${mx}px,${my}px,0)`};
      const loop=()=>{rx+=(mx-rx)*.18;ry+=(my-ry)*.18;if(ring)ring.style.transform=`translate3d(${rx}px,${ry}px,0)`;raf=requestAnimationFrame(loop)};loop();
      const over=(e:MouseEvent)=>{const target=e.target as Element|null;const el=target?.closest?.('[data-cur],a,button') as HTMLElement|null;document.body.classList.remove('ch','cl');if(!el)return;const v=el.dataset.cur;if(v&&v!=='hover'){if(rt)rt.textContent=v;document.body.classList.add('cl')}else document.body.classList.add('ch')};
      window.addEventListener('mousemove',move,{passive:true});document.addEventListener('mouseover',over);
      cleanups.push(()=>{window.removeEventListener('mousemove',move);document.removeEventListener('mouseover',over);cancelAnimationFrame(raf)});

      const parallaxEls=[...document.querySelectorAll<HTMLElement>('[data-d]')];let tx=0,ty=0,cx=0,cy=0,praf=0;
      const pMove=(e:MouseEvent)=>{tx=(e.clientX/window.innerWidth-.5)*2;ty=(e.clientY/window.innerHeight-.5)*2};
      const pLoop=()=>{cx+=(tx-cx)*.055;cy+=(ty-cy)*.055;parallaxEls.forEach(el=>{const d=Number(el.dataset.d)||10;el.style.transform=`translate3d(${(-cx*d).toFixed(2)}px,${(-cy*d*.6).toFixed(2)}px,0)`});praf=requestAnimationFrame(pLoop)};pLoop();window.addEventListener('mousemove',pMove,{passive:true});
      cleanups.push(()=>{window.removeEventListener('mousemove',pMove);cancelAnimationFrame(praf)});

      document.querySelectorAll<HTMLElement>('.mag').forEach(button=>{
        const magMove=(e:MouseEvent)=>{const r=button.getBoundingClientRect();button.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.15}px,${(e.clientY-r.top-r.height/2)*.2}px)`};
        const magLeave=()=>{button.style.transform='translate(0,0)'};
        button.addEventListener('mousemove',magMove);button.addEventListener('mouseleave',magLeave);cleanups.push(()=>{button.removeEventListener('mousemove',magMove);button.removeEventListener('mouseleave',magLeave)});
      });
    }

    return ()=>{clearTimeout(timeout);window.removeEventListener('scroll',onScroll);revealObserver.disconnect();counterObserver.disconnect();cleanups.forEach(fn=>fn())};
  },[]);

  return <><div className={`pre ${loaded?'done':''}`}><b><i>QUIZZY</i> <i>SOCIAL GALLERY</i></b></div><div className="prog" style={{width:`${progress}%`}}/><div className="cur" id="cur"/><div className="ring" id="ring"><b id="ringTxt"/></div><button className={`top ${showTop?'on':''}`} aria-label="Lên đầu trang" data-cur="hover" onClick={()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}><ArrowUpIcon width={19} height={19}/></button></>;
}
