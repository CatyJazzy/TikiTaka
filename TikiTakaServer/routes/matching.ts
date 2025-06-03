import express from 'express';
import { updatePreferences, getPreferences } from '../controllers/matchingController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/preferences', authenticateToken, getPreferences);
router.patch('/preferences', authenticateToken, updatePreferences);

export default router; 