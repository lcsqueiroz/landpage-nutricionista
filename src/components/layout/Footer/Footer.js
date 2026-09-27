import Logo from '@/components/ui/Logo/Logo';
import { DEVELOPER, INSTAGRAM_HANDLE, INSTAGRAM_URL, PROFESSIONAL } from '@/config/site';
import { buildHeroWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppIcon, InstagramIcon } from '@/components/ui/Icons/Icons';
import styles from './Footer.module.css';

const navLinks = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#sobre', label: 'Sobre' },
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
              Comer bem sem virar a sua vida do avesso.
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
          <p>
            © {currentYear} {PROFESSIONAL.name} · {PROFESSIONAL.title} · {PROFESSIONAL.crn}.
            Todos os direitos reservados.
          </p>
          <div className={styles.bottomLinks}>
            <a href="/politica-de-privacidade" className={styles.privacy}>
              Política de privacidade
            </a>
            <a
              href={DEVELOPER.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.privacy}
            >
              Desenvolvido por {DEVELOPER.name}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
