import fs from "fs";
import path from "path";

// helpers
function camelize(str) {
  return str
    .toLowerCase()
    .replace("/", "")
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

export function sortProducts(a, b) {
  const supplierCompare = a.Supplier.localeCompare(b.Supplier);
  if (supplierCompare !== 0) return supplierCompare;

  const manufacturerCompare = a.Manufacturer.localeCompare(b.Manufacturer);
  if (manufacturerCompare !== 0) return manufacturerCompare;

  return a.ManufacturerSku.localeCompare(b.ManufacturerSku);
}

// START - products
// fetch all products and save in .gitignore'd JSON cache file
const PRODUCTS_CACHE_PATH = "products_cache.json";
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
  IncludeSizeCharts: false,
  IncludeSizeDetails: false,
  IncludeSizes: false,
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
  let lastProductIndex = 100; // to start... closer to 467 in real life

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
          ? `/product/${manufacturerSkuCode}/${camelize(defaultStyle.Name)}`
          : "",
        Styles: (product.Styles || []).map((style) => {
          const hasMainImage = !!style.ImageFilePath_Front;
          const nameCode = camelize(style.Name);

          return {
            ...style,
            nameCode,
            href: `/product/${manufacturerSkuCode}/${nameCode}`,
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
    lastProductIndex = json.Pagination.TotalResults;
    fetchedProductIndex =
      json.Pagination.Index + json.Pagination.IncludedResults;
  }

  console.log("- finished loading!");

  return products;
}

export async function getAllProducts() {
  let cachedProducts;

  try {
    cachedProducts = JSON.parse(fs.readFileSync(PRODUCTS_CACHE_PATH, "utf8"));
  } catch (error) {
    console.log("Product cache not initialized");
  }

  if (!cachedProducts) {
    const products = await fetchAllProducts();

    try {
      fs.writeFileSync(PRODUCTS_CACHE_PATH, JSON.stringify(products), "utf8");
      console.log("Saved to products to JSON cache");
    } catch (error) {
      console.error("Failed to write products cache", error);
    }

    cachedProducts = products;
  }

  return cachedProducts;
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

export async function getAllProductCategories() {
  let cachedProductCategories;

  try {
    cachedProductCategories = JSON.parse(
      fs.readFileSync(PRODUCT_CATEGORIES_CACHE_PATH, "utf8")
    );
  } catch (error) {
    console.log("Product cache not initialized");
  }

  if (!cachedProductCategories) {
    const productCategories = await fetchAllProductCategories();

    try {
      fs.writeFileSync(
        PRODUCT_CATEGORIES_CACHE_PATH,
        JSON.stringify(productCategories),
        "utf8"
      );
      console.log("Saved to products to JSON cache");
    } catch (error) {
      console.error("Failed to write products cache", error);
    }

    cachedProductCategories = productCategories;
  }

  return cachedProductCategories;
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
      href: `/products/${code}`,

      ID: cat["ID"],
      Name: cat["Name"],
      CoverArtUrl: IMAGE_PREFIX + cat["CoverArtUrl"],
      ItemCount: cat["ItemCount"],
    };

    const hasSubCategories = cat["Children"].length > 0;

    if (hasSubCategories) {
      blob.hasSubCategories = true;
      blob["SubCategories"] = cat["Children"]
        .filter((subCategory) => !!subCategory["ItemCount"] != 0)
        .map((subCategory) => ({
          code: camelize(subCategory["Name"]),

          ID: subCategory["ID"],
          Name: subCategory["Name"],
          ItemCount: subCategory["ItemCount"],
          ItemIds: subCategory["ItemIds"],
          CoverArtUrl: IMAGE_PREFIX + subCategory["CoverArtUrl"],
        }));
    } else {
      // is own category
      blob.hasSubCategories = false;
      blob["SubCategories"] = [];
      blob["ItemIds"] = cat["ItemIds"];
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
