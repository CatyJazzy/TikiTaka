import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { EmailVerification } from '../models/EmailVerification';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/auth';

// 이메일 전송을 위한 transporter 설정
const transporter = nodemailer.createTransport({
  host: 'smtp.naver.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// transporter 연결 테스트
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP 서버 연결 실패:', error);
  } else {
    console.log('SMTP 서버 연결 성공');
  }
});

// 인증 코드 생성 함수
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendVerificationEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    console.log('이메일 인증 요청:', { email });

    if (!email) {
      console.log('이메일 누락');
      res.status(400).json({ message: '이메일이 필요합니다.' });
      return;
    }

    const verificationCode = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10분 후 만료

    console.log('인증 정보 저장 시도:', { email, expiresAt });

    // 인증 정보 저장
    try {
      await EmailVerification.findOneAndUpdate(
        { email },
        {
          email,
          code: verificationCode,
          expiresAt,
        },
        { upsert: true, new: true }
      );
      console.log('인증 정보 저장 성공');
    } catch (dbError) {
      console.error('인증 정보 저장 실패:', dbError);
      throw dbError;
    }

    console.log('이메일 전송 시도:', { to: email });

    // 이메일 전송
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'TikiTaka 이메일 인증',
        html: `
          <h1>TikiTaka 이메일 인증</h1>
          <p>아래의 인증 코드를 입력해주세요:</p>
          <h2>${verificationCode}</h2>
          <p>이 인증 코드는 10분 후에 만료됩니다.</p>
        `,
      });
      console.log('이메일 전송 성공');
    } catch (emailError) {
      console.error('이메일 전송 실패:', emailError);
      throw emailError;
    }

    res.status(200).json({ message: '인증 이메일이 전송되었습니다.' });
  } catch (error) {
    console.error('이메일 전송 중 오류 발생:', {
      error: error instanceof Error ? error.message : '알 수 없는 오류',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'UnknownError'
    });
    res.status(500).json({ 
      message: '이메일 전송에 실패했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    });
  }
};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      res.status(400).json({ message: '이메일과 인증 코드가 필요합니다.' });
      return;
    }

    const verification = await EmailVerification.findOne({ email });

    if (!verification) {
      res.status(404).json({ message: '인증 정보를 찾을 수 없습니다.' });
      return;
    }

    if (verification.code !== code) {
      res.status(400).json({ message: '잘못된 인증 코드입니다.' });
      return;
    }

    if (verification.expiresAt < new Date()) {
      res.status(400).json({ message: '인증 코드가 만료되었습니다.' });
      return;
    }

    // 인증 성공 시 인증 정보 삭제
    await EmailVerification.deleteOne({ email });

    res.status(200).json({ message: '이메일 인증이 완료되었습니다.' });
  } catch (error) {
    console.error('이메일 인증 중 오류 발생:', error);
    res.status(500).json({ message: '이메일 인증에 실패했습니다.' });
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      email,
      password,
      name,
      birthYear,
      birthMonth,
      birthDay,
      gender,
      otherGender,
      primaryLanguage,
      targetLanguage,
      canSpeakEnglish,
      activities,
      otherActivity,
      profileImage,
      portalImage,
    } = req.body;

    // 필수 필드 검증
    if (!email || !password || !name || !birthYear || !birthMonth || !birthDay || !gender || !primaryLanguage || !targetLanguage) {
      res.status(400).json({ message: '모든 필수 정보를 입력해주세요.' });
      return;
    }

    // 이메일 중복 검사
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: '이미 등록된 이메일입니다.' });
      return;
    }

    // 새 사용자 생성
    const user = new User({
      email,
      password,
      name,
      birthYear,
      birthMonth,
      birthDay,
      gender,
      otherGender,
      primaryLanguage,
      targetLanguage,
      canSpeakEnglish,
      activities,
      otherActivity,
      profileImage,
      portalImage,
      age: new Date().getFullYear() - parseInt(birthYear),
      languages: [primaryLanguage, targetLanguage],
    });

    await user.save();

    res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    res.status(500).json({ message: '회원가입에 실패했습니다.' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 이메일로 사용자 찾기
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('로그인 에러:', error);
    res.status(500).json({ message: '로그인 중 오류가 발생했습니다.' });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
    }

    const userId = req.user.userId;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    res.json(user);
  } catch (error) {
    console.error('사용자 정보 조회 중 오류 발생:', error);
    res.status(500).json({ message: '사용자 정보를 가져오는데 실패했습니다.' });
  }
};

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
        runValidators: true,
        context: 'query'
      }
    ).select('-password');

    if (!user) {
      console.log('사용자를 찾을 수 없음:', userId);
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
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