'use client';

import { useState, useEffect } from 'react';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#como-funciona', label: 'Como Funciona' },
  { href: '#pacotes', label: 'Pacotes' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuActive : ''}`}
        role="banner"
      >
        <div className={styles.container}>
          {/* Logo */}
          <a
            href="#"
            className={styles.logo}
            aria-label="Voltar ao topo"
            onClick={closeMenu}
          >
            <span className={styles.logoName}>Larissa Genari Sena</span>
            <span className={styles.logoTitle}>Nutricionista</span>
          </a>

          {/* Desktop nav */}
          <nav className={styles.nav} aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#pacotes"
            className={styles.desktopCta}
            aria-label="Ver pacotes e agendar consulta"
          >
            Agendar consulta
          </a>

          {/* Hamburger */}
          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
          >
            <span className={`${styles.bar} ${styles.barTop}`} />
            <span className={`${styles.bar} ${styles.barMid}`} />
            <span className={`${styles.bar} ${styles.barBot}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Menu mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a href="#pacotes" className={styles.mobileCta} onClick={closeMenu}>
            Agendar consulta
          </a>
        </nav>
      </div>
    </>
  );
}
