import React, { useEffect, useRef, useState } from "react";
import "./HomeLife.css";

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Reveal({
  children,
  delay = 0,
  variant = "",
  className = "",
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduceMotion()) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`home-reveal${variant ? ` home-reveal--${variant}` : ""}${shown ? " is-in" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--rd": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}

const BURST = [
  { x: "-34px", y: "-30px", c: "var(--yellow)" },
  { x: "30px", y: "-34px", c: "var(--primary)" },
  { x: "-40px", y: "6px", c: "var(--primary)" },
  { x: "42px", y: "2px", c: "var(--yellow)" },
  { x: "-16px", y: "-42px", c: "var(--gold-ink)" },
  { x: "18px", y: "34px", c: "var(--primary)" },
  { x: "-26px", y: "30px", c: "var(--yellow)" },
  { x: "44px", y: "-14px", c: "var(--primary)" },
];

export function CountUp({ to, decimals = 0, prefix = "", suffix = "", duration = 1500 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduceMotion()) {
      setVal(to);
      setLanded(true);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / duration);
          setVal(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
          else setLanded(true);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  const text = `${prefix}${val.toFixed(decimals)}${suffix}`;

  return (
    <span ref={ref} className={`home-count${landed ? " is-landed" : ""}`}>
      {text}
      {BURST.map((b, i) => (
        <i
          key={i}
          aria-hidden="true"
          className="home-count-pixel"
          style={{ "--px": b.x, "--py": b.y, background: b.c }}
        />
      ))}
    </span>
  );
}

const RAIN = [
  { left: "6%", size: 7, delay: "0s", dur: "6.5s", c: "var(--yellow)" },
  { left: "19%", size: 5, delay: "1.2s", dur: "7.5s", c: "var(--primary)" },
  { left: "33%", size: 8, delay: "2.4s", dur: "6s", c: "var(--yellow)" },
  { left: "48%", size: 5, delay: "0.6s", dur: "8s", c: "var(--primary)" },
  { left: "63%", size: 7, delay: "3.1s", dur: "6.8s", c: "var(--yellow)" },
  { left: "78%", size: 5, delay: "1.8s", dur: "7.8s", c: "var(--primary)" },
  { left: "91%", size: 6, delay: "2.8s", dur: "6.2s", c: "var(--yellow)" },
];

export function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      el.style.setProperty("--sp", `${(p * 100).toFixed(2)}%`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return <div ref={ref} className="home-scroll-progress" aria-hidden="true" />;
}

export function PixelRain() {
  return (
    <span className="home-pixel-rain" aria-hidden="true">
      {RAIN.map((p, i) => (
        <i
          key={i}
          className="home-pixel"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.c,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}
    </span>
  );
}
