import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { User } from '../models/User';

// 매칭 우선순위 설정 업데이트
export const updatePreferences = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
    }

    const userId = req.user.userId;
    const { genderPreference, priority } = req.body;

    console.log('매칭 우선순위 설정 요청:', {
      userId,
      genderPreference,
      priority
    });

    if (!['same', 'any'].includes(genderPreference)) {
      console.log('잘못된 genderPreference 값:', genderPreference);
      return res.status(400).json({ message: 'genderPreference 값이 올바르지 않습니다.' });
    }
    if (!['language', 'activity'].includes(priority)) {
      console.log('잘못된 priority 값:', priority);
      return res.status(400).json({ message: 'priority 값이 올바르지 않습니다.' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { genderPreference, priority },
      { 
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      console.log('매칭 우선순위 설정 실패:', userId);
      return res.status(500).json({ message: '매칭 우선순위 설정에 실패했습니다.' });
    }

    console.log('매칭 우선순위 설정 성공:', {
      userId,
      genderPreference: user.genderPreference,
      priority: user.priority
    });

    res.json({
      message: '매칭 우선순위 설정이 저장되었습니다.',
      preferences: {
        genderPreference: user.genderPreference,
        priority: user.priority,
      },
    });
  } catch (error) {
    console.error('매칭 우선순위 설정 중 오류 발생:', {
      error: error instanceof Error ? error.message : '알 수 없는 오류',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'UnknownError'
    });
    res.status(500).json({ 
      message: '서버 오류', 
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    });
  }
};

// 매칭 우선순위 조회
export const getPreferences = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
    }

    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    res.json({
      genderPreference: user.genderPreference,
      priority: user.priority
    });
  } catch (error) {
    console.error('매칭 우선순위 조회 중 오류 발생:', error);
    res.status(500).json({ message: '매칭 우선순위 조회에 실패했습니다.' });
  }
}; 