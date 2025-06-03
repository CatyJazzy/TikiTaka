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

    // 현재 사용자를 제외한 모든 사용자 조회
    const potentialMatches = await User.find({
      _id: { $ne: userId },
      ...genderFilter
    });

    console.log('필터링된 잠재적 매칭 수:', potentialMatches.length);

    // 매칭 점수 계산 (사진 기준)
    const matchesWithScores: MatchScore[] = potentialMatches.map(match => {
      let score = 0;
      let languageScore = 0;
      let hasLanguageMatch = false;
      let hasActivityMatch = false;

      // 언어 매칭 점수
      if (match.targetLanguage === currentUser.targetLanguage) {
        // 내 교류언어 == 상대 교류언어
        if (currentUser.priority === 'language') {
          languageScore += 50;
        } else {
          languageScore += 30;
        }
        hasLanguageMatch = true;
      } else {
        // 내 교류언어 != 상대 교류언어
        if (match.primaryLanguage === currentUser.targetLanguage) {
          // 상대 모국어 == 내 교류언어
          if (currentUser.priority === 'language') {
            languageScore += 30;
          } else {
            languageScore += 18;
          }
          hasLanguageMatch = true;
        }
        if (currentUser.primaryLanguage === match.targetLanguage) {
          // 내 모국어 == 상대 교류언어
          if (currentUser.priority === 'language') {
            languageScore += 20;
          } else {
            languageScore += 12;
          }
          hasLanguageMatch = true;
        }
      }
      score += languageScore;

      // 활동 매칭 점수 (공통 활동 개수만큼 누적, 최대 100점)
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
        activityScore = Math.min(activityScore, 100); // 최대 100점 제한
        score += activityScore;
        hasActivityMatch = true;
      }

      // 최소한의 매칭 조건을 만족하면 기본 점수 보장 (사진에는 없으나 기존 로직 유지)
      if (hasLanguageMatch || hasActivityMatch) {
        score = Math.max(score, 40);
      }

      // maxScore: 실제 부여된 언어점수 + 100
      const maxScore = languageScore + 100;

      console.log('매칭 점수 계산:', {
        matchId: match._id,
        matchName: match.name,
        score,
        languageScore,
        activityScore,
        maxScore,
        hasLanguageMatch,
        hasActivityMatch,
        commonActivities: commonActivities.length,
        languageMatch: {
          myPrimary: currentUser.primaryLanguage,
          myTarget: currentUser.targetLanguage,
          theirPrimary: match.primaryLanguage,
          theirTarget: match.targetLanguage
        }
      });

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

    // 매칭된 버디가 없고, 영어 가능 여부가 일치하는 사용자가 있는 경우
    if (topMatches.length === 0) {
      const englishMatches = potentialMatches
        .filter(match => match.canSpeakEnglish === currentUser.canSpeakEnglish)
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
        .slice(0, 3); // 최대 3명까지 선택

      console.log('영어 매칭 결과:', {
        count: englishMatches.length,
        matches: englishMatches.map(m => ({ id: m.id, name: m.name }))
      });

      if (englishMatches.length > 0) {
        topMatches = englishMatches;
      }
    }

    res.json(topMatches);
  } catch (error) {
    console.error('매칭 처리 중 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
}; 