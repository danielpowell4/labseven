import { getAllProducts } from "../../../lib/products";
import { paginate } from "../../../lib/utils";

export default async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 15;

  const allProducts = await getAllProducts();

  // TODO: add filters here!

  const [products, pagination] = paginate(
    allProducts,
    Number(currentPage),
    Number(perPage)
  );

  return res.json({ pagination, products });
};
