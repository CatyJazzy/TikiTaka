import express from 'express';
import { connectDB } from './db';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, MongoDB!');
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중`);
  });
});