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
      setProgress(h>0?y/h*100:0);
      setShowTop(y>700);
    };
    window.addEventListener('scroll',onScroll,{passive:true});
    onScroll();

    const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el=entry.target as HTMLElement;
        setTimeout(()=>el.classList.add('in'),Number(el.dataset.dl||0));
        revealObserver.unobserve(el);
      }
    }),{threshold:.14,rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll<HTMLElement>('[data-rv]').forEach(el=>revealObserver.observe(el));

    const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      const el=entry.target as HTMLElement;
      counterObserver.unobserve(el);
      const target=Number(el.dataset.t);
      if(!Number.isFinite(target))return;
      if(reduce){el.textContent=target.toLocaleString('vi-VN');return;}
      const t0=performance.now();
      const tick=(t:number)=>{
        const p=Math.min(1,(t-t0)/1400),v=1-Math.pow(1-p,3);
        el.textContent=Math.round(target*v).toLocaleString('vi-VN');
        if(p<1)requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }),{threshold:.6});
    document.querySelectorAll<HTMLElement>('.num[data-t]').forEach(el=>counterObserver.observe(el));

    const cleanups:Array<()=>void>=[];

    if(fine&&!reduce){
      document.documentElement.classList.add('has-custom-cursor');
      const dot=document.getElementById('cursorDot') as HTMLElement|null;
      const ring=document.getElementById('cursorRing') as HTMLElement|null;
      const rt=document.getElementById('cursorRingTxt');
      let mx=window.innerWidth/2,my=window.innerHeight/2,rx=mx,ry=my,raf=0;

      const move=(e:MouseEvent)=>{
        mx=e.clientX;
        my=e.clientY;
        if(dot)dot.style.transform=`translate3d(${mx}px,${my}px,0)`;
      };
      const loop=()=>{
        rx+=(mx-rx)*.2;
        ry+=(my-ry)*.2;
        if(ring)ring.style.transform=`translate3d(${rx}px,${ry}px,0)`;
        raf=requestAnimationFrame(loop);
      };
      const updateCursorState=(target:EventTarget|null)=>{
        const node=target instanceof Element?target:null;
        const el=node?.closest?.('[data-cur],a,button') as HTMLElement|null;
        ring?.classList.remove('is-hover','is-label');
        dot?.classList.remove('is-hidden');
        if(!el){if(rt)rt.textContent='';return;}
        const label=el.dataset.cur;
        if(label&&label!=='hover'){
          if(rt)rt.textContent=label;
          ring?.classList.add('is-label');
          dot?.classList.add('is-hidden');
        }else{
          if(rt)rt.textContent='';
          ring?.classList.add('is-hover');
        }
      };
      const leaveWindow=()=>{
        ring?.classList.remove('is-hover','is-label');
        dot?.classList.remove('is-hidden');
      };

      const over=(e:MouseEvent)=>updateCursorState(e.target);
      window.addEventListener('mousemove',move,{passive:true});
      document.addEventListener('mouseover',over);
      document.documentElement.addEventListener('mouseleave',leaveWindow);
      loop();
      cleanups.push(()=>{
        window.removeEventListener('mousemove',move);
        document.removeEventListener('mouseover',over);
        document.documentElement.removeEventListener('mouseleave',leaveWindow);
        cancelAnimationFrame(raf);
        document.documentElement.classList.remove('has-custom-cursor');
      });

      const parallaxEls=[...document.querySelectorAll<HTMLElement>('[data-d]')];
      let tx=0,ty=0,cx=0,cy=0,praf=0;
      const pMove=(e:MouseEvent)=>{
        tx=(e.clientX/window.innerWidth-.5)*2;
        ty=(e.clientY/window.innerHeight-.5)*2;
      };
      const pLoop=()=>{
        cx+=(tx-cx)*.055;
        cy+=(ty-cy)*.055;
        parallaxEls.forEach(el=>{
          const d=Number(el.dataset.d)||10;
          // Floating hero chips animate on the outer node. Move their inner node
          // instead so mouse parallax does not overwrite the float animation.
          const target=(el.classList.contains('float')?el.querySelector<HTMLElement>('.in'):el) ?? el;
          target.style.transform=`translate3d(${(-cx*d).toFixed(2)}px,${(-cy*d*.6).toFixed(2)}px,0)`;
        });
        praf=requestAnimationFrame(pLoop);
      };
      pLoop();
      window.addEventListener('mousemove',pMove,{passive:true});
      cleanups.push(()=>{
        window.removeEventListener('mousemove',pMove);
        cancelAnimationFrame(praf);
      });

      document.querySelectorAll<HTMLElement>('.mag').forEach(button=>{
        let rect:DOMRect|null=null;
        const enter=()=>{rect=button.getBoundingClientRect();};
        const magMove=(e:MouseEvent)=>{
          if(!rect)rect=button.getBoundingClientRect();
          const dx=e.clientX-rect.left-rect.width/2;
          const dy=e.clientY-rect.top-rect.height/2;
          button.style.transform=`translate3d(${dx*.11}px,${dy*.11}px,0)`;
        };
        const magLeave=()=>{rect=null;button.style.transform='translate3d(0,0,0)';};
        button.addEventListener('mouseenter',enter);
        button.addEventListener('mousemove',magMove);
        button.addEventListener('mouseleave',magLeave);
        cleanups.push(()=>{
          button.removeEventListener('mouseenter',enter);
          button.removeEventListener('mousemove',magMove);
          button.removeEventListener('mouseleave',magLeave);
        });
      });
    }

    return ()=>{
      clearTimeout(timeout);
      window.removeEventListener('scroll',onScroll);
      revealObserver.disconnect();
      counterObserver.disconnect();
      cleanups.forEach(fn=>fn());
    };
  },[]);

  return <>
    <div className={`pre ${loaded?'done':''}`}><b><i>QUIZZY</i> <i>SOCIAL GALLERY</i></b></div>
    <div className="prog" style={{width:`${progress}%`}}/>
    <div className="cursor-dot" id="cursorDot"/>
    <div className="cursor-ring" id="cursorRing"><div className="cursor-ring-inner"><b id="cursorRingTxt"/></div></div>
    <button className={`top ${showTop?'on':''}`} aria-label="Lên đầu trang" data-cur="hover" onClick={()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}><ArrowUpIcon width={19} height={19}/></button>
  </>;
}
