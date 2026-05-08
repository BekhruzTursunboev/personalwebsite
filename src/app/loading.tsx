export default function Loading() {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center" style={{ background: "var(--bg)" }}>
      <span className="text-[2rem] sm:text-[3rem] font-black grad-text animate-pulse" style={{ fontFamily: "var(--font-syne)" }}>B.</span>
    </div>
  );
}
