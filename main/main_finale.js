/*hero-carousel.js */

(function () {
  "use strict";

  const AUTOPLAY_DURATION = 5000; // ms por slide

  const carousel = document.querySelector(".hero-carousel");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll(".hc-slide"));
  const dots = Array.from(carousel.querySelectorAll(".hc-dot"));
  const btnPrev = carousel.querySelector(".hc-arrow--prev");
  const btnNext = carousel.querySelector(".hc-arrow--next");
  const progressBar = carousel.querySelector(".hc-progress-bar");

  let current = 0;
  let autoplayTimer = null;
  let progressTimer = null;
  const total = slides.length;

  //Activar slide
  function goTo(index) {
    index = (index + total) % total;

    // Quitar clases activas
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");

    current = index;

    slides[current].classList.add("active");
    dots[current].classList.add("active");

    resetProgress();
  }

  // ── Barra de progreso
  function resetProgress() {
    if (progressTimer) clearTimeout(progressTimer);
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";

    void progressBar.offsetWidth;

    progressBar.style.transition = `width ${AUTOPLAY_DURATION}ms linear`;
    progressBar.style.width = "100%";
  }

  //Autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(function () {
      goTo(current + 1);
    }, AUTOPLAY_DURATION);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  //Controles
  btnNext?.addEventListener("click", function () {
    goTo(current + 1);
    startAutoplay();
  });

  btnPrev?.addEventListener("click", function () {
    goTo(current - 1);
    startAutoplay();
  });

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      goTo(i);
      startAutoplay();
    });
  });

  // Pausar al hacer hover
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);

  // Soporte táctil (swipe)
  let touchStartX = 0;

  carousel.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].clientX;
    },
    { passive: true }
  );

  carousel.addEventListener(
    "touchend",
    function (e) {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        goTo(diff > 0 ? current + 1 : current - 1);
        startAutoplay();
      }
    },
    { passive: true }
  );

  // Teclado (accesibilidad)
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      goTo(current - 1);
      startAutoplay();
    }
    if (e.key === "ArrowRight") {
      goTo(current + 1);
      startAutoplay();
    }
  });

  // Init
  goTo(0);
  startAutoplay();
})();

   (function () {
    "use strict";
  
    // Anima un número desde 0 hasta el target
    function animateCounter(el, target, duration) {
      const start = Date.now();
  
      function step() {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        // Easing ease-out-cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      }
  
      requestAnimationFrame(step);
    }
  
    // Observar cuándo las stats entran en el viewport
    function initCounters() {
      const numbers = document.querySelectorAll(".exc-stat-number[data-target]");
      if (!numbers.length) return;
  
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = "true";
            const target = parseInt(entry.target.dataset.target, 10);
            animateCounter(entry.target, target, 1400);
          }
        });
      }, { threshold: 0.3 });
  
      numbers.forEach(function (el) {
        observer.observe(el);
      });
    }
  
    document.addEventListener("DOMContentLoaded", initCounters);
  
  })();