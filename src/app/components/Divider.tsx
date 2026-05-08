"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Divider() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 75%",
        onEnter: () => {
          gsap.fromTo(".dv-line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.out", stagger: 0.06 });
          gsap.fromTo(".dv-el", { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "expo.out", delay: 0.2 });
        },
        once: true,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative py-20 sm:py-28 bg-[var(--bg)] overflow-hidden">
      {/* Subtle geometric accent */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-px h-24 bg-[var(--accent)]/[0.06]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
          <div className="dv-line w-8 sm:w-14 md:w-20 h-px bg-[var(--accent)]/25 origin-right" />
          <span className="dv-el text-[0.5rem] tracking-[0.5em] uppercase text-white/12" style={{ fontFamily: "var(--font-mono)" }}>
            Philosophy
          </span>
          <div className="dv-line w-8 sm:w-14 md:w-20 h-px bg-[var(--accent)]/25 origin-left" />
        </div>

        <p className="dv-el text-[clamp(1.2rem,2.8vw,2rem)] font-semibold tracking-[-0.02em] leading-snug" style={{ fontFamily: "var(--font-syne)" }}>
          Code with <span className="text-[var(--accent)]">clarity</span>.
          <br />
          Ship with purpose.
        </p>

        <p className="dv-el text-[0.7rem] sm:text-[0.78rem] text-white/18 mt-4 font-light tracking-wide">
          Mountains taught me patience. Coding taught me precision.
        </p>
      </div>
    </div>
  );
}
