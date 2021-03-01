import Head from "next/head";
import Layout from "../../components/layout";
import { getProductCategoryData } from "../../lib/catalog";

import catalogStyles from './styles/index.module.css'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps() {
  const allProductCategoryData = await getProductCategoryData();
  return {
    props: {
      allProductCategoryData,
    },
  };
}

const Catalog = ({ allProductCategoryData }) => {
  return (
    <Layout home>
      <Head>
        <title>Shop our Catalog</title>
      </Head>
      <h1>Shop our catalog</h1>
      <ul className={utilStyles.zeroList}>
        {allProductCategoryData.map(projectCategory => (
          <li key={projectCategory.ID}>
            <span className={utilStyles.flexInline}>
              <h2>Shop {projectCategory.Name}</h2>
              <p>Items: {projectCategory.ItemCount}</p>
            </span>
            {projectCategory.HasSubCategories ? (
              <ul className={catalogStyles.subcategories}>
                {projectCategory.SubCategories.map((subCat) => (
                  <li key={subCat.ID} className={catalogStyles.subcategories__item}>
                    <img src={subCat.CoverArtUrl} />
                    <div className={catalogStyles.subcategories__item__words}>
                      <p><strong>{subCat.Name}</strong></p>
                      <p>Items: {subCat.ItemCount}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <h3>Items</h3>
                <ul>
                  {projectCategory.ItemIds.map(ItemId => <li key={ItemId}>{ItemId}</li>)}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Catalog;
