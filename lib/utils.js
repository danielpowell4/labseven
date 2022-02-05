export const camelize = (str) => {
  return str
    .toLowerCase()
    .replace(/\/|-/, " ")
    .replace(/'/, "")
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

export const paginate = (allResults, pageNumber, perPage) => {
  const pageIndex = pageNumber - 1;
  const paginatedResults = allResults.slice(
    pageIndex * perPage,
    pageIndex * perPage + perPage
  );
  const totalCount = allResults.length;
  const totalPages = Math.ceil(totalCount / perPage);
  const pagination = {
    prevPage: pageNumber - 1 > 0 ? pageNumber - 1 : null,
    currentPage: pageNumber,
    nextPage: pageNumber + 1 > totalPages ? null : pageNumber + 1,
    totalPages: totalPages,
    totalCount: totalCount,
    perPage: perPage,
  };

  return [paginatedResults, pagination];
};
