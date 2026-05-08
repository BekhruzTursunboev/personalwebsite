"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <h1 className="text-[clamp(2rem,6vw,4rem)] font-black leading-none tracking-[-0.04em] grad-text" style={{ fontFamily: "var(--font-syne)" }}>
        Something went wrong
      </h1>
      <p className="text-[0.6rem] tracking-[0.5em] uppercase text-white/20 mt-4 mb-8" style={{ fontFamily: "var(--font-mono)" }}>
        An unexpected error occurred
      </p>
      <button
        onClick={() => reset()}
        className="text-[0.5rem] tracking-[0.3em] uppercase border border-white/10 rounded-full px-6 py-3 text-white/40 transition-all duration-300 hover:text-[var(--accent1)] hover:border-[var(--accent1)]/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Try again
      </button>
    </main>
  );
}
