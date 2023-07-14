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

function generateSiteMap(paths) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${BASE_URL}</loc>
       <priority>1.00</priority>
     </url>
     <url>
       <loc>${BASE_URL}/services</loc>
       <priority>1.00</priority>
     </url>
     <url>
       <loc>${BASE_URL}/contact</loc>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>${BASE_URL}/products</loc>
       <priority>1.00</priority>
     </url>
     <url>
       <loc>${BASE_URL}/order/pick-products</loc>
       <priority>0.7</priority>
     </url>
  ${paths
    .map(({ loc, priority }) => {
      return `<url>
       <loc>${escapeXMLChars(loc)}</loc>
       <priority>${priority}</priority>
     </url>
       `;
    })
    .join("")
    .trim()}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const paths = [];

  const allCategories = await getAllProductCategories();
  for (const category of allCategories) {
    paths.push({ loc: `${BASE_URL}/products/${category.code}`, priority: 0.8 });

    for (const subcategory of category.SubCategories) {
      paths.push({
        loc: `${BASE_URL}/products/${category.code}/${subcategory.code}`,
        priority: 0.7,
      });
    }
  }

  const allProducts = await getAllProducts();
  for (const product of allProducts) {
    const defaultHref = product.defaultHref;

    if (defaultHref) {
      paths.push({ loc: defaultHref, priority: 0.5 });
    }
  }

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(paths);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default SiteMap;
