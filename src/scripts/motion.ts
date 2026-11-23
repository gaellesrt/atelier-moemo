// Effets au scroll uniquement (aucun effet au pointeur). Voir DETAILS.md du handoff.

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const smooth = (p: number) => p * p * (3 - 2 * p);
const cosEase = (k: number) => 0.5 - 0.5 * Math.cos(Math.PI * k);
const mix = (a: number[], b: number[], t: number) => a.map((x, i) => Math.round(x + (b[i] - x) * t));
const $$ = <T extends Element = HTMLElement>(q: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T & Element>(q)) as T[];

const CREAM = [255, 252, 248];
const DARK = [14, 14, 18];

export function initMotion() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasIO = 'IntersectionObserver' in window;

  /* ---------- Fond : halos qui convergent + passage au noir ---------- */
  const canvas = document.querySelector<HTMLElement>('[data-canvas]');
  const darkStart = document.querySelector<HTMLElement>('[data-dark-start]');
  const halos = $$<HTMLElement>('[data-g]').map((el) => ({ el, v: el.dataset.g!.split(',').map(Number) }));
  const bar = document.createElement('div');
  bar.className = 'progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  const paint = () => {
    const se = document.scrollingElement || document.documentElement;
    const max = se.scrollHeight - se.clientHeight;
    const vh = window.innerHeight, vw = window.innerWidth;
    const p = max > 0 ? clamp(se.scrollTop / max) : 0;
    const e = smooth(p);
    const w = reduce ? 0 : 1;
    for (const { el, v } of halos) {
      const x = (v[0] + (v[2] - v[0]) * e + w * 7 * Math.sin(p * 9.4 + v[4])) * vw / 100;
      const y = (v[1] + (v[3] - v[1]) * e + w * 6 * Math.cos(p * 8.2 + v[4])) * vh / 100;
      el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${(0.8 + 0.45 * e).toFixed(3)})`;
      el.style.opacity = (0.22 + 0.78 * Math.pow(p, 1.3)).toFixed(3);
    }
    if (darkStart && canvas) {
      const t = darkStart.getBoundingClientRect().top;
      const d = clamp((vh * 0.5 - t) / (vh * 0.36));
      canvas.style.background = `rgb(${mix(CREAM, DARK, d).join(',')})`;
    }
    bar.style.transform = `scaleX(${(max > 0 ? se.scrollTop / max : 0).toFixed(4)})`;
  };
  let queued = false;
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; paint(); });
  };
  paint();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* ---------- Reveal ---------- */
  const reveals = $$<HTMLElement>('[data-reveal]');
  const show = (el: HTMLElement) => el.classList.add('is-in');
  if (reduce || !hasIO) reveals.forEach(show);
  else {
    const io = new IntersectionObserver((entries) => {
      let i = 0;
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        el.style.transitionDelay = `${i++ * 90}ms`;
        show(el);
        el.addEventListener('transitionend', () => { el.style.transitionDelay = ''; }, { once: true });
        io.unobserve(el);
      }
    }, { threshold: 0.1 });
    reveals.forEach((el) => io.observe(el));
    // Filet de sécurité : tout ce qui est déjà à l'écran apparaît.
    setTimeout(() => reveals.forEach((el) => { if (el.getBoundingClientRect().top < window.innerHeight) show(el); }), 2500);
  }

  /* ---------- Nuage de mots ---------- */
  const cloud = document.querySelector<HTMLElement>('[data-cloud]');
  if (cloud) {
    const words = $$<HTMLElement>('[data-word]', cloud);
    if (reduce || !hasIO) words.forEach(show);
    else {
      const io = new IntersectionObserver((entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        words.forEach((w, i) => setTimeout(() => show(w), 300 + i * 140));
        io.disconnect();
      }, { threshold: 0.2 });
      io.observe(cloud);
    }
  }

  /* ---------- Approche : dessins calligraphiques pilotés par le scroll ---------- */
  initHand(reduce);
}

type Item =
  | { kind: 'path'; el: SVGPathElement; a: number; b: number; len: number }
  | { kind: 'grow'; el: SVGGElement; a: number; b: number }
  | { kind: 'fade'; el: HTMLElement; a: number; b: number };

function initHand(reduce: boolean) {
  const box = document.querySelector<HTMLElement>('[data-handbox]');
  if (!box) return;
  const pin = box.closest<HTMLElement>('[data-pin]');
  const space = document.querySelector<HTMLElement>('[data-pin-space]');
  const anchor = document.querySelector<HTMLElement>('[data-hand-anchor]');
  const steps = $$<HTMLElement>('.step', box);
  const tl: Item[] = [];
  let T = 0;

  for (const step of steps) {
    const t0 = T;
    for (const el of $$<SVGElement>('[data-hand],[data-hand-grow]', step)) {
      const isPath = el.hasAttribute('data-hand');
      const du = Number((el.getAttribute(isPath ? 'data-hand' : 'data-hand-grow') || '').split(',')[1]) || 400;
      if (isPath) {
        const p = el as SVGPathElement;
        p.style.strokeDasharray = '1';
        p.style.strokeDashoffset = '1';
        tl.push({ kind: 'path', el: p, a: T, b: T + du, len: p.getTotalLength() });
      } else {
        const g = el as SVGGElement;
        g.style.transformBox = 'fill-box';
        g.style.transformOrigin = 'center';
        g.style.transform = 'scale(0)';
        tl.push({ kind: 'grow', el: g, a: T, b: T + du });
      }
      T += du + 90;
    }
    const t1 = T;
    const label = step.querySelector<HTMLElement>('.step-label');
    if (label) {
      label.style.opacity = '0';
      label.style.transform = 'translateY(8px)';
      const a0 = t0 + (t1 - t0) * 0.25;
      tl.push({ kind: 'fade', el: label, a: a0, b: a0 + Math.max(400, (t1 - t0) * 0.6) });
    }
    T += 260;
  }
  const TMAX = T;
  const lastPath = [...tl].reverse().find((x) => x.kind === 'path');

  // Plume qui suit le trait actif
  const pen = document.createElement('div');
  pen.className = 'pen';
  pen.setAttribute('aria-hidden', 'true');
  box.appendChild(pen);

  // Alignement du papier à points sur le centre de la première illustration
  const alignDots = () => {
    const c = steps[0]?.querySelector<HTMLElement>('.step-pic');
    if (!c) return;
    const x = ((c.offsetLeft + c.offsetWidth / 2 - 8) % 16 + 16) % 16;
    box.style.backgroundPosition = `${x.toFixed(1)}px -8px`;
  };

  let pinned = false, anchorOff = 0, stickTop = 0, pinOff = 0;
  const fitPin = () => {
    if (!pin || !space) return;
    pin.style.position = 'relative';
    pin.style.top = '';
    space.style.height = '0px';
    const wrapTop = pin.parentElement!.getBoundingClientRect().top;
    anchorOff = (anchor || box).getBoundingClientRect().top - wrapTop;
    pinOff = pin.getBoundingClientRect().top - wrapTop;
    pinned = window.innerWidth >= 820 && pin.offsetHeight + 140 < window.innerHeight && !reduce;
    if (pinned) {
      stickTop = Math.max(64, (window.innerHeight - pin.offsetHeight) / 2);
      pin.style.position = 'sticky';
      pin.style.top = `${stickTop}px`;
      space.style.height = '140vh';
    }
  };

  let px = 0, py = 0;
  const apply = (t: number) => {
    let act: { it: Item; e: number } | null = null;
    for (const it of tl) {
      const k = clamp((t - it.a) / (it.b - it.a));
      const e = cosEase(k);
      if (it.kind === 'path') { it.el.style.strokeDashoffset = String(1 - e); it.el.style.opacity = k > 0 ? '1' : '0'; }
      else if (it.kind === 'grow') it.el.style.transform = `scale(${e.toFixed(3)})`;
      else { it.el.style.opacity = e.toFixed(3); it.el.style.transform = `translateY(${((1 - e) * 8).toFixed(2)}px)`; }
      if (it.kind !== 'fade' && t >= it.a && t < it.b) act = { it, e };
    }
    if (!act && lastPath && t >= lastPath.b) act = { it: lastPath, e: 1 };
    const br = box.getBoundingClientRect();
    if (act) {
      const { it, e } = act;
      if (it.kind === 'path') {
        const m = it.el.ownerSVGElement?.getScreenCTM();
        const p = it.el.getPointAtLength(it.len * e);
        if (m) { const q = new DOMPoint(p.x, p.y).matrixTransform(m); px = q.x - br.left; py = q.y - br.top; }
      } else {
        const r = it.el.getBoundingClientRect();
        px = r.left + r.width / 2 - br.left; py = r.top + r.height / 2 - br.top;
      }
    }
    pen.style.transform = `translate(${(px - 6).toFixed(1)}px,${(py - 6).toFixed(1)}px)`;
    pen.style.opacity = t > 1 ? '1' : '0';
  };

  // Progression : démarre quand la phrase d'ancrage (« Pas comme un cadre théorique ») arrive à hauteur des yeux,
  // se termine juste avant la fin de l'épinglage. wrap.top évolue linéairement avec le scroll (le wrap n'est pas sticky).
  const target = () => {
    const vh = window.innerHeight;
    if (pinned && pin && space) {
      const wrapTop = pin.parentElement!.getBoundingClientRect().top;
      const a0 = vh * 0.5 - anchorOff;
      const a1 = stickTop - pinOff - space.offsetHeight * 0.85;
      return clamp((a0 - wrapTop) / Math.max(1, a0 - a1)) * TMAX;
    }
    const a = (anchor || box).getBoundingClientRect().top;
    return clamp((vh * 0.5 - a) / (vh * 0.6)) * TMAX;
  };

  fitPin();
  alignDots();
  window.addEventListener('resize', () => { fitPin(); alignDots(); });

  if (reduce) { apply(TMAX); return; }
  let cur = -1;
  const tick = () => {
    const goal = target();
    const next = cur < 0 ? goal : cur + (goal - cur) * 0.06;
    if (Math.abs(next - cur) > 0.3) { cur = Math.abs(goal - next) < 0.5 ? goal : next; apply(cur); }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
