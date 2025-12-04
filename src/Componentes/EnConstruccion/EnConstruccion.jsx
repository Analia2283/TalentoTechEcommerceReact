import styles from "./EnConstruccion.module.css";

const EnConstruccion = () => {
  return (
    <div className={styles.wrapper}>
      <main className={styles.card} role="main" aria-label="Página en construcción">
        <h1 className={styles.title}>Página en construcción</h1>
        <hr className={styles.rule} />
        <p className={styles.text}>
          Estamos preparando algo simple y potente. Vuelve pronto.
        </p>
        <div className={styles.footer}>
          <span className={styles.tag}>ARENA SPORT </span>
        </div>
      </main>
    </div>
  );
};



export default EnConstruccion;