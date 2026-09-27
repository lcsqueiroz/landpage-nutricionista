import Image from 'next/image';
import pratoImg from '@/assets/images/food/prato-escuro.jpg';
import { buildHeroWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppIcon, ArrowIcon } from '@/components/ui/Icons/Icons';
import styles from './CTAFinal.module.css';

const PROMISES = [
  'Atendimento online',
  'Plano feito para você',
  'Acompanhamento de perto',
];

export default function CTAFinal() {
  const whatsappUrl = buildHeroWhatsAppUrl();

  return (
    <section
      id="contato"
      className={styles.section}
      aria-labelledby="cta-heading"
    >
      <div className={styles.bg} aria-hidden="true">
        <Image src={pratoImg} alt="" fill sizes="100vw" className={styles.bgImg} />
      </div>

      <div className={styles.container}>
        <h2 id="cta-heading" className={styles.heading} data-anim="lines">
          <span className="maskLine">
            <span>Vamos conversar</span>
          </span>
          <span className="maskLine">
            <span>
              sobre a sua <em className={styles.accent}>rotina?</em>
            </span>
          </span>
        </h2>

        <p
          className={styles.sub}
          data-anim="fade-up"
          style={{ '--anim-delay': '200ms' }}
        >
          Me manda uma mensagem contando o que está te incomodando. A gente vê
          junto se o acompanhamento faz sentido pra você agora.
        </p>

        <div
          className={styles.ctaWrap}
          data-anim="fade-up"
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
