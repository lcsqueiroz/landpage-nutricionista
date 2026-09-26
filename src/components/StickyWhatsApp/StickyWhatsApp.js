'use client';

import { useState, useEffect } from 'react';
import { buildHeroWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/Icons/Icons';
import styles from './StickyWhatsApp.module.css';

// Visível após o hero; some nos cards de serviço e a partir do CTA final
export default function StickyWhatsApp() {
  const [visible, setVisible] = useState(false);
  const whatsappUrl = buildHeroWhatsAppUrl();

  useEffect(() => {
    const hero = document.getElementById('topo');
    const servicos = document.getElementById('servicos');
    const contato = document.getElementById('contato');
    if (!hero || !servicos || !contato) return;

    const inView = new Map([
      [hero, true],
      [servicos, false],
      [contato, false],
    ]);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          inView.set(
            e.target,
            // o CTA conta como "visto" também depois que passou por cima
            e.isIntersecting ||
              (e.target === contato && e.boundingClientRect.top < 0)
          )
        );
        setVisible(![...inView.values()].some(Boolean));
      },
      { threshold: 0.05 }
    );
    inView.forEach((_, el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`${styles.bar} ${visible ? styles.visible : ''}`}
      aria-hidden={!visible}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        tabIndex={visible ? 0 : -1}
        aria-label="Agendar consulta pelo WhatsApp"
      >
        <span className={styles.icon}>
          <WhatsAppIcon size={18} />
        </span>
        <span className={styles.label}>Agendar</span>
      </a>
    </div>
  );
}
