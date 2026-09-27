import Image from 'next/image';
import { SERVICES } from '@/content/services';
import { buildHeroWhatsAppUrl, buildServiceWhatsAppUrl } from '@/lib/whatsapp';
import { ArrowIcon } from '@/components/ui/Icons/Icons';
import styles from './Servicos.module.css';

export default function Servicos() {
  return (
    <section
      id="servicos"
      className={styles.section}
      aria-labelledby="servicos-heading"
    >
      <div className={styles.container}>
        <header className={styles.intro}>
          <h2 id="servicos-heading" className={styles.heading} data-anim="lines">
            <span className="maskLine">
              <span>Como posso</span>
            </span>
            <span className="maskLine" style={{ '--line-delay': '120ms' }}>
              <span>te acompanhar</span>
            </span>
          </h2>

          <p
            className={styles.lead}
            data-anim="fade-up"
            style={{ '--anim-delay': '200ms' }}
          >
            Tem quem chegue por causa de um exame alterado, tem quem só queira
            parar de beliscar à tarde. O ponto de partida muda. O jeito de
            trabalhar, não: começar pela sua realidade.
          </p>

          <a
            href={buildHeroWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn ${styles.introCta}`}
            data-anim="fade-up"
            style={{ '--anim-delay': '280ms' }}
          >
            Agendar consulta
            <ArrowIcon />
          </a>
        </header>

        {/* Acordeão nativo: funciona sem JS e mantém o componente no servidor */}
        <ol className={styles.list}>
          {SERVICES.map((service, i) => (
            <li
              key={service.id}
              className={styles.row}
              data-anim="fade-up"
              style={{ '--anim-delay': `${i * 90}ms`, '--i': i }}
            >
              {/* name agrupa os itens: abrir um fecha o outro */}
              <details name="servicos" className={styles.item} open={i === 0}>
                <summary className={styles.summary}>
                  <span className={styles.thumb} aria-hidden="true">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(max-width: 767px) 64px, 88px"
                      className={styles.thumbImg}
                    />
                  </span>
                  <h3 className={styles.title}>{service.title}</h3>
                  <span className={styles.toggle} aria-hidden="true" />
                </summary>

                <div className={styles.panel}>
                  <p className={styles.desc}>{service.description}</p>

                  <ul className={styles.topics}>
                    {service.topics.map((topic) => (
                      <li key={topic} className={styles.topic}>
                        {topic}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={buildServiceWhatsAppUrl(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                    aria-label={`Quero saber mais sobre ${service.title}`}
                  >
                    <span>Quero saber mais</span>
                    <span className={styles.linkIcon}>
                      <ArrowIcon />
                    </span>
                  </a>
                </div>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
