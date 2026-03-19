import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getCart,
  updateCart,
  checkoutCart,
  removeFromCart,
  decreaseCart,
} from '../controllers/cartController.js';
import { celebrate } from 'celebrate';
import { checkoutSchema } from '../validations/checkoutValidation.js';

const router = express.Router();

router.get('/api/cart', authenticate, getCart);
router.put('/api/cart/update', authenticate, updateCart);
router.put('/api/cart/decrease', authenticate, decreaseCart);
router.delete('/api/cart/:productId', authenticate, removeFromCart);
router.post(
  '/api/cart/checkout',
  authenticate,
  celebrate(checkoutSchema),
  checkoutCart,
);

export default router;
