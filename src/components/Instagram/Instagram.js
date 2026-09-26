import Image from 'next/image';
import { INSTAGRAM_POSTS } from '@/lib/instagram';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/site';
import { InstagramIcon, ArrowIcon } from '@/components/Icons/Icons';
import styles from './Instagram.module.css';

export default function Instagram() {
  if (INSTAGRAM_POSTS.length === 0) return null;

  return (
    <section id="instagram" className={styles.section} aria-labelledby="instagram-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <p className={`eyebrow ${styles.label}`} data-anim="fade-up">
              No Instagram
            </p>
            <h2 id="instagram-heading" className={styles.heading} data-anim="lines">
              <span className="maskLine">
                <span>{INSTAGRAM_HANDLE}</span>
              </span>
            </h2>
            <p className={styles.lead} data-anim="fade-up" style={{ '--anim-delay': '160ms' }}>
              Lá eu falo de alimentação e saúde de um jeito simples, com dicas
              que você pode colocar em prática no mesmo dia.
            </p>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.follow}
            data-anim="fade-up"
            style={{ '--anim-delay': '220ms' }}
          >
            <InstagramIcon />
            Seguir no Instagram
            <ArrowIcon />
          </a>
        </header>
      </div>

      {/* Mobile: carrossel com scroll-snap · Desktop: grade */}
      <ul className={styles.grid}>
        {INSTAGRAM_POSTS.map((post, i) => (
          <li
            key={post.id}
            className={styles.item}
            data-anim="fade-up"
            style={{ '--anim-delay': `${i * 90}ms` }}
          >
            <a
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <span className={styles.tile}>
                <Image
                  src={post.image}
                  alt={`Post do Instagram: ${post.title}`}
                fill
                placeholder="blur"
                  sizes="(max-width: 767px) 72vw, (max-width: 1023px) 40vw, 24vw"
                  className={styles.img}
                />
                <span className={styles.overlay} aria-hidden="true">
                  <InstagramIcon size={22} />
                </span>
              </span>
              <span className={styles.caption}>{post.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
