import { Request, Response } from 'express';
import { User } from '../models/User';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .select('name profileImage age bio preferredActivities activities primaryLanguage targetLanguage birthYear')
      .lean();

    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // activities가 없는 경우 preferredActivities를 사용
    if (!user.activities && user.preferredActivities) {
      user.activities = user.preferredActivities;
    }

    // age가 없는 경우 birthYear로 계산
    if (!user.age && user.birthYear) {
      user.age = new Date().getFullYear() - parseInt(user.birthYear);
    }

    res.json(user);
  } catch (error) {
    console.error('사용자 프로필 조회 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
}; 