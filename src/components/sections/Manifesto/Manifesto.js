import Image from 'next/image';
import bowlImg from '@/assets/images/food/bowl-colorido.jpg';
import { PROFESSIONAL } from '@/config/site';
import styles from './Manifesto.module.css';

const STATEMENT =
  'Saúde não se decide numa segunda-feira de dieta. Ela aparece no prato de todo dia.';

// Faixa de foto de ponta a ponta: tira a página do "papel" e traz a comida para o centro
export default function Manifesto() {
  return (
    <section className={styles.section} aria-label="O que eu acredito">
      <Image
        src={bowlImg}
        alt="Bowl colorido com folhas, tomate, grão-de-bico, abacate e batata-doce"
        fill
        placeholder="blur"
        sizes="100vw"
        className={styles.img}
      />

      <figure className={styles.content}>
        <blockquote className={styles.quote} data-anim="fade-up">
          <p>{STATEMENT}</p>
        </blockquote>
        <figcaption
          className={styles.author}
          data-anim="fade-up"
          style={{ '--anim-delay': '150ms' }}
        >
          {PROFESSIONAL.name}
        </figcaption>
      </figure>
    </section>
  );
}
