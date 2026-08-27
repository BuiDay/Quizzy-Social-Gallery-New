"use client";
import { useEffect, useState } from "react";
import { ArrowRightIcon, FacebookIcon, FileIcon, GraduationIcon, InstagramIcon, LinkedInIcon, TikTokIcon, TrendIcon } from "@/components/ui/Icons";

export function Hero() {
  const [go, setGo] = useState(false);
  useEffect(()=>{ const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches; const t=setTimeout(()=>setGo(true), reduce?60:950); return ()=>clearTimeout(t);},[]);
  return <section className={`hero ${go ? 'go' : ''}`} id="top">
    <div className="wrap" style={{width:'min(1300px,94vw)'}}><div className="hero-frame">
      <div className="visual">
        <span className="mesh m1"/><span className="mesh m2"/><span className="mesh m3"/>
        <div className="photo" data-d="7"><div className="fig"><div className="body"><div className="head"/><div className="hair"/></div></div></div>
        <span className="chipf cf1 glass float" data-d="20"><span className="in"><InstagramIcon/></span></span>
        <span className="chipf cf2 glass float" data-d="26"><span className="in"><TikTokIcon/></span></span>
        <span className="chipf cf3 glass float" data-d="17"><span className="in"><FacebookIcon/></span></span>
        <span className="chipf cf4 glass float" data-d="23"><span className="in"><LinkedInIcon/></span></span>
        <div className="statfloat sf1 glass" data-d="13"><b><span className="num" data-t="180">0</span>K+</b><span>followers</span></div>
        <div className="statfloat sf2 glass" data-d="11"><b><span className="num" data-t="500">0</span>+</b><span>học viên</span></div>
      </div>
      <div className="intro">
        <div className="brandrow"><span className="mark">Q</span><span>QUIZZY SOCIAL GALLERY</span></div>
        <div className="stack"><span className="word w1" data-cur="hover">QUIZZY</span><span className="word w2" data-cur="hover">SOCIAL</span><span className="row3"><span className="word w3" data-cur="hover">GALLERY</span><a href="#gallery" className="wgo" aria-label="Khám phá gallery" data-cur="OPEN"><ArrowRightIcon/></a></span></div>
        <ul className="hero-list">
          <li><span className="ic i-a"><FileIcon/></span>Tài liệu & sản phẩm số cho người làm Social Media</li>
          <li><span className="ic i-b"><GraduationIcon/></span>Khóa học Content Strategy & Personal Branding</li>
          <li><span className="ic i-c"><TrendIcon/></span>Dịch vụ SMM cho doanh nghiệp & Personal Brand</li>
        </ul>
        <div className="hero-cta"><a href="#gallery" className="btn solid mag" data-cur="OPEN"><span>Khám phá tài liệu <ArrowRightIcon/></span></a><a href="#about" className="btn ghost mag" data-cur="hover"><span><span className="d"/>Về Quizzy</span></a></div>
        <div className="social-proof"><span className="avatars"><i/><i/><i/></span><p className="small">500+ học viên đang áp dụng mỗi ngày · Việt Nam · Canada · Mỹ</p></div>
      </div>
    </div></div>
    <div className="mq" aria-hidden="true"><div className="mq-t"><span>Social media strategy <em>✦</em> Community management <em>✦</em> Content marketing <em>✦</em> Personal branding <em>✦</em> </span><span>Social media strategy <em>✦</em> Community management <em>✦</em> Content marketing <em>✦</em> Personal branding <em>✦</em> </span></div></div>
  </section>;
}
