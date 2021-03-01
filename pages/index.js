import Head from 'next/head'
import styles from '../styles/Home.module.css'

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
          <a href="/products" className={styles.card}>
            <h3>Products &rarr;</h3>
            <p>Look through your items, see things from API.</p>
          </a>

          <a href="/products/categories" className={styles.card}>
            <h3>Product Categories &rarr;</h3>
            <p>Look through categories from the API.</p>
          </a>

          <a href="#" className={styles.card}>
            <h3>Any day now &rarr;</h3>
            <p>Good things come with time. At least that's what I'll keep saying</p>
          </a>
        </div>
      </main>
    </div>
  )
}
