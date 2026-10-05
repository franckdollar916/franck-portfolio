/* DataHero — fond animé narratif pour un hero de portfolio Data & IA.
   Chaos → structuration → pipeline (5 étapes) → convergence → système en production (boucle).
   Vanilla JS, aucune dépendance, un seul <canvas>.

   const hero = new DataHero(canvasEl, {
     density: 1, speed: 1, labels: true, blue: true, interactive: true,
     onPhase: (index, name) => {}
   });
   hero.restart(); hero.setOptions({ density: 1.2 }); hero.destroy();
*/
(function (root) {
  'use strict';
  const TAU = Math.PI * 2;
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const smooth = (t) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
  const easeIO = (t) => { t = clamp(t, 0, 1); return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  const lerp = (a, b, t) => a + (b - a) * t;
  function mulberry(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const TL = { structure: 3.5, pipeline: 7.5, converge: 12, live: 15.5 };
  const PHASES = ['Données brutes', 'Structuration', 'Pipeline', 'Convergence', 'En production'];
  const STAGES = ['INGESTION', 'TRAITEMENT', 'MODÉLISATION', 'ORCHESTRATION', 'DÉPLOIEMENT'];
  const LAYERS = [6, 9, 11, 9, 6];
  const hexRgb = (h) => { const n = parseInt(h.replace('#', ''), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(','); };
  function sprite(rgb, size) {
    const c = document.createElement('canvas'); c.width = c.height = size;
    const g = c.getContext('2d'); const h = size / 2;
    const gr = g.createRadialGradient(h, h, 0, h, h, h);
    gr.addColorStop(0, 'rgba(' + rgb + ',1)');
    gr.addColorStop(0.16, 'rgba(' + rgb + ',0.6)');
    gr.addColorStop(0.42, 'rgba(' + rgb + ',0.12)');
    gr.addColorStop(1, 'rgba(' + rgb + ',0)');
    g.fillStyle = gr; g.fillRect(0, 0, size, size);
    return c;
  }

  class DataHero {
    constructor(canvas, opts) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.o = Object.assign({ density: 1, speed: 1, labels: true, blue: true, interactive: true,
        amber: '#E9B25F', core: '#FFE9C4', blueColor: '#7FA7E8', onPhase: null }, opts || {});
      this.reduced = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.mouse = { x: -1e4, y: -1e4, nx: 0, ny: 0, snx: 0, sny: 0, act: 0, tact: 0 };
      this.cam = { yaw: 0, pitch: 0 };
      this.phase = -1; this.visible = true;
      this._pt = { x: 0, y: 0, s: 1, z: 0 }; this._v = [0, 0, 0]; this._w = [0, 0, 0];
      this._frame = this._frame.bind(this);
      this._onMove = (e) => {
        const r = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - r.left; this.mouse.y = e.clientY - r.top;
        this.mouse.nx = clamp((this.mouse.x / r.width) * 2 - 1, -1, 1);
        this.mouse.ny = clamp((this.mouse.y / r.height) * 2 - 1, -1, 1);
        this.mouse.tact = 1;
      };
      this._onLeave = () => { this.mouse.tact = 0; };
      this._sprites();
      this._resize(true);
      this.restart();
      this.ro = new ResizeObserver(() => this._resize(false));
      this.ro.observe(canvas.parentElement || canvas);
      root.addEventListener('pointermove', this._onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', this._onLeave);
      this.io = new IntersectionObserver((en) => { this.visible = en[0].isIntersecting; });
      this.io.observe(canvas);
      this.last = performance.now();
      this.raf = requestAnimationFrame(this._frame);
    }

    setOptions(o) {
      const rebuild = o.density != null && o.density !== this.o.density;
      Object.assign(this.o, o);
      this._sprites();
      if (rebuild) { this._build(); this._reset(); }
    }
    restart() { this.t = this.reduced ? TL.live + 2 : 0; this._reset(); }
    destroy() {
      cancelAnimationFrame(this.raf); this.ro.disconnect(); this.io.disconnect();
      root.removeEventListener('pointermove', this._onMove);
      document.documentElement.removeEventListener('pointerleave', this._onLeave);
    }

    _sprites() {
      const blue = this.o.blue ? hexRgb(this.o.blueColor) : hexRgb(this.o.amber);
      if (this._spriteKey === blue) return;
      this._spriteKey = blue;
      this.rgbAmber = hexRgb(this.o.amber); this.rgbBlue = blue; this.rgbCore = hexRgb(this.o.core);
      this.sAmber = sprite(this.rgbAmber, 64); this.sCore = sprite(this.rgbCore, 64); this.sBlue = sprite(blue, 64);
    }

    _resize(first) {
      const W = this.canvas.clientWidth || 1, H = this.canvas.clientHeight || 1;
      const dpr = Math.min(root.devicePixelRatio || 1, 2);
      this.W = W; this.H = H; this.dpr = dpr;
      this.canvas.width = Math.round(W * dpr); this.canvas.height = Math.round(H * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (W >= 1100) { this.cx = W * 0.62; this.cy = H * 0.5; this.S = Math.min(W * 0.25, H * 0.6); }
      else if (W >= 760) { const k = (W - 760) / 340; this.cx = W * lerp(0.68, 0.62, k); this.cy = H * 0.48; this.S = Math.min(W * lerp(0.2, 0.25, k), H * 0.5); }
      else { this.cx = W * 0.5; this.cy = H * 0.3; this.S = Math.min(W * 0.36, H * 0.32); }
      if (first) this._build();
    }

    _build() {
      const rnd = mulberry(1337);
      this.rnd = mulberry(99);
      const nodes = []; this.layerStart = [];
      LAYERS.forEach((cnt, l) => { this.layerStart.push(nodes.length); for (let j = 0; j < cnt; j++) nodes.push({ l, j, cnt, glow: 0, x: 0, y: 0, z: 0 }); });
      this.nodes = nodes;
      const edges = [];
      for (let l = 0; l < LAYERS.length - 1; l++) {
        const s0 = this.layerStart[l], s1 = this.layerStart[l + 1], c1 = LAYERS[l + 1];
        for (let j = 0; j < LAYERS[l]; j++) {
          const f = j / LAYERS[l];
          const near = Math.round(f * c1) % c1;
          edges.push({ a: s0 + j, b: s1 + near, ring: false, delay: l * 0.35 + rnd() * 0.5, life: 1, tl: 1, next: -1 });
          const other = (near + 1 + Math.floor(rnd() * (c1 - 1))) % c1;
          if (rnd() < 0.8) edges.push({ a: s0 + j, b: s1 + other, ring: false, delay: l * 0.35 + rnd() * 0.5, life: 1, tl: 1, next: -1 });
        }
      }
      this.fwdCount = edges.length;
      for (let l = 0; l < LAYERS.length; l++) {
        const s0 = this.layerStart[l], c = LAYERS[l];
        for (let j = 0; j < c; j++) edges.push({ a: s0 + j, b: s0 + ((j + 1) % c), ring: true, delay: l * 0.35 + 0.6 + rnd() * 0.4, life: 1, tl: 1, next: -1 });
      }
      this.edges = edges;
      this._outs();

      const area = this.W * this.H;
      const n = Math.round(clamp(area / 2400, 260, 700) * this.o.density);
      const x0 = -this.cx / this.S - 0.15, x1 = (this.W - this.cx) / this.S + 0.15;
      const yh = this.H / 2 / this.S + 0.1;
      const P = [];
      for (let i = 0; i < n; i++) {
        const p = { a: rnd(), b: rnd(), c: rnd(), d: rnd(), rate: 0.55 + rnd() * 0.9, flash: 0,
          blue: rnd() < 0.13, kind: 0, sx: 0, sy: 0, psx: 0, psy: 0, sc: 1, dz: 0 };
        const k = rnd(); p.kind = k < 0.09 ? 1 : k < 0.15 ? 2 : 0;
        if (i < nodes.length) { p.role = 0; p.node = i; p.stage = nodes[i].l; p.kind = 0; p.blue = false; }
        else if (rnd() < 0.24) { p.role = 3; p.stage = -1; }
        else if (rnd() < 0.55) { p.role = 1; p.edge = Math.floor(rnd() * this.fwdCount); p.stage = nodes[edges[p.edge].a].l; }
        else { p.role = 2; p.node = Math.floor(rnd() * nodes.length); p.stage = nodes[p.node].l; }
        p.hx = lerp(x0, x1, rnd()); p.hy = lerp(-yh, yh, rnd()); p.hz = (rnd() - 0.5) * 1.6;
        P.push(p);
      }
      this.P = P;
    }

    _outs() {
      this.out = this.nodes.map(() => []);
      for (let i = 0; i < this.fwdCount; i++) this.out[this.edges[i].a].push(i);
    }

    _reset() {
      const r = mulberry(7);
      for (const p of this.P) {
        p.x = p.hx; p.y = p.hy; p.z = p.hz;
        p.vx = (r() - 0.5) * 0.08; p.vy = (r() - 0.5) * 0.08; p.vz = (r() - 0.5) * 0.05;
      }
      this.rot = LAYERS.map((_, l) => l * 0.4);
      this.pulses = []; this.sPulses = []; this.emits = [];
      this.stageGlow = [0, 0, 0, 0, 0];
      this.pulseClock = 0; this.sPulseClock = 0; this.reorgClock = 0;
      this.phase = -1;
    }

    _stageCenter(s, t, out) {
      const u = s / 4;
      out[0] = -1.2 + 2.4 * u;
      out[1] = 0.16 * Math.sin(u * TAU * 0.9 - 0.8) + 0.015 * Math.sin(t * 0.8 + s);
      out[2] = 0.22 * Math.sin(u * Math.PI) - 0.1;
    }

    _stageOffset(p, s, t, out) {
      switch (s) {
        case 0: { // ingestion : flux qui converge
          const k = (p.a + t * 0.09) % 1, sp = (1 - k) * 0.2 + 0.015;
          out[0] = -0.34 + 0.46 * k; out[1] = (p.b - 0.5) * 2 * sp; out[2] = (p.c - 0.5) * 2 * sp; break;
        }
        case 1: { // traitement : treillis ordonné
          const g = 0.062, gi = Math.floor(p.a * 5) - 2, gj = Math.floor(p.b * 5) - 2, gk = Math.floor(p.c * 3) - 1;
          const ang = t * 0.25, c = Math.cos(ang), sn = Math.sin(ang), x = gi * g, z = gk * g;
          out[0] = x * c - z * sn; out[1] = gj * g; out[2] = x * sn + z * c; break;
        }
        case 2: { // modélisation : orbites croisées + noyau
          if (p.d > 0.82) {
            const th = p.a * TAU + t * 0.3, ph = Math.acos(2 * p.b - 1), r = 0.045;
            out[0] = Math.sin(ph) * Math.cos(th) * r; out[1] = Math.cos(ph) * r; out[2] = Math.sin(ph) * Math.sin(th) * r;
          } else {
            const ring = p.c < 0.5 ? 0 : 1, ang = p.a * TAU + t * (ring ? 0.45 : -0.38), r = 0.16 + 0.03 * p.b;
            const cx = Math.cos(ang) * r, cy = Math.sin(ang) * r;
            if (ring) { out[0] = cx; out[1] = cy * 0.35; out[2] = cy * 0.94; }
            else { out[0] = cx * 0.4; out[1] = cy; out[2] = cx * 0.92; }
          }
          break;
        }
        case 3: { // orchestration : graphe en étoile
          const h = Math.floor(p.a * 7), ha = (h - 1) / 6 * TAU + t * 0.12;
          const hx = h === 0 ? 0 : Math.cos(ha) * 0.17, hy = h === 0 ? 0 : Math.sin(ha) * 0.17;
          if (p.c > 0.62) { out[0] = hx * p.b; out[1] = hy * p.b; out[2] = 0; }
          else {
            const ang = p.b * TAU + t * 0.7, r = 0.012 + 0.02 * p.d;
            out[0] = hx + Math.cos(ang) * r; out[1] = hy + Math.sin(ang) * r; out[2] = Math.sin(ang * 1.3) * r;
          }
          break;
        }
        default: { // déploiement : sphère compacte
          const y = 1 - 2 * p.b, rr = Math.sqrt(1 - y * y), th = p.a * 2.39996 * 400 + t * 0.35;
          out[0] = Math.cos(th) * rr * 0.15; out[1] = y * 0.15; out[2] = Math.sin(th) * rr * 0.15;
        }
      }
    }

    _updateNodes(t) {
      for (const nd of this.nodes) {
        const l = nd.l, lx = -1.3 + l * 0.65;
        const R = (0.22 + 0.22 * Math.sin(l / 4 * Math.PI)) * (1 + 0.035 * Math.sin(t * 0.7 + l * 0.9));
        const ang = nd.j / nd.cnt * TAU + this.rot[l];
        nd.x = lx + 0.025 * Math.cos(ang); nd.y = Math.sin(ang) * R; nd.z = Math.cos(ang) * R * 0.85;
      }
    }

    _edgePoint(e, u, out) {
      const A = this.P[e.a], B = this.P[e.b], k = e.ring ? 1.08 : 1.22;
      const cx = (A.x + B.x) / 2, cy = (A.y + B.y) / 2 * k, cz = (A.z + B.z) / 2 * k;
      const m = 1 - u, a = m * m, b = 2 * m * u, c = u * u;
      out[0] = a * A.x + b * cx + c * B.x; out[1] = a * A.y + b * cy + c * B.y; out[2] = a * A.z + b * cz + c * B.z;
      return out;
    }

    _project(x, y, z, o) {
      const cy = Math.cos(this.cam.yaw), sy = Math.sin(this.cam.yaw), cp = Math.cos(this.cam.pitch), sp = Math.sin(this.cam.pitch);
      const x1 = x * cy - z * sy, z1 = x * sy + z * cy;
      const y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
      const f = 3.2, s = f / (f + z2);
      o.x = this.cx + x1 * this.S * s; o.y = this.cy + y1 * this.S * s; o.s = s; o.z = z2;
      return o;
    }

    _frame(now) {
      this.raf = requestAnimationFrame(this._frame);
      if (!this.visible || document.hidden) { this.last = now; return; }
      const real = Math.min((now - this.last) / 1000, 0.05); this.last = now;
      const dt = real * this.o.speed * (this.reduced ? 0.35 : 1);
      this.t += dt;
      this._update(dt, real);
      this._draw();
    }

    _update(dt, real) {
      const t = this.t, m = this.mouse, rnd = this.rnd;
      const ph = t < TL.structure ? 0 : t < TL.pipeline ? 1 : t < TL.converge ? 2 : t < TL.live ? 3 : 4;
      if (ph !== this.phase) { this.phase = ph; if (this.o.onPhase) this.o.onPhase(ph, PHASES[ph]); }

      m.act += ((this.o.interactive ? m.tact : 0) - m.act) * (1 - Math.exp(-real * 3));
      m.snx += (m.nx * m.act - m.snx) * (1 - Math.exp(-real * 2));
      m.sny += (m.ny * m.act - m.sny) * (1 - Math.exp(-real * 2));
      this.cam.yaw = -0.3 + 0.07 * Math.sin(t * 0.07) + m.snx * 0.16;
      this.cam.pitch = 0.05 + m.sny * 0.09;

      const w = smooth((t - TL.structure) / (TL.pipeline - TL.structure)) * 0.85 + smooth((t - TL.pipeline) / 2) * 0.15;
      const spread = 1 + 2.2 * (1 - smooth((t - TL.structure) / (TL.pipeline + 1.5 - TL.structure)));
      const convT = TL.live - TL.converge;
      this.conv = easeIO((t - TL.converge) / convT);
      this.w = w;

      for (let l = 0; l < this.rot.length; l++) this.rot[l] += dt * (l % 2 ? -0.055 : 0.045);
      this._updateNodes(t);
      for (let s = 0; s < 5; s++) this.stageGlow[s] *= Math.exp(-dt * 2.5);
      for (const nd of this.nodes) nd.glow *= Math.exp(-dt * 2.8);

      // micro-signaux du chaos
      if (rnd() < (1 - w) * 0.6) this.P[Math.floor(rnd() * this.P.length)].flash = 1;

      const C = this._v, O = this._w, R = 150, mx = m.x, my = m.y, mAct = m.act;
      for (const p of this.P) {
        p.flash *= Math.exp(-dt * 3.5);
        const ca = p.role === 3 ? 1 - 0.5 * w : 1 - w;
        const nx = Math.sin(p.y * 2.1 + t * 0.35 + p.a * TAU), ny = Math.cos(p.x * 1.7 - t * 0.3 + p.b * TAU), nz = Math.sin((p.x + p.y) * 1.3 + t * 0.2 + p.c * TAU);
        p.vx += (nx * 0.13 * ca + (p.hx - p.x) * 0.05 * ca) * dt;
        p.vy += (ny * 0.13 * ca + (p.hy - p.y) * 0.05 * ca) * dt;
        p.vz += (nz * 0.08 * ca + (p.hz - p.z) * 0.05 * ca) * dt;
        if (mAct > 0.01) {
          const dx = p.sx - mx, dy = p.sy - my, d2 = dx * dx + dy * dy;
          if (d2 < R * R && d2 > 1) {
            const d = Math.sqrt(d2), f = (1 - d / R) * (1 - d / R) * mAct * 2.4 * dt;
            p.vx += (dx / d) * f; p.vy += (dy / d) * f;
          }
        }
        const damp = Math.exp(-dt * 1.1);
        p.vx *= damp; p.vy *= damp; p.vz *= damp;
        p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;

        let tx, ty, tz, fw;
        if (p.role === 3) {
          tx = p.hx + 0.06 * Math.sin(t * 0.21 + p.a * TAU); ty = p.hy + 0.05 * Math.cos(t * 0.17 + p.b * TAU); tz = p.hz;
          fw = 0.35 * w;
        } else {
          this._stageCenter(p.stage, t, C); this._stageOffset(p, p.stage, t, O);
          const jit = (spread - 1) * 0.28;
          tx = C[0] + O[0] * spread + (p.a - 0.5) * jit; ty = C[1] + O[1] * spread + (p.b - 0.5) * jit; tz = C[2] + O[2] * spread + (p.c - 0.5) * jit;
          if (this.conv > 0) {
            const c2 = easeIO((t - TL.converge - p.d * 0.9) / (convT - 0.9));
            let fx, fy, fz;
            if (p.role === 0) { const nd = this.nodes[p.node]; fx = nd.x; fy = nd.y; fz = nd.z; }
            else if (p.role === 1) {
              const u = (p.b + t * 0.035 * (0.4 + p.c)) % 1;
              this._edgePoint(this.edges[p.edge], u, O);
              fx = O[0] + (p.d - 0.5) * 0.02; fy = O[1] + (p.a - 0.5) * 0.02; fz = O[2];
            } else {
              const nd = this.nodes[p.node], ang = p.a * TAU + t * (0.5 + p.d * 0.6), rr = 0.026 + 0.034 * p.d;
              const ca2 = Math.cos(ang) * rr, sa = Math.sin(ang) * rr, tilt = p.c * Math.PI;
              fx = nd.x + ca2; fy = nd.y + sa * Math.cos(tilt); fz = nd.z + sa * Math.sin(tilt);
            }
            tx = lerp(tx, fx, c2); ty = lerp(ty, fy, c2); tz = lerp(tz, fz, c2);
          }
          fw = w * w;
        }
        const k = 1 - Math.exp(-dt * 4.2 * p.rate * fw);
        p.x += (tx - p.x) * k; p.y += (ty - p.y) * k; p.z += (tz - p.z) * k;
      }

      // impulsions le long de la pipeline
      if (t > TL.pipeline + 0.8 && t < TL.converge + 1) {
        this.sPulseClock -= dt;
        if (this.sPulseClock <= 0) { this.sPulses.push({ u: 0 }); this.sPulseClock = 0.55 + rnd() * 0.4; }
      }
      for (let i = this.sPulses.length - 1; i >= 0; i--) {
        const sp = this.sPulses[i], pu = sp.u; sp.u += dt * 0.22;
        for (let s = 0; s < 5; s++) if (pu < s / 4 && sp.u >= s / 4) this.stageGlow[s] = 1;
        if (sp.u > 1) this.sPulses.splice(i, 1);
      }

      // impulsions dans le système final
      if (t > TL.converge + 2.2) {
        this.pulseClock -= dt;
        if (this.pulseClock <= 0 && this.pulses.length < 36) {
          const n0 = Math.floor(rnd() * LAYERS[0]);
          const outs = this.out[n0].filter((e) => this.edges[e].life > 0.6);
          if (outs.length) this.pulses.push({ e: outs[Math.floor(rnd() * outs.length)], u: 0, sp: 0.55 + rnd() * 0.35 });
          this.nodes[n0].glow = 0.7;
          this.pulseClock = 0.18 + rnd() * 0.3;
        }
      }
      for (let i = this.pulses.length - 1; i >= 0; i--) {
        const pu = this.pulses[i]; pu.u += dt * pu.sp;
        if (pu.u >= 1) {
          const b = this.edges[pu.e].b; this.nodes[b].glow = 1;
          const outs = this.out[b].filter((e) => this.edges[e].life > 0.6);
          if (outs.length && rnd() < 0.94) { pu.e = outs[Math.floor(rnd() * outs.length)]; pu.u = 0; }
          else {
            if (this.nodes[b].l === LAYERS.length - 1) { const P = this.P[b]; this.emits.push({ x: P.x, y: P.y, z: P.z, life: 1 }); }
            this.pulses.splice(i, 1);
          }
        }
      }
      for (let i = this.emits.length - 1; i >= 0; i--) {
        const e = this.emits[i]; e.x += dt * 0.42; e.life -= dt * 0.7;
        if (e.life <= 0) this.emits.splice(i, 1);
      }

      // réorganisations subtiles (boucle)
      if (t > TL.live + 3) {
        this.reorgClock -= dt;
        if (this.reorgClock <= 0) {
          for (let k = 0; k < 3; k++) {
            const e = this.edges[Math.floor(rnd() * this.fwdCount)];
            if (e.tl === 1) { e.tl = 0; e.next = this.layerStart[this.nodes[e.b].l] + Math.floor(rnd() * this.nodes[e.b].cnt); }
          }
          this.reorgClock = 5 + rnd() * 3;
        }
      }
      for (let i = 0; i < this.fwdCount; i++) {
        const e = this.edges[i];
        e.life += (e.tl - e.life) * (1 - Math.exp(-dt * 1.6));
        if (e.tl === 0 && e.life < 0.03) { e.b = e.next; e.tl = 1; this._outs(); }
      }
    }

    _draw() {
      const ctx = this.ctx, t = this.t, W = this.W, H = this.H, conv = this.conv, w = this.w;
      const fadeIn = smooth(t / 1.6);
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      const pt = this._pt, P = this.P, A = this.rgbAmber, Bl = this.rgbBlue;

      for (const p of P) {
        p.psx = p.sx; p.psy = p.sy;
        this._project(p.x, p.y, p.z, pt);
        p.sx = pt.x; p.sy = pt.y; p.sc = pt.s; p.dz = pt.z;
      }

      // liens de proximité
      const L = smooth((t - TL.structure) / 2.5) * (1 - 0.7 * conv);
      if (L > 0.01) {
        const cell = 64, grid = new Map(), D = cell;
        for (let i = 0; i < P.length; i++) {
          const p = P[i]; if (p.role === 3) continue;
          const key = ((p.sx / cell) | 0) + ((p.sy / cell) | 0) * 4096;
          let arr = grid.get(key); if (!arr) grid.set(key, (arr = [])); arr.push(i);
        }
        const paths = [[], [], []]; let total = 0;
        for (let i = 0; i < P.length && total < 1500; i++) {
          const p = P[i]; if (p.role === 3) continue;
          const gx = (p.sx / cell) | 0, gy = (p.sy / cell) | 0; let links = 0;
          for (let ox = -1; ox <= 1 && links < 3; ox++) for (let oy = -1; oy <= 1 && links < 3; oy++) {
            const arr = grid.get(gx + ox + (gy + oy) * 4096); if (!arr) continue;
            for (const j of arr) {
              if (j <= i) continue;
              const q = P[j], dx = q.sx - p.sx, dy = q.sy - p.sy, d2 = dx * dx + dy * dy;
              if (d2 < D * D) {
                const f = 1 - Math.sqrt(d2) / D;
                paths[f > 0.66 ? 0 : f > 0.33 ? 1 : 2].push(p.sx, p.sy, q.sx, q.sy);
                links++; total++; if (links >= 3) break;
              }
            }
          }
        }
        ctx.lineWidth = 0.6;
        const al = [0.3, 0.16, 0.07];
        for (let b = 0; b < 3; b++) {
          const arr = paths[b]; if (!arr.length) continue;
          ctx.strokeStyle = 'rgba(' + A + ',' + (al[b] * L * fadeIn).toFixed(3) + ')';
          ctx.beginPath();
          for (let k = 0; k < arr.length; k += 4) { ctx.moveTo(arr[k], arr[k + 1]); ctx.lineTo(arr[k + 2], arr[k + 3]); }
          ctx.stroke();
        }
      }

      // colonne vertébrale de la pipeline
      const SA = smooth((t - TL.pipeline) / 1.2) * (1 - conv);
      if (SA > 0.01) {
        const prog = smooth((t - TL.pipeline) / 2.6), C = this._v, pts = [];
        const cs = []; for (let s = 0; s < 5; s++) { this._stageCenter(s, t, C); cs.push([C[0], C[1], C[2]]); }
        const N = 72;
        for (let k = 0; k <= N; k++) {
          const u = k / N * 4, i = Math.min(3, Math.floor(u)), f = u - i;
          const p0 = cs[Math.max(0, i - 1)], p1 = cs[i], p2 = cs[i + 1], p3 = cs[Math.min(4, i + 2)];
          const f2 = f * f, f3 = f2 * f, v = [0, 0, 0];
          for (let d = 0; d < 3; d++) v[d] = 0.5 * (2 * p1[d] + (-p0[d] + p2[d]) * f + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * f2 + (-p0[d] + 3 * p1[d] - 3 * p2[d] + p3[d]) * f3);
          this._project(v[0], v[1], v[2], pt); pts.push(pt.x, pt.y);
        }
        const lim = Math.floor(prog * N);
        ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(' + A + ',' + (0.32 * SA).toFixed(3) + ')';
        ctx.beginPath(); ctx.moveTo(pts[0], pts[1]);
        for (let k = 1; k <= lim; k++) ctx.lineTo(pts[k * 2], pts[k * 2 + 1]);
        ctx.stroke();
        for (const sp of this.sPulses) {
          const k = Math.min(N, Math.round(sp.u * N));
          for (let tr = 0; tr < 10; tr++) {
            const kk = k - tr; if (kk < 0) break;
            const s = (14 - tr) * (1 - tr / 11);
            ctx.globalAlpha = SA * (1 - tr / 10) * 0.9;
            ctx.drawImage(tr === 0 ? this.sCore : this.sAmber, pts[kk * 2] - s / 2, pts[kk * 2 + 1] - s / 2, s, s);
          }
        }
        ctx.globalAlpha = 1;
      }

      // arêtes du système final
      const E = this._w, q = { x: 0, y: 0, s: 1, z: 0 };
      if (conv > 0.1) {
        ctx.lineWidth = 0.8;
        for (const e of this.edges) {
          const dr = smooth((t - TL.converge - 1 - e.delay) / 1.4) * e.life;
          if (dr < 0.01) continue;
          const pa = P[e.a], pb = P[e.b];
          const k = e.ring ? 1.08 : 1.22;
          this._project((pa.x + pb.x) / 2, (pa.y + pb.y) / 2 * k, (pa.z + pb.z) / 2 * k, q);
          const ax = pa.sx, ay = pa.sy;
          const cx = 2 * q.x - (ax + pb.sx) / 2, cy = 2 * q.y - (ay + pb.sy) / 2; // point de contrôle 2D
          const s = Math.min(1, dr * 1.4);
          const c1x = ax + (cx - ax) * s, c1y = ay + (cy - ay) * s;
          const m = 1 - s, ex = m * m * ax + 2 * m * s * cx + s * s * pb.sx, ey = m * m * ay + 2 * m * s * cy + s * s * pb.sy;
          const alpha = (e.ring ? 0.14 : 0.24) * dr * (0.6 + 0.4 * Math.min(pa.sc, pb.sc));
          ctx.strokeStyle = 'rgba(' + (e.ring ? Bl : A) + ',' + alpha.toFixed(3) + ')';
          ctx.beginPath(); ctx.moveTo(ax, ay); ctx.quadraticCurveTo(c1x, c1y, ex, ey); ctx.stroke();
        }
      }

      // particules
      const frag = 1 - w;
      for (const p of P) {
        const depth = 0.55 + 0.45 * clamp(1 - (p.dz + 1) / 2, 0, 1);
        let a = fadeIn * depth * (p.role === 3 ? 0.32 : p.role === 0 ? 0.9 : 0.62);
        if (p.role !== 3) a *= 1 + this.stageGlow[p.stage] * 0.9 * (1 - conv);
        a = Math.min(1, a + p.flash * 0.8);
        let r = (0.6 + p.a * 1.05) * p.sc * (1 + p.flash * 0.8);
        if (p.role === 0) r *= 1 + 0.6 * conv;
        if (p.kind === 1 && frag > 0.02) {
          let dx = p.sx - p.psx, dy = p.sy - p.psy; const l = Math.hypot(dx, dy) || 1;
          if (l < 0.05) { dx = Math.cos(p.a * TAU); dy = Math.sin(p.a * TAU); } else { dx /= l; dy /= l; }
          const len = (6 + p.b * 10) * frag;
          ctx.strokeStyle = 'rgba(' + A + ',' + (a * 0.55 * frag).toFixed(3) + ')'; ctx.lineWidth = 0.7;
          ctx.beginPath(); ctx.moveTo(p.sx, p.sy); ctx.lineTo(p.sx - dx * len, p.sy - dy * len); ctx.stroke();
        }
        if (p.kind === 2) {
          const ba = a * 0.7 * (1 - conv * 0.85), bs = 3.4 * p.sc;
          if (ba > 0.01) { ctx.strokeStyle = 'rgba(' + A + ',' + ba.toFixed(3) + ')'; ctx.lineWidth = 0.6; ctx.strokeRect(p.sx - bs / 2, p.sy - bs / 2, bs, bs); }
        }
        const spr = p.blue ? this.sBlue : (p.role === 0 && conv > 0.3 ? this.sCore : this.sAmber);
        const s = r * 7;
        ctx.globalAlpha = a;
        ctx.drawImage(spr, p.sx - s / 2, p.sy - s / 2, s, s);
      }

      // halos des nœuds
      if (conv > 0.05) {
        for (let i = 0; i < this.nodes.length; i++) {
          const nd = this.nodes[i], p = P[i];
          const s = (10 + nd.glow * 22) * p.sc;
          ctx.globalAlpha = Math.min(1, conv * 0.28 + nd.glow * 0.55);
          ctx.drawImage(this.sAmber, p.sx - s / 2, p.sy - s / 2, s, s);
        }
      }

      // impulsions
      for (const pu of this.pulses) {
        const e = this.edges[pu.e];
        for (let tr = 0; tr < 9; tr++) {
          const u = pu.u - tr * 0.022; if (u < 0) break;
          this._edgePoint(e, u, E); this._project(E[0], E[1], E[2], q);
          const s = (13 - tr * 1.2) * q.s;
          ctx.globalAlpha = (1 - tr / 9) * 0.95 * e.life;
          ctx.drawImage(tr === 0 ? this.sCore : this.sAmber, q.x - s / 2, q.y - s / 2, s, s);
        }
      }
      for (const em of this.emits) {
        this._project(em.x, em.y, em.z, q);
        const len = 26 * q.s * (1.2 - em.life);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = 'rgba(' + this.rgbCore + ',' + (em.life * 0.5).toFixed(3) + ')'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(q.x - len, q.y); ctx.stroke();
        ctx.globalAlpha = em.life * 0.8;
        ctx.drawImage(this.sCore, q.x - 5, q.y - 5, 10, 10);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      // étiquettes des étapes
      if (this.o.labels && W >= 760) {
        ctx.font = '500 10px "Geist Mono", ui-monospace, monospace';
        if ('letterSpacing' in ctx) ctx.letterSpacing = '2px';
        ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        const C = this._v;
        for (let s = 0; s < 5; s++) {
          const la = smooth((t - TL.pipeline - 0.3 - s * 0.4) / 0.8);
          if (la < 0.01) continue;
          this._stageCenter(s, t, C);
          const R = 0.22 + 0.22 * Math.sin(s / 4 * Math.PI);
          const x = lerp(C[0], -1.3 + s * 0.65, conv), y = lerp(C[1] - 0.32, -(R + 0.16), conv), z = lerp(C[2], 0, conv);
          this._project(x, y, z, q);
          if (q.x < W * 0.5) continue;
          q.x = Math.min(q.x, W - 90);
          const alpha = la * lerp(0.8, 0.55, conv) * fadeIn;
          ctx.fillStyle = 'rgba(' + A + ',' + alpha.toFixed(3) + ')';
          ctx.fillText('0' + (s + 1) + ' ' + STAGES[s], q.x, q.y);
          ctx.fillStyle = 'rgba(' + A + ',' + (alpha * 0.5).toFixed(3) + ')';
          ctx.fillRect(Math.round(q.x), q.y + 6, 1, 10);
        }
      }
    }
  }
  DataHero.PHASES = PHASES;
  DataHero.STAGES = STAGES;
  root.DataHero = DataHero;
  if (typeof module !== 'undefined' && module.exports) module.exports = DataHero;
})(typeof window !== 'undefined' ? window : this);
