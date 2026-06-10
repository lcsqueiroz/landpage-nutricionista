import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <span className={styles.badge}>Em construção</span>
        <h1 className={styles.title}>Nutricionista</h1>
        <p className={styles.subtitle}>
          Landing page sendo desenvolvida. Em breve o site estará no ar.
        </p>
        <div className={styles.stack}>
          <span>Next.js</span>
          <span>CSS Modules</span>
          <span>Mobile First</span>
        </div>
      </div>
    </main>
  );
}
