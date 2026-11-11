import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";
import { CONFIG } from "./config.js";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const PALETTE = ["#720808", "#a10728", "#fec6d3", "#f6e6e5", "#bad4ed", "#dae9f7", "#efe4d8"];
const pad = (n) => String(n).padStart(2, "0");

if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);

/* ───────────── Fill in personal bits ───────────── */
$$("[data-name]").forEach((el) => (el.textContent = CONFIG.names?.[el.dataset.name] || CONFIG.name));
$$("[data-from]").forEach((el) => (el.textContent = CONFIG.from));
$$("[data-day]").forEach((el) => (el.textContent = pad(CONFIG.day)));
$$("[data-month]").forEach((el) => (el.textContent = pad(CONFIG.month)));
$$("[data-fulldate]").forEach((el) => (el.textContent = `${pad(CONFIG.day)}.${pad(CONFIG.month)}.${CONFIG.year}`));
document.title = `Happy Birthday, ${CONFIG.name} ♡`;

/* Image that quietly turns into a cute placeholder if the file is missing */
function photo(src, alt, label, eager = false) {
  const img = new Image();
  img.alt = alt;
  img.decoding = "async";
  if (!eager) img.loading = "lazy";
  img.onerror = () => {
    const ph = document.createElement("div");
    ph.className = "placeholder";
    ph.textContent = label;
    img.replaceWith(ph);
  };
  img.src = src;
  return img;
}

/* ───────────── Hero photo + floating hearts ───────────── */
$("#heroPhoto").append(photo(CONFIG.heroPhoto, `${CONFIG.name}`, "your photo here", true));

const sky = $("#sky");
const glyphs = ["♡", "✦", "♡", "·", "♡", "✧"];
for (let i = 0; i < 16; i++) {
  const s = document.createElement("span");
  s.textContent = glyphs[i % glyphs.length];
  s.style.left = `${Math.random() * 100}%`;
  s.style.setProperty("--s", `${12 + Math.random() * 18}px`);
  s.style.setProperty("--d", `${11 + Math.random() * 10}s`);
  s.style.setProperty("--delay", `${-Math.random() * 20}s`);
  s.style.setProperty("--x", `${(Math.random() - 0.5) * 120}px`);
  s.style.setProperty("--r", `${(Math.random() - 0.5) * 90}deg`);
  if (i % 3 === 0) s.style.color = "#bad4ed";
  sky.append(s);
}

/* ───────────── Reasons (arches) ───────────── */
const archInk = ["#fec6d3", "#fec6d3", "#720808", "#a10728", "#720808", "#a10728", "#720808"];
$("#arches").innerHTML = CONFIG.reasons
  .map(
    (r, i) => `
    <li class="arch">
      <div class="arch__shape" style="--c:${PALETTE[i % 7]};--ink:${archInk[i % 7]}">
        <span class="arch__num">${pad(i + 1)}</span>
        <span class="arch__heart" aria-hidden="true">♡</span>
      </div>
      <h3 class="arch__title">${r.title}</h3>
      <p class="arch__note">${r.note}</p>
    </li>`
  )
  .join("");

/* ───────────── Board (photos + little notes) ───────────── */
const notes = {
  2: `<div class="note-card note-card--poster" style="--c:#a10728;--ink:#fec6d3"><span>Your</span><span>smile ♡</span></div>`,
  5: `<div class="note-card note-card--quote" style="--c:#bad4ed">you + me,<br><b>always</b></div>`,
  8: `<span class="badge">birthday girl ✦</span>`,
  10: `<div class="note-card note-card--hand" style="--c:#fec6d3">you are my favourite notification ♡</div>`,
  13: `<div class="note-card note-card--poster" style="--c:#dae9f7;--ink:#a10728"><span>Pretty</span><span>&amp; kind</span></div>`,
  16: `<div class="note-card note-card--quote" style="--c:#efe4d8">the <b>best</b><br>year yet</div>`,
  19: `<div class="note-card note-card--hand" style="--c:#f6e6e5">10/10, would fall for you all over again</div>`,
};
const tilts = [-6, 5, -3, 8, -9, 4, -5, 7, -4, 9, -7, 3, -8, 6];
const wall = $("#wall");
let tiltIdx = 0;
CONFIG.photos.forEach((p, i) => {
  if (notes[i]) {
    const li = document.createElement("li");
    li.className = "board__item";
    li.innerHTML = `<div class="tilt" style="--tilt:${tilts[tiltIdx++ % tilts.length]}deg">${notes[i]}</div>`;
    wall.append(li);
  }
  const li = document.createElement("li");
  li.className = "board__item";
  li.innerHTML = `
    <div class="tilt" style="--tilt:${tilts[tiltIdx++ % tilts.length]}deg">
      <button class="polaroid${p.wide ? " polaroid--wide" : ""}" type="button" aria-label="Open photo: ${p.caption}">
        <span class="polaroid__img"></span>
        <span class="polaroid__cap">${p.caption}</span>
      </button>
    </div>`;
  $(".polaroid__img", li).append(photo(p.src, p.caption, `photo ${i + 1}`));
  $(".polaroid", li).addEventListener("click", () => openLightbox(li, p));
  wall.append(li);
});

/* ───────────── Lightbox ───────────── */
const lightbox = $("#lightbox");
function openLightbox(li, p) {
  const img = $(".polaroid__img img", li);
  if (!img) return; // still a placeholder
  $("#lightboxImg").src = img.src;
  $("#lightboxImg").alt = p.caption;
  $("#lightboxCap").textContent = p.caption;
  lightbox.hidden = false;
}
const closeLightbox = () => (lightbox.hidden = true);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.id === "lightboxClose") closeLightbox();
});
document.addEventListener("keydown", (e) => e.key === "Escape" && closeLightbox());

/* ───────────── Manifesto: split into words ───────────── */
function splitWords(el) {
  const nodes = [...el.childNodes];
  el.innerHTML = "";
  nodes.forEach((node) => {
    const target = node.nodeType === 1 ? el.appendChild(node.cloneNode(false)) : el;
    node.textContent.split(/(\s+)/).forEach((tok) => {
      if (!tok) return;
      if (/^\s+$/.test(tok)) return target.append(" ");
      const w = document.createElement("span");
      w.className = "word";
      w.textContent = tok;
      target.append(w);
    });
  });
  return $$(".word", el);
}
const manifestoWords = splitWords($("#manifestoText"));

/* ───────────── Confetti ───────────── */
const confettiColors = ["#a10728", "#fec6d3", "#bad4ed", "#dae9f7", "#f6e6e5", "#720808"];
function burst(opts = {}) {
  if (reduce) return;
  confetti({
    particleCount: 90,
    spread: 80,
    startVelocity: 42,
    ticks: 220,
    scalar: 0.95,
    colors: confettiColors,
    shapes: ["circle", "square"],
    zIndex: 300,
    disableForReducedMotion: true,
    ...opts,
  });
}
function bigCelebration() {
  burst({ origin: { x: 0.15, y: 0.7 }, angle: 60 });
  burst({ origin: { x: 0.85, y: 0.7 }, angle: 120 });
  setTimeout(() => burst({ origin: { x: 0.5, y: 0.55 }, particleCount: 120, spread: 120 }), 350);
}

/* ───────────── Hero entrance (plays after the gift opens) ───────────── */
const domeClosed = "inset(100% 0% 0% 0% round 999px 999px 0px 0px)";
const domeOpen = "inset(0% 0% 0% 0% round 999px 999px 0px 0px)";
const heroTl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
heroTl
  .from(".nav", { y: -24, opacity: 0, duration: 1 }, 0)
  .from(".hero__word--light", { xPercent: -25, opacity: 0, duration: 1.6 }, 0)
  .from(".hero__word--bold", { xPercent: 25, opacity: 0, duration: 1.6 }, 0.08)
  .from(".hero__star", { opacity: 0, duration: 1 }, 0.6)
  .from(".hero__line", { scaleX: 0, duration: 1.4, ease: "power3.inOut" }, 0.3)
  .from(".hero__num, .hero__tag", { opacity: 0, y: 10, duration: 0.9, stagger: 0.06 }, 0.7)
  .fromTo("#heroPhoto", { clipPath: domeClosed }, { clipPath: domeOpen, duration: 1.8, ease: "expo.inOut" }, 0.4)
  .from(".sticky-note", { y: 40, opacity: 0, rotation: -22, duration: 1.2 }, 1.5)
  .from(".hero__lede > *", { y: 30, opacity: 0, duration: 1.1, stagger: 0.12 }, 0.9)
  .from(".hero .hero__dots", { y: 40, opacity: 0, duration: 1.1 }, 1.1);

/* ───────────── Intro → open the gift ───────────── */
const intro = $("#intro");
$("#openGift").addEventListener("click", () => {
  const tl = gsap.timeline({
    onComplete: () => {
      intro.remove();
      ScrollTrigger.refresh();
    },
  });
  tl.to(".intro__content", { scale: 0.92, opacity: 0, duration: 0.5, ease: "power2.in" })
    .to(".intro__half--l", { xPercent: -101, duration: 1.2, ease: "expo.inOut" }, 0.35)
    .to(".intro__half--r", { xPercent: 101, duration: 1.2, ease: "expo.inOut" }, 0.35)
    .add(() => {
      document.documentElement.classList.remove("is-locked");
      heroTl.play();
    }, 0.7)
    .add(bigCelebration, 0.95);
});

/* ───────────── Scroll animations ───────────── */
if (!reduce) {
  // section titles
  $$(".section-head").forEach((head) =>
    gsap.from(head.children, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.12,
      scrollTrigger: { trigger: head, start: "top 85%" },
    })
  );

  // manifesto words light up as you scroll
  gsap.fromTo(
    manifestoWords,
    { opacity: 0.14 },
    {
      opacity: 1,
      stagger: 0.05,
      ease: "none",
      scrollTrigger: { trigger: "#manifestoText", start: "top 80%", end: "bottom 50%", scrub: 0.6 },
    }
  );

  // arches rise
  gsap.set(".arch", { y: 90, opacity: 0 });
  ScrollTrigger.batch(".arch", {
    start: "top 90%",
    onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1.3, ease: "expo.out", stagger: 0.09 }),
  });

  // board: cards get "dealt" onto the wall
  gsap.set(".board__item", {
    y: 160,
    opacity: 0,
    scale: 0.85,
    rotation: () => gsap.utils.random(-28, 28),
  });
  ScrollTrigger.batch(".board__item", {
    start: "top 92%",
    onEnter: (els) =>
      gsap.to(els, { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: "back.out(1.3)", stagger: 0.09 }),
  });

  // cake + envelope + footer
  gsap.from(".cake", { y: 60, opacity: 0, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: ".cake", start: "top 88%" } });
  gsap.from(".envelope-wrap", {
    y: 80,
    rotation: -6,
    opacity: 0,
    duration: 1.4,
    ease: "expo.out",
    scrollTrigger: { trigger: ".envelope-wrap", start: "top 88%" },
  });
  gsap.from(".footer > *", {
    y: 40,
    opacity: 0,
    duration: 1.2,
    ease: "expo.out",
    stagger: 0.1,
    scrollTrigger: { trigger: ".footer", start: "top 80%" },
  });
}

// bold words in headings get heavier when they appear
$$(".embolden").forEach((el) =>
  ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => el.classList.add("is-in") })
);

/* ───────────── Cake & candles ───────────── */
const CANDLES = 5;
const candleWrap = $("#candles");
for (let i = 0; i < CANDLES; i++) {
  const b = document.createElement("button");
  b.className = "candle";
  b.type = "button";
  b.setAttribute("aria-label", `Blow out candle ${i + 1}`);
  b.innerHTML = `<span class="candle__smoke"></span><span class="candle__flame"></span><span class="candle__wick"></span><span class="candle__stick"></span>`;
  b.addEventListener("click", () => blow(b));
  candleWrap.append(b);
}
let wished = false;
function blow(c) {
  if (c.classList.contains("is-out")) return;
  c.classList.add("is-out");
  if (!wished && $$(".candle:not(.is-out)").length === 0) wishComplete();
}
function wishComplete() {
  wished = true;
  $("#blowAll").classList.add("is-gone");
  $("#wishHint").textContent = "All out! Now scroll down, there is one more thing.";
  setTimeout(() => {
    $("#wishDone").classList.add("is-in");
    bigCelebration();
  }, 400);
}
$("#blowAll").addEventListener("click", () => {
  $$(".candle").forEach((c, i) => setTimeout(() => blow(c), i * 140));
});

/* ───────────── Letter: envelope → handwriting ───────────── */
const envelope = $("#envelope");
const paper = $("#paper");
const letterBox = $("#letterText");
let chars = [];
let writing = false;
let userScrolledAt = 0;

function buildLetter() {
  const text = CONFIG.letter.replaceAll("{name}", CONFIG.name).replaceAll("{from}", CONFIG.from);
  const paras = text.trim().split(/\n\s*\n/);
  chars = [];
  letterBox.innerHTML = "";
  paras.forEach((para, pi) => {
    const p = document.createElement("p");
    const lines = para.split("\n");
    lines.forEach((line, li) => {
      if (li > 0) {
        p.append(document.createElement("br"));
        chars.push({ pause: 380 });
      }
      // last line of the letter = the signature
      const host = pi === paras.length - 1 && li === lines.length - 1 && lines.length > 1 ? p.appendChild(Object.assign(document.createElement("span"), { className: "sign" })) : p;
      line.split(/(\s+)/).forEach((tok) => {
        if (!tok) return;
        if (/^\s+$/.test(tok)) return host.append(" ");
        const w = document.createElement("span");
        w.className = "w";
        [...tok].forEach((ch) => {
          const s = document.createElement("span");
          s.className = "ch";
          s.textContent = ch;
          w.append(s);
          chars.push({ el: s, ch });
        });
        host.append(w);
      });
    });
    letterBox.append(p);
    chars.push({ pause: 450 });
  });
}

function revealAll() {
  writing = false;
  $$(".ch", letterBox).forEach((c) => c.classList.add("on"));
  $(".pen", letterBox)?.remove();
  $("#skipWriting").hidden = true;
}

function write() {
  const pen = document.createElement("span");
  pen.className = "pen";
  writing = true;
  let i = 0;
  let sinceCheck = 0;
  const step = () => {
    if (!writing) return;
    if (i >= chars.length) {
      pen.remove();
      writing = false;
      $("#skipWriting").hidden = true;
      setTimeout(() => burst({ origin: { x: 0.5, y: 0.8 }, particleCount: 60, spread: 100 }), 300);
      return;
    }
    const item = chars[i++];
    let delay = 34;
    if (item.pause) delay = item.pause;
    else {
      item.el.classList.add("on");
      item.el.after(pen);
      if (",;:".includes(item.ch)) delay = 170;
      else if (".!?♡".includes(item.ch)) delay = 300;
      else delay = 14 + Math.random() * 22;
    }
    // keep the pen in view while she reads (unless she is scrolling herself)
    if (++sinceCheck > 6 && Date.now() - userScrolledAt > 2500) {
      sinceCheck = 0;
      const r = pen.getBoundingClientRect();
      if (r.bottom > window.innerHeight - 110) {
        window.scrollBy({ top: r.bottom - window.innerHeight * 0.55, behavior: "smooth" });
      }
    }
    setTimeout(step, delay);
  };
  step();
}
["wheel", "touchmove"].forEach((ev) => window.addEventListener(ev, () => (userScrolledAt = Date.now()), { passive: true }));

envelope.addEventListener("click", () => {
  if (envelope.classList.contains("is-open")) return;
  envelope.classList.add("is-open");
  $("#letterHint").textContent = "Read it slowly ♡";
  buildLetter();

  setTimeout(() => {
    gsap.to("#envelopeWrap", {
      y: 50,
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
      onComplete: () => {
        $("#envelopeWrap").hidden = true;
        paper.hidden = false;
        ScrollTrigger.refresh();
        const top = paper.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: "smooth" });
        if (reduce) return revealAll();
        gsap.from(paper, { y: 70, rotation: -4, scale: 0.94, opacity: 0, duration: 1.3, ease: "expo.out" });
        setTimeout(write, 900);
      },
    });
  }, 1500);
});
$("#skipWriting").addEventListener("click", revealAll);

/* ───────────── Footer ───────────── */
$("#again").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Fonts change line widths; re-measure once they arrive.
document.fonts?.ready.then(() => ScrollTrigger.refresh());
