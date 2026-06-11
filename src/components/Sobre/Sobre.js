import styles from './Sobre.module.css';
import Image from 'next/image';
import larissaImg from '@/assets/larissagenari.jpg';

const specialties = [
  { icon: '🥗', label: 'Emagrecimento saudável' },
  { icon: '🏃', label: 'Nutrição esportiva' },
  { icon: '🩺', label: 'Nutrição clínica' },
  { icon: '🌱', label: 'Reeducação alimentar' },
];

const InstagramIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

export default function Sobre() {
  return (
    <section
      id="sobre"
      className={styles.section}
      aria-labelledby="sobre-heading"
    >
      <div className={styles.container}>
        {/* Coluna da foto */}
        <div className={styles.photoCol} data-anim="fade-up">
          <div className={styles.photoFrame}>
            <Image
              src={larissaImg}
              alt="Larissa Genari Sena — Nutricionista"
              fill
              sizes="(max-width: 767px) 100vw, 45vw"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />

            {/* Badge flutuante sobre a foto */}
            <div
              className={styles.photoBadge}
              aria-label="Registro profissional"
            >
              <span className={styles.badgeDot} aria-hidden="true" />
              <span>CRN-3 · Registro Ativo</span>
            </div>
          </div>

          {/* Stat cards abaixo da foto */}
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <span className={styles.statNum}>Empática</span>
              <span className={styles.statLabel}>te ouve sem julgamento</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>Dedicada</span>
              <span className={styles.statLabel}>foco nos seus resultados</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>Presente</span>
              <span className={styles.statLabel}>suporte além da consulta</span>
            </div>
          </div>
        </div>

        {/* Coluna de conteúdo */}
        <div className={styles.contentCol}>
          <span className={styles.sectionLabel} aria-hidden="true">
            Sobre a profissional
          </span>

          <h2
            id="sobre-heading"
            className={styles.heading}
            data-anim="fade-up"
            style={{ '--anim-delay': '80ms' }}
          >
            Larissa Genari <em className={styles.headingAccent}>Sena</em>
          </h2>

          <p
            className={styles.crn}
            data-anim="fade-up"
            style={{ '--anim-delay': '140ms' }}
          >
            Nutricionista · CRN-3 94745
          </p>

          <p
            className={styles.bio}
            data-anim="fade-up"
            style={{ '--anim-delay': '180ms' }}
          >
            Acredito que alimentação saudável não precisa ser restritiva nem
            difícil. Meu trabalho é entender a sua rotina, seus objetivos e
            criar um plano que realmente funcione para a sua vida — sem
            milagres, com ciência e muito acolhimento.
          </p>

          <p className={styles.bio}>
            Sou formada em Nutrição pela faculdade UNICID. Atendo Online para
            todo o Brasil.
          </p>

          {/* Especialidades */}
          <div
            className={styles.specialtiesWrap}
            data-anim="fade-up"
            style={{ '--anim-delay': '240ms' }}
          >
            <h3 className={styles.specialtiesHeading}>Especialidades</h3>
            <ul className={styles.specialtiesList} role="list">
              {specialties.map(({ icon, label }) => (
                <li key={label} className={styles.specialtyChip}>
                  <span className={styles.chipIcon} aria-hidden="true">
                    {icon}
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Instagram */}
          <a
            href="https://instagram.com/nutri.larigenari"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagramLink}
            aria-label="Seguir no Instagram — @nutri.larigenari"
          >
            <InstagramIcon />
            <span>@nutri.larigenari</span>
          </a>
        </div>
      </div>
    </section>
  );
}
