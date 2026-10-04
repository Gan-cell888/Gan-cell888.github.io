/* 恒温 — theme + bilingual i18n */
(function () {
  "use strict";

  var root = document.documentElement;
  var STORAGE_THEME = "hengwen-theme";
  var STORAGE_LANG = "hengwen-lang";

  /* ---------------- Theme ---------------- */
  function getPreferredTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_THEME);
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    var isLight = theme === "light";
    if (isLight) root.setAttribute("data-theme", "light");
    else root.setAttribute("data-theme", "dark");

    try {
      localStorage.setItem(STORAGE_THEME, theme);
    } catch (e) {}

    var btn = document.getElementById("themeToggle");
    if (btn) {
      btn.setAttribute("aria-pressed", String(isLight));
      var lang = root.getAttribute("data-lang") || "zh";
      btn.setAttribute(
        "aria-label",
        isLight
          ? lang === "zh"
            ? "切换暗色模式"
            : "Switch to dark mode"
          : lang === "zh"
            ? "切换明亮模式"
            : "Switch to light mode"
      );
    }

    // giscus
    var iframe = document.querySelector("iframe.giscus-frame");
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme: isLight ? "light" : "dark" } } },
        "https://giscus.app"
      );
    }

    window.dispatchEvent(
      new CustomEvent("themechange", { detail: { theme: theme } })
    );
  }

  /* ---------------- i18n dictionary ---------------- */
  var I18N = {
    zh: {
      "meta.title": "恒温 · HengWen — 大模型应用开发与写作",
      "meta.desc":
        "恒温 — 大模型应用开发者 & 写作者。在武汉，用代码与文字，把复杂的技术写成有温度的故事。",
      "nav.about": "关于",
      "nav.craft": "能力",
      "nav.works": "作品",
      "nav.writing": "写作",
      "nav.blog": "博客",
      "nav.method": "方法",
      "nav.guestbook": "留言",
      "nav.contact": "联系我",
      "nav.open": "打开菜单",
      "theme.light": "切换明亮模式",
      "theme.dark": "切换暗色模式",
      "hero.line1": "把复杂的技术",
      "hero.line2a": "写成",
      "hero.line2b": "有温度",
      "hero.line2c": "的故事",
      "hero.lead":
        '我是<strong>恒温</strong>——写代码、拍照片、看书、记录生活。在武汉，一边做大模型应用，一边把技术与日常写成有温度的文字。',
      "hero.cta1": "浏览作品",
      "hero.cta2": "阅读文章",
      "hero.scroll": "向下探索",
      "about.index": "01 — 关于",
      "about.title1": "在代码与文字之间",
      "about.title2a": "保持",
      "about.title2b": "恒温",
      "about.name": "恒温的树洞 · HENGWEN",
      "about.coord": "坐标",
      "about.coordVal": "中国 · 武汉",
      "about.role": "身份",
      "about.roleVal": "写代码 / 拍照片 / 看书 / 记录生活",
      "about.status": "状态",
      "about.statusVal": "持续写作中",
      "about.lead":
        "您好，我是恒温，一个喜欢写代码和拍照的人。目前在武汉做和计算机相关的工作，业余时间看书、拍照、瞎折腾。",
      "about.p1":
        "这里是我的「树洞」，也是个人品牌站：记录技术学习笔记、读书心得、生活随想与摄影，也分享大模型应用开发的实践。用工程的严谨与文字的温度，把复杂的事写成普通人能懂的故事。",
      "about.p2": "如果你也对 AI 落地、写作，或一座城市的日常感兴趣，欢迎继续往下看。",
      "about.tag1": "技术学习笔记",
      "about.tag2": "读书心得",
      "about.tag3": "生活随想",
      "about.tag4": "摄影记录",
      "about.tag5": "大模型应用",
      "about.tag6": "写作",
      "craft.index": "02 — 能力",
      "craft.title": "两极互补的专业力场",
      "craft.desc": "左边是工程的冷峻逻辑，右边是写作的温暖共情。我的工作，是让它们在同一温度下共存。",
      "craft.coolTag": "COLD / ENGINEERING",
      "craft.coolTitle": "大模型应用开发",
      "craft.coolDesc": "从原型到上线，把模型能力变成可靠产品。",
      "craft.cool1": "Agent 系统设计",
      "craft.cool1d": "多智能体编排、工具调用、记忆与规划",
      "craft.cool2": "RAG 与知识增强",
      "craft.cool2d": "检索策略、重排、引用溯源、评测体系",
      "craft.cool3": "Prompt / Eval 工程",
      "craft.cool3d": "提示词体系、回归评测、成本与延迟优化",
      "craft.cool4": "产品化落地",
      "craft.cool4d": "API 设计、前后端集成、可观测性",
      "craft.warmTag": "WARM / WRITING",
      "craft.warmTitle": "写作与内容表达",
      "craft.warmDesc": "把专业写成人话，把产品写成故事。",
      "craft.warm1": "技术叙事",
      "craft.warm1d": "概念拆解、案例讲法、深度长文",
      "craft.warm2": "品牌与产品文案",
      "craft.warm2d": "定位语、官网文案、发布叙事",
      "craft.warm3": "内容策略",
      "craft.warm3d": "选题地图、栏目设计、读者增长",
      "craft.warm4": "编辑与润色",
      "craft.warm4d": "结构重组、节奏控制、语气统一",
      "works.index": "03 — 作品",
      "works.title": "树洞里的文字作品",
      "works.desc":
        "来自「恒温的树洞」的真实创作：读书笔记、生活随笔与技术思考。点击卡片可阅读全文。",
      "works.all": "全部",
      "works.reading": "读书",
      "works.essay": "随笔",
      "works.tech": "技术",
      "works.read": "阅读全文",
      "writing.index": "04 — 写作",
      "writing.title": "全部文章",
      "writing.desc": "技术笔记 / 读书心得 / 生活随想 / 摄影记录",
      "writing.more": "前往完整博客",
      "method.index": "05 — 方法",
      "method.title": "我如何把事做成",
      "method.1t": "听懂问题",
      "method.1d": "先厘清目标读者、成功标准和限制条件。很多项目的失败，其实是问题定义的失败。",
      "method.2t": "建立骨架",
      "method.2d": "无论是智能体架构还是文章结构，都先搭骨架再填血肉，确保逻辑可验证、可迭代。",
      "method.3t": "快速试温",
      "method.3d": "用最小原型或样章获取真实反馈，把「我觉得好」换成「读者/用户觉得有用」。",
      "method.4t": "打磨收口",
      "method.4d": "代码要有评测与文档，文字要有节奏与温度。交付的不只是结果，还有可继续演进的系统。",
      "contact.index": "06 — 联系",
      "contact.title1": "想聊聊？",
      "contact.title2a": "我保持",
      "contact.title2b": "恒温",
      "contact.title2c": "在线。",
      "contact.lead":
        "无论是一起做一个大模型项目，还是一篇需要被写清楚的文章，欢迎写信给我。通常 24 小时内回复。",
      "contact.github": "GitHub",
      "contact.blog": "博客",
      "contact.blogVal": "恒温的树洞",
      "form.name": "你的名字",
      "form.namePh": "怎么称呼你？",
      "form.email": "邮箱",
      "form.topic": "想聊什么",
      "form.topic1": "项目合作",
      "form.topic2": "写作 / 文案",
      "form.topic3": "分享 / 工作坊",
      "form.topic4": "其他",
      "form.message": "留言",
      "form.messagePh": "简单说说你的想法...",
      "form.submit": "发送消息",
      "form.errRequired": "请完整填写名字、邮箱和留言。",
      "form.errEmail": "邮箱格式看起来不太对。",
      "form.ok": "已收到！我会尽快回复你。",
      "form.toastOk": "消息已提交 · 谢谢你的来信",
      "guestbook.index": "07 — 留言板",
      "guestbook.title": "说点什么吧",
      "guestbook.desc":
        '欢迎留下想法、建议，或只是打个招呼。留言基于 <strong>GitHub Discussions</strong>，用 GitHub 账号登录即可参与。',
      "guestbook.n1": "💬 评论基于 GitHub Discussions，需要使用 GitHub 账号登录",
      "guestbook.n2": "🤝 请保持友善，尊重他人",
      "guestbook.loading": "正在加载 GitHub 留言…",
      "guestbook.fbTitle": "留言板暂时打不开",
      "guestbook.fbDesc":
        '当前网络可能拦截了 <code>giscus.app</code>（GitHub Discussions 评论组件）。你仍可以去 GitHub 直接留言，或稍后再试。',
      "guestbook.fbBtn": "前往 GitHub Discussions",
      "guestbook.retry": "重新加载",
      "footer.tagline": "恒温的树洞 · 用代码搭建，用文字记录。",
      "footer.note": "写代码 / 拍照片 / 看书 / 记录生活",
      "footer.rights": "© {year} 恒温 · 武汉",
      "reader.close": "关闭",
      "temp.warm": "色温偏暖 · 文学模式",
      "temp.cool": "色温偏冷 · 工程模式",
    },
    en: {
      "meta.title": "HengWen — LLM Apps & Writing",
      "meta.desc":
        "HengWen — LLM application builder and writer in Wuhan. Turning complex tech into warm stories with code and words.",
      "nav.about": "About",
      "nav.craft": "Skills",
      "nav.works": "Works",
      "nav.writing": "Writing",
      "nav.blog": "Blog",
      "nav.method": "Method",
      "nav.guestbook": "Guestbook",
      "nav.contact": "Contact",
      "nav.open": "Open menu",
      "theme.light": "Switch to light mode",
      "theme.dark": "Switch to dark mode",
      "hero.line1": "Make complex tech",
      "hero.line2a": "into ",
      "hero.line2b": "warm",
      "hero.line2c": " stories",
      "hero.lead":
        'I\'m <strong>HengWen</strong> — coding, photographing, reading, recording life. In Wuhan, I build LLM apps and write tech into warm stories.',
      "hero.cta1": "View works",
      "hero.cta2": "Read essays",
      "hero.scroll": "Scroll",
      "about.index": "01 — About",
      "about.title1": "Between code and words,",
      "about.title2a": "stay ",
      "about.title2b": "warm",
      "about.name": "HengWen's Den · HENGWEN",
      "about.coord": "Location",
      "about.coordVal": "Wuhan, China",
      "about.role": "Identity",
      "about.roleVal": "Code / Photo / Read / Write",
      "about.status": "Status",
      "about.statusVal": "Writing steadily",
      "about.lead":
        "Hello, I'm HengWen — someone who loves coding and photography. I work with computers in Wuhan, and read, shoot, and tinker after hours.",
      "about.p1":
        "This is my den and personal brand site: tech notes, reading reflections, life essays, and photography — plus LLM practice. Rigorous engineering, warm writing.",
      "about.p2":
        "If you care about shipping AI, writing, or the everyday life of a city, you're welcome to look around.",
      "about.tag1": "Tech notes",
      "about.tag2": "Reading",
      "about.tag3": "Life essays",
      "about.tag4": "Photography",
      "about.tag5": "LLM apps",
      "about.tag6": "Writing",
      "craft.index": "02 — Skills",
      "craft.title": "Two poles, one temperature",
      "craft.desc":
        "Cold engineering logic on the left, warm writing empathy on the right. My work is keeping them at the same temperature.",
      "craft.coolTag": "COLD / ENGINEERING",
      "craft.coolTitle": "LLM Application Development",
      "craft.coolDesc": "From prototype to launch — reliable products on model capabilities.",
      "craft.cool1": "Agent system design",
      "craft.cool1d": "Multi-agent orchestration, tools, memory, planning",
      "craft.cool2": "RAG & knowledge",
      "craft.cool2d": "Retrieval, rerank, citations, evaluation",
      "craft.cool3": "Prompt / Eval engineering",
      "craft.cool3d": "Prompt systems, regression evals, cost & latency",
      "craft.cool4": "Product shipping",
      "craft.cool4d": "API design, full-stack integration, observability",
      "craft.warmTag": "WARM / WRITING",
      "craft.warmTitle": "Writing & Narrative",
      "craft.warmDesc": "Turn expertise into human language. Turn products into stories.",
      "craft.warm1": "Tech storytelling",
      "craft.warm1d": "Concept clarity, case narratives, long-form",
      "craft.warm2": "Brand & product copy",
      "craft.warm2d": "Positioning, website copy, launch narratives",
      "craft.warm3": "Content strategy",
      "craft.warm3d": "Topic maps, series design, audience growth",
      "craft.warm4": "Editing & polish",
      "craft.warm4d": "Structure, rhythm, voice consistency",
      "works.index": "03 — Works",
      "works.title": "Writing from the Den",
      "works.desc":
        "Real pieces from HengWen's Den: reading notes, life essays, and tech thoughts. Click a card to read.",
      "works.all": "All",
      "works.reading": "Books",
      "works.essay": "Essays",
      "works.tech": "Tech",
      "works.read": "Read more",
      "writing.index": "04 — Writing",
      "writing.title": "All posts",
      "writing.desc": "Tech notes / Reading / Life / Photography",
      "writing.more": "Visit the full blog",
      "method.index": "05 — Method",
      "method.title": "How I get things done",
      "method.1t": "Understand the problem",
      "method.1d":
        "Clarify readers, success criteria, and constraints first. Many projects fail at problem definition.",
      "method.2t": "Build the skeleton",
      "method.2d":
        "Agents or essays — structure before flesh, so logic stays verifiable and iterable.",
      "method.3t": "Test the temperature",
      "method.3d":
        "Prototype or sample chapter early. Replace 'I like it' with 'readers find it useful'.",
      "method.4t": "Finish with care",
      "method.4d":
        "Code needs evals and docs; writing needs rhythm and warmth. Ship systems that can evolve.",
      "contact.index": "06 — Contact",
      "contact.title1": "Want to talk?",
      "contact.title2a": "I stay ",
      "contact.title2b": "warm",
      "contact.title2c": " online.",
      "contact.lead":
        "Whether an LLM project or an article that needs clarity — write me. Usually reply within 24 hours.",
      "contact.github": "GitHub",
      "contact.blog": "Blog",
      "contact.blogVal": "HengWen's Den",
      "form.name": "Your name",
      "form.namePh": "How should I call you?",
      "form.email": "Email",
      "form.topic": "Topic",
      "form.topic1": "Project collab",
      "form.topic2": "Writing / copy",
      "form.topic3": "Talk / workshop",
      "form.topic4": "Other",
      "form.message": "Message",
      "form.messagePh": "Tell me a bit...",
      "form.submit": "Send message",
      "form.errRequired": "Please fill in name, email, and message.",
      "form.errEmail": "That email doesn't look right.",
      "form.ok": "Got it! I'll reply soon.",
      "form.toastOk": "Message sent · thanks for writing",
      "guestbook.index": "07 — Guestbook",
      "guestbook.title": "Leave a note",
      "guestbook.desc":
        'Thoughts, suggestions, or just a hello. Comments use <strong>GitHub Discussions</strong> — sign in with GitHub.',
      "guestbook.n1": "💬 Comments use GitHub Discussions — sign in with GitHub",
      "guestbook.n2": "🤝 Please be kind and respectful",
      "guestbook.loading": "Loading GitHub comments…",
      "guestbook.fbTitle": "Guestbook is unavailable",
      "guestbook.fbDesc":
        'Your network may be blocking <code>giscus.app</code> (GitHub Discussions widget). You can still comment on GitHub, or retry later.',
      "guestbook.fbBtn": "Open GitHub Discussions",
      "guestbook.retry": "Retry",
      "footer.tagline": "HengWen's Den · Built with code, recorded with words.",
      "footer.note": "Code / Photo / Read / Write",
      "footer.rights": "© {year} HengWen · Wuhan",
      "reader.close": "Close",
      "temp.warm": "Warmer · literary mode",
      "temp.cool": "Cooler · engineering mode",
    },
  };

  // Post metadata translations
  var POST_I18N = {
    zh: {},
    en: {
      "one-hundred-years-of-solitude": {
        title: "Notes on One Hundred Years of Solitude",
        description:
          "Márquez's masterpiece — solitude, fate, and the loops of time",
        category: "Books",
        tags: ["Books", "Literature", "Márquez"],
        readTime: "7 min read",
      },
      "three-body-review": {
        title: "Notes on The Three-Body Problem",
        description:
          "Liu Cixin's trilogy — cosmos, civilization, human smallness and greatness",
        category: "Books",
        tags: ["Books", "Sci-fi", "Liu Cixin"],
        readTime: "6 min read",
      },
      "design-of-design": {
        title: "Notes on The Golden Age",
        description:
          "Wang Xiaobo — freedom, absurdity, and being honest with yourself",
        category: "Books",
        tags: ["Books", "Literature", "Wang Xiaobo"],
        readTime: "4 min read",
      },
      "best-season": {
        title: "This Is the Best Season",
        description:
          "LLMs make knowledge itself tangible — tech dividends for ordinary people",
        category: "Essays",
        tags: ["Essays", "Tech", "AI"],
        readTime: "5 min read",
      },
      "minimalist-living": {
        title: "Notes on Minimal Living",
        description:
          "Minimalism in things, information, and spirit — less is more",
        category: "Essays",
        tags: ["Essays", "Life", "Minimalism"],
        readTime: "3 min read",
      },
      graduation: {
        title: "Graduated — Then What?",
        description:
          "May was endless rain. June was just one turn — graduation arrived",
        category: "Essays",
        tags: ["Essays", "Life", "Graduation"],
        readTime: "2 min read",
      },
      hello: {
        title: "On Starting a Blog",
        description:
          "Why I started writing, and how this blog was built",
        category: "Essays",
        tags: ["Essays", "Life", "Blog"],
        readTime: "3 min read",
      },
    },
  };

  var supported = ["zh", "en"];

  function t(key, lang) {
    lang = lang || root.getAttribute("data-lang") || "zh";
    if (supported.indexOf(lang) === -1) lang = "zh";
    var pack = I18N[lang] || I18N.zh;
    return pack[key] != null ? pack[key] : (I18N.zh[key] || key);
  }

  function applyLang(lang) {
    if (supported.indexOf(lang) === -1) lang = "zh";
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");

    // document meta
    document.title = t("meta.title", lang);
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.desc", lang));

    // text nodes
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      el.textContent = t(key, lang);
    });

    // rich HTML strings
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (!key) return;
      el.innerHTML = t(key, lang);
    });

    // placeholders
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-ph");
      if (key) el.setAttribute("placeholder", t(key, lang));
    });

    // aria-labels
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (key) el.setAttribute("aria-label", t(key, lang));
    });

    // year-aware rights line
    var rights = document.querySelector("[data-i18n-year]");
    if (rights) {
      var year = String(new Date().getFullYear());
      rights.textContent = t("footer.rights", lang).replace("{year}", year);
    }

    // lang toggle label
    var langLabel = document.getElementById("langLabel");
    if (langLabel) langLabel.textContent = lang === "zh" ? "EN" : "中";
    var langBtn = document.getElementById("langToggle");
    if (langBtn) {
      langBtn.setAttribute(
        "aria-label",
        lang === "zh" ? "Switch to English" : "切换为中文"
      );
    }

    // theme button label
    applyTheme(root.getAttribute("data-theme") === "light" ? "light" : "dark");

    // re-render dynamic lists if available
    if (typeof window.__renderWritingList === "function") {
      window.__renderWritingList();
    }

    try {
      localStorage.setItem(STORAGE_LANG, lang);
    } catch (e) {}

    window.dispatchEvent(
      new CustomEvent("langchange", { detail: { lang: lang } })
    );
  }

  window.__i18n = {
    t: t,
    applyLang: applyLang,
    applyTheme: applyTheme,
    getLang: function () {
      return root.getAttribute("data-lang") || "zh";
    },
    getPostMeta: function (id, lang) {
      lang = lang || this.getLang();
      if (lang === "en" && POST_I18N.en[id]) return POST_I18N.en[id];
      return null;
    },
    I18N: I18N,
    POST_I18N: POST_I18N,
  };

  // init
  applyTheme(getPreferredTheme());

  var savedLang = null;
  try {
    savedLang = localStorage.getItem(STORAGE_LANG);
  } catch (e) {}
  var browserLang = (navigator.language || "zh").toLowerCase().split("-")[0];
  var initialLang =
    supported.indexOf(savedLang) !== -1
      ? savedLang
      : supported.indexOf(browserLang) !== -1
        ? browserLang
        : "zh";
  applyLang(initialLang);

  // toggle handlers
  document.addEventListener("click", function (e) {
    var themeBtn = e.target.closest && e.target.closest("#themeToggle");
    if (themeBtn) {
      var cur = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      applyTheme(cur === "light" ? "dark" : "light");
      return;
    }
    var langBtn2 = e.target.closest && e.target.closest("#langToggle");
    if (langBtn2) {
      var lang = root.getAttribute("data-lang") === "zh" ? "en" : "zh";
      applyLang(lang);
    }
  });

  // system theme only when user hasn't chosen
  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: light)")
      .addEventListener("change", function (e) {
        try {
          if (localStorage.getItem(STORAGE_THEME)) return;
        } catch (err) {}
        applyTheme(e.matches ? "light" : "dark");
      });
  }
})();
