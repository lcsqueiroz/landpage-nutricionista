import Logo from '@/components/Logo/Logo';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PROFESSIONAL } from '@/lib/site';
import { buildHeroWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppIcon, InstagramIcon } from '@/components/Icons/Icons';
import styles from './Footer.module.css';

const navLinks = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#instagram', label: 'Instagram' },
  { href: '#contato', label: 'Contato' },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  const whatsappUrl = buildHeroWhatsAppUrl();

  return (
    <footer className={styles.footer} aria-label="Rodapé">
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo tone="light" className={styles.logo} />
            <p className={styles.tagline}>
              Transforme sua relação com a alimentação.
            </p>
          </div>

          <nav className={styles.col} aria-label="Links do rodapé">
            <span className={styles.colTitle}>Navegação</span>
            <ul className={styles.list}>
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className={styles.link}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <span className={styles.colTitle}>Contato</span>
            <ul className={styles.list}>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <InstagramIcon size={16} />
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <WhatsAppIcon size={16} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {currentYear} {PROFESSIONAL.name} · {PROFESSIONAL.title} · {PROFESSIONAL.crn}</p>
          <a href="/politica-de-privacidade" className={styles.privacy}>
            Política de privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}
