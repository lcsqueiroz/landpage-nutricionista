import PackagesGrid from './PackagesGrid';
import styles from './Pacotes.module.css';

export default function Pacotes() {
  return (
    <section
      id="pacotes"
      className={styles.section}
      aria-labelledby="pacotes-heading"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionLabel} aria-hidden="true">
            Pacotes e Preços
          </span>
          <h2 id="pacotes-heading" className={styles.heading}>
            Invista na sua <em className={styles.headingAccent}>saúde</em>
          </h2>
          <div className={styles.urgencyBadge} role="status">
            <span className={styles.urgencyDot} aria-hidden="true" />
            Apenas <strong>3 vagas</strong> disponíveis este mês
          </div>
          <p className={styles.subheading}>
            Escolha o acompanhamento ideal para o seu objetivo. Todos os
            pacotes incluem plano alimentar totalmente personalizado.
          </p>
        </div>

        <PackagesGrid />
      </div>
    </section>
  );
}
