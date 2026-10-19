// Scroll reveals + gentle hero parallax. Page is fully usable without JS.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach((el) => io.observe(el));
    const layer = document.querySelector('[data-parallax]');
    if (layer) {
      const k = Number(layer.dataset.parallax) || 0.25;
      let ticking = false;
      addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => { layer.style.transform = `translateY(${Math.min(scrollY, 900) * k}px)`; ticking = false; });
      }, { passive: true });
    }
  }
})();
