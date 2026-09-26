import { buildHeroWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppIcon, ArrowIcon } from '@/components/Icons/Icons';
import styles from './CTAFinal.module.css';

const PROMISES = [
  'Atendimento online',
  'Plano feito para você',
  'Acompanhamento de perto',
];

const BotanicalDivider = () => (
  <svg className={styles.ornament} viewBox="0 0 260 18" fill="none" aria-hidden="true">
    <line x1="0" y1="9" x2="98" y2="9" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
    <path d="M108 9 C106 5 100 3 97 5.5 C100 3 104 7 108 9Z" fill="currentColor" fillOpacity="0.8" />
    <rect x="127" y="5.5" width="6" height="6" rx="1" transform="rotate(45 130 9)" fill="currentColor" />
    <path d="M152 9 C154 5 160 3 163 5.5 C160 3 156 7 152 9Z" fill="currentColor" fillOpacity="0.8" />
    <line x1="162" y1="9" x2="260" y2="9" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
  </svg>
);

export default function CTAFinal() {
  const whatsappUrl = buildHeroWhatsAppUrl();

  return (
    <section
      id="contato"
      className={styles.section}
      data-progress
      aria-labelledby="cta-heading"
    >
      <div className={styles.bg} aria-hidden="true">
        <svg className={styles.watermark} viewBox="0 0 200 300" fill="none">
          <path
            d="M100 12 C145 32 172 82 172 152 C172 222 145 272 100 290 C55 272 28 222 28 152 C28 82 55 32 100 12Z"
            stroke="currentColor"
            strokeWidth="0.6"
          />
          <line x1="100" y1="12" x2="100" y2="290" stroke="currentColor" strokeWidth="0.4" />
          <path d="M100 78 Q68 96 46 104M100 78 Q132 96 154 104" stroke="currentColor" strokeWidth="0.4" />
          <path d="M100 138 Q62 158 40 166M100 138 Q138 158 160 166" stroke="currentColor" strokeWidth="0.4" />
          <path d="M100 198 Q70 214 54 222M100 198 Q130 214 146 222" stroke="currentColor" strokeWidth="0.4" />
        </svg>
      </div>

      <div className={styles.container}>
        <h2 id="cta-heading" className={styles.heading} data-anim="lines">
          <span className="maskLine">
            <span>Dê o primeiro passo</span>
          </span>
          <span className="maskLine" style={{ '--line-delay': '100ms' }}>
            <span>para uma</span>
          </span>
          <span className="maskLine" style={{ '--line-delay': '200ms' }}>
            <span>
              <em className={styles.accent}>vida mais saudável</em>
            </span>
          </span>
        </h2>

        <p
          className={styles.sub}
          data-anim="fade-up"
          style={{ '--anim-delay': '200ms' }}
        >
          Me chama no WhatsApp. A gente conversa sobre o que você precisa e
          vê juntos o melhor jeito de começar.
        </p>

        <BotanicalDivider />

        <div
          className={styles.ctaWrap}
          data-anim="scale-in"
          style={{ '--anim-delay': '280ms' }}
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btnLight ${styles.cta}`}
            aria-label="Agendar consulta pelo WhatsApp"
          >
            <WhatsAppIcon />
            Agendar consulta
            <ArrowIcon />
          </a>
          <p className={styles.note}>Sem compromisso</p>
        </div>

        <ul className={styles.promises}>
          {PROMISES.map((item) => (
            <li key={item} className={styles.promise}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
