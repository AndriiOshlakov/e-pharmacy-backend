import { Router } from 'express';
import { getAllPharmacies } from '../controllers/pharmaciesController.js';

const router = Router();

router.use('/pharmacies', getAllPharmacies);

export default router;
