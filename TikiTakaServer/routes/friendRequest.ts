import express from 'express';
import { sendFriendRequest, getFriendRequests, respondToFriendRequest, getMatchingStats, getSentFriendRequests, getAcceptedBuddies } from '../controllers/friendRequestController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// 모든 라우트에 인증 미들웨어 적용
router.use(authenticateToken);

// 친구 신청 보내기
router.post('/send', sendFriendRequest);

// 받은 친구 신청 목록 조회
router.get('/received', getFriendRequests);

// 보낸 친구 신청 목록 조회
router.get('/sent', getSentFriendRequests);

// 성사된 버디 목록 조회
router.get('/accepted', getAcceptedBuddies);

// 친구 신청 응답 (수락/거절)
router.put('/:requestId/respond', respondToFriendRequest);

// 매칭 통계 조회
router.get('/stats', getMatchingStats);

export default router; 