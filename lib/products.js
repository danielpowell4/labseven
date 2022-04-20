const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");

import { camelize } from "./utils";

const loadOrBuildCache = async (filename, fetcher) => {
  const filepath = resolve(".", filename);
  let cachedData;

  try {
    cachedData = JSON.parse(readFileSync(filepath, "utf8"));
  } catch (error) {
    console.log(`${filename} not initialized`, error);
  }

  if (!cachedData) {
    const data = await fetcher();

    try {
      writeFileSync(filepath, JSON.stringify(data), "utf8");
      console.log(`Saved data to ${filepath}`);
    } catch (error) {
      console.error(`Failed to save data to ${filepath}`, error);
    }

    cachedData = data;
  }

  return cachedData;
};

// START - products
// fetch all products and save in .gitignore'd JSON cache file
export function sortProducts(a, b) {
  const supplierCompare = a.Supplier.localeCompare(b.Supplier);
  if (supplierCompare !== 0) return supplierCompare;

  const manufacturerCompare = a.Manufacturer.localeCompare(b.Manufacturer);
  if (manufacturerCompare !== 0) return manufacturerCompare;

  return a.ManufacturerSku.localeCompare(b.ManufacturerSku);
}

const PRODUCTS_CACHE_PATH = "products_cache.json";
export async function getAllProducts() {
  const allProducts = await loadOrBuildCache(
    PRODUCTS_CACHE_PATH,
    fetchAllProducts
  );
  // Hide products without categories + apply default sort
  return allProducts
    .filter((product) => !!product.Categories.length)
    .sort(sortProducts);
}

const PRODUCT_LIST_ENDPOINT =
  "https://stores.labseven.co/Lab_Seven_Screen_Printing_Co/Api2/GetProductBaseList";
const PRODUCT_LIST_PAGE_SIZE = 25; // to keep requests snappy, default == 100
const PRODUCT_LIST_CONDITIONS = {
  AddBlankProducts: false,
  Format: "JSON",
  IncludeActiveProducts: true,
  IncludeActiveStyles: true,
  IncludeAllPublisherProducts: false,
  IncludeAllSides: false,
  IncludeAllStyles: true,
  IncludeCategories: true,
  IncludeCosts: false,
  IncludeInactiveProducts: false,
  IncludeInactiveStyles: false,
  IncludeInventories: false,
  IncludeKeywords: true,
  IncludePersonalizations: false,
  IncludePriceRuleDiscounts: true,
  IncludePrices: true,
  IncludeQuantityPacks: true,
  IncludeRegions: false,
  IncludeSizeCharts: true,
  IncludeSizeDetails: true,
  IncludeSizes: true,
  IncludeStoreIds: false,
  IncludeStyleCounts: false,
  MaxResults: PRODUCT_LIST_PAGE_SIZE,
};

const buildProductListUrl = (Index = 0) => {
  const query = { ...PRODUCT_LIST_CONDITIONS, Index };
  let queryString = "?";
  Object.entries(query).forEach(([key, value], conditionIndex) => {
    if (conditionIndex === 0) {
      queryString += `${key}=${value}`;
    } else {
      queryString += `&${key}=${value}`;
    }
  });

  return encodeURI(`${PRODUCT_LIST_ENDPOINT}${queryString}`);
};

async function getPageOfProducts(startingIndex) {
  let response = await fetch(buildProductListUrl(startingIndex));
  let json = await response.json();
  return json;
}

async function fetchAllProducts() {
  console.log("fetching all products...");
  let products = [];
  let fetchedProductIndex = 0;
  let lastProductIndex = 50; // to start... closer to 467 in real life

  while (fetchedProductIndex < lastProductIndex) {
    console.log(
      `- loading products ${fetchedProductIndex}-${
        fetchedProductIndex + PRODUCT_LIST_PAGE_SIZE
      }`
    );
    const json = await getPageOfProducts(fetchedProductIndex);
    const parsedProducts = json.Data;

    const formattedProducts = parsedProducts.map((product) => {
      const manufacturerSkuCode =
        `${product.Manufacturer}-${product.ManufacturerSku}`.toLowerCase();
      const defaultStyle = (product.Styles || [])[0]; // first

      return {
        ...product,
        manufacturerSkuCode,
        defaultHref: defaultStyle
          ? encodeURI(
              `/product/${manufacturerSkuCode}/${camelize(defaultStyle.Name)}`
            )
          : "",
        Styles: (product.Styles || []).map((style) => {
          const hasMainImage = !!style.ImageFilePath_Front;
          const nameCode = camelize(style.Name);

          return {
            ...style,
            nameCode,
            href: encodeURI(`/product/${manufacturerSkuCode}/${nameCode}`),
            hasMainImage,
            mainImageUrl: hasMainImage
              ? IMAGE_PREFIX + style.ImageFilePath_Front
              : "",
            Sides: (style.Sides || []).map((side) => {
              const hasImage = !!side.ImageFilePath;

              return {
                ...side,
                hasImage,
                imageUrl: hasImage ? IMAGE_PREFIX + side.ImageFilePath : "",
              };
            }),
          };
        }),
      };
    });

    if (parsedProducts.length) {
      products.push(...formattedProducts);
    } else {
      break; // nothing fetched STOP as guard
    }
    // adjust end conditions to continue loop
    // dev only to prevent too many pages in prod pre-launch
    if (process.env.NODE_ENV == "development") {
      lastProductIndex = json.Pagination.TotalResults;
    }
    fetchedProductIndex =
      json.Pagination.Index + json.Pagination.IncludedResults;
  }

  console.log("- finished loading!");

  return products;
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

const PRODUCT_CATEGORY_ENDPOINT =
  "https://stores.labseven.co/Lab_Seven_Screen_Printing_Co/Api2/GetProductCategories?BlankProducts=false&Format=JSON&GetProductIds=true&HierarchicalItemCount=true&IncludeAllPublisherCategories=false&ProductType=standard&StaticProducts=false";
const IMAGE_PREFIX = "https://stores.labseven.co";

export function getAllProductCategories() {
  return loadOrBuildCache(
    PRODUCT_CATEGORIES_CACHE_PATH,
    fetchAllProductCategories
  );
}

export async function getProductCategory(productCategoryCode) {
  const productCategories = await getAllProductCategories();
  return productCategories.find((cat) => cat.code === productCategoryCode);
}

async function fetchAllProductCategories() {
  // SAMPLE RES:
  // SEE lib/_sample_product_category_res.json
  const res = await fetch(PRODUCT_CATEGORY_ENDPOINT);
  const json = await res.json();

  const allProductCategories = json["Data"].map((cat) => {
    const code = camelize(cat["Name"]);

    let blob = {
      code,
      href: encodeURI(`/products/${code}`),

      ID: cat["ID"],
      Name: cat["Name"],
      CoverArtUrl: IMAGE_PREFIX + cat["CoverArtUrl"],
      ItemCount: cat["ItemCount"],
    };

    const hasSubCategories = cat["Children"].length > 0;

    if (hasSubCategories) {
      blob.hasSubCategories = true;
      const subcategories = cat["Children"]
        .filter((subCategory) => !!subCategory["ItemCount"] != 0)
        .map((subCategory) => ({
          code: camelize(subCategory["Name"]),
          href: encodeURI(`/products/${code}/${camelize(subCategory["Name"])}`),

          ID: subCategory["ID"],
          Name: subCategory["Name"],
          ItemCount: subCategory["ItemCount"],
          ItemIds: subCategory["ItemIds"],
          CoverArtUrl: IMAGE_PREFIX + subCategory["CoverArtUrl"],
        }));

      blob["SubCategories"] = subcategories;
      // build ItemIds from subcategories
      blob.ItemIds = subcategories.reduce((acc, current) => {
        for (const itemId of current.ItemIds) {
          acc.push(itemId);
        }
        return acc;
      }, []);
    } else {
      // is own category
      blob.hasSubCategories = false;
      blob["SubCategories"] = [];
      blob.ItemIds = cat["ItemIds"];
    }

    return blob;
  });

  return allProductCategories.sort((a, b) => {
    if (a.ItemCount < b.ItemCount) {
      return 1;
    } else {
      return -1;
    }
  });
}

// END - categories
