"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Hero from "./components/Hero";
import Divider from "./components/Divider";
import Contact from "./components/Contact";

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE = [
  { title: "MulkTahlilchi", sub: "AI-powered property evaluator that analyzes real estate data to estimate quality, price, and investment potential.", tags: ["TypeScript", "Next.js", "AI"] },
  { title: "ZiyoBuddy", sub: "AI academic agent that helps students approach questions with quick and accurate answers.", tags: ["TypeScript", "OpenAI"] },
  { title: "Target School", sub: "Full website rebuild for Target International School. A 5-month project handling design, CMS, and deployment.", tags: ["Node.js", "Full-Stack"] },
  { title: "AI & Automation", sub: "LLMs, Computer Vision, and NLP pipelines for practical automation tools.", tags: ["Python", "ML"] },
  { title: "Content Creation", sub: "AI & Development tutorials building a community of learners on YouTube.", tags: ["YouTube", "Community"] },
];

const STATS = [
  { value: 10, suffix: "+", label: "Years coding" },
  { value: 5, suffix: "+", label: "Shipped projects" },
  { value: 3, suffix: "K+", label: "Lines of code" },
  { value: 14, suffix: "", label: "Age at first client" },
];

const MARQUEE = "BEKHRUZ TURSUNBAEV — CODING SINCE AGE 12 \u00B7 AI BUILDER \u00B7 FULL-STACK \u00B7 TASHKENT \u00B7 ";

export default function Home() {
  const page = useRef<HTMLElement>(null);
  const progressR = useRef<HTMLDivElement>(null);
  const dotR = useRef<HTMLDivElement>(null);
  const ringR = useRef<HTMLDivElement>(null);
  const introR = useRef<HTMLDivElement>(null);
  useEffect(() => {
    /* ---- Lenis smooth scroll ---- */
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time: number) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    /* ---- Cursor ---- */
    const dot = dotR.current;
    const ring = ringR.current;
    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId = 0;
    let onMove = (_e: MouseEvent) => {};
    let onEnter = () => {};
    let onLeave = () => {};

    if (dot && ring) {
      onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
      window.addEventListener("mousemove", onMove);

      const loop = () => {
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;
        dot.style.left = `${mx}px`; dot.style.top = `${my}px`;
        ring.style.left = `${rx}px`; ring.style.top = `${ry}px`;
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);

      onEnter = () => ring.classList.add("hover");
      onLeave = () => ring.classList.remove("hover");
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    }

    /* ---- Scroll progress ---- */
    if (progressR.current) {
      gsap.to(progressR.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: page.current, start: "top top", end: "bottom bottom", scrub: true },
      });
    }

    /* ---- Intro overlay ---- */
    if (introR.current) {
      gsap.to(introR.current, {
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.inOut",
        onComplete: () => { if (introR.current) introR.current.style.pointerEvents = "none"; },
      });
    }

    /* ---- Scroll-triggered reveals ---- */
    gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    /* ---- Stats counter ---- */
    ScrollTrigger.create({
      trigger: ".stats-section",
      start: "top 80%",
      onEnter: () => {
        document.querySelectorAll<HTMLElement>(".stat-num").forEach((el) => {
          const target = parseInt(el.dataset.target || "0");
          const suffix = el.dataset.suffix || "";
          const proxy = { val: 0 };
          gsap.to(proxy, {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => { el.textContent = Math.round(proxy.val) + suffix; },
          });
        });
      },
      once: true,
    });

    /* ---- Showcase cards stagger ---- */
    ScrollTrigger.create({
      trigger: ".showcase-section",
      start: "top 75%",
      onEnter: () => {
        gsap.fromTo(".showcase-card", { opacity: 0, y: 36 }, { opacity: 1, y: 0, stagger: 0.08, duration: 1, ease: "expo.out" });
      },
      once: true,
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main ref={page} className="grain">
      {/* Intro overlay */}
      <div ref={introR} className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--bg)]" aria-hidden="true">
        <span className="text-[1.1rem] font-medium tracking-[0.35em] uppercase text-white/30" style={{ fontFamily: "var(--font-mono)" }}>bekhruz.</span>
      </div>

      {/* Scroll progress */}
      <div ref={progressR} className="scroll-progress w-full" style={{ transform: "scaleX(0)" }} />

      {/* Custom cursor */}
      <div ref={dotR} className="cursor-dot" />
      <div ref={ringR} className="cursor-ring" />

      {/* Fixed nav */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5 backdrop-blur-xl bg-[var(--bg)]/60 border-b border-white/[0.03]" aria-label="Main navigation">
        <span className="text-[0.85rem] font-semibold text-white/80 tracking-[-0.02em]" style={{ fontFamily: "var(--font-syne)" }} data-hover>bekhruz.</span>
        <div className="flex items-center gap-2.5">
          <span className="block w-[5px] h-[5px] rounded-full bg-emerald-400/70" />
          <span className="text-[0.48rem] tracking-[0.3em] uppercase text-white/25" style={{ fontFamily: "var(--font-mono)" }}>Available</span>
        </div>
      </nav>

      <Hero />

      <Divider />

      {/* Showcase / Expertise */}
      <section className="showcase-section relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[var(--bg)]" aria-label="Projects">
        <div className="max-w-6xl mx-auto">
          <div className="reveal-up mb-16 sm:mb-20">
            <p className="text-[0.5rem] tracking-[0.4em] uppercase text-white/20 mb-4" style={{ fontFamily: "var(--font-mono)" }}>Selected work</p>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-black tracking-[-0.03em] leading-tight text-white/90" style={{ fontFamily: "var(--font-syne)" }}>
              Projects &<br /><span className="accent-text">expertise</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {SHOWCASE.map((item, i) => (
              <div key={item.title} className="showcase-card group relative rounded-2xl border border-white/[0.04] bg-white/[0.02] p-6 sm:p-8 transition-all duration-500 hover:border-white/[0.08] hover:bg-white/[0.03]" data-hover>
                <span className="text-[2.5rem] font-black text-white/[0.04] leading-none absolute top-5 right-6" style={{ fontFamily: "var(--font-syne)" }}>{String(i + 1).padStart(2, "0")}</span>
                <div className="relative z-10">
                  <h3 className="text-[1.05rem] sm:text-[1.15rem] font-semibold text-white/70 mb-2 transition-colors duration-500 group-hover:text-white/90" style={{ fontFamily: "var(--font-syne)" }}>
                    {item.title}
                  </h3>
                  <p className="text-[0.75rem] text-white/25 font-light leading-relaxed mb-5">
                    {item.sub}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[0.48rem] tracking-[0.12em] uppercase text-white/18 border border-white/[0.06] rounded-full px-2.5 py-1" style={{ fontFamily: "var(--font-mono)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="relative py-6 border-y border-white/[0.03] overflow-hidden bg-[var(--bg)]">
        <div className="marquee-track">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[0.55rem] tracking-[0.4em] uppercase whitespace-nowrap px-8 text-white/[0.06]" style={{ fontFamily: "var(--font-mono)" }}>
              {MARQUEE}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="stats-section relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[var(--bg)]" aria-label="Statistics">
        <div className="max-w-5xl mx-auto">
          <div className="reveal-up mb-16 sm:mb-20">
            <p className="text-[0.5rem] tracking-[0.4em] uppercase text-white/20 mb-4" style={{ fontFamily: "var(--font-mono)" }}>In numbers</p>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-black tracking-[-0.03em] leading-tight text-white/90" style={{ fontFamily: "var(--font-syne)" }}>
              Impact at a<br /><span className="accent-text">glance</span>.
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {STATS.map((s) => (
              <div key={s.label} className="reveal-up text-center group" data-hover>
                <span className="stat-num block text-[clamp(2.2rem,5vw,3.5rem)] font-black text-white/90 leading-none" data-target={s.value} data-suffix={s.suffix} style={{ fontFamily: "var(--font-syne)" }}>
                  0{s.suffix}
                </span>
                <span className="block text-[0.55rem] tracking-[0.25em] uppercase text-white/20 mt-3" style={{ fontFamily: "var(--font-mono)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
