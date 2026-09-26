import Link from 'next/link';
import Logo from '@/components/Logo/Logo';
import styles from './not-found.module.css';

export const metadata = {
  title: 'Página não encontrada',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className={styles.main}>
      <Link href="/" aria-label="Voltar para o site" className={styles.logoLink}>
        <Logo className={styles.logo} />
      </Link>
      <p className="eyebrow">Erro 404</p>
      <h1 className={styles.title}>Esta página não existe</h1>
      <p className={styles.text}>O endereço pode ter mudado ou sido digitado com algum erro.</p>
      <Link href="/" className="btn">
        Voltar ao início
      </Link>
    </main>
  );
}
