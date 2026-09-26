import { SERVICES } from '@/lib/services';
import { buildHeroWhatsAppUrl, buildServiceWhatsAppUrl } from '@/lib/whatsapp';
import { ArrowIcon } from '@/components/Icons/Icons';
import styles from './Servicos.module.css';

export default function Servicos() {
  return (
    <section
      id="servicos"
      className={styles.section}
      aria-labelledby="servicos-heading"
    >
      <div className={styles.container}>
        {/* Introdução */}
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
            Cada pessoa chega com uma necessidade diferente. Em todas elas, o
            objetivo é o mesmo: você mais saudável, comendo bem e sem sofrer
            com isso.
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
              style={{ '--anim-delay': `${i * 90}ms` }}
            >
              {/* name agrupa os itens: abrir um fecha o outro */}
              <details name="servicos" className={styles.item} open={i === 0}>
                <summary className={styles.summary}>
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
