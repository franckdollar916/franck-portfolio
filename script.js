/* =========================================================
   Franck Nguimkeu — Portfolio · interactions
   ========================================================= */

/* -------- 1. i18n dictionary (EN overrides; FR is in HTML) -------- */
const I18N = {
  en: {
    "nav.role": "Data & AI Engineer",
    "nav.about": "About", "nav.exp": "Experience", "nav.projects": "Projects",
    "nav.skills": "Skills", "nav.contact": "Contact", "nav.cta": "Get in touch",

    "hero.status": "Available now · 6-month final internship · open to full-time",
    "hero.l1": "From a business problem to a", "hero.l2": "Data & AI system in production.",
    "hero.sub": "I design end-to-end Data & AI solutions: understanding the need, data engineering, ML & generative AI, industrialization, cloud deployment, monitoring and user adoption.",
    "hero.cta1": "Explore my work", "hero.cta2": "Download my CV", "hero.scroll": "Discover",
    "phase.1": "Raw data", "phase.2": "Structuring", "phase.3": "Pipeline", "phase.4": "Convergence", "phase.5": "In production",

    "stats.eyebrow": "My latest project — SFR · 5G Radio AI-Audit", "stats.link": "See the experience →",
    "stat.cells": "5G cells audited", "stat.measures": "field measurements fused",
    "stat.software": "software — 0 hardware module", "stat.audit": "full network audit",

    "about.eyebrow": "01 — About",
    "about.title1": "Behind the engineer,", "about.title2": "the human.",
    "about.quote": "“I believe that with courage, hard work and determination, no problem is out of reach.”",
    "about.bio1": "Behind the engineer, I'm <strong>Franck Nguimkeu Zafack</strong>, 24. Passionate about computing since childhood, hooked on problem-solving and versatility.",
    "about.bio2": "Early on, I realized I couldn't be everything at once — engineer, pilot, doctor… So I made a bet: turn computing into my <strong>superpower</strong>, the one that lets me contribute to every field I'm passionate about — health, finance, transport, telecoms, tech. In love with Artificial Intelligence, that's where I turned to gain the skills that solve the real problems of our world.",
    "about.soft": "Soft skills", "about.interests": "What drives me",
    "about.interests_txt": "Every day I follow the leading voices in AI (Sam Altman, Dario Amodei, Elon Musk…) and everything moving in the ecosystem.",
    "soft.1": "Passionate", "soft.2": "Rigorous", "soft.3": "Efficient", "soft.4": "Attentive",
    "soft.5": "Structured", "soft.6": "Autonomous", "soft.7": "Collaborative", "soft.8": "Curious", "soft.9": "Proactive",
    "int.1": "Tech watch", "int.2": "AI ecosystem", "int.3": "LLMs & agentic AI", "int.4": "Innovation",

    "exp.eyebrow": "02 — Experience",
    "exp.title1": "Where I've already", "exp.title2": "created impact.",
    "exp.sfr.role": "Big Data & AI Engineer — Internship",
    "exp.sfr.punch": "From a business need to a Big Data & AI solution deployed on the cloud and adopted by the teams.",
    "exp.sfr.tag": "Mobile Engineering Division — “AI Radio-Audit”: automatic 5G antenna orientation audit",
    "chain.1": "Analysis", "chain.2": "Data processing", "chain.3": "Modeling", "chain.4": "API",
    "chain.5": "Industrialization", "chain.6": "Cloud", "chain.7": "Monitoring", "chain.8": "Enablement",
    "exp.sfr.b1": "Designed and industrialized a tool detecting orientation defects (azimuth / tilt) across <strong>~30,000 5G cells</strong> — a <strong>100% software</strong> alternative to the dedicated hardware module (~€250/unit), reusing already-collected operator data.",
    "exp.sfr.b2": "Built an end-to-end Big Data pipeline (<strong>DuckDB</strong>) fusing <strong>~1.5 billion measurements</strong> and 3 heterogeneous sources — full network audit in <strong>~15 min</strong>.",
    "exp.sfr.b3": "Estimated orientation via directional statistics (triangulation of 3 methods + confidence score) and shape metrics (IoU); benchmarked deep learning models (auto-encoder, CNN), ruled out in production in favor of a more robust and explainable method.",
    "exp.sfr.b4": "Detected <strong>~4,100 real anomalies (13.8% of the network)</strong> to fix in priority — targeting field interventions, several €M of potential costs avoided, on a monthly re-runnable audit.",
    "exp.sfr.b5": "Industrialized it: <strong>Docker</strong> containerization (API, frontend, batch), <strong>GCP</strong> deployment, <strong>FastAPI / React</strong> web app, and internal team training.",
    "exp.edu.role": "Co-founder & CTO", "exp.edu.date": "Since 2025",
    "exp.edu.tag": "AI-powered EdTech startup",
    "exp.edu.b1": "Co-founded and lead the technical and product vision of an AI-powered educational platform.",
    "exp.edu.b2": "<strong>Orange Young Talents laureate</strong> (2 prizes + Special Jury Prize) and <strong>Sisley Young Creators Grant 2026</strong>.",
    "exp.edu.b3": "Defined product architecture and cloud deployment strategy (startup credits, technical governance).",
    "exp.bin.tag": "FinTech — Mobile Money & financial inclusion",
    "exp.bin.b1": "Built an <strong>NLP</strong> model automatically classifying Mobile Money transactions (income / expenses) from SMS — core of a personal finance management app.",
    "exp.bin.b2": "Cleaned and enriched thousands of SMS (data cleaning, feature engineering) to make categorization reliable.",
    "exp.bin.b3": "Contributed to a financial-inclusion product for Mobile Money users in Africa.",
    "chip.award": "🏆 Double award-winner",
    "exp.ctxbtn": "Understand the context",
    "exp.demoBtn": "Solution screenshots",
    "exp.sfr.ctx": "A telecom operator's mission: deliver flawless <strong>quality of service</strong> — which relies on strong <strong>radio coverage</strong> across the whole territory, provided by <strong>thousands of towers</strong>. Each tower carries <strong>3 antennas</strong>, each oriented to cover ~<strong>120°</strong>. The catch: in the field, real coverage doesn't always match what was <strong>planned</strong> internally — so conformity must be checked. Yet deploying teams everywhere, all the time, is impossible; and the <strong>hardware modules</strong> vendors offer, multiplied by <strong>thousands of sites</strong>, mean <strong>millions of euros</strong>. Hence my solution: an <strong>AI tool</strong> that analyzes <em>SFR's entire 5G network</em>, checks each site's conformity and surfaces, in priority, those most likely to be misaligned.",
    "exp.edu.ctxi": "<strong>Edu-TSAI</strong> is an AI-powered educational platform dedicated to the education of <strong>autistic children</strong> and to supporting the people around them: <strong>teachers, SEN assistants</strong> and <strong>parents</strong>.",
    "exp.edu.ctxp": "<strong>The problem:</strong> the education system struggles to concretely meet these children's needs, for lack of adapted resources. Every autistic child is unique — needs, sensitivities, way of communicating — and the teacher must personalize every resource. A real ordeal with 5 to 10 children to handle.",
    "exp.edu.ctxr": "Our answers:",
    "exp.edu.ctx1": "<strong>Automatic personalization</strong> — the platform starts from each child's profile to adapt resources: simple, fast, effective.",
    "exp.edu.ctx2": "<strong>Bringing everyone together</strong> — teacher, SEN assistant and parent finally share a collaborative space and the same level of information (where joint meetings happened only 1 to 2 times a year… sometimes never).",
    "exp.edu.ctx3": "<strong>Dashboard</strong> — measure progress, see what works, what to stop or improve.",
    "exp.edu.ctx4": "<strong>Follow-up file</strong> — no more paper folder to hand over at every class change, in a context of a severe shortage of SEN assistants.",

    "proj.eyebrow": "03 — Projects",
    "proj.title1": "Projects that", "proj.title2": "push the tech.",
    "proj.carla.t": "Autonomous driving agent — CARLA",
    "proj.carla.p": "An agent integrating LLM, VLM and RAG for contextual understanding, obstacle detection and decision-making in a dynamic environment — logic close to agentic AI systems.",
    "proj.devops.t": "Cloud-native app & CI/CD pipeline",
    "proj.devops.p": "FastAPI API + containerized PostgreSQL database (Docker), automated deployment via GitHub Actions and cloud orchestration, in an end-to-end DevOps approach.",
    "proj.energy.t": "Building energy consumption prediction",
    "proj.energy.p": "ML model trained on 100K+ buildings (structuring, feature engineering, evaluation with standardized error metrics). Kaggle competition.",

    "skills.eyebrow": "04 — Skills",
    "skills.title1": "My", "skills.title2": "toolbox.",
    "skills.g1": "AI & Machine Learning", "skills.g2": "Big Data & Data Engineering",
    "skills.g3": "MLOps & Cloud", "skills.g4": "Languages", "skills.g5": "Data Viz & BI",

    "edu.eyebrow": "05 — Background",
    "edu.title1": "Education &", "edu.title2": "certifications.",
    "edu.formation": "Education", "edu.certs": "Certifications", "edu.langs": "Languages",
    "edu.f1t": "Engineering degree — Data Science & AI",
    "edu.f2t": "MSc 1 AI & Big Data — Honors",
    "edu.f3t": "BSc Computer Science",
    "edu.certdone": "Certified", "edu.inprogress": "In progress", "edu.native": "Native",

    "contact.eyebrow": "06 — Contact",
    "contact.title1": "Let's build your next", "contact.title2": "Data / AI product?",
    "contact.sub": "Available for a 6-month final internship from February 2026, open to full-time. Interested in demanding environments where data truly drives decisions.",

    "photos.eyebrow": "In pictures", "photos.title1": "A few", "photos.title2": "moments.",
    "footer.rights": "All rights reserved.", "footer.top": "Back to top ↑"
  }
};

/* -------- Médias par expérience (à remplir quand les vidéos arrivent) --------
   kind: "youtube" (id), "vimeo" (id), "video" (src .mp4 + poster optionnel), "image" (src)
   Exemples :
     { kind: "youtube", id: "dQw4w9WgXcQ", caption: "Démo de la solution" }
     { kind: "video", src: "assets/video/sfr-demo.mp4", poster: "assets/img/sfr-demo.jpg", caption: "Enregistrement d'écran" }
     { kind: "image", src: "assets/img/sfr-1.jpg", caption: "Interface d'audit" }
*/
const EXP_MEDIA = {
  sfr: [
    { kind: "image", src: "assets/img/sfr/dashboard.png", caption: "Dashboard — synthèse de l'audit (29 601 cellules 5G)" },
    { kind: "image", src: "assets/img/sfr/galerie-overlay.png", caption: "Galerie — comparaison visuelle terrain vs planification (overlay)" },
    { kind: "image", src: "assets/img/sfr/anomalies.png", caption: "Anomalies d'orientation détectées (azimut)" },
    { kind: "image", src: "assets/img/sfr/cellules.png", caption: "Cellules auditées — exploration & filtres" }
  ],
  edu: [
    // Vidéos à ajouter (YouTube/Vimeo non répertorié recommandé) :
    // { kind: "youtube", id: "XXXX", caption: "Spot de présentation (1 min 30)" },
    // { kind: "youtube", id: "YYYY", caption: "Démo de la plateforme" },
    { kind: "image", src: "assets/img/edutsai/ecran-accueil.png", caption: "Écran d'accueil" },
    { kind: "image", src: "assets/img/edutsai/ecran-connexion.png", caption: "Écran de connexion" },
    { kind: "image", src: "assets/img/edutsai/profils-enfants.png", caption: "Profils des enfants" },
    { kind: "image", src: "assets/img/edutsai/profil-emma.png", caption: "Profil détaillé — Emma" },
    { kind: "image", src: "assets/img/edutsai/generateur-ia.png", caption: "Générateur de supports par IA" },
    { kind: "image", src: "assets/img/edutsai/supports-generes.png", caption: "Supports générés" },
    { kind: "image", src: "assets/img/edutsai/planning-visuel.png", caption: "Planning visuel" },
    { kind: "image", src: "assets/img/edutsai/espace-conversationnel.png", caption: "Espace conversationnel" },
    { kind: "image", src: "assets/img/edutsai/equipe.png", caption: "L'équipe Edu-TSAI" }
  ]
};

/* Keep the original French text so we can toggle back */
const FR_CACHE = {};

function setLang(lang) {
  const root = document.documentElement;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!(key in FR_CACHE)) FR_CACHE[key] = el.innerHTML;
    if (lang === "en" && I18N.en[key]) el.innerHTML = I18N.en[key];
    else el.innerHTML = FR_CACHE[key];
  });
  root.lang = lang;
  document.getElementById("langLabel").textContent = lang === "en" ? "EN" : "FR";
  // swap CV + document title
  const cv = document.getElementById("cvLink");
  cv.href = lang === "en" ? "assets/cv/CV_Franck_Nguimkeu_EN.pdf" : "assets/cv/CV_Franck_Nguimkeu_FR.pdf";
  document.title = lang === "en"
    ? "Franck Nguimkeu — Data & AI Engineer"
    : "Franck Nguimkeu — Ingénieur Data & IA";
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

/* -------- 2. Theme -------- */
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

/* -------- 3. Init -------- */
document.addEventListener("DOMContentLoaded", () => {
  // restore prefs
  let savedTheme = "dark", savedLang = "fr";
  try { savedTheme = localStorage.getItem("theme") || "dark"; savedLang = localStorage.getItem("lang") || "fr"; } catch (e) {}
  setTheme(savedTheme);
  if (savedLang === "en") setLang("en");

  document.getElementById("themeToggle").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    setTheme(cur === "dark" ? "light" : "dark");
  });
  document.getElementById("langToggle").addEventListener("click", () => {
    const cur = document.documentElement.lang;
    setLang(cur === "en" ? "fr" : "en");
  });

  // mobile menu
  const nav = document.getElementById("nav");
  document.getElementById("burger").addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll(".nav__links a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );

  // LinkedIn placeholder links -> update here when known
  const LINKEDIN = "https://www.linkedin.com/in/franck-nguimkeu";
  document.querySelectorAll(".js-linkedin").forEach((a) => {
    a.href = LINKEDIN; a.target = "_blank"; a.rel = "noopener";
  });

  // reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // context toggles (experience "understand the context")
  document.querySelectorAll(".ctx-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      if (panel) panel.classList.toggle("open", !open);
    });
  });

  // photo gallery (marquee + lightbox), loaded from a JSON manifest
  initGallery();

  // experience media panels (demo videos + screenshots)
  initMedia();

  // animated counters
  const counters = document.querySelectorAll(".stat__num");
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); } });
  }, { threshold: 0.5 });
  counters.forEach((c) => cio.observe(c));

  // scroll: nav state + progress + active link
  const links = [...document.querySelectorAll(".nav__links a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const progress = document.getElementById("scrollProgress");
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 20);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    let active = sections.length ? sections[0] : null;
    sections.forEach((s) => { if (y >= s.offsetTop - 140) active = s; });
    links.forEach((a) => a.classList.toggle("active", active && a.getAttribute("href") === "#" + active.id));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  initCanvas();
  initHeroCanvas();
  initHeroVideo();
});

/* -------- Hero background video: only show it if a real file loads -------- */
function initHeroVideo() {
  const v = document.getElementById("heroVideo");
  if (!v) return;
  const activate = () => { v.classList.add("is-active"); v.play().catch(() => {}); };
  // If the <source> resolves and can play, reveal the video over the canvas.
  v.addEventListener("canplay", activate, { once: true });
  v.addEventListener("loadeddata", activate, { once: true });
  v.addEventListener("error", () => v.classList.remove("is-active"));
  // Kick off loading; a missing file simply errors and the canvas stays visible.
  try { v.load(); } catch (e) {}
}

/* -------- 4. Counter animation -------- */
function animateCount(el) {
  const target = parseFloat(el.getAttribute("data-count"));
  const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
  const prefix = el.getAttribute("data-prefix") || "";
  const suffix = el.getAttribute("data-suffix") || "";
  const dur = 1500;
  const start = performance.now();
  const fmt = (n) => n.toLocaleString(document.documentElement.lang === "en" ? "en-US" : "fr-FR", {
    minimumFractionDigits: decimals, maximumFractionDigits: decimals
  });
  function frame(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + fmt(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = prefix + fmt(target) + suffix;
  }
  requestAnimationFrame(frame);
}

/* -------- 5. Subtle particle canvas -------- */
function initCanvas() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  let w, h, dots, raf;
  const COUNT = Math.min(70, Math.floor(window.innerWidth / 20));

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    dots = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.4
    }));
  }
  function tick() {
    ctx.clearRect(0, 0, w, h);
    const light = document.documentElement.getAttribute("data-theme") === "light";
    const col = light ? "150,110,20" : "235,195,95";
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col},0.5)`; ctx.fill();
      for (let j = i + 1; j < dots.length; j++) {
        const o = dots[j], dx = d.x - o.x, dy = d.y - o.y, dist = Math.hypot(dx, dy);
        if (dist < 120) {
          ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(o.x, o.y);
          ctx.strokeStyle = `rgba(${col},${0.12 * (1 - dist / 120)})`; ctx.lineWidth = 0.6; ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(tick);
  }
  resize(); tick();
  let t;
  window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(resize, 200); });
}

/* -------- 6. Hero background: DataHero (chaos → structuration → pipeline → convergence → production) -------- */
function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  const hero = document.getElementById("hero");
  if (!canvas || !hero || !window.DataHero) return;
  try {
    window.__dataHero = new window.DataHero(canvas, {
      amber: "#f5b820",   // notre or (accent du site)
      core: "#ffd76a",    // or clair : cœurs de nœuds & impulsions
      blue: false,        // pas d'accent bleu — tout en or
      density: 1, speed: 1, labels: true, interactive: true,
      onPhase: (i) => {
        document.querySelectorAll("#heroPhases li").forEach((li, idx) => {
          li.classList.toggle("done", idx <= i);
          li.classList.toggle("active", idx === i);
        });
      }
    });
  } catch (e) { /* no-op */ }
}

/* -------- 7. Photo gallery: manifest-driven marquee + lightbox -------- */
function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

async function initGallery() {
  const track = document.getElementById("marqueeTrack");
  const marquee = document.querySelector(".marquee");
  if (!track || !marquee) return;

  let photos = [];
  // Prefer the inlined list (works even when opening index.html directly, file://)
  if (Array.isArray(window.GALLERY_PHOTOS)) {
    photos = window.GALLERY_PHOTOS;
  } else {
    try {
      const res = await fetch("assets/img/gallery/photos.json", { cache: "no-store" });
      if (res.ok) photos = await res.json();
    } catch (e) {}
  }

  // If the manifest lists photos, build real clickable slides; otherwise keep placeholders.
  if (Array.isArray(photos) && photos.length) {
    marquee.classList.add("marquee--live");
    track.innerHTML = photos.map((p, i) => `
      <figure class="photo-slide" data-idx="${i}" tabindex="0" role="button" aria-label="${escapeHtml(p.caption || "Photo")}">
        <img src="${escapeHtml(p.src)}" alt="${escapeHtml(p.caption || "")}" loading="lazy" />
        <span class="photo-slide__zoom" aria-hidden="true">⤢</span>
        <figcaption>${escapeHtml(p.caption || "")}</figcaption>
      </figure>`).join("");
    const lb = ensureLightbox();
    const openFrom = (target) => { const fig = target.closest(".photo-slide"); if (fig && lb) lb.open(photos, parseInt(fig.getAttribute("data-idx"), 10) || 0); };
    marquee.addEventListener("click", (e) => openFrom(e.target));
    marquee.addEventListener("keydown", (e) => { const fig = e.target.closest(".photo-slide"); if (fig && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openFrom(e.target); } });
  }

  // duplicate the track for a seamless right-to-left loop
  const clone = track.cloneNode(true);
  clone.querySelectorAll("*").forEach((n) => n.setAttribute("aria-hidden", "true"));
  while (clone.firstChild) track.appendChild(clone.firstChild);

  // keep a roughly constant scroll speed whatever the number of photos
  requestAnimationFrame(() => {
    const w = track.scrollWidth / 2; // one set
    const speed = 55; // px per second
    if (w > 0) track.style.animationDuration = Math.max(20, Math.round(w / speed)) + "s";
  });
}

/* Reusable image lightbox (used by the photo gallery AND experience media) */
let _LB = null;
function ensureLightbox() {
  if (_LB) return _LB;
  const lb = document.getElementById("lightbox");
  if (!lb) return null;
  const img = lb.querySelector(".lightbox__img");
  const cap = lb.querySelector(".lightbox__cap");
  const counter = lb.querySelector(".lightbox__counter");
  let list = [], idx = 0;
  const render = () => {
    const p = list[idx] || {};
    img.src = p.src || ""; img.alt = p.caption || "";
    cap.textContent = p.caption || "";
    counter.textContent = list.length > 1 ? (idx + 1) + " / " + list.length : "";
  };
  const open = (l, i) => { if (!l || !l.length) return; list = l; idx = ((i % l.length) + l.length) % l.length; render(); lb.classList.add("open"); document.body.style.overflow = "hidden"; };
  const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
  const prev = () => { idx = (idx - 1 + list.length) % list.length; render(); };
  const next = () => { idx = (idx + 1) % list.length; render(); };
  lb.querySelector(".lightbox__close").addEventListener("click", close);
  lb.querySelector(".lightbox__prev").addEventListener("click", prev);
  lb.querySelector(".lightbox__next").addEventListener("click", next);
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lightbox__stage")) close(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") prev();
    else if (e.key === "ArrowRight") next();
  });
  _LB = { open, close };
  return _LB;
}

/* -------- 8. Experience media panels (demo videos + screenshots) -------- */
function initMedia() {
  const en = document.documentElement.lang === "en";
  document.querySelectorAll(".media-panel[data-media]").forEach((panel) => {
    const key = panel.getAttribute("data-media");
    const items = (typeof EXP_MEDIA !== "undefined" && EXP_MEDIA[key]) || [];
    if (!items.length) {
      panel.innerHTML = '<p class="media-empty">' +
        (en ? "🖼️ Solution screenshots — coming soon."
            : "🖼️ Images de la solution — bientôt disponibles.") + "</p>";
      return;
    }
    const vids = items.filter((i) => i.kind === "youtube" || i.kind === "vimeo" || i.kind === "video");
    const imgs = items.filter((i) => i.kind === "image");
    let html = "";
    if (vids.length) {
      html += '<div class="media-grid">';
      vids.forEach((v) => {
        let frame = "";
        if (v.kind === "youtube") {
          frame = '<iframe src="https://www.youtube-nocookie.com/embed/' + escapeHtml(v.id) +
            '" title="' + escapeHtml(v.caption || "Vidéo") +
            '" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>';
        } else if (v.kind === "vimeo") {
          frame = '<iframe src="https://player.vimeo.com/video/' + escapeHtml(v.id) +
            '" title="' + escapeHtml(v.caption || "Vidéo") +
            '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
        } else {
          frame = '<video controls preload="metadata"' + (v.poster ? ' poster="' + escapeHtml(v.poster) + '"' : "") +
            '><source src="' + escapeHtml(v.src) + '" type="video/mp4"></video>';
        }
        html += '<figure class="media-video-wrap"><div class="media-video">' + frame + "</div>" +
          (v.caption ? '<figcaption class="media-cap">' + escapeHtml(v.caption) + "</figcaption>" : "") + "</figure>";
      });
      html += "</div>";
    }
    if (imgs.length) {
      html += '<div class="media-imgs">';
      imgs.forEach((im, i) => {
        html += '<a href="' + escapeHtml(im.src) + '" data-idx="' + i + '" title="' + escapeHtml(im.caption || "") +
          '"><img src="' + escapeHtml(im.src) + '" alt="' + escapeHtml(im.caption || "") + '" loading="lazy"></a>';
      });
      html += "</div>";
    }
    panel.innerHTML = html;

    if (imgs.length) {
      const lb = ensureLightbox();
      const grid = panel.querySelector(".media-imgs");
      if (grid && lb) grid.addEventListener("click", (e) => {
        const a = e.target.closest("a[data-idx]"); if (!a) return;
        e.preventDefault();
        lb.open(imgs, parseInt(a.getAttribute("data-idx"), 10) || 0);
      });
    }
  });
}
