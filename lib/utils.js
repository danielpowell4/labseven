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

export const capitalize = (string) => {
  string = string.replace(/_/g, " "); // change out underscore for space
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const titleize = (string) => {
  string = string.replace(/_id/, ""); // remove _id
  string = string.replace(/_/g, " "); // change out underscore for space
  string = string.replace(/([a-z])([A-Z])/g, "$1 $2"); // add space for camelCase
  return string
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
};

const roundNumber = (value) => Number(Number(value).toFixed(2));

export const formatUSD = (value) => {
  const rounded = roundNumber(value);
  if (Number.isNaN(rounded)) return "-";

  return rounded.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
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
