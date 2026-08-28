"use client";

import { useEffect, useState } from "react";

const links = [
  ["#top", "Trang chủ"],
  ["#gallery", "Tài liệu số"],
  ["#courses", "Khoá học"],
  ["#services", "Dịch vụ SMM"],
  ["#contact", "Liên hệ"],
] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [small, setSmall] = useState(false);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const onScroll = () => {
      setSmall(window.scrollY > 50);
      let current = "#top";
      [["#top", "top"], ["#gallery", "gallery"], ["#services", "services"]].forEach(([href, id]) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = href;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return <>
    <header className={`nav ${small ? "sm" : ""}`} id="nav">
      <div className="nav-in">
        <a href="#top" className="logo" data-cur="hover"><b>QUIZZY</b><i>SOCIAL GALLERY</i></a>
        <nav className="nav-links" aria-label="Điều hướng chính">
          {links.map(([href, label]) => <a key={href} href={href} className={active === href ? "on" : ""} data-cur="hover">{label}</a>)}
        </nav>
        <div className="nav-right">
          <button className="ghostb" data-cur="hover">Đăng ký</button>
          <button className="login mag" data-cur="hover">Đăng nhập</button>
          <button className="burger" aria-expanded={menuOpen} aria-controls="mm" onClick={() => setMenuOpen(true)}>MENU</button>
        </div>
      </div>
    </header>
    <div className={`mm ${menuOpen ? "open" : ""}`} id="mm" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="mm-head"><span className="logo"><b>QUIZZY</b><i>SOCIAL GALLERY</i></span><button className="burger" onClick={() => setMenuOpen(false)}>ĐÓNG</button></div>
      <nav className="mm-list">
        {[['#top','Trang chủ'],['#gallery','Tài liệu số'],['#courses','Khóa học'],['#services','Dịch vụ SMM'],['#projects','Projects'],['#footer','Liên hệ']].map(([href,label],i)=><a key={href} href={href} onClick={()=>setMenuOpen(false)} style={{transitionDelay: menuOpen ? `${0.08*i+0.1}s` : '0s'}}>{label}</a>)}
      </nav>
      <div className="mm-foot"><span className="chip">Đăng ký</span><span className="chip" style={{background:'var(--lilac)',color:'#fff',borderColor:'var(--lilac)'}}>Đăng nhập</span></div>
    </div>
  </>;
}
