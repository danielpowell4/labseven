export function getSortedCatalogData() {
  // do a fetch request (or something) and get all the items (or something)
  const itemIds = ['item1', 'item2', 'item3'];
  const allCatalogData = itemIds.map(itemId => {
    return { itemId };
  })

  return allCatalogData.sort((a, b) => {
    if (a.itemId < b.itemId) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllItemIds() {
  const itemNames = ['get', 'item', 'slugs']

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
  return itemNames.map(itemName => {
    return {
      params: {
        id: itemName.replace(/\.md$/, '') // TODO: remove replace...?
      }
    }
  })
}

export async function getItemData(id) {
  // do a fetch request (or something) and get it going

  return {
    id,
    data: 'TODO: add stuff to me'
  }
}
