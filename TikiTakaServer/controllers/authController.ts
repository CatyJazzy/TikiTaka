import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { EmailVerification } from '../models/EmailVerification';
import { User } from '../models/User';

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
    });

    await user.save();

    res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    res.status(500).json({ message: '회원가입에 실패했습니다.' });
  }
}; 