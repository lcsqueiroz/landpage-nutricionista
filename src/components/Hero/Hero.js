import Image from 'next/image';
import larissaImg from '@/assets/larissa-03.jpg';
import { buildHeroWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppIcon, ArrowIcon } from '@/components/Icons/Icons';
import HeroGL from '@/components/HeroGL/HeroGL';
import styles from './Hero.module.css';

export default function Hero() {
  const whatsappUrl = buildHeroWhatsAppUrl();

  return (
    <section
      id="topo"
      className={styles.hero}
      data-progress="exit"
      aria-labelledby="hero-heading"
    >
      <div className={styles.halo} aria-hidden="true" />

      <div className={styles.container}>
        {/* Texto */}
        <div className={styles.content}>
          <p className={`eyebrow ${styles.eyebrow}`}>Larissa Genari</p>

          <h1 id="hero-heading" className={styles.heading}>
            <span className={styles.line}>
              <span>Nutricionista</span>
            </span>
          </h1>

          <div className={styles.rule} aria-hidden="true" />

          <p className={styles.sub}>Transforme sua relação com a alimentação.</p>

          <p className={styles.support}>
            Comer bem pode ser leve, gostoso e caber na sua vida. Eu te ajudo a
            cuidar da saúde sem abrir mão da comida que você ama.
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

        {/* Foto */}
        <div className={styles.visual}>
          <div className={styles.outline} aria-hidden="true" />
          <div className={styles.arch}>
            <div className={styles.photo}>
              <Image
                src={larissaImg}
                alt="Larissa Genari, nutricionista, de jaleco em frente a um edifício histórico"
                fill
                fetchPriority="high"
                loading="eager"
                placeholder="blur"
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 40vw, 38vw"
                className={styles.img}
              />
              <HeroGL />
            </div>
          </div>
        </div>
      </div>

      <a href="#sobre" className={styles.scrollCue} aria-label="Rolar para Sobre">
        <span>Role</span>
        <span className={styles.scrollLine} aria-hidden="true" />
      </a>
    </section>
  );
}
