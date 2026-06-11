'use client';

import { useEffect } from 'react';

export default function Interactions() {
  useEffect(() => {
    // Cursor spotlight
    const onMouseMove = (e) => {
      document.documentElement.style.setProperty('--cx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cy', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Scroll reveal
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -10px 0px' }
    );

    const observeAll = () => {
      document
        .querySelectorAll('[data-anim]:not(.is-visible)')
        .forEach((el) => io.observe(el));
    };

    // Initial pass — deferred one frame to ensure client components have
    // finished hydrating before we do the first querySelectorAll
    const rafId = requestAnimationFrame(observeAll);

    // MutationObserver catches [data-anim] nodes added after initial hydration
    // (e.g. client components that re-render or lazy-mount after first paint)
    const mo = new MutationObserver((mutations) => {
      let needsRescan = false;
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.dataset?.anim) { io.observe(node); continue; }
          if (node.querySelector?.('[data-anim]')) { needsRescan = true; break; }
        }
        if (needsRescan) break;
      }
      if (needsRescan) observeAll();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
