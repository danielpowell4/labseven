import Head from "next/head";
import Layout from "../../components/Layout";
import { getProductCategoryData } from "../../lib/products";

import categoriesStyles from './styles/categories.module.css'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps() {
  const allProductCategoryData = await getProductCategoryData();
  return {
    props: {
      allProductCategoryData,
    },
  };
}

const products = ({ allProductCategoryData }) => {
  return (
    <Layout>
      <Head>
        <title>Shop our products</title>
      </Head>
      <h1>Shop our products</h1>
      <nav>
        <ul>
          {allProductCategoryData.map(projectCategory => (
            <li key={projectCategory.ID}>
              <a href={`#${projectCategory.ID}`}>{projectCategory.Name}</a>
            </li>
          ))}
        </ul>
      </nav>
      <ul className={utilStyles.zeroList}>
        {allProductCategoryData.map(projectCategory => (
          <li key={projectCategory.ID} id={projectCategory.ID}>
            <span className={utilStyles.flexInline}>
              <h2>Shop {projectCategory.Name}</h2>
              <p>Items: {projectCategory.ItemCount}</p>
            </span>
            {projectCategory.HasSubCategories ? (
              <ul className={categoriesStyles.subcategories}>
                {projectCategory.SubCategories.map((subCat) => (
                  <li key={subCat.ID} className={categoriesStyles.subcategories__item}>
                    <img src={subCat.CoverArtUrl} />
                    <div className={categoriesStyles.subcategories__item__words}>
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

export default products;
