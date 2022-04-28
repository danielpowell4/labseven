import { readFileSync } from "fs";
import { join } from "path";

// NOTE: requires `node ./loadProducts` to run
const loadCache = async (filename) => {
  const filepath = join(process.cwd(), "public", filename);
  let cachedData;

  try {
    cachedData = JSON.parse(readFileSync(filepath, "utf8"));
  } catch (error) {
    console.log(`${filename} not initialized`, error);
  }

  if (!cachedData) {
    console.error(`No cache found for ${filename}`);
  }

  return cachedData;
};

// START - products
// fetch all products and save in .gitignore'd JSON cache file
const PRODUCTS_CACHE_PATH = "products_cache.json";

export async function getAllProducts() {
  const allProducts = await loadCache(PRODUCTS_CACHE_PATH);
  // Hide products without categories + apply default sort
  return allProducts
    .filter((product) => !!product.Categories.length)
    .sort(sortProducts);
}

export function sortProducts(a, b) {
  const supplierCompare = a.Supplier.localeCompare(b.Supplier);
  if (supplierCompare !== 0) return supplierCompare;

  const manufacturerCompare = a.Manufacturer.localeCompare(b.Manufacturer);
  if (manufacturerCompare !== 0) return manufacturerCompare;

  return a.ManufacturerSku.localeCompare(b.ManufacturerSku);
}

export async function getProductByStyle(manufacturerSkuCode, styleNameCode) {
  const products = await getAllProducts();
  const product =
    products.find((p) => p.manufacturerSkuCode === manufacturerSkuCode) || {};
  const activeStyle = product.Styles.find(
    (style) => style.nameCode == styleNameCode
  );

  return {
    ...product,
    activeStyle,
    manufacturerSkuCode,
    styleNameCode,
  };
}
// END - products

// START - categories
const PRODUCT_CATEGORIES_CACHE_PATH = "product_categories_cache.json";

export function getAllProductCategories() {
  return loadCache(PRODUCT_CATEGORIES_CACHE_PATH);
}

export async function getProductCategory(productCategoryCode) {
  const productCategories = await getAllProductCategories();
  return productCategories.find((cat) => cat.code === productCategoryCode);
}

// END - categories
