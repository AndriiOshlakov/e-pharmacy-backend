import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getCart,
  updateCart,
  checkoutCart,
} from '../controllers/cartController.js';
import { celebrate } from 'celebrate';
import { checkoutSchema } from '../validations/checkoutValidation.js';

const router = express.Router();

router.get('/api/cart', authenticate, getCart);
router.put('/api/cart/update', authenticate, updateCart);
router.post(
  '/api/cart/checkout',
  authenticate,
  celebrate(checkoutSchema),
  checkoutCart,
);

export default router;
