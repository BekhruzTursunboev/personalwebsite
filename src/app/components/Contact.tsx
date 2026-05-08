"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   LINK DATA
   ============================================================ */
const LINKS = [
  {
    label: "GitHub",
    handle: "BekhruzTursunboev",
    url: "https://github.com/BekhruzTursunboev",
    icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
    fill: true,
  },
  {
    label: "YouTube",
    handle: "@BexruzTursunboev",
    url: "https://www.youtube.com/@BexruzTursunboev",
    icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    fill: true,
  },
  {
    label: "BekhruzAI Channel",
    handle: "t.me/bekhruzAI",
    url: "https://t.me/bekhruzAI",
    icon: "M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
    fill: true,
  },
  {
    label: "Telegram",
    handle: "@tursunboevbekhruz",
    url: "https://t.me/tursunboevbekhruz",
    icon: "M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
    fill: true,
  },
  {
    label: "Email",
    handle: "tursunbaevbexruz19@gmail.com",
    url: "mailto:tursunbaevbexruz19@gmail.com",
    icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
    fill: false,
  },
];

/* ============================================================
   SINGLE LINK COMPONENT
   ============================================================ */
function LinkItem({ data, idx }: { data: (typeof LINKS)[number]; idx: number }) {
  const el = useRef<HTMLAnchorElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    const a = el.current;
    if (!a) return;
    const r = a.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.08;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.05;
    gsap.to(a, { x: dx, y: dy, duration: 0.25, ease: "power2.out" });
  }, []);

  const onLeave = useCallback(() => {
    gsap.to(el.current, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1,0.5)" });
  }, []);

  return (
    <a
      ref={el}
      href={data.url}
      target={data.url.startsWith("mailto:") ? undefined : "_blank"}
      rel={data.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="ct-link group block py-4 border-b border-white/[0.04] will-change-transform transition-all duration-300 hover:border-[var(--accent)]/20 hover:pl-2"
    >
      <div className="flex items-center gap-4">
        {/* Index */}
        <span className="text-[0.55rem] tabular-nums text-white/10 w-4 shrink-0" style={{ fontFamily: "var(--font-mono)" }}>
          {String(idx + 1).padStart(2, "0")}
        </span>

        {/* Icon circle */}
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.03] text-[var(--accent)]/30 transition-all duration-300 group-hover:bg-[var(--accent)]/15 group-hover:text-[var(--accent)] group-hover:scale-110 shrink-0">
          <svg
            viewBox="0 0 24 24"
            className="w-[14px] h-[14px]"
            fill={data.fill ? "currentColor" : "none"}
            stroke={data.fill ? "none" : "currentColor"}
            strokeWidth={data.fill ? 0 : 1.5}
          >
            <path d={data.icon} />
          </svg>
        </span>

        {/* Label */}
        <span className="text-[0.85rem] sm:text-[0.92rem] font-medium text-white/50 transition-colors duration-300 group-hover:text-white flex-1" style={{ fontFamily: "var(--font-syne)" }}>
          {data.label}
        </span>

        {/* Arrow */}
        <svg className="w-4 h-4 text-white/6 shrink-0 transition-all duration-300 group-hover:text-[var(--accent)] group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>

      {/* Handle underneath */}
      <span className="block text-[0.52rem] tracking-[0.15em] text-white/10 mt-1 ml-[4.5rem] transition-colors duration-300 group-hover:text-white/20" style={{ fontFamily: "var(--font-mono)" }}>
        {data.handle}
      </span>
    </a>
  );
}

/* ============================================================
   MAIN CONTACT — two-column editorial
   ============================================================ */
export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(".ct-left", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out" });
          gsap.fromTo(".ct-link", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: "expo.out", delay: 0.15 });
          gsap.fromTo(".ct-footer", { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.6 });
        },
        once: true,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-[var(--bg)] py-24 sm:py-32 md:py-40">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[var(--bg)] to-transparent pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 max-w-6xl mx-auto">
        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20">

          {/* LEFT — heading + description */}
          <div className="ct-left">
            <p className="text-[0.55rem] tracking-[0.5em] uppercase text-[var(--accent)]/40 mb-4" style={{ fontFamily: "var(--font-mono)" }}>
              Protocol / External Links
            </p>
            <h2 className="text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-6" style={{ fontFamily: "var(--font-syne)" }}>
              Let&apos;s build<br />
              <span className="text-[var(--accent)]">something</span> together.
            </h2>
            <p className="text-[0.82rem] text-white/25 font-light leading-relaxed max-w-sm">
              Whether it&apos;s a collaboration, freelance project, or just to say hello &mdash; I&apos;m always open to connecting with like-minded people.
            </p>

            {/* Availability badge */}
            <div className="flex items-center gap-3 mt-8 px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.05] w-fit">
              <span className="block w-2 h-2 rounded-full bg-emerald-500 animate-[pulse-dot_2s_ease-in-out_infinite]" />
              <span className="text-[0.6rem] tracking-[0.3em] uppercase text-white/30" style={{ fontFamily: "var(--font-mono)" }}>
                Currently available
              </span>
            </div>
          </div>

          {/* RIGHT — links list */}
          <div>
            {LINKS.map((link, i) => (
              <LinkItem key={link.url} data={link} idx={i} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="ct-footer flex items-center justify-between mt-24 sm:mt-32 pt-6 border-t border-white/[0.04]">
          <p className="text-[0.5rem] tracking-[0.4em] uppercase text-white/8" style={{ fontFamily: "var(--font-mono)" }}>
            &copy; 2026
          </p>
          <p className="text-[0.5rem] tracking-[0.3em] uppercase text-white/8" style={{ fontFamily: "var(--font-mono)" }}>
            Designed &amp; built by Bekhruz
          </p>
        </div>
      </div>
    </section>
  );
}
