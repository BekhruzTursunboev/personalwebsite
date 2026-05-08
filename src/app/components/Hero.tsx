"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(".hero-img", { opacity: 0, x: -40, scale: 1.05 }, { opacity: 1, x: 0, scale: 1, duration: 1.6 })
        .fromTo(".hero-label", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, "-=1.0")
        .fromTo(".hero-name", { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.12, duration: 1.2 }, "-=0.8")
        .fromTo(".hero-detail", { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.9 }, "-=0.7")
        .fromTo(".hero-bio", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .fromTo(".hero-scroll", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative min-h-screen bg-[var(--bg)] overflow-hidden"
    >
      {/* ===== Subtle gradient bg ===== */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(201,136,92,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 80% 20%, rgba(201,136,92,0.03) 0%, transparent 60%)"
      }} />

      {/* ===== Main grid ===== */}
      <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-[minmax(280px,420px)_1fr] gap-0">

        {/* ===== LEFT — Gondola image ===== */}
        <div className="hero-img relative hidden lg:block">
          <Image
            src="/gondola.jpg"
            alt="Mountain gondola"
            fill
            priority
            className="object-cover"
            sizes="420px"
          />
          {/* dark overlay on image */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to right, transparent 0%, var(--bg) 100%), linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.6) 100%)"
          }} />

          {/* Profile photo overlapping the image */}
          <div className="absolute bottom-12 right-[-36px] w-[72px] h-[96px] rounded-lg overflow-hidden shadow-2xl ring-2 ring-[var(--bg)] z-20">
            <Image
              src="/profile.jpg"
              alt="Bekhruz"
              fill
              className="object-cover object-top"
              sizes="72px"
            />
          </div>
        </div>

        {/* ===== RIGHT — Content ===== */}
        <div className="flex flex-col justify-between px-6 sm:px-10 lg:px-16 py-10 sm:py-14 lg:py-16 min-h-screen">

          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="hero-label flex items-center gap-3">
              <span className="block w-[6px] h-[6px] rounded-full bg-[var(--accent)] animate-[pulse-dot_2.4s_ease-in-out_infinite]" />
              <span className="text-[0.55rem] tracking-[0.45em] uppercase text-[var(--fg)]/20" style={{ fontFamily: "var(--font-mono)" }}>
                Open to work
              </span>
            </div>
            <span className="hero-label text-[0.5rem] tracking-[0.35em] uppercase text-[var(--fg)]/12 hidden sm:block" style={{ fontFamily: "var(--font-mono)" }}>
              Tashkent, UZ
            </span>
          </div>

          {/* Center — Name + details */}
          <div className="my-auto lg:my-0 lg:mt-auto">
            {/* Mobile: profile photo */}
            <div className="hero-img lg:hidden mb-6 flex items-center gap-4">
              <div className="relative w-14 h-[72px] rounded-lg overflow-hidden shadow-xl shrink-0">
                <Image src="/profile.jpg" alt="Bekhruz" fill className="object-cover object-top" sizes="56px" />
              </div>
              <div className="relative w-20 h-14 rounded-lg overflow-hidden shadow-xl shrink-0 opacity-60">
                <Image src="/gondola.jpg" alt="Mountains" fill className="object-cover" sizes="80px" />
              </div>
            </div>

            {/* Label */}
            <div className="hero-detail flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-[var(--accent)]/50" />
              <span className="text-[0.58rem] tracking-[0.35em] uppercase text-[var(--accent)]/60" style={{ fontFamily: "var(--font-mono)" }}>
                Software Engineer
              </span>
            </div>

            {/* Name */}
            <h1 style={{ fontFamily: "var(--font-syne)" }}>
              <span className="hero-name block text-[clamp(2.8rem,8vw,6.5rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-[var(--fg)]">
                Bekhruz
              </span>
              <span className="hero-name block text-[clamp(2.8rem,8vw,6.5rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-[var(--accent)]">
                Tursunbaev
              </span>
            </h1>

            {/* Detail pills */}
            <div className="flex flex-wrap items-center gap-3 mt-5 sm:mt-7">
              <span className="hero-detail text-[0.58rem] tracking-[0.15em] text-[var(--fg)]/18 border border-[var(--fg)]/8 rounded-full px-3 py-1" style={{ fontFamily: "var(--font-mono)" }}>
                10+ years
              </span>
              <span className="hero-detail text-[0.58rem] tracking-[0.15em] text-[var(--fg)]/18 border border-[var(--fg)]/8 rounded-full px-3 py-1" style={{ fontFamily: "var(--font-mono)" }}>
                Full-Stack
              </span>
              <span className="hero-detail text-[0.58rem] tracking-[0.15em] text-[var(--fg)]/18 border border-[var(--fg)]/8 rounded-full px-3 py-1" style={{ fontFamily: "var(--font-mono)" }}>
                AI / Automation
              </span>
            </div>

            {/* Bio */}
            <p className="hero-bio text-[0.82rem] sm:text-[0.88rem] text-[var(--fg)]/30 font-light leading-relaxed mt-6 max-w-md">
              Based in <span className="text-[var(--fg)]/50 font-normal">Tashkent, Uzbekistan</span>. Full-stack software engineer. Passionate about building scalable and efficient systems, AI and esports.
            </p>
          </div>

          {/* Bottom — scroll */}
          <div className="hero-scroll flex items-center gap-3 mt-10 lg:mt-0">
            <div className="w-px h-8 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-b from-[var(--accent)]/50 to-transparent animate-[slide-down_2.2s_ease-in-out_infinite]" />
            </div>
            <span className="text-[0.48rem] tracking-[0.5em] uppercase text-[var(--fg)]/12" style={{ fontFamily: "var(--font-mono)" }}>
              Scroll down
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
