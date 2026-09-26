'use client';

import { useEffect } from 'react';

// Motor de animações (reveal, --p por scroll); modos em docs/animations.md

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

function computeProgress(el, vh) {
  const rect = el.getBoundingClientRect();
  const mode = el.dataset.progress || 'view';

  if (mode === 'exit') return clamp(-rect.top / rect.height);
  if (mode === 'enter') return clamp((vh - rect.top) / rect.height);
  if (mode === 'pin') {
    const distance = rect.height - vh;
    return distance <= 0 ? 0 : clamp(-rect.top / distance);
  }
  return clamp((vh - rect.top) / (vh + rect.height));
}

export default function Interactions() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // --- 0. Âncora na URL: vai direto (o smooth nativo pode não saltar) ---
    const hashTarget = window.location.hash
      ? document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
      : null;
    const hashRaf = hashTarget
      ? requestAnimationFrame(() =>
          hashTarget.scrollIntoView({ behavior: 'instant', block: 'start' })
        )
      : 0;

    // --- 1. Reveal ---------------------------------------------------------
    const pendingReveal = new Set();
    const reveal = (el) => {
      el.classList.add('is-visible');
      pendingReveal.delete(el);
      revealIO.unobserve(el);
    };

    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Também revela o que já ficou acima da tela
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            reveal(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    document.querySelectorAll('[data-anim]:not(.is-visible)').forEach((el) => {
      pendingReveal.add(el);
      revealIO.observe(el);
    });

    // Saltos de scroll podem pular um elemento sem o observer notificar
    let revealRaf = 0;
    const checkSkipped = () => {
      revealRaf = 0;
      pendingReveal.forEach((el) => {
        if (el.getBoundingClientRect().bottom < 0) reveal(el);
      });
      if (pendingReveal.size === 0) {
        window.removeEventListener('scroll', onRevealScroll);
      }
    };
    const onRevealScroll = () => {
      if (!revealRaf) revealRaf = requestAnimationFrame(checkSkipped);
    };
    window.addEventListener('scroll', onRevealScroll, { passive: true });

    const cleanupReveal = () => {
      cancelAnimationFrame(hashRaf);
      cancelAnimationFrame(revealRaf);
      window.removeEventListener('scroll', onRevealScroll);
      revealIO.disconnect();
    };

    if (reduceMotion.matches) return cleanupReveal;

    // --- 2. Scroll progress -----------------------------------------------
    const active = new Set();
    const progressEls = document.querySelectorAll('[data-progress]');

    const activeIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) active.add(entry.target);
          else active.delete(entry.target);
        });
        schedule();
      },
      { rootMargin: '25% 0px 25% 0px' }
    );
    progressEls.forEach((el) => activeIO.observe(el));

    let ticking = false;
    let rafId = 0;

    // Valores presos direto à rolagem (sem lerp): o efeito acompanha o dedo/roda sem atraso
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;

      active.forEach((el) => {
        const p = computeProgress(el, vh);
        if (el._p !== p) {
          el._p = p;
          el.style.setProperty('--p', p.toFixed(4));
        }
      });

      const max = root.scrollHeight - vh;
      const page = max > 0 ? clamp(window.scrollY / max) : 0;
      root.style.setProperty('--page-progress', page.toFixed(4));
    };

    function schedule() {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(update);
    }

    progressEls.forEach((el) => {
      const p = computeProgress(el, window.innerHeight);
      el._p = p;
      el.style.setProperty('--p', p.toFixed(4));
    });
    schedule();

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cleanupReveal();
      activeIO.disconnect();
    };
  }, []);

  return null;
}
