import { sql } from "@vercel/postgres";
import { getAllLocationSlugs } from "lib/locations";
import { getAllProductCategories, getAllProducts } from "lib/products";

const BASE_URL = "https://www.labseven.co";

function escapeXMLChars(url) {
  return url
    .replace(/&/g, "&amp;")
    .replace(/'/g, "&apos;")
    .replace(/"/g, "&quot;")
    .replace(/>/g, "&gt;")
    .replace(/</g, "&lt;");
}

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
export default async function sitemap() {
  const paths = [
    { url: BASE_URL, priority: 1.0 },
    { url: `${BASE_URL}/services`, priority: 1.0 },
    { url: `${BASE_URL}/contact`, priority: 0.9 },
    { url: `${BASE_URL}/products`, priority: 1.0 },
    { url: `${BASE_URL}/order/pick-products`, priority: 0.7 },
  ];

  const { rows: projects } = await sql`SELECT * FROM projects`;
  const maxUpdatedAt = projects.reduce(
    (max, project) => (max > project.updated_at ? max : project.updated_at),
    projects[0].updated_at
  );
  paths.push({
    url: `${BASE_URL}/gallery`,
    priority: 0.8,
    changeFrequency: "monthly",
    lastModified: maxUpdatedAt,
  });
  for (const project of projects) {
    paths.push({
      url: `${BASE_URL}/gallery/${project.slug}`,
      priority: 0.7,
      lastModified: project.updated_at,
    });
  }

  const allLocations = await getAllLocationSlugs();
  for (const location of allLocations) {
    paths.push({ url: `${BASE_URL}/locations/${location}`, priority: 0.8 });
  }

  const allCategories = await getAllProductCategories();
  for (const category of allCategories) {
    paths.push({ url: `${BASE_URL}/products/${category.code}`, priority: 0.8 });

    for (const subcategory of category.SubCategories) {
      paths.push({
        url: `${BASE_URL}/products/${category.code}/${subcategory.code}`,
        priority: 0.7,
      });
    }
  }

  const allProducts = await getAllProducts();
  for (const product of allProducts) {
    const defaultHref = product.defaultHref;

    if (defaultHref) {
      paths.push({ url: defaultHref, priority: 0.5 });
    }
  }

  return paths.map(({ url, ...rest }) => ({
    ...rest,
    url: escapeXMLChars(url),
  }));
}
