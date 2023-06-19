import {
  getProductCategory,
  getAllProducts,
  sortProducts,
  sortBrand,
  sortBrandZA,
  sortPriceHighLow,
  sortPriceLowHigh,
} from "../../lib/products";
import { paginate } from "../../lib/utils";

const sortCallback = {
  default: sortProducts,
  brandAZ: sortBrand,
  brandZA: sortBrandZA,
  priceHighLow: sortPriceHighLow,
  priceLowHigh: sortPriceLowHigh,
};

export default async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 16; /* 4 x 4 */
  const categoryCode = req.query.productCategoryCode;
  const subCategoryCode = req.query.subCategoryCode;
  const manufacturerCode = req.query.manufacturerCode;
  const q = req.query.q;
  const sort = req.query.sort;

  let allProducts = await getAllProducts();

  // filter matches
  if (manufacturerCode) {
    // - by manufacturer
    allProducts = allProducts.filter(
      (product) => product.manufacturerCode === manufacturerCode
    );
  }

  if (categoryCode) {
    // - by category
    const categoryData = await getProductCategory(categoryCode);

    if (subCategoryCode) {
      // - by subcategory
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

  if (q) {
    // - by search term
    const searchTerm = q.toLowerCase();
    allProducts = allProducts.filter((product) => {
      return (
        product.SearchTerms &&
        product.SearchTerms.some((term) => term.includes(searchTerm))
      );
    });
  }

  if (sort) {
    const callback = sortCallback[sort];
    if (callback) {
      allProducts = allProducts.sort(callback);
    }
  }

  const [products, pagination] = paginate(
    allProducts,
    Number(currentPage),
    Number(perPage)
  );

  return res.json({ pagination, products });
};
