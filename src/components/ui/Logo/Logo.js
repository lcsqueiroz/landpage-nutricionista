import styles from './Logo.module.css';

// Logo vetorizada (máscaras em /public/logo); cor por `tone`, tamanho por --logo-h
export default function Logo({ tone = 'dark', className = '' }) {
  return (
    <span
      className={`${styles.logo} ${styles[tone]} ${className}`}
      role="img"
      aria-label="Larissa Genari — Nutricionista"
    >
      <span className={styles.mark} aria-hidden="true">
        <span className={`${styles.layer} ${styles.script}`} />
        <span className={`${styles.layer} ${styles.detail}`} />
        <span className={`${styles.layer} ${styles.flesh}`} />
        <span className={`${styles.layer} ${styles.seeds}`} />
      </span>
      <span className={styles.role} aria-hidden="true">
        Nutricionista
      </span>
    </span>
  );
}
