document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.header');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ========== 鼠标跟随光效 ==========
  if (!reduceMotion) {
    var cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    var mouseX = 0, mouseY = 0;
    var glowX = 0, glowY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorGlow.classList.add('active');
    });

    document.addEventListener('mouseleave', function () {
      cursorGlow.classList.remove('active');
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // ========== 卡片鼠标跟随光晕（参考 website.html value-card） ==========
  if (!reduceMotion) {
    document.querySelectorAll('.post-item').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  // ========== 打字机效果 ==========
  if (!reduceMotion) {
    var heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      // 读取当前语言对应的文本
      var currentLang = document.documentElement.getAttribute('data-lang') || 'zh';
      var activeSpan = currentLang === 'en'
        ? heroTitle.querySelector('.en')
        : heroTitle.querySelector('.zh');
      var originalText = activeSpan
        ? activeSpan.textContent.trim()
        : heroTitle.textContent.trim();

      // 隐藏双语 span，用打字容器替代
      var zhSpan = heroTitle.querySelector('.zh');
      var enSpan = heroTitle.querySelector('.en');
      if (zhSpan) zhSpan.style.display = 'none';
      if (enSpan) enSpan.style.display = 'none';

      var typeContainer = document.createElement('span');
      typeContainer.className = 'typing-text';
      heroTitle.appendChild(typeContainer);

      var cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      heroTitle.appendChild(cursor);

      var charIndex = 0;
      function typeNextChar() {
        if (charIndex < originalText.length) {
          typeContainer.textContent += originalText[charIndex];
          charIndex++;
          setTimeout(typeNextChar, 80 + Math.random() * 40);
        } else {
          setTimeout(function () {
            cursor.style.animation = 'blink 0.5s 3';
            setTimeout(function () {
              cursor.style.opacity = '0';
              // 打字完成后恢复双语 span
              typeContainer.remove();
              cursor.remove();
              if (zhSpan) zhSpan.style.display = '';
              if (enSpan) enSpan.style.display = '';
            }, 1500);
          }, 1000);
        }
      }

      setTimeout(typeNextChar, 500);
    }
  }

  // ========== Header 滚动效果 ==========
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ========== 平滑锚点滚动 ==========
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  });
});