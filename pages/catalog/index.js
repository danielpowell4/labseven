import Head from "next/head"
import Layout, { siteTitle } from '../../components/layout'
import { getSortedCatalogData } from '../../lib/catalog'

export async function getStaticProps() {
  const allCatalogData = getSortedCatalogData();
  return {
    props: {
      allCatalogData
    }
  }
}

const Catalog = ({ allCatalogData }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <pre>allCatalogData: {JSON.stringify(allCatalogData, null, 2)}</pre>
    </Layout>
  )
}

export default Catalog
