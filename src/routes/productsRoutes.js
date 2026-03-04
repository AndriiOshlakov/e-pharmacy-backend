import { Router } from 'express';
import {
  getProductById,
  getProducts,
} from '../controllers/productsControllers.js';
import {
  getAllProductsSchema,
  productIdSchema,
} from '../validations/productsValidation.js';
import { celebrate } from 'celebrate';

const router = Router();

router.get('/api/products', celebrate(getAllProductsSchema), getProducts);
router.get('/api/products/:id', celebrate(productIdSchema), getProductById);

export default router;
