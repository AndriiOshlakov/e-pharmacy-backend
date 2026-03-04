import createHttpError from 'http-errors';
import { Product } from '../models/product.js';

export const getProducts = async (req, res) => {
  const { page = 1, perPage = 12, category, search } = req.query;
  const skip = (page - 1) * perPage;
  const productsQuery = Product.find();
  if (category) {
    productsQuery.where('category').equals(category);
  }
  if (search) {
    productsQuery.where({ $text: { $search: search } });
  }
  const [totalProducts, products] = await Promise.all([
    productsQuery.clone().countDocuments(),
    productsQuery.skip(skip).limit(perPage),
  ]);
  const totalPages = Math.ceil(totalProducts / perPage);
  res.status(200).json({ page, perPage, totalPages, totalProducts, products });
};

export const getProductById = async (req, res, next) => {
  const { id } = req.params;
  const note = await Product.findOne({ _id: id });
  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
};
