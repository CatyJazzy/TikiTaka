import { Response } from 'express';
import { FriendRequest } from '../models/FriendRequest';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth';

export const sendFriendRequest = async (req: AuthRequest, res: Response) => {
  try {
    console.log('친구 신청 요청 받음:', req.body);
    console.log('인증된 사용자:', req.user);

    const { receiverId } = req.body;
    const senderId = req.user?.userId;

    if (!senderId) {
      return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
    }

    // 자기 자신에게 신청하는 경우 방지
    if (senderId === receiverId) {
      console.log('자기 자신에게 신청 시도');
      return res.status(400).json({ message: '자기 자신에게 친구 신청을 할 수 없습니다.' });
    }

    // 수신자가 존재하는지 확인
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      console.log('존재하지 않는 사용자에게 신청 시도:', receiverId);
      return res.status(404).json({ message: '존재하지 않는 사용자입니다.' });
    }

    // 이미 친구 신청이 있는지 확인
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId }
      ]
    });

    if (existingRequest) {
      console.log('이미 존재하는 친구 신청:', existingRequest);
      return res.status(400).json({ message: '이미 친구 신청이 존재합니다.' });
    }

    // 새로운 친구 신청 생성
    const friendRequest = new FriendRequest({
      sender: senderId,
      receiver: receiverId,
    });

    await friendRequest.save();
    console.log('새로운 친구 신청 생성됨:', friendRequest);

    res.status(201).json({
      message: '친구 신청이 전송되었습니다.',
      friendRequest,
    });
  } catch (error) {
    console.error('친구 신청 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export const getFriendRequests = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
    }

    const friendRequests = await FriendRequest.find({
      receiver: userId,
      status: 'pending'
    }).populate('sender', 'name profileImage');

    res.json(friendRequests);
  } catch (error) {
    console.error('친구 신청 목록 조회 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export const respondToFriendRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
    }

    const friendRequest = await FriendRequest.findOne({
      _id: requestId,
      receiver: userId,
      status: 'pending'
    });

    if (!friendRequest) {
      return res.status(404).json({ message: '친구 신청을 찾을 수 없습니다.' });
    }

    friendRequest.status = status;
    await friendRequest.save();

    res.json({
      message: status === 'accepted' ? '친구 신청을 수락했습니다.' : '친구 신청을 거절했습니다.',
      friendRequest
    });
  } catch (error) {
    console.error('친구 신청 응답 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export const getMatchingStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
    }

    // 수락된 친구 신청 수 (성사된 매칭)
    const acceptedMatches = await FriendRequest.countDocuments({
      $or: [
        { sender: userId, status: 'accepted' },
        { receiver: userId, status: 'accepted' }
      ]
    });

    // 대기 중인 친구 신청 수
    const pendingRequests = await FriendRequest.countDocuments({
      receiver: userId,
      status: 'pending'
    });

    // 보낸 친구 신청 중 대기 중인 수
    const sentPendingRequests = await FriendRequest.countDocuments({
      sender: userId,
      status: 'pending'
    });

    res.json({
      acceptedMatches,
      pendingRequests,
      sentPendingRequests
    });
  } catch (error) {
    console.error('매칭 통계 조회 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export const getSentFriendRequests = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      console.log('인증되지 않은 사용자');
      return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
    }

    console.log('보낸 친구 신청 조회 - 사용자 ID:', userId);

    // 먼저 해당 사용자가 보낸 모든 친구 신청을 찾습니다
    const allSentRequests = await FriendRequest.find({
      sender: userId
    });
    console.log('찾은 모든 보낸 친구 신청:', allSentRequests);

    // receiver 정보를 populate합니다
    const sentRequests = await FriendRequest.find({
      sender: userId
    }).populate({
      path: 'receiver',
      select: 'name profileImage',
      model: 'User'
    });

    console.log('Populate된 보낸 친구 신청:', JSON.stringify(sentRequests, null, 2));

    res.json(sentRequests);
  } catch (error) {
    console.error('보낸 친구 신청 목록 조회 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

interface PopulatedUser {
  _id: string;
  name: string;
  profileImage: string;
}

interface PopulatedFriendRequest {
  _id: string;
  sender: PopulatedUser;
  receiver: PopulatedUser;
  updatedAt: Date;
}

interface SentAcceptedRequest {
  _id: string;
  receiver: PopulatedUser;
  updatedAt: Date;
}

interface ReceivedAcceptedRequest {
  _id: string;
  sender: PopulatedUser;
  updatedAt: Date;
}

export const getAcceptedBuddies = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
    }

    console.log('성사된 버디 조회 - 사용자 ID:', userId);

    // 1. 내가 보낸 친구 신청 중 수락된 것 찾기
    const sentAcceptedRequests = await FriendRequest.find({
      sender: userId,
      status: 'accepted'
    }).populate('receiver', 'name profileImage') as SentAcceptedRequest[];

    // 2. 내가 받은 친구 신청 중 수락한 것 찾기
    const receivedAcceptedRequests = await FriendRequest.find({
      receiver: userId,
      status: 'accepted'
    }).populate('sender', 'name profileImage') as ReceivedAcceptedRequest[];

    console.log('내가 보낸 수락된 신청:', JSON.stringify(sentAcceptedRequests, null, 2));
    console.log('내가 받은 수락된 신청:', JSON.stringify(receivedAcceptedRequests, null, 2));

    // 3. 버디 정보 추출
    const buddies = [
      // 내가 보낸 신청이 수락된 경우 -> receiver가 버디
      ...sentAcceptedRequests.map(request => ({
        _id: request.receiver._id,
        name: request.receiver.name,
        profileImage: request.receiver.profileImage,
        matchedAt: request.updatedAt
      })),
      // 내가 받은 신청을 수락한 경우 -> sender가 버디
      ...receivedAcceptedRequests.map(request => ({
        _id: request.sender._id,
        name: request.sender.name,
        profileImage: request.sender.profileImage,
        matchedAt: request.updatedAt
      }))
    ];

    // 4. 중복 제거 (같은 사용자와의 여러 친구 신청이 있을 수 있음)
    const uniqueBuddies = Array.from(
      new Map(buddies.map(buddy => [buddy._id, buddy])).values()
    );

    console.log('최종 버디 목록:', JSON.stringify(uniqueBuddies, null, 2));

    res.json(uniqueBuddies);
  } catch (error) {
    console.error('성사된 버디 목록 조회 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
}; 