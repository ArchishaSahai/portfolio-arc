"use client";

import { useRef } from "react";

// A card that leans gently toward the pointer, with a shine that follows it.
export default function TiltCard({
  style,
  children,
}: {
  style: React.CSSProperties;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  function move(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 5}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 7}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  }

  function leave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <article ref={ref} className="card" style={style} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </article>
  );
}
