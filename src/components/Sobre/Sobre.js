import Image from 'next/image';
import larissaImg from '@/assets/larissa-02.jpg';
import { InstagramIcon } from '@/components/Icons/Icons';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PROFESSIONAL } from '@/lib/site';
import { EDUCATION } from '@/lib/education';
import styles from './Sobre.module.css';

const STATEMENT =
  'Acredito que a saúde se constrói no prato, todos os dias, nas escolhas mais simples.';

const BIO = [
  'Muita gente chega até mim querendo emagrecer, e tudo bem: esse pode ser um ótimo começo. Mas o que eu quero de verdade é que você se sinta melhor. Com mais disposição, com a saúde em dia e com uma relação tranquila com a comida.',
  'Por isso eu não trabalho com dieta pronta nem com proibições. A gente conversa sobre a sua rotina, sobre o que você gosta de comer e sobre o que está difícil hoje, e monta juntos um jeito de comer que você consegue manter.',
];

// Mobile: nome → foto → citação sobreposta → texto; desktop: foto fixa à esquerda
export default function Sobre() {
  return (
    <section id="sobre" className={styles.section} aria-labelledby="sobre-heading">
      <div className={styles.container}>
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

        <div className={styles.photoCol} data-progress>
          <div className={styles.frame}>
            <div className={styles.photo}>
              <Image
                src={larissaImg}
                alt="Larissa Genari sorrindo, de jaleco, em um jardim"
                fill
                placeholder="blur"
                sizes="(max-width: 767px) 86vw, (max-width: 1023px) 70vw, 42vw"
                className={styles.img}
              />
            </div>
          </div>
        </div>

        <blockquote className={styles.statement} data-anim="fade-up">
          <p>{STATEMENT}</p>
        </blockquote>

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

          <div className={styles.signoff} data-anim="fade-up">
            <span className={styles.signature} aria-hidden="true">
              Larissa
            </span>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instagram}
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
