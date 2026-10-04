import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <p className={styles.code}>404 · PROJECT IN PROGRESS</p>
        <h1>Under construction</h1>
        <p className={styles.message}>This project is still taking shape. Please check back soon.</p>
        <a className={styles.homeLink} href="/">Back to portfolio <span aria-hidden="true">↗</span></a>
      </section>
    </main>
  );
}
