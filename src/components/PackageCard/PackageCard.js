'use client';

import styles from './PackageCard.module.css';

const CheckIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function PackageCard({ pkg, onSelect, index = 0 }) {
  return (
    <article
      className={`${styles.card} ${pkg.featured ? styles.featured : ''}`}
      data-anim="scale-in"
      style={{ '--anim-delay': `${index * 120}ms` }}
    >
      {pkg.badge && (
        <div className={styles.badge} aria-label={pkg.badge}>
          {pkg.badge}
        </div>
      )}

      {/* Plan name */}
      <h3 className={styles.name}>{pkg.name}</h3>

      {/* Short description */}
      <p className={styles.description}>{pkg.description}</p>

      {/* Price */}
      <div className={styles.priceRow}>
        <span className={styles.price}>{pkg.price}</span>
        <span className={styles.priceSuffix}>{pkg.priceSuffix}</span>
      </div>

      {/* CTA */}
      <button
        type="button"
        className={styles.cta}
        onClick={() => onSelect(pkg.id)}
        aria-label={`Selecionar ${pkg.name}`}
      >
        Quero este pacote
      </button>
      <p className={styles.guarantee}>
        Satisfação garantida ou dinheiro de volta
      </p>

      {/* Divider */}
      <hr className={styles.divider} aria-hidden="true" />

      {/* Features */}
      <ul className={styles.features} role="list">
        {pkg.features.map((feat) => (
          <li key={feat} className={styles.feature}>
            <span className={styles.checkCircle} aria-hidden="true">
              <CheckIcon />
            </span>
            {feat}
          </li>
        ))}
      </ul>
    </article>
  );
}
