import express from 'express';
import { connectDB } from './db';
import authRouter from './routes/auth';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

// CORS 설정
app.use(cors({
  origin: '*', // 모든 origin 임시허용
  credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, MongoDB!');
});

// 인증 라우터 등록
app.use('/api/auth', authRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중`);
  });
});