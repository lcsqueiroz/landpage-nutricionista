import { testimonials } from '@/lib/testimonials';
import styles from './Depoimentos.module.css';

/* Metadados de apresentação */
const META = [
  { handle: '@isafanucchi', likes: 47 },
  { handle: '@amandacoutinho', likes: 4 },
  { handle: '@brunagenari', likes: 31 },
  { handle: '@lucasqueiroz_', likes: 8 },
];

const XIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const HeartIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export default function Depoimentos() {
  /* Duplica para o loop infinito */
  const items = [...testimonials, ...testimonials];

  return (
    <section
      id="depoimentos"
      className={styles.section}
      aria-labelledby="depoimentos-heading"
    >
      {/* Cabeçalho centralizado */}
      <div className={styles.container}>
        <div className={styles.header} data-anim="fade-up">
          <span className={styles.sectionLabel} aria-hidden="true">
            Depoimentos
          </span>
          <h2 id="depoimentos-heading" className={styles.heading}>
            Resultados que{' '}
            <em className={styles.headingAccent}>falam por si</em>
          </h2>
          <p className={styles.subheading}>
            Histórias reais de pacientes que transformaram sua alimentação e
            qualidade de vida.
          </p>
        </div>
      </div>

      {/* Marquee full-bleed */}
      <div
        className={styles.marqueeOuter}
        role="region"
        aria-label="Depoimentos de pacientes"
      >
        <div className={styles.marqueeTrack}>
          {items.map((t, i) => {
            const meta = META[i % META.length];
            const isClone = i >= testimonials.length;
            return (
              <article
                key={i}
                className={styles.card}
                aria-hidden={isClone ? 'true' : undefined}
              >
                {/* Cabeçalho estilo X */}
                <div className={styles.cardTop}>
                  <div className={styles.avatar} aria-hidden="true">
                    {t.initials}
                  </div>
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{t.name}</span>
                    <span className={styles.userHandle}>{meta.handle}</span>
                  </div>
                  <span className={styles.xLogo}>
                    <XIcon />
                  </span>
                </div>

                {/* Avaliação */}
                <div className={styles.stars} aria-label="Avaliação 5 estrelas">
                  ★★★★★
                </div>

                {/* Texto do "post" */}
                <p className={styles.tweetText}>{t.text}</p>

                {/* Rodapé estilo X */}
                <footer className={styles.cardFooter}>
                  <span
                    className={styles.likes}
                    aria-label={`${meta.likes} curtidas`}
                  >
                    <HeartIcon />
                    {meta.likes.toLocaleString('pt-BR')}
                  </span>
                  <span className={styles.location}>{t.city}</span>
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
