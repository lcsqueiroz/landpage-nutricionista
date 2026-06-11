import { buildHeroWhatsAppUrl } from '@/lib/whatsapp';
import styles from './CTAFinal.module.css';

const WhatsAppIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const LeafCheck = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" focusable="false">
    <path d="M2.5 7L5.5 10L10.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BotanicalDivider = () => (
  <svg className={styles.ornament} viewBox="0 0 260 18" fill="none" aria-hidden="true">
    <line x1="0" y1="9" x2="98" y2="9" stroke="white" strokeWidth="0.5" strokeOpacity="0.18"/>
    <path d="M108 9 C106 5 100 3 97 5.5 C100 3 104 7 108 9Z" fill="white" fillOpacity="0.28"/>
    <path d="M108 9 L107 4" stroke="white" strokeWidth="0.5" strokeOpacity="0.22" strokeLinecap="round"/>
    <rect x="127" y="5.5" width="6" height="6" rx="1" transform="rotate(45 130 9)" fill="white" fillOpacity="0.36"/>
    <path d="M152 9 C154 5 160 3 163 5.5 C160 3 156 7 152 9Z" fill="white" fillOpacity="0.28"/>
    <path d="M152 9 L153 4" stroke="white" strokeWidth="0.5" strokeOpacity="0.22" strokeLinecap="round"/>
    <line x1="162" y1="9" x2="260" y2="9" stroke="white" strokeWidth="0.5" strokeOpacity="0.18"/>
  </svg>
);

export default function CTAFinal() {
  const whatsappUrl = buildHeroWhatsAppUrl();

  return (
    <section className={styles.section} aria-labelledby="cta-heading">

      {/* Botanical watermark — background decoration */}
      <svg className={styles.watermark} viewBox="0 0 200 300" fill="none" aria-hidden="true">
        <path
          d="M100 12 C145 32 172 82 172 152 C172 222 145 272 100 290 C55 272 28 222 28 152 C28 82 55 32 100 12Z"
          stroke="currentColor" strokeWidth="1"
        />
        <line x1="100" y1="12" x2="100" y2="290" stroke="currentColor" strokeWidth="0.6"/>
        <path d="M100 78 Q68 96 46 104" stroke="currentColor" strokeWidth="0.5"/>
        <path d="M100 78 Q132 96 154 104" stroke="currentColor" strokeWidth="0.5"/>
        <path d="M100 138 Q62 158 40 166" stroke="currentColor" strokeWidth="0.5"/>
        <path d="M100 138 Q138 158 160 166" stroke="currentColor" strokeWidth="0.5"/>
        <path d="M100 198 Q70 214 54 222" stroke="currentColor" strokeWidth="0.5"/>
        <path d="M100 198 Q130 214 146 222" stroke="currentColor" strokeWidth="0.5"/>
      </svg>

      <div className={styles.container}>
        <span className={styles.eyebrow} data-anim="fade-in">
          Pronta para começar?
        </span>

        <h2
          id="cta-heading"
          className={styles.heading}
          data-anim="fade-up"
          style={{ '--anim-delay': '80ms' }}
        >
          Dê o primeiro passo para uma{' '}
          <em className={styles.headingAccent}>vida mais saudável</em>
        </h2>

        <p
          className={styles.sub}
          data-anim="fade-up"
          style={{ '--anim-delay': '160ms' }}
        >
          Atendimento online para todo o Brasil. Agende agora e receba seu
          plano alimentar personalizado.
        </p>

        <BotanicalDivider />

        <div
          className={styles.ctaWrap}
          data-anim="scale-in"
          style={{ '--anim-delay': '240ms' }}
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
            aria-label="Agendar consulta pelo WhatsApp"
          >
            <WhatsAppIcon />
            Agendar consulta pelo WhatsApp
          </a>
          <p className={styles.note}>Resposta em até 24h · Sem burocracia</p>
        </div>

        <div className={styles.guaranteeBar}>
          <div className={styles.guaranteeItem}>
            <LeafCheck />
            <span>Satisfação garantida</span>
          </div>
          <div className={styles.guaranteeSep} aria-hidden="true" />
          <div className={styles.guaranteeItem}>
            <LeafCheck />
            <span>Vagas limitadas este mês</span>
          </div>
          <div className={styles.guaranteeSep} aria-hidden="true" />
          <div className={styles.guaranteeItem}>
            <LeafCheck />
            <span>100% online</span>
          </div>
        </div>
      </div>
    </section>
  );
}
