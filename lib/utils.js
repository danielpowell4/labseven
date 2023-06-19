import set from "lodash.set";

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

export const formatUSD = (value, overrides = {}) => {
  const rounded = roundNumber(value);
  if (Number.isNaN(rounded)) return "-";

  return rounded.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    ...overrides,
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

export const serializeForm = (form) => {
  let data = {};
  const formData = new FormData(form);
  for (let key of formData.keys()) {
    let fileJSON = "";
    if (key === "files") {
      try {
        fileJSON = JSON.parse(formData.get(key) || "[]");
      } catch (_e) {
        fileJSON = [{ error: true, message: "Error parsing file data" }];
      }
      set(data, "files", fileJSON);
      set(data, "fileCount", fileJSON.length);
    } else {
      set(data, key, formData.get(key));
    }
  }
  return data;
};

export const applyTokens = (dropboxBlob, tokenRes) => {
  dropboxBlob.token = tokenRes.access_token;

  // refresh token is only returned on initial auth (not refresh)
  if (tokenRes.refresh_token) dropboxBlob.refreshToken = tokenRes.refresh_token;

  // token expires in ~4 hours
  const expiresAt = Date.now() + tokenRes.expires_in * 1000; // ms
  dropboxBlob.expiresAround = new Date(expiresAt).toISOString();
  dropboxBlob.lastUpdated = new Date().toISOString();
};

/** 'iPad' => not mobile */
export const isMobile = () => {
  if (typeof window === "undefined") return false; // on next server

  return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window?.navigator?.userAgent
  );
};
