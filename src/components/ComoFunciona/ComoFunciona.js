'use client';

import { useEffect, useRef } from 'react';
import styles from './ComoFunciona.module.css';

const MessageIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

const ClipboardIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const TrendingIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const steps = [
  {
    number: '01',
    Icon: MessageIcon,
    title: 'Agendamento',
    description:
      'Escolha o pacote ideal e fale com a Larissa pelo WhatsApp. Rápido, sem formulários complicados.',
  },
  {
    number: '02',
    Icon: ClipboardIcon,
    title: 'Consulta',
    description:
      'Avaliação completa do seu histórico, rotina e objetivos — online, de onde você estiver.',
  },
  {
    number: '03',
    Icon: TrendingIcon,
    title: 'Acompanhamento',
    description:
      'Plano alimentar personalizado e suporte contínuo para consolidar resultados duradouros.',
  },
];

export default function ComoFunciona() {
  const gridRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const grid = gridRef.current;
    const stepEls = stepRefs.current.filter(Boolean);
    if (!grid || stepEls.length === 0) return;

    const observers = [];

    // Each step independently shows/hides as it enters/leaves viewport.
    // This makes the trail reversible: scroll up → steps disappear 3→2→1.
    stepEls.forEach((el) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add(styles.visible);
          } else {
            el.classList.remove(styles.visible);
          }
        },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    // Separate observer on the grid for the desktop horizontal connector (::before).
    const gridObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          grid.classList.add(styles.playing);
        } else {
          grid.classList.remove(styles.playing);
        }
      },
      { threshold: 0.1 }
    );
    gridObs.observe(grid);
    observers.push(gridObs);

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section
      id="como-funciona"
      className={styles.section}
      aria-labelledby="como-funciona-heading"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionLabel} aria-hidden="true">
            Como funciona
          </span>
          <h2 id="como-funciona-heading" className={styles.heading}>
            Três passos para{' '}
            <em className={styles.headingAccent}>transformar</em> sua
            alimentação
          </h2>
        </div>

        <ol ref={gridRef} className={styles.stepsGrid} role="list">
          {steps.map(({ number, Icon, title, description }, i) => (
            <li
              key={number}
              ref={(el) => { stepRefs.current[i] = el; }}
              className={styles.step}
            >
              <div className={styles.stepIndicator}>
                <span className={styles.stepNum} aria-hidden="true">
                  {number}
                </span>
              </div>

              <div className={styles.stepBody}>
                <div className={styles.stepIconWrap} aria-hidden="true">
                  <Icon />
                </div>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepDesc}>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
