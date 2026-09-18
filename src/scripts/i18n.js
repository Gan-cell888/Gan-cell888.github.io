// ========== 中英文切换（参考 website.html 方案） ==========
(function () {
  var root = document.documentElement;
  var supportedLanguages = ['zh', 'en'];

  // 页面元数据（中英文）
  var pageMeta = {
    zh: {
      title: '恒温的树洞 - 用代码搭建，用文字记录',
      description: '恒温的树洞 - 一个关于代码、摄影、读书和生活的个人博客',
      ogLocale: 'zh_CN',
    },
    en: {
      title: 'Hengwen\'s Den - Built with code, recorded with words',
      description: 'Hengwen\'s Den - A personal blog about coding, photography, reading, and life',
      ogLocale: 'en_US',
    },
  };

  // 文章页元数据（从 data 属性读取）
  var articleTitle = root.getAttribute('data-article-title');
  var articleDesc = root.getAttribute('data-article-desc');

  function setMetaContent(selector, value) {
    var el = document.querySelector(selector);
    if (el) el.setAttribute('content', value);
  }

  function applyLang(lang) {
    if (supportedLanguages.indexOf(lang) === -1) lang = 'zh';

    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');

    // 更新页面标题
    if (articleTitle) {
      var suffix = lang === 'zh' ? ' - 恒温的树洞' : ' - Hengwen\'s Den';
      document.title = articleTitle + suffix;
    } else {
      document.title = pageMeta[lang].title;
    }

    // 更新 meta description
    var desc = articleDesc || pageMeta[lang].description;
    setMetaContent('meta[name="description"]', desc);

    // 更新 OG 标签
    setMetaContent('meta[property="og:locale"]', pageMeta[lang].ogLocale);
    setMetaContent('meta[property="og:title"]', document.title);
    setMetaContent('meta[property="og:description"]', desc);

    // 更新 Twitter Card
    setMetaContent('meta[name="twitter:title"]', document.title);
    setMetaContent('meta[name="twitter:description"]', desc);

    // 更新 JSON-LD 语言
    var jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (jsonLd) {
      try {
        var data = JSON.parse(jsonLd.textContent);
        data.inLanguage = lang === 'zh' ? 'zh-CN' : 'en';
        if (articleTitle) {
          data.headline = articleTitle;
          data.description = desc;
        }
        jsonLd.textContent = JSON.stringify(data);
      } catch (e) {}
    }

    // 更新日期显示
    document.querySelectorAll('[data-date-iso]').forEach(function (el) {
      var iso = el.getAttribute('data-date-iso');
      if (!iso) return;
      var d = new Date(iso);
      if (isNaN(d)) return;
      if (lang === 'zh') {
        var y = d.getFullYear();
        var m = String(d.getMonth() + 1).padStart(2, '0');
        var day = String(d.getDate()).padStart(2, '0');
        el.textContent = y + '年' + m + '月' + day + '日';
      } else {
        el.textContent = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      }
    });

    // 更新月份分组标题
    document.querySelectorAll('[data-date-month]').forEach(function (el) {
      var monthStr = el.getAttribute('data-date-month');
      if (!monthStr) return;
      var parts = monthStr.split('-');
      if (parts.length !== 2) return;
      var d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, 1);
      if (lang === 'zh') {
        el.textContent = d.getFullYear() + '年' + (d.getMonth() + 1) + '月';
      } else {
        el.textContent = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      }
    });

    // 更新语言切换按钮文本
    var langText = document.querySelector('.lang-toggle-text');
    if (langText) langText.textContent = lang === 'zh' ? 'EN' : '中';

    // 更新 aria-label
    var langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换为中文');

    // 持久化
    try { localStorage.setItem('blog-lang', lang); } catch (e) {}
  }

  // 初始语言检测：localStorage > 浏览器语言 > 默认中文
  var saved = null;
  try { saved = localStorage.getItem('blog-lang'); } catch (e) {}
  var browserLang = (navigator.language || 'zh').toLowerCase().split('-')[0];
  var initial = supportedLanguages.indexOf(saved) !== -1
    ? saved
    : (supportedLanguages.indexOf(browserLang) !== -1 ? browserLang : 'zh');

  applyLang(initial);

  // 绑定切换按钮
  var langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-lang') || 'zh';
      applyLang(current === 'zh' ? 'en' : 'zh');
    });
  }

  // 多标签页同步
  window.addEventListener('storage', function (e) {
    if (e.key === 'blog-lang' && supportedLanguages.indexOf(e.newValue) !== -1) {
      applyLang(e.newValue);
    }
  });
})();