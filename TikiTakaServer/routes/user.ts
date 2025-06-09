import express from 'express';
import { getUserProfile } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// 모든 라우트에 인증 미들웨어 적용
router.use(authenticateToken);

// 사용자 프로필 정보 조회
router.get('/:userId', getUserProfile);

export default router; 