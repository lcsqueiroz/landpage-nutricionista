'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/Logo/Logo';
import { WhatsAppIcon, InstagramIcon, ArrowIcon } from '@/components/Icons/Icons';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/site';
import { buildHeroWhatsAppUrl } from '@/lib/whatsapp';
import styles from './Header.module.css';

// `desktop: false` — só no menu mobile (no desktop não cabe ao lado do CTA)
const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre', desktop: false },
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-funciona', label: 'Como funciona' },
];


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const whatsappUrl = buildHeroWhatsAppUrl();

  // Compacta ao rolar; esconde ao descer e reaparece ao subir
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      // Ignora o efeito elástico do iOS no topo e no fim da página
      if (y < 0 || y > max) return;
      // Só reage a movimentos claros, para não tremer com a inércia do toque
      if (Math.abs(y - lastY) > 12) {
        setHidden(y > lastY && y > window.innerHeight * 0.6);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mantém o visual do menu até o fundo escuro terminar de encolher (~650ms)
  const [closing, setClosing] = useState(false);

  const closeMenu = () => {
    if (!menuOpen) return;
    setMenuOpen(false);
    setClosing(true);
  };

  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(() => setClosing(false), 650);
    return () => clearTimeout(t);
  }, [closing]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setMenuOpen(false);
      setClosing(true);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const menuVisual = menuOpen || closing;

  const headerClass = [
    styles.header,
    scrolled && styles.scrolled,
    hidden && !menuVisual && styles.hidden,
    menuVisual && styles.menuActive,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header className={headerClass}>
        <div className={styles.container}>
          {/* Esquerda — redes sociais */}
          <div className={styles.left}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social}
              aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
            >
              <InstagramIcon />
              <span className={styles.socialLabel}>Instagram</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.social} ${styles.socialDesktop}`}
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
              <span className={styles.socialLabel}>WhatsApp</span>
            </a>
          </div>

          {/* Centro — logomarca */}
          <a
            href="#topo"
            className={styles.logoLink}
            aria-label="Larissa Genari, Nutricionista — voltar ao topo"
            onClick={closeMenu}
          >
            <Logo tone={menuVisual ? 'light' : 'dark'} className={styles.logo} />
          </a>

          {/* Direita — serviços e agendamento */}
          <div className={styles.right}>
            <nav className={styles.nav} aria-label="Navegação principal">
              {NAV_LINKS.filter((link) => link.desktop !== false).map((link) => (
                <a key={link.href} href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${styles.cta}`}
            >
              Agendar consulta
            </a>

            <button
              className={styles.menuBtn}
              onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
            >
              <span className={styles.bar} />
              <span className={styles.bar} />
            </button>
          </div>
        </div>

        {/* Barra de leitura */}
        <span className={styles.progress} aria-hidden="true" />
      </header>

      {/* Menu em tela cheia */}
      <div
        id="mobile-menu"
        className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <nav className={styles.menuNav} aria-label="Menu">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.menuLink}
              style={{ '--i': i }}
              onClick={closeMenu}
            >
              <span className={styles.menuNum}>0{i + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.menuFooter} style={{ '--i': NAV_LINKS.length }}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btnLight"
            onClick={closeMenu}
          >
            <WhatsAppIcon />
            Agendar consulta
            <ArrowIcon />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.menuSocial}
          >
            <InstagramIcon />
            {INSTAGRAM_HANDLE}
          </a>
        </div>
      </div>
    </>
  );
}
