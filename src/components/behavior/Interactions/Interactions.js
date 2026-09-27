'use client';

import { useEffect } from 'react';

// Reveal por IntersectionObserver (fade curto) e âncora da URL; ver docs/animations.md

export default function Interactions() {
  useEffect(() => {

    // Âncora na URL: vai direto (o smooth nativo pode não saltar)
    const hashTarget = window.location.hash
      ? document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
      : null;
    const hashRaf = hashTarget
      ? requestAnimationFrame(() =>
          hashTarget.scrollIntoView({ behavior: 'instant', block: 'start' })
        )
      : 0;

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

    return cleanupReveal;
  }, []);

  return null;
}
