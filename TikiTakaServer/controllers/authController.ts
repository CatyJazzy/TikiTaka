import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { EmailVerification } from '../models/EmailVerification';

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

// 인증 코드 생성 함수
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendVerificationEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: '이메일이 필요합니다.' });
      return;
    }

    const verificationCode = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10분 후 만료

    // 인증 정보 저장
    await EmailVerification.findOneAndUpdate(
      { email },
      {
        email,
        code: verificationCode,
        expiresAt,
      },
      { upsert: true, new: true }
    );

    // 이메일 전송
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

    res.status(200).json({ message: '인증 이메일이 전송되었습니다.' });
  } catch (error) {
    console.error('이메일 전송 중 오류 발생:', error);
    res.status(500).json({ message: '이메일 전송에 실패했습니다.' });
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