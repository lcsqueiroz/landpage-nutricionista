import Image from 'next/image';
// Versão com a cor ajustada para o tom da foto do Hero (original: original-01.jpg)
import larissaImg from '@/assets/images/larissa/sobre.jpg';
import { InstagramIcon } from '@/components/ui/Icons/Icons';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PROFESSIONAL } from '@/config/site';
import { EDUCATION } from '@/content/education';
import styles from './Sobre.module.css';

const BIO = [
  'Muita gente chega querendo emagrecer, e tudo bem começar por aí. Mas eu quero que você termine o acompanhamento comendo com mais tranquilidade do que começou.',
  // Fato real (pesquisa CNPq); a leitura "levo isso para as consultas" precisa da validação da Larissa
  'Na graduação, pesquisei pelo CNPq como a renda e o lugar onde a gente mora mudam o que chega ao prato. Levo isso para as consultas: um plano só funciona se couber no seu orçamento, no seu tempo e no mercado perto da sua casa.',
];

export default function Sobre() {
  return (
    <section id="sobre" className={styles.section} aria-labelledby="sobre-heading">
      <div className={styles.container}>
        <div className={styles.photoCol}>
          <div className={styles.frame}>
            <div className={styles.photo}>
              <Image
                src={larissaImg}
                alt="Larissa Genari sorrindo, de jaleco, segurando um adipômetro"
                fill
                placeholder="blur"
                sizes="(max-width: 767px) 86vw, (max-width: 1023px) 70vw, 45vw"
                className={styles.img}
              />
            </div>
          </div>
        </div>

        {/* No mobile vira `display: contents` para intercalar título, foto e texto */}
        <div className={styles.content}>
          <header className={styles.head}>
            <h2 id="sobre-heading" className={styles.heading} data-anim="lines">
              <span className="maskLine">
                <span>Larissa Genari</span>
              </span>
            </h2>

            <p
              className={styles.credential}
              data-anim="fade-up"
              style={{ '--anim-delay': '200ms' }}
            >
              {PROFESSIONAL.title} <span aria-hidden="true">·</span> {PROFESSIONAL.crn}
            </p>
          </header>

          <div className={styles.body}>
            {BIO.map((paragraph, i) => (
              <p
                key={i}
                className={styles.bio}
                data-anim="fade-up"
                style={{ '--anim-delay': `${i * 100}ms` }}
              >
                {paragraph}
              </p>
            ))}

            <div className={styles.education} data-anim="fade-up">
              <h3 className={styles.educationLabel}>Formação</h3>
              <ul className={styles.educationList}>
                {EDUCATION.map((item) => (
                  <li key={item.title} className={styles.educationItem}>
                    <span className={styles.educationTitle}>{item.title}</span>
                    <span className={styles.educationDetail}>{item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instagram}
              data-anim="fade-up"
              aria-label={`Seguir no Instagram — ${INSTAGRAM_HANDLE}`}
            >
              <InstagramIcon />
              <span>{INSTAGRAM_HANDLE}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
