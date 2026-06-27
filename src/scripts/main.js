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
