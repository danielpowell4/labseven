const PRODUCT_CATEGORY_ENDPOINT =
  "https://stores.labseven.co/Lab_Seven_Screen_Printing_Co/Api2/GetProductCategories?BlankProducts=false&Format=JSON&GetProductIds=true&HierarchicalItemCount=true&IncludeAllPublisherCategories=false&ProductType=standard&StaticProducts=false";
const IMAGE_PREFIX = "https://stores.labseven.co";

export async function getProductCategoryData() {
  // SAMPLE RES:
  // SEE lib/_sample_product_category_res.json
  const res = await fetch(PRODUCT_CATEGORY_ENDPOINT);
  const json = await res.json();

  const allProductCategories = json["Data"].map((cat) => {
    let blob = {
      ID: cat["ID"],
      Name: cat["Name"],
      CoverArtUrl: IMAGE_PREFIX + cat["CoverArtUrl"],
      ItemCount: cat["ItemCount"],
    };

    const hasSubCategories = cat["Children"].length > 0;

    if (hasSubCategories) {
      blob["HasSubCategories"] = true;
      blob["SubCategories"] = cat["Children"]
        .filter((subCategory) => !!subCategory["ItemCount"] != 0)
        .map((subCategory) => ({
          ID: subCategory["ID"],
          Name: subCategory["Name"],
          ItemCount: subCategory["ItemCount"],
          ItemIds: subCategory["ItemIds"],
          CoverArtUrl: IMAGE_PREFIX + subCategory["CoverArtUrl"],
        }));
    } else {
      // is own category
      blob["HasSubCategories"] = false;
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

// const itemNames = ["get", "item", "slugs"];

//   // Returns an array that looks like this:
//   // [
//   //   {
//   //     params: {
//   //       id: 'ssg-ssr'
//   //     }
//   //   },
//   //   {
//   //     params: {
//   //       id: 'pre-rendering'
//   //     }
//   //   }
//   // ]
//   return itemNames.map((itemName) => {
//     return {
//       params: {
//         id: itemName.replace(/\.md$/, ""), // TODO: remove replace...?
//       },
//     };
//   });

// PRODUCT LIST
const PRODUCT_LIST_PAGE_SIZE = 25; // to keep requests snappy, default == 100
const PRODUCT_LIST_CONDITIONS = {
  AddBlankProducts: false,
  Format: "JSON",
  IncludeActiveProducts: true,
  IncludeActiveStyles: true,
  IncludeAllPublisherProducts: false,
  IncludeAllSides: false,
  IncludeAllStyles: false,
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
  MaxResults: PRODUCT_LIST_PAGE_SIZE
}

const PRODUCT_LIST_ENDPOINT = "https://stores.labseven.co/Lab_Seven_Screen_Printing_Co/Api2/GetProductBaseList"
// https://stores.labseven.co/Lab_Seven_Screen_Printing_Co?Page=Api2#methods_GetProductBaseList

const buildProductListUrl = (Index = 0) => {
  const query = {...PRODUCT_LIST_CONDITIONS, Index};
  let queryString = "?";
  Object.entries(query).forEach(([key, value], conditionIndex) => {
    if (conditionIndex === 0) {
      queryString += `${key}=${value}`;
    } else {
      queryString += `&${key}=${value}`;
    }
  })

  return encodeURI(`${PRODUCT_LIST_ENDPOINT}${queryString}`)
}

async function getProductPage(startingIndex) {
  let response = await fetch(buildProductListUrl(startingIndex));
  let json = await response.json()
  return json;
}

export async function getAllProducts() {
  console.log("getting all products...")
  let products = [];
  let fetchedProductIndex = 0;
  let lastProductIndex = 100; // to start... closer to 467 in real life

  while (fetchedProductIndex < lastProductIndex) {
    console.log(`- loading products ${fetchedProductIndex}-${fetchedProductIndex + PRODUCT_LIST_PAGE_SIZE}`);
    const json = await getProductPage(fetchedProductIndex);
    const parsedProducts = json.Data;

    if (parsedProducts.length) {
      products.push(...parsedProducts);
    } else {
      break // nothing fetched STOP as guard
    }
    // adjust end conditions to continue loop
    lastProductIndex = json.Pagination.TotalResults;
    fetchedProductIndex = json.Pagination.Index + json.Pagination.IncludedResults;
  }

  console.log("- finished loading!")

  return products;
}

export async function getItemData(id) {
  // do a fetch request (or something) and get it going

  return {
    id,
    data: "TODO: add stuff to me",
  };
}
