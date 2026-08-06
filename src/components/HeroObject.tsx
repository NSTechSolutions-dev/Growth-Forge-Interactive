import { useEffect, useRef, useState } from "react";

/**
 * Lightweight CSS-3D hero object: nested translucent panels forming a rotating
 * abstract solid. No WebGL, pauses off-screen, static below the md breakpoint.
 */
export function HeroObject() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [drift, setDrift] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const onMove = (e: MouseEvent) => {
      setDrift({
        x: (e.clientX / window.innerWidth - 0.5) * 26,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const panels = [
    { size: 300, color: "var(--navy)", op: 0.16, ry: 0, delay: "0s" },
    { size: 240, color: "var(--green)", op: 0.2, ry: 60, delay: "-6s" },
    { size: 180, color: "var(--orange)", op: 0.22, ry: 120, delay: "-12s" },
  ];

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute right-[-6%] top-1/2 hidden -translate-y-1/2 md:block"
        style={{
          transform: `translate(${drift.x}px, calc(-50% + ${drift.y}px))`,
          transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
          perspective: "1100px",
        }}
      >
        <div
          className="relative"
          style={{
            width: 420,
            height: 420,
            transformStyle: "preserve-3d",
            animation: active ? "mlf-float 9s ease-in-out infinite" : "none",
          }}
        >
          {panels.map((p) => (
            <div
              key={p.ry}
              className="absolute left-1/2 top-1/2"
              style={{
                width: p.size,
                height: p.size,
                marginLeft: -p.size / 2,
                marginTop: -p.size / 2,
                transformStyle: "preserve-3d",
                animation: active ? `mlf-spin-slow 34s linear infinite` : "none",
                animationDelay: p.delay,
              }}
            >
              {[0, 60, 120].map((r) => (
                <div
                  key={r}
                  className="absolute inset-0 rounded-[2rem]"
                  style={{
                    transform: `rotateY(${r + p.ry}deg) rotateX(${r / 2}deg)`,
                    background: `linear-gradient(140deg, color-mix(in oklab, ${p.color} 70%, transparent), transparent 70%)`,
                    border: `1px solid color-mix(in oklab, ${p.color} 45%, transparent)`,
                    opacity: p.op,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Lightweight static gradient stand-in on small screens */}
      <div
        className="absolute right-[-30%] top-[-10%] h-[380px] w-[380px] rounded-full blur-3xl md:hidden"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--green) 28%, transparent), transparent 70%)",
        }}
      />
    </div>
  );
}
