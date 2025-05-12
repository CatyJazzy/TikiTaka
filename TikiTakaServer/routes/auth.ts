import { Router } from 'express';
import { sendVerificationEmail, verifyEmail, signup } from '../controllers/authController';

const router = Router();

router.post('/send-verification', sendVerificationEmail);
router.post('/verify-email', verifyEmail);
router.post('/signup', signup);

export default router; 