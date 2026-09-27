import Image from 'next/image';
import preparoImg from '@/assets/images/food/preparo-tabua.jpg';
import { JOURNEY } from '@/content/journey';
import styles from './Jornada.module.css';

export default function Jornada() {
  return (
    <section
      id="como-funciona"
      className={styles.section}
      aria-labelledby="jornada-heading"
    >
      <div className={styles.photo}>
        <Image
          src={preparoImg}
          alt="Mãos medindo temperos numa tábua de madeira com legumes picados"
          fill
          placeholder="blur"
          sizes="100vw"
          className={styles.img}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h2 id="jornada-heading" className={styles.heading} data-anim="lines">
              <span className="maskLine">
                <span>Como funciona o </span>
              </span>
              <span className="maskLine">
                <span>acompanhamento</span>
              </span>
            </h2>
            <p
              className={styles.lead}
              data-anim="fade-up"
              style={{ '--anim-delay': '160ms' }}
            >
              É tudo online, então dá pra fazer a consulta de casa ou no intervalo
              do trabalho. E desde o começo você sabe o que vai acontecer em cada
              etapa.
            </p>
          </header>

          <ol className={styles.steps}>
            {JOURNEY.map((step, i) => (
              <li key={step.title} className={styles.step} data-anim="fade-up">
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
        </div>
      </div>
    </section>
  );
}
