import express from 'express';
import { sendVerificationEmail, verifyEmail, signup, login, getCurrentUser } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/send-verification', sendVerificationEmail);
router.post('/verify-email', verifyEmail);
router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authenticateToken, getCurrentUser);

export default router; 