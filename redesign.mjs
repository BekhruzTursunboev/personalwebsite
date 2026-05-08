import { readFileSync, writeFileSync } from 'fs';

// ====================== PAGE.TSX REDESIGN ======================
const pageFile = 'd:/youtubeuchun/shaxsiy/website/src/app/page.tsx';
let page = readFileSync(pageFile, 'utf8');

// 1. Replace hero section — remove mountain bg, spinner, floating photo
// Replace the entire hero section with a clean, bold design
page = page.replace(
  `      {/* ============ HERO ============ */}
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
      </section>`,
  `      {/* ============ HERO ============ */}
      <section className="hero relative min-h-screen overflow-hidden flex items-end" style={{ background: "var(--bg)" }} aria-label="Introduction">
        {/* Subtle gradient mesh — inspired by curated dark sites */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, var(--accent1), transparent 70%)", filter: "blur(80px)" }} />
          <div className="absolute bottom-[-30%] left-[-15%] w-[60vw] h-[60vw] rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, var(--accent2), transparent 70%)", filter: "blur(100px)" }} />
        </div>
        <canvas ref={canvasR} className="absolute inset-0 z-[1] pointer-events-none opacity-60" />

        <div className="hero-content relative z-10 w-full px-6 sm:px-10 lg:px-16 pb-16 sm:pb-24 pt-32 sm:pt-40">
          {/* Overline */}
          <p className="h-bio text-[0.6rem] sm:text-[0.65rem] tracking-[0.4em] uppercase text-white/25 mb-6 sm:mb-8" style={{ fontFamily: "var(--font-mono)" }}>
            Software Engineer &middot; AI Builder &middot; Tashkent
          </p>

          {/* Main heading — bold, clean, left-aligned */}
          <h2 className="text-[clamp(2.8rem,11vw,9rem)] font-black leading-[0.9] tracking-[-0.04em]" style={{ fontFamily: "var(--font-syne)" }} data-hover>
            <span className="block overflow-hidden"><span className="hero-name inline-block text-white/95">Bekhruz</span></span>
            <span className="block overflow-hidden"><span className="hero-name grad-text inline-block">Tursunbaev</span></span>
          </h2>

          {/* Subline — concise, elegant */}
          <p className="h-bio mt-8 sm:mt-10 text-[0.85rem] sm:text-[1rem] text-white/40 font-light leading-[1.7] max-w-lg">
            I design and build <span className="text-white/70">practical software</span> and <span className="text-white/70">AI tools</span> that solve clear problems. Started at 12, first paid client at 14.
          </p>

          {/* Minimal tech tags */}
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-2.5">
            {["TypeScript", "Python", "AI / ML", "Next.js", "Full-Stack"].map((t) => (
              <span key={t} className="h-pill text-[0.55rem] tracking-[0.08em] text-white/30 border border-white/[0.06] rounded-full px-4 py-2 transition-all duration-500 hover:text-white/70 hover:border-white/20 hover:bg-white/[0.03]" style={{ fontFamily: "var(--font-mono)" }} data-hover>{t}</span>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="h-scroll mt-20 sm:mt-28 flex items-center gap-3 opacity-40">
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
            <span className="text-[0.4rem] tracking-[0.5em] uppercase text-white/20" style={{ fontFamily: "var(--font-mono)" }}>Scroll</span>
          </div>
        </div>
      </section>`
);

// 2. Replace mountain divider — clean separator instead of mountain image
page = page.replace(
  `      {/* ============ MOUNTAIN DIVIDER ============ */}
      <div className="mtn-divider wipe-reveal relative h-[40vh] sm:h-[50vh] overflow-hidden" style={{ background: "var(--bg)" }}>
        <Image src="/mountain-peak.jpg" alt="" fill className="object-cover opacity-[0.18]" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, var(--bg) 0%, transparent 35%, transparent 65%, var(--bg) 100%)" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-[clamp(0.6rem,1.2vw,0.85rem)] tracking-[0.5em] uppercase text-white/15 text-center max-w-md px-6" style={{ fontFamily: "var(--font-mono)" }}>
            {"Clean engineering. Simple systems. Clear problems solved.".split(" ").map((w, i) => (<span key={i} className="mtn-word inline-block mx-[0.25em] opacity-0">{w}</span>))}
          </p>
        </div>
      </div>`,
  `      {/* ============ DIVIDER ============ */}
      <div className="mtn-divider relative py-24 sm:py-32 overflow-hidden" style={{ background: "var(--bg)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-16" />
          <p className="text-[clamp(1.2rem,2.5vw,2rem)] font-light text-white/20 leading-[1.6] max-w-2xl" style={{ fontFamily: "var(--font-syne)" }}>
            {"Clean engineering. Simple systems. Clear problems solved.".split(" ").map((w, i) => (<span key={i} className="mtn-word inline-block mr-[0.3em] opacity-0">{w}</span>))}
          </p>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mt-16" />
        </div>
      </div>`
);

// 3. Make horizontal scroll section cleaner
page = page.replace(
  `          <div className="shrink-0 w-[280px] sm:w-[360px]">
            <p className="text-[0.48rem] tracking-[0.5em] uppercase text-[var(--accent1)]/35 mb-3" style={{ fontFamily: "var(--font-mono)" }}>What I do</p>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-black tracking-[-0.03em] leading-tight" style={{ fontFamily: "var(--font-syne)" }}>Areas of<br /><span className="grad-text">expertise</span>.</h2>
          </div>`,
  `          <div className="shrink-0 w-[280px] sm:w-[360px]">
            <p className="text-[0.5rem] tracking-[0.4em] uppercase text-white/20 mb-4" style={{ fontFamily: "var(--font-mono)" }}>What I do</p>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-black tracking-[-0.03em] leading-tight text-white/90" style={{ fontFamily: "var(--font-syne)" }}>Areas of<br /><span className="grad-text">expertise</span>.</h2>
          </div>`
);

// 4. Clean up expertise cards to be more minimal
page = page.replace(
  `            <div key={item.title} className="hs-card shrink-0 w-[260px] sm:w-[320px] h-[200px] sm:h-[240px] grad-border clip-fill flex flex-col justify-end p-6 sm:p-8 bg-white/[0.015] group relative" style={{ transformStyle: "preserve-3d" }} data-hover>
              <span className="glitch-num text-[2rem] sm:text-[2.5rem] font-black text-white/[0.03] leading-none absolute top-4 right-5 transition-colors duration-400 group-hover:text-white/[0.06]" style={{ fontFamily: "var(--font-syne)" }}>{String(i + 1).padStart(2, "0")}</span>
              <p className="text-[1rem] sm:text-[1.15rem] font-bold text-white/55 transition-colors duration-300 group-hover:text-white" style={{ fontFamily: "var(--font-syne)" }} data-scramble>{item.title}</p>
              <p className="text-[0.55rem] tracking-[0.1em] text-white/12 mt-1 transition-colors duration-300 group-hover:text-white/25" style={{ fontFamily: "var(--font-mono)" }}>{item.sub}</p>
            </div>`,
  `            <div key={item.title} className="hs-card shrink-0 w-[260px] sm:w-[320px] h-[200px] sm:h-[240px] rounded-2xl border border-white/[0.04] flex flex-col justify-end p-6 sm:p-8 bg-white/[0.02] backdrop-blur-sm group relative transition-all duration-500 hover:border-white/[0.08] hover:bg-white/[0.04]" style={{ transformStyle: "preserve-3d" }} data-hover>
              <span className="text-[2rem] sm:text-[2.5rem] font-black text-white/[0.04] leading-none absolute top-5 right-6" style={{ fontFamily: "var(--font-syne)" }}>{String(i + 1).padStart(2, "0")}</span>
              <p className="text-[1rem] sm:text-[1.1rem] font-semibold text-white/60 transition-colors duration-500 group-hover:text-white/90" style={{ fontFamily: "var(--font-syne)" }} data-scramble>{item.title}</p>
              <p className="text-[0.6rem] tracking-[0.08em] text-white/15 mt-2 transition-colors duration-500 group-hover:text-white/35" style={{ fontFamily: "var(--font-mono)" }}>{item.sub}</p>
            </div>`
);

// 5. Clean up stats section
page = page.replace(
  `          <div className="mb-10 sm:mb-14">
            <p className="text-[0.48rem] tracking-[0.5em] uppercase text-[var(--accent1)]/35 mb-3" style={{ fontFamily: "var(--font-mono)" }}>In numbers</p>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-black tracking-[-0.03em] leading-tight" style={{ fontFamily: "var(--font-syne)" }}>Impact at a<br /><span className="grad-text" data-scramble>glance</span>.</h2>
          </div>`,
  `          <div className="mb-12 sm:mb-16">
            <p className="text-[0.5rem] tracking-[0.4em] uppercase text-white/20 mb-4" style={{ fontFamily: "var(--font-mono)" }}>In numbers</p>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-black tracking-[-0.03em] leading-tight text-white/90" style={{ fontFamily: "var(--font-syne)" }}>Impact at a<br /><span className="grad-text" data-scramble>glance</span>.</h2>
          </div>`
);

// 6. Stat items — more minimal
page = page.replace(
  `              <div key={s.label} className="stat-item text-center opacity-0 group" data-hover>
                <span className="stat-num block text-[clamp(2rem,5vw,3.5rem)] font-black grad-text leading-none transition-transform duration-300 group-hover:scale-110" data-target={s.value} data-suffix={s.suffix} style={{ fontFamily: "var(--font-syne)" }}>0{s.suffix}</span>
                <span className="block text-[0.5rem] tracking-[0.3em] uppercase text-white/15 mt-2 transition-colors duration-300 group-hover:text-white/30" style={{ fontFamily: "var(--font-mono)" }}>{s.label}</span>
                <div className="w-8 h-px mx-auto mt-3 bg-gradient-to-r from-transparent via-[var(--accent1)]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>`,
  `              <div key={s.label} className="stat-item text-center opacity-0 group" data-hover>
                <span className="stat-num block text-[clamp(2rem,5vw,3.5rem)] font-black text-white/90 leading-none transition-transform duration-500 group-hover:scale-105" data-target={s.value} data-suffix={s.suffix} style={{ fontFamily: "var(--font-syne)" }}>0{s.suffix}</span>
                <span className="block text-[0.55rem] tracking-[0.25em] uppercase text-white/20 mt-3 transition-colors duration-500 group-hover:text-white/40" style={{ fontFamily: "var(--font-mono)" }}>{s.label}</span>
              </div>`
);

// 7. Contact section — cleaner
page = page.replace(
  `          <div className="mb-12 sm:mb-16">
            <p className="cards-head text-[0.48rem] tracking-[0.5em] uppercase text-[var(--accent1)]/40 mb-3" style={{ fontFamily: "var(--font-mono)" }}>Get in touch</p>
            <h2 className="cards-head text-[clamp(2rem,5vw,3.8rem)] font-black tracking-[-0.04em] leading-[1]" style={{ fontFamily: "var(--font-syne)" }}>
              Let&apos;s <span className="grad-text" data-scramble>build</span><br />something together.
            </h2>
          </div>`,
  `          <div className="mb-12 sm:mb-16">
            <p className="cards-head text-[0.5rem] tracking-[0.4em] uppercase text-white/20 mb-4" style={{ fontFamily: "var(--font-mono)" }}>Get in touch</p>
            <h2 className="cards-head text-[clamp(2rem,5vw,3.8rem)] font-black tracking-[-0.04em] leading-[1] text-white/90" style={{ fontFamily: "var(--font-syne)" }}>
              Let&apos;s <span className="grad-text" data-scramble>build</span><br />something together.
            </h2>
          </div>`
);

// 8. Simplify nav — remove ping beacon, keep minimal status
page = page.replace(
  `      <nav className="h-bar fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 sm:px-10 lg:px-16 py-6 backdrop-blur-md bg-[var(--bg)]/60" aria-label="Main navigation">
        <span className="nav-logo text-[1rem] font-black grad-text inline-block" style={{ fontFamily: "var(--font-syne)" }} data-hover aria-label="Bekhruz Tursunbaev">B.</span>
        <div className="flex items-center gap-3">
          <span className="relative flex items-center justify-center w-[8px] h-[8px]">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <span className="relative block w-[6px] h-[6px] rounded-full bg-emerald-400" />
          </span>
          <span className="text-[0.48rem] tracking-[0.5em] uppercase text-white/25" style={{ fontFamily: "var(--font-mono)" }}>Available for work</span>
        </div>
      </nav>`,
  `      <nav className="h-bar fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5 backdrop-blur-xl bg-[var(--bg)]/70 border-b border-white/[0.03]" aria-label="Main navigation">
        <span className="nav-logo text-[0.9rem] font-black text-white/90 inline-block" style={{ fontFamily: "var(--font-syne)" }} data-hover aria-label="Bekhruz Tursunbaev">bekhruz.</span>
        <div className="flex items-center gap-2.5">
          <span className="block w-[5px] h-[5px] rounded-full bg-emerald-400/80" />
          <span className="text-[0.5rem] tracking-[0.3em] uppercase text-white/30" style={{ fontFamily: "var(--font-mono)" }}>Available</span>
        </div>
      </nav>`
);

// 9. Remove the glow blob and spotlight — too decorative
page = page.replace(
  `      <div ref={glowR} className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-[1]" style={{ background: "radial-gradient(circle, rgba(0,240,255,0.04) 0%, rgba(99,102,241,0.03) 40%, transparent 70%)", animation: "breathe 4s ease-in-out infinite" }} />
      <div ref={spotR} className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-[2] mix-blend-soft-light" style={{ background: "radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 60%)", transform: "translate(-50%, -50%)" }} data-spotlight />`,
  `      <div ref={glowR} className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-[1] opacity-50" style={{ background: "radial-gradient(circle, rgba(0,240,255,0.03) 0%, transparent 70%)" }} />
      <div ref={spotR} className="fixed w-[250px] h-[250px] rounded-full pointer-events-none z-[2] opacity-30 mix-blend-soft-light" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)", transform: "translate(-50%, -50%)" }} data-spotlight />`
);

// 10. Footer cleaner
page = page.replace(
  `          <div className="site-footer flex flex-col sm:flex-row items-center justify-between mt-20 sm:mt-28 pt-5 border-t border-white/[0.04] gap-2 opacity-0">
            <span className="text-[0.45rem] tracking-[0.4em] uppercase text-white/6" style={{ fontFamily: "var(--font-mono)" }}>&copy; 2026 Bekhruz Tursunbaev</span>
            <span className="text-[0.45rem] tracking-[0.3em] uppercase text-white/6 tabular-nums" style={{ fontFamily: "var(--font-mono)" }}>{clock || "--:--:--"} · Tashkent</span>
          </div>`,
  `          <div className="site-footer flex flex-col sm:flex-row items-center justify-between mt-20 sm:mt-28 pt-6 border-t border-white/[0.05] gap-3 opacity-0">
            <span className="text-[0.5rem] tracking-[0.3em] uppercase text-white/15" style={{ fontFamily: "var(--font-mono)" }}>&copy; 2026 Bekhruz Tursunbaev</span>
            <span className="text-[0.5rem] tracking-[0.2em] uppercase text-white/15 tabular-nums" style={{ fontFamily: "var(--font-mono)" }}>{clock || "--:--:--"} &middot; Tashkent</span>
          </div>`
);

// 11. Intro overlay logo — match new nav style
page = page.replace(
  `        <span className="intro-logo text-[2rem] sm:text-[3rem] font-black grad-text" style={{ fontFamily: "var(--font-syne)" }}>B.</span>`,
  `        <span className="intro-logo text-[1.5rem] sm:text-[2rem] font-black text-white/90" style={{ fontFamily: "var(--font-syne)" }}>bekhruz.</span>`
);

// 12. Remove vertical side text (too decorative for minimal design)
page = page.replace(
  `      {/* Vertical side text */}
      <div className="v-text hidden lg:block" aria-hidden="true">{splitVText("41.2995°N · 69.2401°E · Tashkent · Est. 2016")}</div>`,
  ``
);

// 13. Remove dot navigation (clean sites don't have this)
page = page.replace(
  `      {/* Section dot navigation */}
      <nav className="dot-nav hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-3" aria-label="Section navigation">
        {SECTIONS.map((sec, i) => (
          <button key={sec} onClick={() => { const target = document.querySelector(\`.\${sec}\`); if (target && lenisR.current) lenisR.current.scrollTo(target as HTMLElement, { duration: 1.8 }); }} className={\`dot-btn relative w-2.5 h-2.5 rounded-full transition-all duration-500 \${i === activeDot ? "bg-[var(--accent1)] scale-150 shadow-[0_0_8px_rgba(0,240,255,0.5)]" : "bg-white/10 hover:bg-white/25"}\`} aria-label={\`Go to section \${i + 1} (key: \${i + 1})\`}>
            {i === activeDot && <span className="dot-ring absolute inset-[-4px] rounded-full border border-[var(--accent1)]/30 animate-[ping_2.5s_ease-out_infinite]" />}
          </button>
        ))}
        <span className="scroll-pct text-[0.35rem] tracking-[0.2em] text-white/15 mt-2 tabular-nums text-center" style={{ fontFamily: "var(--font-mono)" }} />
      </nav>`,
  ``
);

// 14. Marquee — simpler
page = page.replace(
  `      {/* ============ MARQUEE ============ */}
      <div className="mq relative py-5 border-y border-white/[0.04] overflow-hidden opacity-0" style={{ background: "var(--bg)" }}>
        <div className="marquee-track">
          {[...Array(6)].map((_, i) => <span key={i} className="text-[0.6rem] tracking-[0.35em] uppercase whitespace-nowrap px-6 text-white/5" style={{ fontFamily: "var(--font-mono)" }}>{MARQUEE}</span>)}
        </div>
      </div>`,
  `      {/* ============ MARQUEE ============ */}
      <div className="mq relative py-6 border-y border-white/[0.03] overflow-hidden opacity-0" style={{ background: "var(--bg)" }}>
        <div className="marquee-track">
          {[...Array(4)].map((_, i) => <span key={i} className="text-[0.55rem] tracking-[0.4em] uppercase whitespace-nowrap px-8 text-white/[0.06]" style={{ fontFamily: "var(--font-mono)" }}>{MARQUEE}</span>)}
        </div>
      </div>`
);

// 15. Remove the reference to photoR drag (no more draggable photo in hero)
// Remove the h-spinner and h-mountain class references from JS
page = page.replace(
  `gsap.to(".h-mountain", { x: gx * -15, y: gy * -10, duration: 1.5, ease: "power2.out", overwrite: "auto" });`,
  `// gyro parallax removed with mountain redesign`
);
page = page.replace(
  `gsap.to(".h-spinner", { x: gx * 20, y: gy * 15, duration: 1.8, ease: "power2.out", overwrite: "auto" });`,
  ``
);

writeFileSync(pageFile, page);
console.log('Page redesign complete.');

// ====================== GLOBALS.CSS REDESIGN ======================
const cssFile = 'd:/youtubeuchun/shaxsiy/website/src/app/globals.css';
let css = readFileSync(cssFile, 'utf8');

// Remove deco, outline-fill, wipe-reveal (no longer used)
css = css.replace(
  `/* ---- Deco label ---- */
.deco {
  position: absolute; font-size: 0.38rem;
  letter-spacing: 0.3em; text-transform: uppercase;
  color: rgba(255,255,255,0.04); pointer-events: none;
  font-family: var(--font-code);
}`,
  ``
);

css = css.replace(
  `/* ---- Section reveal wipe ---- */
.wipe-reveal {
  clip-path: inset(15% 0 15% 0);
  transition: clip-path 0s;
}
.wipe-reveal.revealed {
  clip-path: inset(0% 0 0% 0);
}`,
  ``
);

// Remove trail dot styles (already removed feature)
css = css.replace(
  `/* ---- Cursor trail ---- */
.trail-dot {
  position: fixed; width: 4px; height: 4px;
  background: var(--accent1); border-radius: 50%;
  pointer-events: none; z-index: 9998;
  opacity: 0.6;
  transform: translate(-50%, -50%) translateZ(0);
}`,
  ``
);

// Remove vertical side text (removed from JSX)
css = css.replace(
  `/* ---- Vertical side text ---- */
.v-text {
  writing-mode: vertical-rl; text-orientation: mixed;
  position: fixed; left: 1.2rem; top: 50%;
  transform: translateY(-50%) rotate(180deg);
  font-size: 0.38rem; letter-spacing: 0.5em;
  text-transform: uppercase; color: rgba(255,255,255,0.04);
  z-index: 30; pointer-events: none;
  font-family: var(--font-code);
}`,
  ``
);

// Remove outline-fill (not used)
css = css.replace(
  `/* ---- Outline fill on scroll ---- */
.outline-fill {
  -webkit-text-stroke: 1.5px rgba(0,240,255,0.12);
  color: transparent;
  background: var(--grad);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 100% 200%;
  background-position: 0% 200%;
  transition: background-position 0s;
}`,
  ``
);

// Simplify the dot-nav reference in mobile CSS
css = css.replace(
  `  .cursor-dot, .cursor-ring, .trail-dot, .cursor-label, .dot-nav, [data-spotlight] { display: none !important; }`,
  `  .cursor-dot, .cursor-ring, .cursor-label, [data-spotlight] { display: none !important; }`
);
css = css.replace(
  `  .cursor-dot, .cursor-ring, .trail-dot, .cursor-label, [data-spotlight] { display: none !important; }`,
  `  .cursor-dot, .cursor-ring, .cursor-label, [data-spotlight] { display: none !important; }`
);

// Remove deco hide in mobile
css = css.replace(
  `  .outline-fill { -webkit-text-stroke: 1px rgba(0,240,255,0.1); }
  .deco { display: none !important; }`,
  ``
);

// Reduce grain opacity for cleaner look
css = css.replace(
  `  pointer-events: none; opacity: 0.028;`,
  `  pointer-events: none; opacity: 0.018;`
);

// Remove dot-nav button style
css = css.replace(
  `/* ---- Dot nav ---- */
.dot-nav button { cursor: none !important; }`,
  ``
);

writeFileSync(cssFile, css);
console.log('CSS redesign complete.');
