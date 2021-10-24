import Head from "next/head";
import Link from "/next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Lab Seven</a>
        </h1>

        <p className={styles.description}>
          This site is currently <em>very</em> in development.
        </p>

        <div className={styles.grid}>
          <Link href="/products" className={styles.card}>
            <a>
              <h3>{`Products →`}</h3>
              <p>Look through your items, see things from API.</p>
            </a>
          </Link>

          <Link href="/products/categories" className={styles.card}>
            <a>
              <h3>{`Product Categories →`}</h3>
              <p>Look through categories from the API.</p>
            </a>
          </Link>

          <Link href="/#" className={styles.card}>
            <a>
              <h3>{`Any day now →`}</h3>
              <p>{`Good things come with time. At least that's what I'll keep saying`}</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
