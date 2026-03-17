import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { celebrate } from 'celebrate';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../controllers/authControllers.js';
import { getCurrentUser } from '../controllers/userControllers.js';

const router = Router();

router.post('/api/user/register', celebrate(registerUserSchema), registerUser);
router.post('/api/user/login', celebrate(loginUserSchema), loginUser);
router.post('/api/user/logout', authenticate, logoutUser);
router.get('/api/user/user-info', authenticate, getCurrentUser);
router.post('/api/session', refreshUserSession);

export default router;
