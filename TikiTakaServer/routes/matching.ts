import express from 'express';
import { updatePreferences, getPreferences, getMatches } from '../controllers/matchingController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/preferences', authenticateToken, getPreferences);
router.patch('/preferences', authenticateToken, updatePreferences);
router.get('/', authenticateToken, getMatches);

export default router; 