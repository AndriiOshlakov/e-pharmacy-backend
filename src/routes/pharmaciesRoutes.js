import { Router } from 'express';
import {
  getAllPharmacies,
  getNearestPharmacies,
} from '../controllers/pharmaciesController.js';
import { celebrate } from 'celebrate';
import { getAllPharmaciesSchema } from '../validations/pharmaciesValidation.js';

const router = Router();

router.get(
  '/api/pharmacies',
  celebrate(getAllPharmaciesSchema),
  getAllPharmacies,
);
router.get('/api/pharmacies/nearest', getNearestPharmacies);

export default router;
