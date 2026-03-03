import { Router } from 'express';
import { getAllPharmacies } from '../controllers/pharmaciesController.js';

const router = Router();

router.get('/pharmacies', getAllPharmacies);

export default router;
