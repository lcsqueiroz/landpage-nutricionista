import Image from 'next/image';
import larissaImg from '@/assets/larissa-01.jpg';
import { JOURNEY } from '@/lib/journey';
import styles from './Jornada.module.css';

export default function Jornada() {
  return (
    <section
      id="como-funciona"
      className={styles.section}
      aria-labelledby="jornada-heading"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="jornada-heading" className={styles.heading} data-anim="lines">
            <span className="maskLine">
              <span>Como funciona o</span>
            </span>
            <span className="maskLine" style={{ '--line-delay': '120ms' }}>
              <span>acompanhamento</span>
            </span>
          </h2>
          <p
            className={styles.lead}
            data-anim="fade-up"
            style={{ '--anim-delay': '160ms' }}
          >
            O atendimento é todo online, então você não precisa sair de casa. E
            desde o começo você já sabe como vai ser cada etapa.
          </p>
        </header>

        <div className={styles.body}>
          <ol
            className={styles.steps}
            data-progress
            style={{ '--n': JOURNEY.length }}
          >
            {JOURNEY.map((step, i) => (
              <li
                key={step.title}
                className={styles.step}
                style={{ '--i': i }}
                data-anim="fade-up"
              >
                <span className={styles.marker} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <figure className={styles.photo} data-anim="fade-up">
            <Image
              src={larissaImg}
              alt="Larissa Genari segurando um adipômetro, instrumento de avaliação corporal"
              fill
              placeholder="blur"
              sizes="(max-width: 1023px) 90vw, 36vw"
              className={styles.img}
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
