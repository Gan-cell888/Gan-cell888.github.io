document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');

  // ========== 鼠标跟随光效 ==========
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.classList.add('active');
  });

  document.addEventListener('mouseleave', function () {
    cursorGlow.classList.remove('active');
  });

  // 平滑跟随动画
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // ========== 打字机效果 ==========
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.minHeight = '1.5em';

    // 添加光标
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    heroTitle.appendChild(cursor);

    let charIndex = 0;
    function typeNextChar() {
      if (charIndex < originalText.length) {
        const textNode = document.createTextNode(originalText[charIndex]);
        heroTitle.insertBefore(textNode, cursor);
        charIndex++;
        setTimeout(typeNextChar, 80 + Math.random() * 40);
      } else {
        // 打字完成后，光标继续闪烁一段时间后消失
        setTimeout(function () {
          cursor.style.animation = 'blink 0.5s 3';
          setTimeout(function () {
            cursor.style.opacity = '0';
          }, 1500);
        }, 1000);
      }
    }

    // 延迟开始打字
    setTimeout(typeNextChar, 500);
  }

  // Header scroll effect
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 暗色模式切换
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // 从 localStorage 读取主题偏好，或检测系统偏好
  function getThemePreference() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // 应用主题
  function applyTheme(theme) {
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
  }

  // 初始化主题
  applyTheme(getThemePreference());

  // 切换按钮点击事件
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // 标签筛选功能
  const tagFilter = document.getElementById('tag-filter');
  const postItems = document.querySelectorAll('.post-item[data-tags]');

  if (tagFilter && postItems.length > 0) {
    // 收集所有标签
    const allTags = new Set();
    postItems.forEach(item => {
      const tags = item.getAttribute('data-tags').split(',');
      tags.forEach(tag => allTags.add(tag.trim()));
    });

    // 生成标签按钮
    allTags.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'tag-btn';
      btn.setAttribute('data-tag', tag);
      btn.textContent = tag;
      tagFilter.appendChild(btn);
    });

    // 标签点击事件
    tagFilter.addEventListener('click', function (e) {
      const btn = e.target.closest('.tag-btn');
      if (!btn) return;

      const selectedTag = btn.getAttribute('data-tag');

      // 更新按钮状态
      tagFilter.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // 筛选文章
      postItems.forEach(item => {
        const tags = item.getAttribute('data-tags').split(',').map(t => t.trim());
        if (selectedTag === 'all' || tags.includes(selectedTag)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
