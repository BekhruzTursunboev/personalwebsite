"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/* ================================================================ HELPERS */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 6) return "Night owl?";
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

const STATS = [
  { value: 10, suffix: "+", label: "Years coding" },
  { value: 5, suffix: "+", label: "Shipped projects" },
  { value: 3, suffix: "K+", label: "Lines of code" },
  { value: 14, suffix: "", label: "Age at first client" },
];

const SECTIONS = ["hero", "mtn-divider", "hs-section", "mq", "stats-section", "cards-section"];

const KONAMI = [38,38,40,40,37,39,37,39,66,65];
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
const ACCENT_THEMES = [
  { a1: "#00f0ff", a2: "#6366f1" },
  { a1: "#ff6b6b", a2: "#ee5a24" },
  { a1: "#0be881", a2: "#05c46b" },
  { a1: "#f368e0", a2: "#9b59b6" },
  { a1: "#ffd32a", a2: "#ff9f1a" },
];

function scrambleText(el: HTMLElement, final: string, duration = 600) {
  const len = final.length;
  const start = performance.now();
  const step = () => {
    const elapsed = performance.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const revealed = Math.floor(progress * len);
    let result = "";
    for (let i = 0; i < len; i++) {
      result += i < revealed ? final[i] : CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    el.textContent = result;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ================================================================ DATA */
const LINKS = [
  { label: "GitHub", handle: "BekhruzTursunboev", url: "https://github.com/BekhruzTursunboev", icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z", f: true, sp: "col-span-1" },
  { label: "LinkedIn", handle: "in/bexruztursunbayev", url: "https://www.linkedin.com/in/bexruztursunbayev", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", f: true, sp: "col-span-1" },
  { label: "YouTube", handle: "@BexruzTursunboev", url: "https://www.youtube.com/@BexruzTursunboev", icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z", f: true, sp: "col-span-1" },
  { label: "BekhruzAI", handle: "t.me/bekhruzAI", url: "https://t.me/bekhruzAI", icon: "M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z", f: true, sp: "col-span-1" },
  { label: "Telegram", handle: "@tursunboevbekhruz", url: "https://t.me/tursunboevbekhruz", icon: "M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z", f: true, sp: "col-span-1" },
  { label: "Email", handle: "tursunbaevbexruz19@gmail.com", url: "mailto:tursunbaevbexruz19@gmail.com", icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75", f: false, sp: "col-span-1" },
];
const SHOWCASE = [
  { title: "MulkTahlilchi", sub: "AI-powered property evaluator · TypeScript" },
  { title: "ZiyoBuddy", sub: "AI academic agent for students · TypeScript" },
  { title: "Target School", sub: "Full school website · 5-month build" },
  { title: "AI & Automation", sub: "LLMs, Computer Vision, NLP pipelines" },
  { title: "Content Creation", sub: "AI & Dev tutorials · YouTube" },
];
const MARQUEE = "BEKHRUZ TURSUNBAEV \u2014 CODING SINCE AGE 12 \u00B7 AI BUILDER \u00B7 FULL-STACK \u00B7 TASHKENT \u00B7 ";
const ROLES = ["Software Engineer", "AI Builder", "Full-Stack Dev", "Open Source Contributor", "Content Creator"];

/* ================================================================ PARTICLE SYSTEM */
interface Particle { x: number; y: number; vx: number; vy: number; sz: number; }

function initParticles(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  const dpr = Math.min(window.devicePixelRatio, 2);
  let W = 0, H = 0;
  const P: Particle[] = [];
  let mx = -9999, my = -9999, pressed = false;

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const isMobile = W < 768;
  const COUNT = isMobile ? 28 : 70;
  const LINK_DIST = isMobile ? 100 : 140;
  const REPEL = isMobile ? 90 : 130;

  for (let i = 0; i < COUNT; i++) P.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, sz: Math.random() * 1.6 + 0.4 });

  let rafId = 0;
  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (const p of P) {
      const dx = p.x - mx, dy = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPEL && dist > 0) {
        const strength = pressed ? -0.8 : 0.35;
        const f = (REPEL - dist) / REPEL * strength;
        p.vx += (dx / dist) * f; p.vy += (dy / dist) * f;
      }
      p.x += p.vx; p.y += p.vy;
      p.vx *= 0.99; p.vy *= 0.99;
      if (p.x < 0) { p.x = 0; p.vx *= -0.5; } if (p.x > W) { p.x = W; p.vx *= -0.5; }
      if (p.y < 0) { p.y = 0; p.vy *= -0.5; } if (p.y > H) { p.y = H; p.vy *= -0.5; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.sz, 0, 6.28);
      ctx.fillStyle = "rgba(0,240,255,0.22)"; ctx.fill();
    }
    ctx.lineWidth = 0.5;
    for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
      const dx = P[i].x - P[j].x, dy = P[i].y - P[j].y, d = Math.sqrt(dx * dx + dy * dy);
      if (d < LINK_DIST) {
        ctx.beginPath(); ctx.moveTo(P[i].x, P[i].y); ctx.lineTo(P[j].x, P[j].y);
        ctx.strokeStyle = `rgba(0,240,255,${0.06 * (1 - d / LINK_DIST)})`;  ctx.stroke();
      }
    }
    rafId = requestAnimationFrame(tick);
  }
  tick();

  return {
    setMouse: (x: number, y: number) => { mx = x; my = y; },
    setPressed: (v: boolean) => { pressed = v; },
    boost: (factor: number) => { for (const p of P) { p.vx += (Math.random() - 0.5) * factor; p.vy += (Math.random() - 0.5) * factor; } },
    destroy: () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); }
  };
}

/* ================================================================ LINK CARD */
function LinkCard({ data, idx }: { data: (typeof LINKS)[number]; idx: number }) {
  const el = useRef<HTMLAnchorElement>(null);
  const gl = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    const a = el.current; if (!a) return;
    const r = a.getBoundingClientRect();
    gsap.to(a, { rotateY: ((e.clientX - r.left) / r.width - 0.5) * 8, rotateX: ((e.clientY - r.top) / r.height - 0.5) * -6, duration: 0.6, ease: "power3.out", overwrite: "auto" });
    if (gl.current) { gl.current.style.left = `${e.clientX - r.left}px`; gl.current.style.top = `${e.clientY - r.top}px`; gl.current.style.opacity = "1"; }
  }, []);
  const onLeave = useCallback(() => {
    gsap.to(el.current, { rotateY: 0, rotateX: 0, duration: 1.2, ease: "elastic.out(1,0.45)" });
    if (gl.current) gl.current.style.opacity = "0";
  }, []);
  return (
    <a ref={el} href={data.url} target={data.url.startsWith("mailto:") ? undefined : "_blank"} rel={data.url.startsWith("mailto:") ? undefined : "noopener noreferrer"} onMouseMove={onMove} onMouseLeave={onLeave}
      className={`link-card grad-border clip-fill group relative ${data.sp} block p-5 sm:p-7 bg-white/[0.012] will-change-transform`} style={{ perspective: "600px", transformStyle: "preserve-3d" }}>
      <div ref={gl} className="absolute w-52 h-52 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 transition-opacity duration-300" style={{ background: "radial-gradient(circle, rgba(0,240,255,0.12) 0%, transparent 70%)", filter: "blur(30px)" }} />
      <span className="block text-[2.5rem] sm:text-[3.5rem] font-black leading-none text-white/[0.025] transition-colors duration-400 group-hover:text-white/[0.07]" style={{ fontFamily: "var(--font-syne)" }}>{String(idx + 1).padStart(2, "0")}</span>
      <div className="flex items-center gap-3 mt-3 relative z-10">
        <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.04] text-white/20 transition-all duration-400 group-hover:bg-[var(--accent1)]/15 group-hover:text-[var(--accent1)] group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill={data.f ? "currentColor" : "none"} stroke={data.f ? "none" : "currentColor"} strokeWidth={data.f ? 0 : 1.5}><path d={data.icon} /></svg>
        </span>
        <span className="text-[1.1rem] sm:text-[1.3rem] font-bold text-white/50 transition-colors duration-300 group-hover:text-white" style={{ fontFamily: "var(--font-syne)" }}>{data.label}</span>
      </div>
      <p className="text-[0.55rem] tracking-[0.12em] text-white/8 mt-2 relative z-10 transition-colors duration-300 group-hover:text-white/25" style={{ fontFamily: "var(--font-mono)" }}>{data.handle}</p>
      <div className="absolute top-5 right-5 sm:top-7 sm:right-7 translate-x-4 opacity-0 transition-all duration-400 group-hover:translate-x-0 group-hover:opacity-100">
        <svg className="w-5 h-5 text-[var(--accent1)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
      </div>
    </a>
  );
}

/* ================================================================ ROLE CYCLER */
function RoleCycler() {
  const [idx, setIdx] = useState(0);
  useEffect(() => { const iv = setInterval(() => setIdx(p => (p + 1) % ROLES.length), 2200); return () => clearInterval(iv); }, []);
  return (
    <span className="inline-block relative h-[1.2em] overflow-hidden align-bottom">
      {ROLES.map((role, i) => (
        <span key={role} className="block transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: `translateY(${(i - idx) * 100}%)`, opacity: i === idx ? 1 : 0, position: i === 0 ? "relative" : "absolute", top: 0, left: 0 }}>{role}</span>
      ))}
    </span>
  );
}

/* ================================================================ MAIN PAGE */
export default function Home() {
  const page = useRef<HTMLElement>(null);
  const dotR = useRef<HTMLDivElement>(null);
  const ringR = useRef<HTMLDivElement>(null);
  const glowR = useRef<HTMLDivElement>(null);
  const canvasR = useRef<HTMLCanvasElement>(null);
  const progressR = useRef<HTMLDivElement>(null);
  const hScrollR = useRef<HTMLDivElement>(null);
  const hTrackR = useRef<HTMLDivElement>(null);
  const photoR = useRef<HTMLDivElement>(null);
  const spotR = useRef<HTMLDivElement>(null);
  const lenisR = useRef<Lenis | null>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [greeting, setGreeting] = useState("");
  const [clock, setClock] = useState("");

  useEffect(() => { setGreeting(getGreeting()); }, []);
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    let particles: ReturnType<typeof initParticles> | null = null;
    if (canvasR.current) particles = initParticles(canvasR.current);

    /* ---- Lenis smooth scroll ---- */
    const lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, touchMultiplier: 1.5 });
    lenisR.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const lenisRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const d = dotR.current!, r = ringR.current!, g = glowR.current!, sp = spotR.current!;
      const cursorLabel = document.querySelector<HTMLElement>(".cursor-label");
      let mx = 0, my = 0;
      let smoothVel = 0, prevMx = 0, prevMy = 0;

      /* ---- Cache per-frame DOM queries ---- */
      const pills = document.querySelectorAll<HTMLElement>(".h-pill");
      const scrollPctEl = document.querySelector<HTMLElement>(".scroll-pct");

      const onMouse = (e: MouseEvent) => {
        mx = e.clientX; my = e.clientY;

        /* ---- Mouse velocity with exponential smoothing ---- */
        const rawVx = mx - prevMx, rawVy = my - prevMy;
        const rawVel = Math.sqrt(rawVx * rawVx + rawVy * rawVy);
        smoothVel += (rawVel - smoothVel) * 0.3;
        const dotScale = Math.min(2, 1 + smoothVel / 120);
        const ringStretch = Math.min(1.25, 1 + smoothVel / 300);
        const skewAngle = Math.min(12, smoothVel / 12) * (rawVx >= 0 ? 1 : -1);
        prevMx = mx; prevMy = my;

        gsap.to(d, { left: mx, top: my, scale: dotScale, duration: 0.15, ease: "power2.out", overwrite: "auto" });
        gsap.to(r, { left: mx, top: my, scaleX: ringStretch, skewX: skewAngle * 0.2, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        gsap.to(g, { left: mx, top: my, duration: 1, ease: "power2.out", overwrite: "auto" });
        gsap.to(sp, { left: mx, top: my, duration: 0.3, ease: "power3.out", overwrite: "auto" });
        if (cursorLabel) { cursorLabel.style.left = mx + "px"; cursorLabel.style.top = my + "px"; }
        particles?.setMouse(mx, my);

        /* ---- Hero mouse-move parallax ---- */
        const hw = window.innerWidth / 2, hh = window.innerHeight / 2;
        const px = (mx - hw) / hw, py = (my - hh) / hh;
        gsap.to(".h-mountain", { x: px * -8, y: py * -5, duration: 1.6, ease: "power2.out", overwrite: "auto" });
        gsap.to(".h-spinner", { x: px * 12, y: py * 10, duration: 1.8, ease: "power2.out", overwrite: "auto" });

        /* ---- Magnetic pills (cached) ---- */
        pills.forEach((pill) => {
          const pr = pill.getBoundingClientRect();
          const pcx = pr.left + pr.width / 2, pcy = pr.top + pr.height / 2;
          const pdx = mx - pcx, pdy = my - pcy;
          const pd = Math.sqrt(pdx * pdx + pdy * pdy);
          if (pd < 120) {
            const pf = (1 - pd / 120) * 0.2;
            gsap.to(pill, { x: pdx * pf, y: pdy * pf, duration: 0.5, ease: "power3.out", overwrite: "auto" });
          } else {
            gsap.to(pill, { x: 0, y: 0, duration: 0.8, ease: "back.out(1.2)", overwrite: "auto" });
          }
        });




      };
      window.addEventListener("mousemove", onMouse);

      const onClick = null;

      /* ---- Hold to attract particles ---- */
      const onDown = () => particles?.setPressed(true);
      const onUp = () => particles?.setPressed(false);
      window.addEventListener("mousedown", onDown);
      window.addEventListener("mouseup", onUp);

      /* ---- Cursor hover + context label + ripple rings ---- */
      const attachHover = () => {
        document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
          el.addEventListener("mouseenter", () => {
            r.classList.add("hover");
            if (cursorLabel) {
              const label = (el as HTMLElement).dataset.cursorText || "";
              if (label) { cursorLabel.textContent = label; cursorLabel.style.opacity = "1"; }
            }

          });
          el.addEventListener("mouseleave", () => {
            r.classList.remove("hover");
            if (cursorLabel) cursorLabel.style.opacity = "0";
          });
        });
      };
      attachHover();

      /* ---- Draggable photo (mouse + touch) ---- */
      const photo = photoR.current;
      let dragMove: ((e: MouseEvent) => void) | null = null;
      let dragUp: (() => void) | null = null;
      if (photo) {
        let dragging = false, sx = 0, sy = 0;
        photo.addEventListener("mousedown", (e: MouseEvent) => { dragging = true; sx = e.clientX; sy = e.clientY; e.preventDefault(); });
        dragMove = (e: MouseEvent) => {
          if (!dragging) return;
          gsap.to(photo, { x: `+=${e.clientX - sx}`, y: `+=${e.clientY - sy}`, duration: 0.25, ease: "power3.out", overwrite: "auto" });
          sx = e.clientX; sy = e.clientY;
        };
        window.addEventListener("mousemove", dragMove);
        const endDrag = () => { if (!dragging) return; dragging = false; gsap.to(photo, { x: 0, y: 0, duration: 2, ease: "elastic.out(1,0.3)" }); };
        dragUp = endDrag;
        window.addEventListener("mouseup", endDrag);
        /* Touch support */
        photo.addEventListener("touchstart", (e: TouchEvent) => { dragging = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
        photo.addEventListener("touchmove", (e: TouchEvent) => {
          if (!dragging) return;
          const tx = e.touches[0].clientX, ty = e.touches[0].clientY;
          gsap.to(photo, { x: `+=${tx - sx}`, y: `+=${ty - sy}`, duration: 0.25, ease: "power3.out", overwrite: "auto" });
          sx = tx; sy = ty;
        }, { passive: true });
        photo.addEventListener("touchend", endDrag, { passive: true });
      }

      /* ---- Scroll progress ---- */
      gsap.set(progressR.current, { scaleX: 0 });
      gsap.to(progressR.current, { scaleX: 1, ease: "none", scrollTrigger: { trigger: page.current, start: "top top", end: "bottom bottom", scrub: 0.3 } });

      /* ---- Intro overlay ---- */
      const intro = gsap.timeline({ defaults: { ease: "expo.inOut" } });
      intro.to(".intro-logo", { scale: 1.4, duration: 0.5 })
        .to(".intro-logo", { opacity: 0, scale: 0.8, duration: 0.3 }, 0.5)
        .to(".intro-overlay", { yPercent: -100, duration: 0.9, ease: "power4.inOut", onComplete: () => { document.querySelector<HTMLElement>(".intro-overlay")!.style.pointerEvents = "none"; } }, 0.6);

      /* ---- Hero entrance (starts after intro) ---- */
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 1.2 });
      tl.fromTo(".h-bar", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 1.2 }, 0)
        .fromTo(".hero-name", { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.15, duration: 1.4 }, 0.1)
        .fromTo(photoR.current, { scale: 0.7, opacity: 0, rotate: -10 }, { scale: 1, opacity: 1, rotate: 0, duration: 2.4, ease: "power4.out" }, 0.3)
        .fromTo(".h-spinner", { scale: 0, opacity: 0, rotate: -120 }, { scale: 1, opacity: 1, rotate: 0, duration: 2, ease: "power4.out" }, 0.4)
        .fromTo(".h-bio", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.4 }, 0.7)
        .fromTo(".h-pill", { opacity: 0, scale: 0.6, y: 10 }, { opacity: 1, scale: 1, y: 0, stagger: 0.07, duration: 1.2, ease: "back.out(1.2)" }, 0.85)
        .fromTo(".h-scroll", { opacity: 0 }, { opacity: 1, duration: 1 }, 1.3);

      /* ---- Elastic scroll hint bounce ---- */
      gsap.to(".h-scroll", { y: -5, repeat: -1, yoyo: true, duration: 2, ease: "sine.inOut", delay: 2.5 });

      /* ---- Magnetic nav logo ---- */
      const logo = document.querySelector<HTMLElement>(".nav-logo");
      if (logo) {
        logo.addEventListener("mouseenter", () => r.classList.add("hover"));
        logo.addEventListener("mouseleave", () => {
          r.classList.remove("hover");
          gsap.to(logo, { x: 0, y: 0, duration: 1, ease: "elastic.out(1,0.4)" });
        });
        logo.addEventListener("mousemove", (e) => {
          const lr = logo.getBoundingClientRect();
          const lx = e.clientX - lr.left - lr.width / 2;
          const ly = e.clientY - lr.top - lr.height / 2;
          gsap.to(logo, { x: lx * 0.35, y: ly * 0.35, duration: 0.4, ease: "power3.out", overwrite: "auto" });
        });
      }

      /* ---- Nav hide on scroll down / show on scroll up ---- */
      ScrollTrigger.create({
        onUpdate: (self) => {
          const dir = self.direction;
          const sy = self.scroll();
          if (sy > 100) {
            gsap.to(".h-bar", { yPercent: dir === 1 ? -110 : 0, duration: 0.6, ease: "power4.out", overwrite: "auto" });
          } else {
            gsap.to(".h-bar", { yPercent: 0, duration: 0.6, ease: "power4.out", overwrite: "auto" });
          }
        },
      });

      /* ---- Text scramble on headings hover ---- */
      document.querySelectorAll<HTMLElement>("[data-scramble]").forEach((el) => {
        const original = el.textContent || "";
        el.addEventListener("mouseenter", () => scrambleText(el, original, 500));
      });

      /* ---- Scroll-driven outline fill ---- */
      gsap.to(".text-white/90", { backgroundPosition: "0% 0%", ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 } });

      /* ---- Scroll parallax ---- */
      const hs = { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 };
      gsap.to(".h-mountain", { yPercent: 12, scale: 1.06, ease: "none", scrollTrigger: hs });
      gsap.to(photoR.current, { yPercent: -30, rotate: 5, ease: "none", scrollTrigger: hs });
      gsap.to(".h-spinner", { yPercent: -20, ease: "none", scrollTrigger: hs });
      gsap.to(".hero-content", { yPercent: 8, opacity: 0.2, ease: "none", scrollTrigger: { ...hs, end: "60% top" } });

      /* ---- Mountain divider parallax ---- */
      gsap.to(".mtn-divider img", { yPercent: -10, scale: 1.04, ease: "none", scrollTrigger: { trigger: ".mtn-divider", start: "top bottom", end: "bottom top", scrub: 1.2 } });

      /* ---- Horizontal scroll + card stagger ---- */
      if (hScrollR.current && hTrackR.current) {
        const hCards = hTrackR.current.querySelectorAll(".hs-card");
        gsap.set(hCards, { opacity: 0, y: 30, scale: 0.92, rotateY: -5 });
        gsap.to(hTrackR.current, {
          x: () => -(hTrackR.current!.scrollWidth - window.innerWidth + 100), ease: "none",
          scrollTrigger: {
            trigger: hScrollR.current, pin: true, scrub: 1.2,
            end: () => `+=${hTrackR.current!.scrollWidth - window.innerWidth + 100}`,
            onEnter: () => gsap.to(hCards, { opacity: 1, y: 0, scale: 1, rotateY: 0, stagger: 0.1, duration: 1.4, ease: "expo.out", delay: 0.15 }),
          },
        });
      }

      /* ---- Mountain divider wipe + text reveal ---- */
      ScrollTrigger.create({ trigger: ".mtn-divider", start: "top 80%", onEnter: () => {
        gsap.to(".mtn-divider", { clipPath: "inset(0% 0 0% 0)", duration: 1.2, ease: "expo.out" });
        gsap.fromTo(".mtn-word", { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.06, duration: 1, ease: "expo.out", delay: 0.3 });
      }, once: true });

      /* ---- Scroll-velocity skew on marquee + particle boost ---- */
      ScrollTrigger.create({ onUpdate: (self) => {
        const v = self.getVelocity();
        gsap.to(".marquee-track", { skewX: Math.max(-4, Math.min(4, v / 600)), duration: 0.8, ease: "power3.out", overwrite: "auto" });
        if (Math.abs(v) > 1000) particles?.boost(Math.abs(v) / 2500);
      }});

      /* ---- Marquee + cards ---- */
      ScrollTrigger.create({ trigger: ".mq", start: "top 90%", onEnter: () => gsap.fromTo(".mq", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8 }), once: true });
      ScrollTrigger.create({ trigger: ".cards-section", start: "top 82%", onEnter: () => {
        gsap.fromTo(".cards-head", { opacity: 0, y: 28 }, { opacity: 1, y: 0, stagger: 0.1, duration: 1.4, ease: "expo.out" });
        gsap.fromTo(".link-card", { opacity: 0, y: 40, scale: 0.94, rotateX: -5 }, { opacity: 1, y: 0, scale: 1, rotateX: 0, stagger: 0.08, duration: 1.6, ease: "expo.out", delay: 0.2, onComplete: attachHover });
      }, once: true });

      /* ---- Contact heading parallax ---- */
      gsap.to(".cards-head", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".cards-section", start: "top bottom", end: "top 20%", scrub: 1.2 } });

      /* ---- Stats counter + progress bars ---- */
      ScrollTrigger.create({ trigger: ".stats-section", start: "top 80%", onEnter: () => {
        document.querySelectorAll<HTMLElement>(".stat-num").forEach((el) => {
          const target = parseInt(el.dataset.target || "0");
          const suffix = el.dataset.suffix || "";
          const proxy = { val: 0 };
          gsap.to(proxy, {
            val: target, duration: 2, ease: "power2.out",
            onUpdate: () => { el.textContent = Math.round(proxy.val) + suffix; },
          });
        });
        gsap.fromTo(".stat-item", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: "expo.out" });
        /* ---- Stat progress bars ---- */
        document.querySelectorAll<HTMLElement>(".stat-bar-fill").forEach((bar) => {
          const pct = parseInt(bar.dataset.pct || "0");
          gsap.to(bar, { width: pct + "%", duration: 2.2, ease: "power3.out", delay: 0.3 });
        });
      }, once: true });

      /* ---- Scroll-to-top button ---- */
      const topBtn = document.createElement("button");
      topBtn.className = "scroll-top-btn";
      topBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>`;
      topBtn.setAttribute("aria-label", "Scroll to top");
      document.body.appendChild(topBtn);
      topBtn.addEventListener("click", () => { if (lenisR.current) lenisR.current.scrollTo(0, { duration: 2 }); });
      ScrollTrigger.create({
        trigger: page.current,
        start: "top+=300 top",
        onEnter: () => gsap.to(topBtn, { opacity: 1, scale: 1, pointerEvents: "auto", duration: 0.5, ease: "power3.out" }),
        onLeaveBack: () => gsap.to(topBtn, { opacity: 0, scale: 0.5, pointerEvents: "none", duration: 0.4, ease: "power3.in" }),
      });

      /* ---- Gyroscope parallax on mobile ---- */
      const onOrientation = (e: DeviceOrientationEvent) => {
        if (!e.beta || !e.gamma) return;
        const gx = Math.max(-30, Math.min(30, e.gamma || 0)) / 30;
        const gy = Math.max(-30, Math.min(30, e.beta || 0)) / 30;
        gsap.to(".h-mountain", { x: gx * -15, y: gy * -10, duration: 1.5, ease: "power2.out", overwrite: "auto" });
        gsap.to(".h-spinner", { x: gx * 20, y: gy * 15, duration: 1.8, ease: "power2.out", overwrite: "auto" });
      };
      if (typeof DeviceOrientationEvent !== "undefined" && "ontouchstart" in window) {
        window.addEventListener("deviceorientation", onOrientation);
      }



      /* ---- Section dot nav active tracking ---- */
      SECTIONS.forEach((sec, i) => {
        ScrollTrigger.create({
          trigger: "." + sec,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveDot(i),
          onEnterBack: () => setActiveDot(i),
        });
      });

      /* ---- Background color shift ---- */
      ScrollTrigger.create({
        trigger: page.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const prog = self.progress;
          const bgR = Math.round(10 + prog * 3);
          const bgG = Math.round(10 + prog * 2);
          const bgB = Math.round(10 + prog * 8);
          document.documentElement.style.setProperty("--bg", `rgb(${bgR},${bgG},${bgB})`);
          if (scrollPctEl) scrollPctEl.textContent = Math.round(prog * 100) + "%";
        },
      });



      const onKonami = null;

      /* ---- Keyboard shortcuts 1-6 jump to sections ---- */
      const onShortcut = (e: KeyboardEvent) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        const n = parseInt(e.key);
        if (n >= 1 && n <= SECTIONS.length) {
          const el = document.querySelector(`.${SECTIONS[n - 1]}`);
          if (el && lenisR.current) lenisR.current.scrollTo(el as HTMLElement, { duration: 1.8 });
          /* flash the dot */
          setActiveDot(n - 1);
        }
      };
      window.addEventListener("keydown", onShortcut);

      /* ---- Custom right-click context menu ---- */
      const ctxMenu = document.createElement("div");
      ctxMenu.className = "ctx-menu";
      ctxMenu.innerHTML = [
        { label: "Back to top", action: "top" },
        { label: "Copy email", action: "email" },
        { label: "GitHub", action: "https://github.com/BekhruzTursunboev" },
        { label: "LinkedIn", action: "https://www.linkedin.com/in/bexruztursunbayev" },
        { label: "Change accent", action: "accent" },
      ].map(item => `<button data-action="${item.action}">${item.label}</button>`).join("");
      document.body.appendChild(ctxMenu);

      const hideCtx = () => { ctxMenu.style.opacity = "0"; ctxMenu.style.pointerEvents = "none"; };
      const onCtx = (e: MouseEvent) => {
        e.preventDefault();
        ctxMenu.style.left = e.clientX + "px";
        ctxMenu.style.top = e.clientY + "px";
        ctxMenu.style.opacity = "1";
        ctxMenu.style.pointerEvents = "auto";
        gsap.fromTo(ctxMenu, { scale: 0.9, y: -5 }, { scale: 1, y: 0, duration: 0.2, ease: "power3.out" });
      };
      window.addEventListener("contextmenu", onCtx);
      window.addEventListener("click", hideCtx);
      window.addEventListener("scroll", hideCtx);

      let accentIdx = 0;
      ctxMenu.addEventListener("click", (e) => {
        const btn = (e.target as HTMLElement).closest("button");
        if (!btn) return;
        const action = btn.dataset.action || "";
        if (action === "top" && lenisR.current) lenisR.current.scrollTo(0, { duration: 2 });
        else if (action === "email") {
          navigator.clipboard.writeText("tursunbaevbexruz19@gmail.com");
          showToast("Email copied!");
        }
        else if (action === "accent") {
          accentIdx = (accentIdx + 1) % ACCENT_THEMES.length;
          const t = ACCENT_THEMES[accentIdx];
          document.documentElement.style.setProperty("--accent1", t.a1);
          document.documentElement.style.setProperty("--accent2", t.a2);
          document.documentElement.style.setProperty("--grad", `linear-gradient(135deg, ${t.a1}, ${t.a2})`);
          showToast(`Theme: ${t.a1}`);
        }
        else if (action.startsWith("http")) window.open(action, "_blank", "noopener,noreferrer");
        hideCtx();
      });

      /* ---- Toast utility ---- */
      function showToast(msg: string) {
        const t = document.createElement("div");
        t.className = "toast-notification";
        t.textContent = msg;
        document.body.appendChild(t);
        gsap.fromTo(t, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" });
        gsap.to(t, { y: -10, opacity: 0, duration: 0.3, delay: 2, ease: "power3.in", onComplete: () => t.remove() });
      }

      /* ---- Copy email on email card click ---- */
      document.querySelectorAll<HTMLAnchorElement>("a[href^='mailto:']").forEach((a) => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          navigator.clipboard.writeText("tursunbaevbexruz19@gmail.com");
          showToast("Email copied to clipboard!");
        });
      });

      /* ---- Accent color cycle on logo double-click ---- */
      if (logo) {
        logo.addEventListener("dblclick", () => {
          accentIdx = (accentIdx + 1) % ACCENT_THEMES.length;
          const t = ACCENT_THEMES[accentIdx];
          document.documentElement.style.setProperty("--accent1", t.a1);
          document.documentElement.style.setProperty("--accent2", t.a2);
          document.documentElement.style.setProperty("--grad", `linear-gradient(135deg, ${t.a1}, ${t.a2})`);
          showToast(`Accent: ${t.a1}`);
        });
      }

      /* ---- Double-click photo for lightbox ---- */
      if (photo) {
        photo.addEventListener("dblclick", () => {
          const lb = document.createElement("div");
          lb.style.cssText = "position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;cursor:none;";
          lb.innerHTML = `<img src="/gondola.jpg" alt="Mountain gondola — full view" style="max-width:85vw;max-height:85vh;border-radius:1rem;object-fit:contain;opacity:0;transform:scale(0.8)" />`;
          document.body.appendChild(lb);
          const img = lb.querySelector("img")!;
          gsap.to(img, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" });
          lb.addEventListener("click", () => {
            gsap.to(img, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power3.in" });
            gsap.to(lb, { opacity: 0, duration: 0.3, delay: 0.15, onComplete: () => lb.remove() });
          });
        });
      }

      /* ---- Footer slide-up ---- */
      ScrollTrigger.create({ trigger: ".site-footer", start: "top 95%", onEnter: () => {
        gsap.fromTo(".site-footer", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" });
      }, once: true });

      /* ---- Expertise card 3D tilt ---- */
      document.querySelectorAll<HTMLElement>(".hs-card").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const cr = card.getBoundingClientRect();
          const rx = ((e.clientX - cr.left) / cr.width - 0.5) * 10;
          const ry = ((e.clientY - cr.top) / cr.height - 0.5) * -8;
          gsap.to(card, { rotateY: rx, rotateX: ry, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotateY: 0, rotateX: 0, duration: 1, ease: "elastic.out(1,0.45)", overwrite: "auto" });
        });
      });

      return () => {
        window.removeEventListener("mousemove", onMouse);

        window.removeEventListener("mousedown", onDown);
        window.removeEventListener("mouseup", onUp);

        window.removeEventListener("keydown", onShortcut);
        window.removeEventListener("contextmenu", onCtx);
        window.removeEventListener("click", hideCtx);
        window.removeEventListener("scroll", hideCtx);
        window.removeEventListener("deviceorientation", onOrientation);
        ctxMenu.remove();
        topBtn.remove();
        if (dragMove) window.removeEventListener("mousemove", dragMove);
        if (dragUp) window.removeEventListener("mouseup", dragUp);
      };
    }, page);

    return () => { ctx.revert(); particles?.destroy(); gsap.ticker.remove(lenisRaf); lenis.destroy(); lenisR.current = null; };
  }, []);

  const splitChars = (text: string) => text.split("").map((c, i) => (
    <span key={i} className="mag-char inline-block will-change-transform" style={{ transformOrigin: "center center" }}>{c}</span>
  ));

  const splitVText = (text: string) => text.split("").map((c, i) => (
    <span key={i} className="v-char">{c}</span>
  ));

  return (
    <main ref={page} className="grain">
      {/* Intro overlay */}
      <div className="intro-overlay fixed inset-0 z-[10000] flex items-center justify-center" style={{ background: "var(--bg)" }} aria-hidden="true">
        <span className="intro-logo text-[2rem] sm:text-[3rem] font-black grad-text" style={{ fontFamily: "var(--font-syne)" }}>B.</span>
      </div>

      {/* SR-only site heading for SEO */}
      <h1 className="sr-only">Bekhruz Tursunbaev — Software Engineer, AI Architect, Full-Stack Developer based in Tashkent, Uzbekistan</h1>

      <div ref={progressR} className="scroll-progress w-full" />
      <div ref={dotR} className="cursor-dot" />
      <div ref={ringR} className="cursor-ring" />
      <span className="cursor-label" />
      <div ref={glowR} className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-[1]" style={{ background: "radial-gradient(circle, rgba(0,240,255,0.04) 0%, rgba(99,102,241,0.03) 40%, transparent 70%)", animation: "breathe 4s ease-in-out infinite" }} />
      <div ref={spotR} className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-[2] mix-blend-soft-light" style={{ background: "radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 60%)", transform: "translate(-50%, -50%)" }} data-spotlight />

      {/* Vertical side text */}
      <div className="v-text hidden lg:block" aria-hidden="true">{splitVText("41.2995°N · 69.2401°E · Tashkent · Est. 2016")}</div>

      {/* Section dot navigation */}
      <nav className="dot-nav hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-3" aria-label="Section navigation">
        {SECTIONS.map((sec, i) => (
          <button key={sec} onClick={() => { const target = document.querySelector(`.${sec}`); if (target && lenisR.current) lenisR.current.scrollTo(target as HTMLElement, { duration: 1.8 }); }} className={`dot-btn relative w-2.5 h-2.5 rounded-full transition-all duration-500 ${i === activeDot ? "bg-[var(--accent1)] scale-150 shadow-[0_0_8px_rgba(0,240,255,0.5)]" : "bg-white/10 hover:bg-white/25"}`} aria-label={`Go to section ${i + 1} (key: ${i + 1})`}>
            {i === activeDot && <span className="dot-ring absolute inset-[-4px] rounded-full border border-[var(--accent1)]/30 animate-[ping_2.5s_ease-out_infinite]" />}
          </button>
        ))}
        <span className="scroll-pct text-[0.35rem] tracking-[0.2em] text-white/15 mt-2 tabular-nums text-center" style={{ fontFamily: "var(--font-mono)" }} />
      </nav>

      {/* ============ FIXED NAV ============ */}
      <nav className="h-bar fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 sm:px-10 lg:px-16 py-6 backdrop-blur-md bg-[var(--bg)]/60" aria-label="Main navigation">
        <span className="nav-logo text-[1rem] font-black grad-text inline-block" style={{ fontFamily: "var(--font-syne)" }} data-hover aria-label="Bekhruz Tursunbaev">B.</span>
        <div className="flex items-center gap-3">
          <span className="relative flex items-center justify-center w-[8px] h-[8px]">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <span className="relative block w-[6px] h-[6px] rounded-full bg-emerald-400" />
          </span>
          <span className="text-[0.48rem] tracking-[0.5em] uppercase text-white/25" style={{ fontFamily: "var(--font-mono)" }}>Available for work</span>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="hero relative min-h-screen overflow-hidden flex items-center" style={{ background: "var(--bg)" }} aria-label="Introduction">
        {/* Mountain backdrop — parallax */}
        <div className="h-mountain absolute inset-0 z-0">
          <Image src="/mountain-dark.jpg" alt="" fill className="object-cover opacity-[0.12]" sizes="100vw" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, var(--bg) 0%, transparent 30%, transparent 60%, var(--bg) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, var(--bg) 0%, transparent 40%, transparent 70%, var(--bg) 100%)" }} />
        </div>
        <canvas ref={canvasR} className="absolute inset-0 z-[1] pointer-events-none" />



        <div className="hero-content relative z-10 w-full px-6 sm:px-10 lg:px-16 pt-24 pb-12">
          <div className="relative">
            <h2 className="text-[clamp(3rem,13vw,11rem)] font-black uppercase leading-[0.85] tracking-[-0.05em]" style={{ fontFamily: "var(--font-syne)" }} data-hover>
              <span className="block overflow-hidden"><span className="hero-name grad-text inline-block">BEKHRUZ</span></span>
              <span className="block overflow-hidden"><span className="hero-name inline-block text-white/90">TURSUNBAEV</span></span>
            </h2>

            {/* Draggable photo — static on mobile, absolute on sm+ */}
            <div ref={photoR} className="relative mt-6 sm:mt-0 sm:absolute sm:right-[5%] lg:right-[10%] sm:top-1/2 sm:-translate-y-1/2 z-20 select-none w-fit" style={{ animation: "float 6s ease-in-out infinite" }} data-hover data-cursor-text="Drag me">
              <div className="w-[100px] h-[140px] sm:w-[150px] sm:h-[210px] lg:w-[190px] lg:h-[265px] rounded-2xl overflow-hidden shadow-2xl relative">
                <Image src="/gondola.jpg" alt="Mountain gondola" fill className="object-cover pointer-events-none" sizes="(max-width:640px) 110px, (max-width:1024px) 150px, 190px" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-black/60 backdrop-blur-md rounded-full px-2 py-1 pointer-events-none">
                  <div className="relative w-4 h-4 rounded-full overflow-hidden ring-1 ring-white/20"><Image src="/profile.jpg" alt="" fill className="object-cover" sizes="16px" /></div>
                  <span className="text-[0.4rem] tracking-[0.1em] uppercase text-white/80 font-medium" style={{ fontFamily: "var(--font-mono)" }}>Tashkent, UZ</span>
                </div>
              </div>
            </div>

            <div className="h-spinner hidden sm:block absolute sm:right-[1%] lg:right-[5%] top-1/2 -translate-y-1/2 sm:w-[230px] sm:h-[230px] lg:w-[290px] lg:h-[290px] z-10 pointer-events-none">
              <svg viewBox="0 0 300 300" className="w-full h-full" style={{ animation: "spin-slow 22s linear infinite" }}>
                <defs><path id="cp" d="M150,150 m-120,0 a120,120 0 1,1 240,0 a120,120 0 1,1 -240,0" /></defs>
                <text className="fill-white/[0.07] text-[11px] uppercase tracking-[0.4em]" style={{ fontFamily: "var(--font-mono)" }}>
                  <textPath href="#cp">Coding since 12 \u00B7 AI Builder \u00B7 Full Stack \u00B7 Tashkent \u00B7 </textPath>
                </text>
              </svg>
            </div>
          </div>

          <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12 max-w-3xl">
            <p className="h-bio text-[0.8rem] sm:text-[0.88rem] text-white/50 font-light leading-relaxed max-w-sm">
              <span className="text-white/65 font-medium">{greeting || "Hello"}.</span> I&apos;m a <span className="text-white/65 font-medium"><RoleCycler /></span> — started coding at 12, landed my first paid client at 14. I build practical software and AI tools that solve clear problems.
            </p>
            <div className="flex flex-wrap gap-2">
              {["TypeScript", "Python", "AI / ML", "Next.js"].map((t) => (
                <span key={t} className="h-pill text-[0.5rem] tracking-[0.12em] text-white/30 border border-white/[0.08] rounded-full px-3 py-1.5 transition-all duration-300 hover:text-[var(--accent1)] hover:border-[var(--accent1)]/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]" style={{ fontFamily: "var(--font-mono)" }} data-hover>{t}</span>
              ))}
            </div>
          </div>
          <div className="h-scroll mt-16 sm:mt-20 flex items-center gap-3">
            <div className="w-8 h-px bg-gradient-to-r from-[var(--accent1)]/40 to-transparent" />
            <span className="text-[0.42rem] tracking-[0.5em] uppercase text-white/10" style={{ fontFamily: "var(--font-mono)" }}>Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* ============ MOUNTAIN DIVIDER ============ */}
      <div className="mtn-divider wipe-reveal relative h-[40vh] sm:h-[50vh] overflow-hidden" style={{ background: "var(--bg)" }}>
        <Image src="/mountain-peak.jpg" alt="" fill className="object-cover opacity-[0.18]" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, var(--bg) 0%, transparent 35%, transparent 65%, var(--bg) 100%)" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-[clamp(0.6rem,1.2vw,0.85rem)] tracking-[0.5em] uppercase text-white/15 text-center max-w-md px-6" style={{ fontFamily: "var(--font-mono)" }}>
            {"Clean engineering. Simple systems. Clear problems solved.".split(" ").map((w, i) => (<span key={i} className="mtn-word inline-block mx-[0.25em] opacity-0">{w}</span>))}
          </p>
        </div>
      </div>

      {/* ============ HORIZONTAL SCROLL ============ */}
      <div ref={hScrollR} className="hs-section relative overflow-hidden" style={{ background: "var(--bg)", height: "100vh" }}>
        <div ref={hTrackR} className="flex items-center gap-6 sm:gap-8 h-full px-6 sm:px-10 lg:px-16 will-change-transform" style={{ width: "max-content", perspective: "800px" }}>
          <div className="shrink-0 w-[280px] sm:w-[360px]">
            <p className="text-[0.48rem] tracking-[0.5em] uppercase text-[var(--accent1)]/35 mb-3" style={{ fontFamily: "var(--font-mono)" }}>What I do</p>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-black tracking-[-0.03em] leading-tight" style={{ fontFamily: "var(--font-syne)" }}>Areas of<br /><span className="grad-text">expertise</span>.</h2>
          </div>
          {SHOWCASE.map((item, i) => (
            <div key={item.title} className="hs-card shrink-0 w-[260px] sm:w-[320px] h-[200px] sm:h-[240px] grad-border clip-fill flex flex-col justify-end p-6 sm:p-8 bg-white/[0.015] group relative" style={{ transformStyle: "preserve-3d" }} data-hover>
              <span className="glitch-num text-[2rem] sm:text-[2.5rem] font-black text-white/[0.03] leading-none absolute top-4 right-5 transition-colors duration-400 group-hover:text-white/[0.06]" style={{ fontFamily: "var(--font-syne)" }}>{String(i + 1).padStart(2, "0")}</span>
              <p className="text-[1rem] sm:text-[1.15rem] font-bold text-white/55 transition-colors duration-300 group-hover:text-white" style={{ fontFamily: "var(--font-syne)" }} data-scramble>{item.title}</p>
              <p className="text-[0.55rem] tracking-[0.1em] text-white/12 mt-1 transition-colors duration-300 group-hover:text-white/25" style={{ fontFamily: "var(--font-mono)" }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ============ MARQUEE ============ */}
      <div className="mq relative py-5 border-y border-white/[0.04] overflow-hidden opacity-0" style={{ background: "var(--bg)" }}>
        <div className="marquee-track">
          {[...Array(6)].map((_, i) => <span key={i} className="text-[0.6rem] tracking-[0.35em] uppercase whitespace-nowrap px-6 text-white/5" style={{ fontFamily: "var(--font-mono)" }}>{MARQUEE}</span>)}
        </div>
      </div>

      {/* ============ STATS ============ */}
      <section className="stats-section relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16" style={{ background: "var(--bg)" }} aria-label="Statistics">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <p className="text-[0.48rem] tracking-[0.5em] uppercase text-[var(--accent1)]/35 mb-3" style={{ fontFamily: "var(--font-mono)" }}>In numbers</p>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-black tracking-[-0.03em] leading-tight" style={{ fontFamily: "var(--font-syne)" }}>Impact at a<br /><span className="grad-text" data-scramble>glance</span>.</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="stat-item text-center opacity-0 group" data-hover>
                <span className="stat-num block text-[clamp(2rem,5vw,3.5rem)] font-black grad-text leading-none transition-transform duration-300 group-hover:scale-110" data-target={s.value} data-suffix={s.suffix} style={{ fontFamily: "var(--font-syne)" }}>0{s.suffix}</span>
                <span className="block text-[0.5rem] tracking-[0.3em] uppercase text-white/15 mt-2 transition-colors duration-300 group-hover:text-white/30" style={{ fontFamily: "var(--font-mono)" }}>{s.label}</span>
                <div className="w-8 h-px mx-auto mt-3 bg-gradient-to-r from-transparent via-[var(--accent1)]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="cards-section relative py-24 sm:py-32 md:py-40 px-6 sm:px-10 lg:px-16" style={{ background: "var(--bg)" }} aria-label="Contact">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <p className="cards-head text-[0.48rem] tracking-[0.5em] uppercase text-[var(--accent1)]/40 mb-3" style={{ fontFamily: "var(--font-mono)" }}>Get in touch</p>
            <h2 className="cards-head text-[clamp(2rem,5vw,3.8rem)] font-black tracking-[-0.04em] leading-[1]" style={{ fontFamily: "var(--font-syne)" }}>
              Let&apos;s <span className="grad-text" data-scramble>build</span><br />something together.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {LINKS.map((link, i) => <LinkCard key={link.url} data={link} idx={i} />)}
          </div>
          <div className="site-footer flex flex-col sm:flex-row items-center justify-between mt-20 sm:mt-28 pt-5 border-t border-white/[0.04] gap-2 opacity-0">
            <span className="text-[0.45rem] tracking-[0.4em] uppercase text-white/6" style={{ fontFamily: "var(--font-mono)" }}>&copy; 2026 Bekhruz Tursunbaev</span>
            <span className="text-[0.45rem] tracking-[0.3em] uppercase text-white/6 tabular-nums" style={{ fontFamily: "var(--font-mono)" }}>{clock || "--:--:--"} · Tashkent</span>
          </div>
        </div>
      </section>
    </main>
  );
}
