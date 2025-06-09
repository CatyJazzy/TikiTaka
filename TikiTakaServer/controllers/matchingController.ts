import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { User } from '../models/User';
import { FriendRequest } from '../models/FriendRequest';

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

    // 현재 사용자 정보 조회
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 성별 선호도에 따른 필터링
    let genderFilter = {};
    if (currentUser.genderPreference === 'same') {
      genderFilter = { gender: currentUser.gender };
    }

    // 현재 사용자를 제외한 모든 사용자 조회
    const potentialMatches = await User.find({
      _id: { $ne: userId },
      ...genderFilter
    });

    // 매칭 점수 계산
    const matchesWithScores: MatchScore[] = potentialMatches.map(match => {
      let score = 0;
      let languageScore = 0;
      let hasLanguageMatch = false;
      let hasActivityMatch = false;

      // 언어 매칭 점수
      if (match.targetLanguage === currentUser.targetLanguage) {
        if (currentUser.priority === 'language') {
          languageScore += 50;
        } else {
          languageScore += 30;
        }
        hasLanguageMatch = true;
      } else {
        if (match.primaryLanguage === currentUser.targetLanguage) {
          if (currentUser.priority === 'language') {
            languageScore += 30;
          } else {
            languageScore += 18;
          }
          hasLanguageMatch = true;
        }
        if (currentUser.primaryLanguage === match.targetLanguage) {
          if (currentUser.priority === 'language') {
            languageScore += 20;
          } else {
            languageScore += 12;
          }
          hasLanguageMatch = true;
        }
      }
      score += languageScore;

      // 활동 매칭 점수
      const commonActivities = currentUser.activities.filter(activity => 
        match.activities.includes(activity)
      );
      let activityScore = 0;
      if (commonActivities.length > 0) {
        if (currentUser.priority === 'language') {
          activityScore = 30 * commonActivities.length;
        } else {
          activityScore = 40 * commonActivities.length;
        }
        activityScore = Math.min(activityScore, 100);
        score += activityScore;
        hasActivityMatch = true;
      }

      if (hasLanguageMatch || hasActivityMatch) {
        score = Math.max(score, 40);
      }

      const maxScore = languageScore + 100;

      return {
        user: {
          id: match._id,
          name: match.name,
          age: new Date().getFullYear() - parseInt(match.birthYear),
          gender: match.gender,
          primaryLanguage: match.primaryLanguage,
          targetLanguage: match.targetLanguage,
          activities: match.activities,
          profileImage: match.profileImage,
          canSpeakEnglish: match.canSpeakEnglish
        },
        score,
        maxScore
      };
    });

    // 점수순으로 정렬하고 상위 3개 선택
    let topMatches = matchesWithScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(match => ({
        ...match.user,
        matchScore: Math.round((match.score / match.maxScore) * 100)
      }));

    console.log('기본 매칭 결과:', {
      count: topMatches.length,
      matches: topMatches.map(m => ({ id: m.id, name: m.name, score: m.matchScore }))
    });

    // 매칭된 버디가 3명 미만인 경우, 영어 가능 여부가 일치하는 사용자를 추가
    if (topMatches.length < 3) {
      const remainingSlots = 3 - topMatches.length;
      const existingMatchIds = new Set(topMatches.map(match => match.id));

      // 이미 매칭된 사용자를 제외하고 영어 가능 여부가 일치하는 사용자 필터링
      const englishMatches = potentialMatches
        .filter(match => 
          !existingMatchIds.has(match._id.toString()) && 
          match.canSpeakEnglish === currentUser.canSpeakEnglish
        )
        .map(match => ({
          id: match._id,
          name: match.name,
          age: new Date().getFullYear() - parseInt(match.birthYear),
          gender: match.gender,
          primaryLanguage: match.primaryLanguage,
          targetLanguage: match.targetLanguage,
          activities: match.activities,
          profileImage: match.profileImage,
          canSpeakEnglish: match.canSpeakEnglish,
          matchScore: 30 // 기본 매칭 점수 부여
        }))
        .slice(0, remainingSlots); // 남은 자리만큼만 선택

      console.log('영어 매칭 결과:', {
        count: englishMatches.length,
        matches: englishMatches.map(m => ({ id: m.id, name: m.name }))
      });

      if (englishMatches.length > 0) {
        topMatches = [...topMatches, ...englishMatches];
      }
    }

    res.json({
      message: '매칭 우선순위 설정이 저장되었습니다.',
      preferences: {
        genderPreference: user.genderPreference,
        priority: user.priority,
      },
      matches: topMatches
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

interface MatchScore {
  user: any;
  score: number;
  maxScore: number;
}

export const getMatches = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
    }

    const userId = req.user.userId;
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 거절된 친구 신청 목록 조회
    const rejectedRequests = await FriendRequest.find({
      $or: [
        { sender: userId, status: 'rejected' },
        { receiver: userId, status: 'rejected' }
      ]
    });

    // 거절된 사용자 ID 목록 생성
    const rejectedUserIds = rejectedRequests.map(request => 
      request.sender.toString() === userId ? request.receiver : request.sender
    );

    console.log('현재 사용자 정보:', {
      id: currentUser._id,
      gender: currentUser.gender,
      genderPreference: currentUser.genderPreference,
      priority: currentUser.priority,
      primaryLanguage: currentUser.primaryLanguage,
      targetLanguage: currentUser.targetLanguage,
      activities: currentUser.activities,
      canSpeakEnglish: currentUser.canSpeakEnglish
    });

    // 성별 선호도에 따른 필터링
    let genderFilter = {};
    if (currentUser.genderPreference === 'same') {
      genderFilter = { gender: currentUser.gender };
    }

    // 현재 사용자를 제외하고, 거절된 사용자도 제외
    const potentialMatches = await User.find({
      _id: { 
        $ne: userId,
        $nin: rejectedUserIds
      },
      ...genderFilter
    });

    console.log('필터링된 잠재적 매칭 수:', potentialMatches.length);
    console.log('거절된 사용자 수:', rejectedUserIds.length);

    // 매칭 점수 계산
    const matchesWithScores: MatchScore[] = potentialMatches.map(match => {
      let score = 0;
      let languageScore = 0;
      let hasLanguageMatch = false;
      let hasActivityMatch = false;

      // 언어 매칭 점수
      if (match.targetLanguage === currentUser.targetLanguage) {
        if (currentUser.priority === 'language') {
          languageScore += 50;
        } else {
          languageScore += 30;
        }
        hasLanguageMatch = true;
      } else {
        if (match.primaryLanguage === currentUser.targetLanguage) {
          if (currentUser.priority === 'language') {
            languageScore += 30;
          } else {
            languageScore += 18;
          }
          hasLanguageMatch = true;
        }
        if (currentUser.primaryLanguage === match.targetLanguage) {
          if (currentUser.priority === 'language') {
            languageScore += 20;
          } else {
            languageScore += 12;
          }
          hasLanguageMatch = true;
        }
      }
      score += languageScore;

      // 활동 매칭 점수
      const commonActivities = currentUser.activities.filter(activity => 
        match.activities.includes(activity)
      );
      let activityScore = 0;
      if (commonActivities.length > 0) {
        if (currentUser.priority === 'language') {
          activityScore = 30 * commonActivities.length;
        } else {
          activityScore = 40 * commonActivities.length;
        }
        activityScore = Math.min(activityScore, 100);
        score += activityScore;
        hasActivityMatch = true;
      }

      if (hasLanguageMatch || hasActivityMatch) {
        score = Math.max(score, 40);
      }

      const maxScore = languageScore + 100;

      return {
        user: {
          id: match._id,
          name: match.name,
          age: new Date().getFullYear() - parseInt(match.birthYear),
          gender: match.gender,
          primaryLanguage: match.primaryLanguage,
          targetLanguage: match.targetLanguage,
          activities: match.activities,
          profileImage: match.profileImage,
          canSpeakEnglish: match.canSpeakEnglish
        },
        score,
        maxScore
      };
    });

    // 점수순으로 정렬하고 상위 3개 선택
    const topMatches = matchesWithScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(match => ({
        ...match.user,
        matchScore: Math.round((match.score / match.maxScore) * 100)
      }));

    console.log('매칭 결과:', {
      count: topMatches.length,
      matches: topMatches.map(m => ({ id: m.id, name: m.name, score: m.matchScore }))
    });

    res.json(topMatches);
  } catch (error) {
    console.error('매칭 처리 중 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
}; 