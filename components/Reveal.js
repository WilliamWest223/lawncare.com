"use client";

import { useEffect, useRef } from "react";

export default function Reveal({ children, delay = 0, as: Tag = "div", ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className="reveal" data-delay={delay || undefined} {...rest}>
      {children}
    </Tag>
  );
}
