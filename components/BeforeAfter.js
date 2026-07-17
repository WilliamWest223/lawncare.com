"use client";

import { useRef, useState } from "react";
import LawnScene from "./LawnScene";

export default function BeforeAfter() {
  const [pos, setPos] = useState(52);
  const wrapRef = useRef(null);
  const dragging = useRef(false);

  const move = (clientX) => {
    const rect = wrapRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(4, Math.min(96, pct)));
  };

  return (
    <div
      className="ba-wrap"
      ref={wrapRef}
      style={{ touchAction: "none" }}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <LawnScene variant="scruffy" stripes={false} flowers={false} trees={1} />
      <div className="ba-after" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <LawnScene variant="lush" />
      </div>
      <span className="ba-tag" style={{ left: 14 }}>After</span>
      <span className="ba-tag" style={{ right: 14 }}>Before</span>
      <div className="ba-handle" style={{ left: `${pos}%` }} />
    </div>
  );
}
