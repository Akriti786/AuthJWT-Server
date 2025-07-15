import { Router } from 'express';
import { body } from 'express-validator';
import { login, register, current } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = Router();

const email = body('email').isEmail().withMessage('Valid email required');
const password = body('password')
  .isLength({ min: 6 })
  .withMessage('Password ≥ 6 chars');

router.post('/register',
  body('name').notEmpty().withMessage('Name required'),
  email,
  password,
  register
);

router.post('/login', email, password, login);
router.get('/me', auth, current);

export default router;
