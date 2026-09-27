import { getImageProps } from 'next/image';
import larissaImg from '@/assets/images/larissa/original-03.jpg';
import larissaWideImg from '@/assets/images/larissa/hero-wide.jpg';
import { buildHeroWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppIcon, ArrowIcon } from '@/components/ui/Icons/Icons';
import styles from './Hero.module.css';

const ALT = 'Larissa Genari, nutricionista, de jaleco em frente a um edifício histórico';

export default function Hero() {
  const whatsappUrl = buildHeroWhatsAppUrl();

  // Direção de arte: paisagem cobrindo o Hero no desktop, retrato no mobile/tablet (cada aparelho baixa só uma)
  const {
    props: { srcSet: wideSrcSet },
  } = getImageProps({ src: larissaWideImg, alt: ALT, sizes: '100vw' });
  const { props: photoProps } = getImageProps({
    src: larissaImg,
    alt: ALT,
    sizes: '100vw',
    fetchPriority: 'high',
    loading: 'eager',
  });

  return (
    <section
      id="topo"
      className={styles.hero}
      aria-labelledby="hero-heading"
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={`eyebrow ${styles.eyebrow}`}>Larissa Genari</p>

          <h1 id="hero-heading" className={styles.heading}>
            Nutricionista
          </h1>

          <p className={styles.sub}>Comer bem sem virar a sua vida do avesso.</p>

          <p className={styles.support}>
            Eu não vou te entregar uma lista do que é proibido. Vou olhar para o
            que você já come, para a sua semana, e achar com você o que dá pra
            mudar primeiro.
          </p>

          <div className={styles.actions}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              aria-label="Agendar consulta pelo WhatsApp"
            >
              <WhatsAppIcon />
              Agendar consulta
              <ArrowIcon />
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <picture>
            <source media="(min-width: 1024px)" srcSet={wideSrcSet} />
            {/* eslint-disable-next-line jsx-a11y/alt-text -- alt vem de photoProps */}
            <img {...photoProps} className={styles.img} />
          </picture>
        </div>
      </div>
    </section>
  );
}
