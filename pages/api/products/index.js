import { getPaginatedProducts } from "../../../lib/products";

export default async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 15;

  const [products, pagination] = await getPaginatedProducts(
    currentPage,
    perPage
  );

  return res.json({ pagination, products });
};
