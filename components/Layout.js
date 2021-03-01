import styles from './layout.module.css'
import Head from "next/head"

export const siteTitle = "Denver Screen Printing & Custom T-Shirt Printing | Lab Seven Screen Printing Co.";
const description = "Lab Seven Screen Printing Co. is the leader in Denver Screen Printing,  Custom T-shirt Printing, Graphic Design, and Embroidery in Colorado.  Design your own t-shirt in our design studio or work with one of our artists to bring your custom tee to life."

// pick random emoji as favicon
const sample = arr => arr[Math.floor(Math.random() * arr.length)];
const EMOJI_OF_BUILD = ["🐕", "👨‍🚀", "👨‍💻", "🖼", "🚀"];

export default function Layout({ children, home }) {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${sample(EMOJI_OF_BUILD)}</text></svg>`} />
          <meta name="description" content={description} />
          <meta property="og:type" content="website" />
          <meta name="og:title" content={siteTitle} />
          <meta name="og:description" content={description} />
        </Head>
        <main>{children}</main>
      </div>
    <footer className={styles.footer}>Footer content from the 🏔 of Colorado</footer>
    </>
  )
}
