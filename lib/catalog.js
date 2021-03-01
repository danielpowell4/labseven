const PRODUCT_CATEGORY_ENDPOINT =
  "https://stores.labseven.co/Lab_Seven_Screen_Printing_Co/Api2/GetProductCategories?BlankProducts=false&Format=JSON&GetProductIds=true&HierarchicalItemCount=true&IncludeAllPublisherCategories=false&ProductType=standard&StaticProducts=false";
const IMAGE_PREFIX = "https://stores.labseven.co";

export async function getProductCategoryData() {
  // SAMPLE RES:
  // SEE lib/_sample_product_category_res.json
  const res = await fetch(PRODUCT_CATEGORY_ENDPOINT);
  const json = await res.json();

  const allProjectCategories = json["Data"].map((cat) => {
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

  return allProjectCategories.sort((a, b) => {
    if (a.ItemCount < b.ItemCount) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllItemIds() {
  const itemNames = ["get", "item", "slugs"];

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return itemNames.map((itemName) => {
    return {
      params: {
        id: itemName.replace(/\.md$/, ""), // TODO: remove replace...?
      },
    };
  });
}

export async function getItemData(id) {
  // do a fetch request (or something) and get it going

  return {
    id,
    data: "TODO: add stuff to me",
  };
}
