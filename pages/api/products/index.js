import { getAllProducts, getProductCategory } from "../../../lib/products";
import { paginate } from "../../../lib/utils";

export default async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 15;
  const categoryCode = req.query.productCategoryCode;
  const subCategoryCode = req.query.subCategoryCode;

  let allProducts = await getAllProducts();

  // filter matches
  if (categoryCode) {
    // filter category matches
    const categoryData = await getProductCategory(categoryCode);
    if (subCategoryCode) {
      const subcategoryData = categoryData.SubCategories.find(
        (sub) => sub.code == subCategoryCode
      );
      allProducts = allProducts.filter((product) =>
        subcategoryData.ItemIds.includes(product.ID)
      );
    } else {
      allProducts = allProducts.filter((product) =>
        categoryData.ItemIds.includes(product.ID)
      );
    }
  }

  const [products, pagination] = paginate(
    allProducts,
    Number(currentPage),
    Number(perPage)
  );

  return res.json({ pagination, products });
};
