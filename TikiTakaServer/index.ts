import express from 'express';
import { connectDB } from './db';
import authRouter from './routes/auth';
import matchingRouter from './routes/matching';
import friendRequestRouter from './routes/friendRequest';
import cors from 'cors';
import { networkInterfaces } from 'os';
import userRouter from './routes/user';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// CORS 설정
app.use(cors({
  origin: '*', // 개발 환경에서는 모든 origin 허용
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, MongoDB!');
});

// 인증 라우터 등록
app.use('/auth', authRouter);
// 매칭 라우터 등록
app.use('/matching', matchingRouter);
// 친구 신청 라우터 등록
app.use('/friend-requests', friendRequestRouter);
// 사용자 라우터 등록
app.use('/api/users', userRouter);

// 서버 시작
connectDB().then(() => {
  const server = app.listen(PORT, '0.0.0.0', () => {
    const nets = networkInterfaces();
    const results = Object.values(nets)
      .flat()
      .filter((net) => net && net.family === 'IPv4' && !net.internal)
      .map((net) => net?.address);

    console.log('서버가 다음 IP 주소에서 실행 중입니다:');
    results.forEach(ip => console.log(`- http://${ip}:${PORT}`));
  });
});