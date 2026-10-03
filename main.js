/* =========================================================
   恒温 HENGWEN — interactions
   - Three.js hero field
   - temperature color system
   - scroll reveal / counters / filters / form
   ========================================================= */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = matchMedia("(hover: none), (pointer: coarse)").matches;

  /* ---------- Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Temperature system ---------- */
  const root = document.documentElement;
  const tempRange = document.getElementById("tempRange");
  const tempToggle = document.getElementById("tempToggle");

  function setTemperature(value) {
    const v = Math.max(0, Math.min(100, Number(value)));
    root.style.setProperty("--temp", v + "%");
    if (tempRange && Number(tempRange.value) !== v) tempRange.value = String(v);
    if (tempToggle) {
      tempToggle.setAttribute("aria-pressed", v > 55 ? "true" : "false");
    }
  }

  if (tempRange) {
    tempRange.addEventListener("input", (e) => setTemperature(e.target.value));
    setTemperature(tempRange.value);
  }

  if (tempToggle) {
    let warm = false;
    tempToggle.addEventListener("click", () => {
      warm = !warm;
      setTemperature(warm ? 82 : 18);
      showToast(warm ? t("temp.warm") : t("temp.cool"));
    });
  }

  /* ---------- Toast ---------- */
  const toastEl = document.getElementById("toast");
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-show"), 2200);
  }

  function t(key) {
    return window.__i18n ? window.__i18n.t(key) : key;
  }

  function postMeta(id, base) {
    const lang = window.__i18n ? window.__i18n.getLang() : "zh";
    const override = window.__i18n ? window.__i18n.getPostMeta(id, lang) : null;
    return Object.assign({}, base, override || {});
  }

  /* ---------- Nav scroll + mobile menu ---------- */
  const nav = document.querySelector(".nav");
  const burger = document.getElementById("navBurger");
  const navLinks = document.getElementById("navLinks");

  function onScrollNav() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      const open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      navLinks.classList.toggle("is-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
    });

    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        burger.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Cursor glow (desktop) ---------- */
  const glow = document.querySelector(".cursor-glow");
  if (glow && !isTouch && !prefersReduced) {
    let gx = window.innerWidth / 2;
    let gy = window.innerHeight / 2;
    let cx = gx;
    let cy = gy;

    window.addEventListener(
      "pointermove",
      (e) => {
        gx = e.clientX;
        gy = e.clientY;
        document.body.classList.add("is-pointer");
      },
      { passive: true }
    );

    (function loopGlow() {
      cx += (gx - cx) * 0.12;
      cy += (gy - cy) * 0.12;
      glow.style.left = cx + "px";
      glow.style.top = cy + "px";
      requestAnimationFrame(loopGlow);
    })();
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = Array.from(document.querySelectorAll(".reveal"));
  reveals.forEach((el, i) => {
    el.style.setProperty("--d", Math.min(i % 6, 5) * 0.06 + "s");
  });

  // Hero is above the fold — reveal immediately so first paint is complete
  requestAnimationFrame(() => {
    document.querySelectorAll(".hero .reveal").forEach((el) => {
      el.classList.add("is-in");
    });
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));

    // skill bars
    const poles = document.querySelectorAll(".pole");
    const poleIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            poleIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    poles.forEach((p) => poleIO.observe(p));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
    document.querySelectorAll(".pole").forEach((p) => p.classList.add("is-in"));
  }

  /* ---------- Counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  function animateCount(el) {
    const target = Number(el.getAttribute("data-count") || "0");
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = String(target);
    }
    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window) {
    const countIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => countIO.observe(c));
  } else {
    counters.forEach((c) => {
      c.textContent = c.getAttribute("data-count") || "0";
    });
  }

  /* ---------- Work filters ---------- */
  const chips = document.querySelectorAll(".chip");
  const cards = document.querySelectorAll(".work-card");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      const filter = chip.getAttribute("data-filter") || "all";

      cards.forEach((card) => {
        const cats = card.getAttribute("data-cat") || "";
        const show = filter === "all" || cats.split(/\s+/).includes(filter);
        card.classList.toggle("is-hidden", !show);
        if (show) {
          card.style.animation = "none";
          void card.offsetWidth;
          card.style.animation = "";
          card.classList.add("is-in");
        }
      });
    });
  });

  /* ---------- Real posts (from original blog) ---------- */
  const posts = window.HENGWEN_POSTS || {};
  const postOrder = window.HENGWEN_POST_ORDER || Object.keys(posts);

  function formatPostDate(iso) {
    const [y, m, d] = String(iso || "").split("-");
    return { day: d || "", month: y && m ? `${y}.${m}` : "" };
  }

  function localizeWorkCards() {
    document.querySelectorAll(".work-card[data-post]").forEach((card) => {
      const id = card.getAttribute("data-post");
      const base = posts[id] || {};
      const meta = postMeta(id, {
        title: base.title,
        description: base.description,
        category: base.category,
        tags: base.tags,
        readTime: base.readTime,
      });
      const h3 = card.querySelector("h3");
      const p = card.querySelector(".work-card__body > p");
      const link = card.querySelector(".work-card__link");
      const tagEls = card.querySelectorAll(".work-card__tags span");
      if (h3 && meta.title) h3.textContent = meta.title;
      if (p && meta.description) p.textContent = meta.description;
      if (link) {
        link.innerHTML = t("works.read") + ' <span>→</span>';
        link.setAttribute("data-post", id);
      }
      if (tagEls.length) {
        const tags = (meta.tags || [meta.category]).filter(Boolean);
        tagEls.forEach((el, i) => {
          el.textContent = tags[i] || tags[tags.length - 1] || "";
        });
      }
    });
  }

  function renderWritingList() {
    const list = document.getElementById("writingList");
    if (!list) return;

    list.innerHTML = postOrder
      .map((id, index) => {
        const base = posts[id];
        if (!base) return "";
        const post = postMeta(id, base);
        const { day, month } = formatPostDate(base.date);
        const readLabel = post.readTime || "";
        return `
          <article class="post reveal" data-post="${id}" tabindex="0" role="button" style="--d:${Math.min(index, 5) * 0.05}s">
            <div class="post__date">
              <span class="post__day">${day}</span>
              <span class="post__month">${month}</span>
            </div>
            <div class="post__main">
              <div class="post__tags"><span>${post.category}</span>${(post.tags || []).slice(1, 3).map((t) => `<span>${t}</span>`).join("")}</div>
              <h3>${post.title}</h3>
              <p>${post.description}</p>
            </div>
            <div class="post__meta">
              <span>${readLabel}</span>
              <span class="post__arrow">↗</span>
            </div>
          </article>
        `;
      })
      .join("");

    list.querySelectorAll(".reveal").forEach((el) => {
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-in");
                io.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
        );
        io.observe(el);
      } else {
        el.classList.add("is-in");
      }
    });

    localizeWorkCards();
  }

  window.__renderWritingList = renderWritingList;
  renderWritingList();

  window.addEventListener("langchange", () => {
    renderWritingList();
  });

  /* ---------- Post reader ---------- */
  const reader = document.getElementById("postReader");
  const readerTitle = document.getElementById("readerTitle");
  const readerCat = document.getElementById("readerCat");
  const readerDate = document.getElementById("readerDate");
  const readerTime = document.getElementById("readerTime");
  const readerDesc = document.getElementById("readerDesc");
  const readerTags = document.getElementById("readerTags");
  const readerBody = document.getElementById("readerBody");

  function openPost(id) {
    const base = posts[id];
    if (!base || !reader) return;
    const post = postMeta(id, base);

    if (readerTitle) readerTitle.textContent = post.title;
    if (readerCat) readerCat.textContent = post.category;
    if (readerDate) readerDate.textContent = base.date;
    if (readerTime) readerTime.textContent = post.readTime || "";
    if (readerDesc) readerDesc.textContent = post.description || "";
    if (readerTags) {
      readerTags.innerHTML = (post.tags || [])
        .map((t) => `<span>${t}</span>`)
        .join("");
    }
    // Keep original Chinese body as authentic source text
    if (readerBody) readerBody.innerHTML = base.body || "";

    reader.classList.add("is-open");
    reader.setAttribute("aria-hidden", "false");
    document.body.classList.add("reader-open");

    const closeBtn = reader.querySelector(".reader__close");
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  }

  function closePost() {
    if (!reader) return;
    reader.classList.remove("is-open");
    reader.setAttribute("aria-hidden", "true");
    document.body.classList.remove("reader-open");
  }

  document.addEventListener("click", (e) => {
    const openEl = e.target.closest("[data-post]");
    if (openEl) {
      e.preventDefault();
      openPost(openEl.getAttribute("data-post"));
      return;
    }
    if (e.target.closest("[data-close-reader]")) {
      closePost();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePost();
    if ((e.key === "Enter" || e.key === " ") && e.target.matches?.("[data-post]")) {
      e.preventDefault();
      openPost(e.target.getAttribute("data-post"));
    }
  });

  /* ---------- Work card 3D tilt ---------- */
  if (!isTouch && !prefersReduced) {
    cards.forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-8px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (!isTouch && !prefersReduced) {
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
      });
      btn.addEventListener("pointerleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* ---------- Contact form ---------- */
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();

      if (!name || !email || !message) {
        if (formNote) {
          formNote.textContent = t("form.errRequired");
          formNote.classList.add("is-error");
        }
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (formNote) {
          formNote.textContent = t("form.errEmail");
          formNote.classList.add("is-error");
        }
        return;
      }

      if (formNote) {
        formNote.classList.remove("is-error");
        formNote.textContent = t("form.ok");
      }
      showToast(t("form.toastOk"));
      form.reset();
    });
  }

  /* ---------- Smooth anchor offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
    });
  });

  /* ---------- Giscus (GitHub Discussions guestbook) ---------- */
  const giscusMount = document.getElementById("giscusMount");
  const giscusLoading = document.getElementById("giscusLoading");
  const giscusFallback = document.getElementById("giscusFallback");
  const giscusRetry = document.getElementById("giscusRetry");
  let giscusTimer = null;
  let giscusHardTimer = null;

  function showGiscusFallback() {
    if (giscusLoading) giscusLoading.classList.add("is-hidden");
    if (giscusFallback) giscusFallback.hidden = false;
  }

  function hideGiscusFallback() {
    if (giscusFallback) giscusFallback.hidden = true;
    if (giscusLoading) giscusLoading.classList.remove("is-hidden");
  }

  function syncGiscusTheme() {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe || !iframe.contentWindow) return;
    const isLight =
      document.documentElement.getAttribute("data-theme") === "light";
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: isLight ? "light" : "dark" } } },
      "https://giscus.app"
    );
  }

  function loadGiscus() {
    if (!giscusMount) return;
    hideGiscusFallback();
    giscusMount.innerHTML = "";
    clearTimeout(giscusTimer);
    clearTimeout(giscusHardTimer);

    if (giscusLoading) giscusLoading.classList.remove("is-hidden");

    const s = document.createElement("script");
    s.src = "https://giscus.app/client.js";
    s.async = true;
    s.setAttribute("data-repo", "Gan-cell888/Gan-cell888.github.io");
    s.setAttribute("data-repo-id", "R_kgDOTCiMnQ");
    s.setAttribute("data-category", "General");
    s.setAttribute("data-category-id", "DIC_kwDOTCiMnc4C_7Zi");
    s.setAttribute("data-mapping", "pathname");
    s.setAttribute("data-strict", "0");
    s.setAttribute("data-reactions-enabled", "1");
    s.setAttribute("data-emit-metadata", "0");
    s.setAttribute("data-input-position", "bottom");
    s.setAttribute("data-theme", document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
    s.setAttribute("data-lang", "zh-CN");
    s.setAttribute("data-loading", "lazy");

    s.onload = () => {
      clearTimeout(giscusTimer);
      giscusTimer = setTimeout(() => {
        const iframe = document.querySelector("iframe.giscus-frame");
        if (iframe) {
          if (giscusLoading) giscusLoading.classList.add("is-hidden");
          syncGiscusTheme();
        } else {
          showGiscusFallback();
        }
      }, 4500);
    };

    s.onerror = () => {
      clearTimeout(giscusTimer);
      showGiscusFallback();
    };

    giscusMount.appendChild(s);

    // hard timeout if network blocks client.js silently
    giscusHardTimer = setTimeout(() => {
      const iframe = document.querySelector("iframe.giscus-frame");
      if (!iframe) showGiscusFallback();
    }, 8000);
  }

  // wait until near viewport, then load (lazy)
  const guestbookSection = document.getElementById("guestbook");
  if (guestbookSection && "IntersectionObserver" in window) {
    const gio = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          gio.disconnect();
          loadGiscus();
        }
      },
      { rootMargin: "200px" }
    );
    gio.observe(guestbookSection);
  } else {
    loadGiscus();
  }

  if (giscusRetry) {
    giscusRetry.addEventListener("click", () => loadGiscus());
  }

  window.addEventListener("message", (event) => {
    if (event.origin !== "https://giscus.app") return;
    if (event.data && event.data.giscus) {
      syncGiscusTheme();
      clearTimeout(giscusTimer);
      clearTimeout(giscusHardTimer);
      if (giscusLoading) giscusLoading.classList.add("is-hidden");
    }
  });

  /* =========================================================
     Three.js hero — floating temperature field
     ========================================================= */
  function initHero() {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas || typeof THREE === "undefined") {
      // graceful fallback: CSS gradient already present
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    // lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambient);

    const key = new THREE.PointLight(0xff7a59, 1.4, 40);
    key.position.set(4, 3, 6);
    scene.add(key);

    const fill = new THREE.PointLight(0x64d2ff, 1.1, 40);
    fill.position.set(-5, -2, 4);
    scene.add(fill);

    const violet = new THREE.PointLight(0xa78bfa, 0.7, 40);
    violet.position.set(0, 4, -2);
    scene.add(violet);

    // particle field
    const count = isTouch || window.innerWidth < 768 ? 900 : 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    const warm = new THREE.Color(0xff7a59);
    const cool = new THREE.Color(0x64d2ff);
    const violetC = new THREE.Color(0xa78bfa);
    const tmp = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 3.2 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.55;
      positions[i3 + 2] = radius * Math.cos(phi);

      const t = Math.random();
      if (t < 0.4) tmp.copy(warm);
      else if (t < 0.75) tmp.copy(cool);
      else tmp.copy(violetC);
      tmp.offsetHSL(0, 0, (Math.random() - 0.5) * 0.15);

      colors[i3] = tmp.r;
      colors[i3 + 1] = tmp.g;
      colors[i3 + 2] = tmp.b;
      speeds[i] = 0.15 + Math.random() * 0.55;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isTouch ? 0.035 : 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // floating orbs (meshes)
    const orbs = [];
    const orbConfigs = [
      { r: 0.28, color: 0xff7a59, x: -3.1, y: 1.3, z: -1.8 },
      { r: 0.22, color: 0x64d2ff, x: 3.1, y: -1.0, z: -1.0 },
      { r: 0.16, color: 0xa78bfa, x: 1.4, y: 2.0, z: -2.6 },
      { r: 0.12, color: 0xffb07c, x: -2.1, y: -1.7, z: -2.0 },
      { r: 0.18, color: 0x5b8def, x: 3.5, y: 1.6, z: -3.2 },
    ];

    orbConfigs.forEach((cfg, idx) => {
      const geo = new THREE.IcosahedronGeometry(cfg.r, 1);
      const mat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        metalness: 0.45,
        roughness: 0.22,
        emissive: cfg.color,
        emissiveIntensity: 0.42,
        transparent: true,
        opacity: 0.88,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(cfg.x, cfg.y, cfg.z);
      mesh.userData = {
        base: mesh.position.clone(),
        speed: 0.25 + idx * 0.08,
        amp: 0.18 + idx * 0.04,
        rot: 0.15 + idx * 0.05,
      };
      scene.add(mesh);
      orbs.push(mesh);
    });

    // connecting lines among orbs
    const linePositions = [];
    for (let i = 0; i < orbs.length; i++) {
      for (let j = i + 1; j < orbs.length; j++) {
        linePositions.push(orbs[i].position.x, orbs[i].position.y, orbs[i].position.z);
        linePositions.push(orbs[j].position.x, orbs[j].position.y, orbs[j].position.z);
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // mouse parallax
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;

    window.addEventListener(
      "pointermove",
      (e) => {
        mx = (e.clientX / window.innerWidth) * 2 - 1;
        my = (e.clientY / window.innerHeight) * 2 - 1;
      },
      { passive: true }
    );

    function resize() {
      const parent = canvas.parentElement || document.body;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", resize);
    resize();

    // pause when offscreen
    let visible = true;
    if ("IntersectionObserver" in window) {
      const heroIO = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { threshold: 0.02 }
      );
      heroIO.observe(canvas);
    }

    const clock = new THREE.Clock();
    let raf = 0;

    function tick() {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      const t = clock.getElapsedTime();
      const dt = Math.min(clock.getDelta(), 0.05);

      tx += (mx - tx) * 0.04;
      ty += (my - ty) * 0.04;

      camera.position.x = tx * 0.9;
      camera.position.y = -ty * 0.55;
      camera.lookAt(0, 0, 0);

      // particles breathe / drift
      const pos = geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const s = speeds[i];
        pos[i3 + 1] += Math.sin(t * s + i * 0.01) * 0.0018;
        pos[i3] += Math.cos(t * s * 0.7 + i * 0.013) * 0.0012;
      }
      geometry.attributes.position.needsUpdate = true;
      points.rotation.y = t * 0.03;
      points.rotation.x = Math.sin(t * 0.12) * 0.08;

      // orbs float + update lines
      orbs.forEach((mesh, idx) => {
        const d = mesh.userData;
        mesh.position.x = d.base.x + Math.sin(t * d.speed + idx) * d.amp;
        mesh.position.y = d.base.y + Math.cos(t * d.speed * 0.9 + idx * 1.3) * d.amp * 1.2;
        mesh.rotation.x += dt * d.rot;
        mesh.rotation.y += dt * d.rot * 0.8;

        // emissive pulse with temperature
        const warmMix = parseFloat(getComputedStyle(root).getPropertyValue("--temp")) || 52;
        mesh.material.emissiveIntensity = 0.12 + Math.sin(t + idx) * 0.06 + warmMix / 800;
      });

      // rebuild line endpoints
      let li = 0;
      const lp = lineGeo.attributes.position.array;
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          lp[li++] = orbs[i].position.x;
          lp[li++] = orbs[i].position.y;
          lp[li++] = orbs[i].position.z;
          lp[li++] = orbs[j].position.x;
          lp[li++] = orbs[j].position.y;
          lp[li++] = orbs[j].position.z;
        }
      }
      lineGeo.attributes.position.needsUpdate = true;

      // subtle light drift
      key.position.x = 4 + Math.sin(t * 0.35) * 1.2;
      key.position.y = 3 + Math.cos(t * 0.28) * 0.8;
      fill.position.x = -5 + Math.cos(t * 0.3) * 1.1;

      renderer.render(scene, camera);
    }

    if (!prefersReduced) tick();
    else {
      renderer.render(scene, camera);
    }

    // expose cleanup if needed
    window.__heroCleanup = () => {
      cancelAnimationFrame(raf);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }

  // wait for THREE
  if (typeof THREE !== "undefined") {
    initHero();
  } else {
    // three.min.js may still be loading
    const wait = setInterval(() => {
      if (typeof THREE !== "undefined") {
        clearInterval(wait);
        initHero();
      }
    }, 50);
    setTimeout(() => clearInterval(wait), 5000);
  }
})();
