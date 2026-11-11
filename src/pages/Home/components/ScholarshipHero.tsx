import React, { useEffect, useRef, useState } from "react";
import "./ScholarshipHero.css";

interface ScholarshipHeroProps {
  onBuildPlan?: () => void;
}

const MSG = [
  "Scholarship found!",
  "Essay approved!",
  "IELTS band up!",
  "Visa approved!",
  "Fully funded!",
  "You got in!",
  "Hi! Click anywhere.",
];

export default function ScholarshipHero({ onBuildPlan }: ScholarshipHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);

  const [bubbleText, setBubbleText] = useState("Hi! Click anywhere.");
  const [bubbleVisible, setBubbleVisible] = useState(true);

  useEffect(() => {
    const cv = canvasRef.current;
    const hero = heroRef.current;
    const bub = bubbleRef.current;
    if (!cv || !hero) return;

    const x = cv.getContext("2d");
    if (!x) return;
    x.imageSmoothingEnabled = false;

    const W = 256;
    const H = 144;

    const P = {
      night: {
        top: [5, 14, 10],
        bot: [12, 38, 26],
        cl: ["#143828", "#1e523b", "#327d5c"],
        bld: "#0e261a",
        bld2: "#163a28",
        dark: "#08160f",
        hill: "#123021",
        win: "#ffd54f",
        glow: "#ffe680",
      },
      day: {
        top: [98, 172, 236],
        bot: [253, 238, 208],
        cl: ["#bcd6ee", "#ffffff", "#ffffff"],
        bld: "#86a9c6",
        bld2: "#a9c4da",
        dark: "#6c91b0",
        hill: "#b4cde0",
        win: "#ffffff",
        glow: "#fff",
      },
    };

    const BK = [
      "#2f7a58",
      "#d9a93a",
      "#b8453a",
      "#3c6fb5",
      "#f1ead6",
      "#7a4fb0",
    ];

    const currentMode = "day";
    const pal = P[currentMode];

    function rect(a: number, b: number, w: number, h: number, c: string) {
      if (!x) return;
      x.fillStyle = c;
      x.fillRect(Math.round(a), Math.round(b), w, h);
    }

    function circ(cx: number, cy: number, r: number, c: string) {
      if (!x) return;
      x.fillStyle = c;
      for (let d = -r; d <= r; d++) {
        const w = Math.floor(Math.sqrt(r * r - d * d));
        x.fillRect(Math.round(cx - w), Math.round(cy + d), 2 * w + 1, 1);
      }
    }

    function lerp(a: number, b: number, t: number) {
      return Math.round(a + (b - a) * t);
    }

    function sky(y: number) {
      const t = y / H;
      const a = pal.top;
      const b = pal.bot;
      return (
        "rgb(" +
        lerp(a[0], b[0], t) +
        "," +
        lerp(a[1], b[1], t) +
        "," +
        lerp(a[2], b[2], t) +
        ")"
      );
    }

    function alpha(a: number, fn: () => void) {
      if (!x) return;
      x.globalAlpha = a;
      fn();
      x.globalAlpha = 1;
    }

    let seed = 11;
    function rnd() {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    }

    interface Star {
      x: number;
      y: number;
      p: number;
      b: boolean;
    }
    interface Cloud {
      x: number;
      y: number;
      s: number;
      v: number;
    }
    interface BookItem {
      w: number;
      h: number;
      c: string;
      dx: number;
    }
    interface StackItem {
      x: number;
      bs: BookItem[];
      pen: boolean;
    }
    interface DustItem {
      x: number;
      y: number;
      p: number;
      s: number;
    }
    interface FloatingItem {
      t: string;
      x: number;
      y: number;
      p: number;
    }
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      l: number;
      c: string;
      s: number;
      g: number;
    }

    const stars: Star[] = [];
    const clouds: Cloud[] = [];
    const stacks: StackItem[] = [];
    const dust: DustItem[] = [];
    const items: FloatingItem[] = [];
    let parts: Particle[] = [];

    for (let i = 0; i < 80; i++) {
      stars.push({
        x: (rnd() * W) | 0,
        y: (rnd() * H * 0.55) | 0,
        p: rnd() * 6,
        b: rnd() < 0.15,
      });
    }

    for (let i = 0; i < 5; i++) {
      clouds.push({
        x: rnd() * (W + 80) - 40,
        y: 12 + rnd() * 58,
        s: 0.7 + rnd() * 0.7,
        v: 0.6 + rnd() * 1.1,
      });
    }

    for (let i = 0; i < 28; i++) {
      const sx = -14 + rnd() * (W + 28);
      const edge = Math.pow(Math.abs(sx - W / 2) / (W / 2), 1.1);
      const n = 1 + Math.round(edge * 7 * rnd() + rnd() * 2);
      const bs: BookItem[] = [];
      for (let k = 0; k < n; k++) {
        bs.push({
          w: 11 + ((rnd() * 7) | 0),
          h: 3 + (rnd() < 0.4 ? 1 : 0),
          c: BK[(rnd() * 6) | 0],
          dx: ((rnd() * 5) | 0) - 2,
        });
      }
      stacks.push({ x: sx | 0, bs, pen: rnd() < 0.3 });
    }
    stacks.sort((a, b) => a.bs.length - b.bs.length);

    for (let i = 0; i < 18; i++) {
      dust.push({
        x: rnd() * W,
        y: 30 + rnd() * 100,
        p: rnd() * 6,
        s: 0.2 + rnd() * 0.5,
      });
    }

    const types = [
      "letter",
      "coin",
      "scroll",
      "cap",
      "letter",
      "coin",
      "scroll",
      "cap",
    ];
    for (let i = 0; i < 8; i++) {
      items.push({
        t: types[i],
        x: 20 + i * 30 + rnd() * 10,
        y: 26 + rnd() * 54,
        p: rnd() * 6,
      });
    }

    const owl = { x: 60, y: 70, d: 1, vx: 0 };
    let mouse: { x: number; y: number } | null = null;
    let cam = 0;
    let shoot: { x: number; y: number; l: number } | null = null;
    let last = 0;
    let msgI = 0;
    let bubT = 2.5;

    function cap(cx: number, cy: number) {
      const g = "#e8b53a";
      const d = "#b9871f";
      rect(cx - 1, cy, 3, 1, g);
      rect(cx - 3, cy + 1, 7, 1, g);
      rect(cx - 1, cy + 2, 3, 1, g);
      rect(cx - 2, cy + 3, 5, 2, d);
      rect(cx + 4, cy + 1, 1, 4, g);
      rect(cx + 4, cy + 5, 1, 1, d);
    }

    function letter(a: number, b: number) {
      rect(a - 4, b, 9, 6, "#f6efd8");
      rect(a - 4, b, 9, 1, "#d8cba2");
      rect(a - 3, b + 1, 2, 1, "#d8cba2");
      rect(a + 2, b + 1, 2, 1, "#d8cba2");
      rect(a - 1, b + 1, 3, 3, "#d9a93a");
      rect(a, b + 2, 1, 1, "#b9871f");
    }

    function scroll(a: number, b: number) {
      rect(a - 5, b, 11, 4, "#f6efd8");
      rect(a - 6, b - 1, 2, 6, "#d8cba2");
      rect(a + 5, b - 1, 2, 6, "#d8cba2");
      rect(a - 1, b, 2, 4, "#b8453a");
    }

    function coin(a: number, b: number, t: number, p: number) {
      const w = Math.round(Math.abs(Math.cos(t * 2 + p)) * 3);
      rect(a - w, b - 3, 2 * w + 1, 7, "#e8b53a");
      rect(a - w, b - 3, 2 * w + 1, 1, "#ffe27a");
      if (w > 1) rect(a, b - 1, 1, 3, "#b9871f");
    }

    function drawOwl(t: number) {
      const o = owl;
      const f = Math.floor(t * 10) % 2;
      const d = o.d;
      const blink = (t * 1000) % 3800 < 140;
      const g = "#e8b53a";
      const a = Math.round(o.x);
      const b = Math.round(o.y);
      const px = d > 0 ? 1 : 0;

      rect(a - 7, b - 1 + f * 2, 2, 5, "#5e3b1a");
      rect(a + 6, b - 1 + f * 2, 2, 5, "#5e3b1a");
      rect(a - 4, b - 4, 9, 10, "#8a5a2b");
      rect(a - 5, b - 6, 2, 2, "#6c4420");
      rect(a + 4, b - 6, 2, 2, "#6c4420");
      rect(a - 2, b + 1, 5, 5, "#e8c48a");
      rect(a - 1, b + 2, 1, 1, "#c9a064");
      rect(a + 1, b + 3, 1, 1, "#c9a064");
      rect(a - 1, b + 4, 1, 1, "#c9a064");

      if (blink) {
        rect(a - 3, b - 1, 3, 1, "#222");
        rect(a + 1, b - 1, 3, 1, "#222");
      } else {
        rect(a - 3, b - 2, 3, 3, "#fff");
        rect(a + 1, b - 2, 3, 3, "#fff");
        rect(a - 3 + px * 2, b - 1, 1, 2, "#111");
        rect(a + 1 + px * 2, b - 1, 1, 2, "#111");
      }

      rect(a, b + 1, 1, 2, g);
      rect(a - 2, b + 6, 2, 1, g);
      rect(a + 1, b + 6, 2, 1, g);
      rect(a - 6, b - 8, 13, 1, "#2f7a58");
      rect(a - 4, b - 7, 9, 2, "#2f7a58");
      rect(a - 6, b - 9, 13, 1, "#43a078");
      rect(a, b - 10, 1, 1, g);
      rect(a + 6, b - 8, 1, 5, g);
      rect(a + 6, b - 3, 1, 1, "#b9871f");
    }

    function campus(t: number) {
      const c = pal.bld;
      const c2 = pal.bld2;
      const y = H;

      rect(-40, y - 30, 126, 30, c);
      rect(170, y - 30, 126, 30, c);
      rect(-40, y - 32, 126, 2, c2);
      rect(170, y - 32, 126, 2, c2);
      rect(84, y - 42, 88, 42, c);

      for (let r = 0; r < 10; r++) {
        rect(
          Math.round(82 + r * 4.5),
          y - 43 - r,
          Math.round(92 - r * 9),
          1,
          c2
        );
      }

      rect(118, y - 62, 21, 12, c);
      circ(128, y - 62, 10, c2);
      rect(128, y - 82, 1, 12, c2);

      for (let k = 0; k < 6; k++) {
        rect(
          129 + k,
          y - 82 + Math.round(Math.sin(t * 4 + k * 0.8)),
          1,
          3,
          "#e8b53a"
        );
      }

      for (let k = 0; k < 8; k++) {
        rect(88 + k * 10.5, y - 40, 3, 40, c2);
      }

      for (let r = 0; r < 2; r++) {
        for (let xx = 0; xx < 7; xx++) {
          const lit = Math.sin(t * 0.5 + xx * 2 + r * 7) > -0.5;
          rect(93 + xx * 10.5, y - 36 + r * 13, 4, 7, lit ? pal.win : pal.dark);
        }
      }

      rect(121, y - 14, 14, 14, pal.win);
      rect(120, y - 15, 16, 1, c2);
      rect(127, y - 14, 2, 14, pal.dark);
      rect(78, y - 3, 100, 3, c2);

      for (let r = 0; r < 2; r++) {
        for (let xx = -4; xx < 9; xx++) {
          const yy = y - 24 + r * 10;
          const lit1 = Math.sin(t * 0.6 + xx * 3 + r * 5) > -0.6;
          rect(14 + xx * 9, yy, 3, 4, lit1 ? pal.win : pal.dark);
          const lit2 = Math.sin(t * 0.7 + xx * 2 + r * 9) > -0.6;
          rect(176 + xx * 9 + 36, yy, 3, 4, lit2 ? pal.win : pal.dark);
        }
      }

      [68, 188].forEach((lx, n) => {
        rect(lx, y - 14, 1, 14, c2);
        if (currentMode === "night") {
          alpha(0.2 + 0.05 * Math.sin(t * 6 + n), () => {
            circ(lx, y - 16, 7, pal.glow);
          });
        }
        circ(lx, y - 16, 2, pal.win);
      });
    }

    function hills() {
      if (!x) return;
      x.fillStyle = pal.hill;
      for (let xx = -20; xx < W + 20; xx++) {
        const h = Math.sin(xx * 0.035) * 5 + Math.sin(xx * 0.012 + 1) * 9;
        x.fillRect(xx, Math.round(H - 52 - h), 1, 60);
      }
    }

    function stack(s: StackItem) {
      let yy = H - 2;
      for (let j = 0; j < s.bs.length; j++) {
        const b = s.bs[j];
        yy -= b.h;
        rect(s.x + b.dx, yy, b.w, b.h, b.c);
        rect(s.x + b.dx + 2, yy + 1, b.w - 4, 1, "#f3e2b0");
        rect(s.x + b.dx, yy + b.h - 1, b.w, 1, "rgba(0,0,0,.28)");
      }
      if (s.pen && s.bs.length > 2) {
        rect(s.x + 3, yy - 7, 2, 1, "#f19cb0");
        rect(s.x + 3, yy - 6, 2, 5, "#f2c94c");
        rect(s.x + 3, yy - 1, 2, 1, "#e8c48a");
      }
    }

    function burst(px: number, py: number) {
      for (let j = 0; j < 20; j++) {
        parts.push({
          x: px,
          y: py,
          vx: (rnd() - 0.5) * 90,
          vy: -rnd() * 70 - 15,
          l: 1,
          c: ["#f2c94c", "#ffe27a", "#fff", "#43a078"][j % 4],
          s: j % 3 ? 1 : 2,
          g: 1,
        });
      }
    }

    function say(m: string) {
      setBubbleText(m);
      setBubbleVisible(true);
      bubT = 2.4;
    }

    function metrics() {
      const r = cv!.getBoundingClientRect();
      const s = Math.max(r.width / W, r.height / H);
      return {
        r,
        s,
        ox: (r.width - W * s) / 2,
        oy: (r.height - H * s) / 2,
      };
    }

    function toCanvas(e: PointerEvent) {
      const m = metrics();
      return {
        x: (e.clientX - m.r.left - m.ox) / m.s,
        y: (e.clientY - m.r.top - m.oy) / m.s,
      };
    }

    let animId: number;

    function frame(ms: number) {
      const t = ms / 1000;
      const dt = Math.min(0.05, t - last);
      last = t;

      const n = 24;
      for (let y = 0; y < n; y++) {
        rect(0, (y * H) / n, W, Math.ceil(H / n) + 1, sky((y * H) / n + 3));
      }

      cam +=
        ((mouse
          ? Math.max(-1, Math.min(1, (mouse.x - W / 2) / (W / 2)))
          : Math.sin(t * 0.3) * 0.3) -
          cam) *
        dt *
        3;

      x!.save();
      x!.translate(Math.round(-cam * 2), 0);
      if (currentMode === "night") {
        stars.forEach((s) => {
          if (Math.sin(t * 2 + s.p) > -0.3) {
            rect(s.x, s.y, s.b ? 2 : 1, s.b ? 2 : 1, "#fff");
          }
        });

        alpha(0.07, () => {
          circ(214, 26, 20, "#f6efc9");
          circ(214, 26, 14, "#f6efc9");
        });
        circ(214, 26, 8, "#f6efc9");
        circ(218, 23, 7, sky(23));

        if (!shoot && Math.sin(t * 0.9) > 0.998) {
          shoot = { x: W * rnd(), y: rnd() * 40, l: 0 };
        }
        if (shoot) {
          for (let i = 0; i < 8; i++) {
            rect(shoot.x - i * 2, shoot.y - i, 2, 1, i < 3 ? "#fff" : "#8fb4e8");
          }
          shoot.x += 3;
          shoot.y += 1.5;
          if (++shoot.l > 40) shoot = null;
        }
      } else {
        alpha(0.2, () => {
          circ(214, 26, 18, "#fff3b0");
        });
        circ(214, 26, 10, "#ffe27a");
        circ(214, 26, 7, "#fff3b0");
      }

      clouds.forEach((c) => {
        c.x += c.v * dt * 3;
        if (c.x > W + 50) c.x = -50;
        const s = c.s;
        const o = [
          [0, 0, 7],
          [9, 2, 5],
          [-9, 3, 5],
          [17, 4, 3],
        ];
        for (let L = 0; L < 3; L++) {
          o.forEach((p) => {
            const r = Math.round(p[2] * s) - (L === 2 ? 1 : 0);
            const cx = c.x + p[0] * s;
            const cy = c.y + p[1] * s - L * 1.5;
            x!.fillStyle = pal.cl[L];
            for (let d = -r; d <= r; d++) {
              const w = Math.floor(Math.sqrt(r * r - d * d) * 1.7);
              x!.fillRect(Math.round(cx - w), Math.round(cy + d), 2 * w + 1, 1);
            }
          });
        }
      });
      x!.restore();

      x!.save();
      x!.translate(Math.round(-cam * 3), 0);
      hills();
      x!.restore();

      x!.save();
      x!.translate(Math.round(-cam * 5), 0);
      campus(t);
      x!.restore();

      x!.save();
      x!.translate(Math.round(-cam * 6), 0);
      items.forEach((it) => {
        const a = it.x + Math.sin(t * 0.6 + it.p) * 7;
        const b = it.y + Math.sin(t * 1.1 + it.p) * 4;
        if (it.t === "cap") cap(a, b);
        else if (it.t === "letter") letter(a, b);
        else if (it.t === "scroll") scroll(a, b);
        else coin(a, b, t, it.p);

        if (Math.sin(t * 3 + it.p) > 0.93) {
          rect(a + 6, b - 4, 1, 3, "#fff");
          rect(a + 5, b - 3, 3, 1, "#fff");
        }
      });

      dust.forEach((f) => {
        f.x += Math.sin(t * f.s * 3 + f.p) * 0.3;
        f.y += Math.cos(t * f.s * 2 + f.p) * 0.2;
        if (Math.sin(t * 3 + f.p) > 0) {
          rect(f.x, f.y, 1, 1, currentMode === "night" ? "#ffe27a" : "#fff");
        }
      });
      x!.restore();

      x!.save();
      x!.translate(Math.round(-cam * 9), 0);
      rect(-20, H - 2, W + 40, 2, pal.dark);
      stacks.forEach(stack);
      x!.restore();

      let tx: number, ty: number;
      if (mouse) {
        tx = mouse.x;
        ty = mouse.y;
      } else {
        tx = W / 2 + Math.sin(t * 0.5) * 90;
        ty = 60 + Math.sin(t * 0.9) * 22;
      }

      const dx = tx - owl.x;
      owl.x += dx * dt * 2.4;
      owl.y += (ty - owl.y) * dt * 2.4 + Math.sin(t * 8) * 0.2;
      if (Math.abs(dx) > 3) owl.d = dx > 0 ? 1 : -1;

      const sp = Math.abs(dx);
      if (sp > 14 && Math.random() < 0.6) {
        parts.push({
          x: owl.x - owl.d * 6,
          y: owl.y + rnd() * 6,
          vx: -owl.d * 8,
          vy: rnd() * 8 - 4,
          l: 0.6,
          c: "#ffe27a",
          s: 1,
          g: 0,
        });
      }

      drawOwl(t);

      parts = parts.filter((p) => {
        p.l -= dt * (p.g ? 1 : 1.6);
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.g) p.vy += 140 * dt;
        alpha(Math.max(0, Math.min(1, p.l * 1.5)), () => {
          rect(p.x, p.y, p.s, p.s, p.c);
        });
        return p.l > 0;
      });

      if (bubT > 0) {
        bubT -= dt;
        if (bubT <= 0) setBubbleVisible(false);
      }

      if (bub) {
        const m = metrics();
        const half = (bub.offsetWidth || 0) / 2 + 6;
        const bx = Math.min(Math.max(m.ox + owl.x * m.s, half), m.r.width - half);
        bub.style.transform = `translate(${Math.round(
          bx
        )}px, ${Math.round(m.oy + (owl.y - 13) * m.s)}px) translate(-50%, -100%)`;
      }

      animId = requestAnimationFrame(frame);
    }

    const onPointerMove = (e: PointerEvent) => {
      mouse = toCanvas(e);
    };

    const onPointerLeave = () => {
      mouse = null;
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, li")) return;
      mouse = toCanvas(e);
      burst(mouse.x, mouse.y);
      say(MSG[msgI++ % MSG.length]);
    };

    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);
    hero.addEventListener("pointerdown", onPointerDown);

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      hero.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <section className="scholarship-hero-canvas-wrap" id="home" ref={heroRef}>
      {/* Background Pixel-Art Animated Canvas */}
      <canvas
        id="c"
        ref={canvasRef}
        width={256}
        height={144}
        role="img"
        aria-label="Animated pixel-art university campus with books, scholarship letters and a graduate owl"
      />

      {/* Floating Owl Speech Bubble */}
      <div
        ref={bubbleRef}
        className={`scholarship-bubble ${bubbleVisible ? "on" : ""}`}
        aria-live="polite"
      >
        {bubbleText}
      </div>

      {/* Centered Headline Copy & Calls-To-Action */}
      <div className="scholarship-canvas-copy">
        <div className="scholarship-canvas-tag">
          <span className="scholarship-tag-star">★</span>
          <span>Direct guidance from admitted scholars · Addis Ababa</span>
        </div>

        <h1 className="scholarship-canvas-title">
          Apply smart. <br />
          <span>Win scholarships.</span>
        </h1>

        <p className="scholarship-canvas-lead">
          Structured roadmaps, real mentorship, and essay polishing from
          Ethiopian scholars who made it happen.
        </p>

        <div className="scholarship-canvas-cta">
          <a
            className="scholarship-pill scholarship-pill-main"
            href="/courses"
          >
            Explore courses
          </a>
          <a className="scholarship-pill scholarship-pill-alt" href="/packages">
            View packages
          </a>
        </div>

        {/* Selected Admits Chips */}
        <ul className="scholarship-canvas-chips" aria-label="Selected admits">
          <li>★ Georgetown</li>
          <li>★ Williams</li>
          <li>★ Drexel ($145k)</li>
          <li>★ Howard</li>
          <li>★ Sarah Lawrence</li>
          <li>★ Hult</li>
        </ul>
      </div>
    </section>
  );
}
