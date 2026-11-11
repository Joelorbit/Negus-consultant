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

export function PixelStars() {
  const STARS = [
    { left: "7%", top: "18%", size: 5, delay: "0s", dur: "3.6s", c: "#dfc68a" },
    { left: "14%", top: "62%", size: 4, delay: "1.1s", dur: "4.2s", c: "#dcebe1" },
    { left: "23%", top: "30%", size: 6, delay: "2.3s", dur: "3.2s", c: "#dfc68a" },
    { left: "31%", top: "74%", size: 4, delay: "0.7s", dur: "4.6s", c: "#86c9a4" },
    { left: "42%", top: "12%", size: 5, delay: "1.8s", dur: "3.8s", c: "#dcebe1" },
    { left: "50%", top: "48%", size: 4, delay: "3s", dur: "4.4s", c: "#dfc68a" },
    { left: "58%", top: "22%", size: 6, delay: "0.4s", dur: "3.4s", c: "#dcebe1" },
    { left: "67%", top: "66%", size: 4, delay: "2.6s", dur: "4s", c: "#dfc68a" },
    { left: "76%", top: "14%", size: 5, delay: "1.4s", dur: "3.6s", c: "#86c9a4" },
    { left: "83%", top: "52%", size: 4, delay: "2.1s", dur: "4.8s", c: "#dcebe1" },
    { left: "91%", top: "28%", size: 6, delay: "0.9s", dur: "3.2s", c: "#dfc68a" },
    { left: "95%", top: "70%", size: 4, delay: "3.4s", dur: "4.2s", c: "#dcebe1" },
  ];
  return (
    <span className="home-stars" aria-hidden="true">
      {STARS.map((s, i) => (
        <i
          key={i}
          className="home-star"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            background: s.c,
            animationDelay: s.delay,
            animationDuration: s.dur,
          }}
        />
      ))}
      <i className="home-shooting home-shooting--a" />
      <i className="home-shooting home-shooting--b" />
    </span>
  );
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
