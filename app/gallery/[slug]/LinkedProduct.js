"use server";

import { getProductByStyle, getProductCategory } from "lib/products";

import { LinkButton } from "components";

const getLinkedProduct = async (product_path) => {
  const [_emptyString, _products, manufacturerSkuCode, styleNameCode] =
    product_path.split("/");

  const productData = await getProductByStyle(
    manufacturerSkuCode,
    styleNameCode
  );

  const category =
    productData.Categories.find((cat) => !!cat.subCategoryCode) ||
    productData.Categories[0];
  let categoryData,
    subcategoryData = null;

  if (category) {
    categoryData = (await getProductCategory(category.code)) || null;
    if (categoryData) {
      subcategoryData =
        categoryData.SubCategories.find(
          (sub) => sub.code == category.subCategoryCode
        ) || null;
    }
  }

  return {
    productData,
    categoryData,
    subcategoryData,
  };
};

export default async function LinkedProduct({ project }) {
  if (!project.product_path) return null;

  const { productData, categoryData } = await getLinkedProduct(
    project.product_path
  );

  console.log(categoryData);

  return (
    <>
      <h3>Printed on {productData.Name}</h3>
      <h4>
        {productData.Manufacturer}{" "}
        <span className="highlight caps">{productData.ManufacturerSku}</span>
      </h4>
      <div style={{ display: "flex", gap: "1rem" }}>
        <LinkButton href={project.product_path}>View Product</LinkButton>
        <LinkButton href={categoryData.href}>
          View All {categoryData.Name}
        </LinkButton>
      </div>
    </>
  );
}
