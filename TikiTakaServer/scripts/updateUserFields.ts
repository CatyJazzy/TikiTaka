import mongoose from 'mongoose';
import { User } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

async function updateUserFields() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tikitaka');

    const users = await User.find({});
    console.log(`총 ${users.length}명의 사용자를 업데이트합니다.`);

    for (const user of users) {
      const updates: any = {};

      // age 업데이트
      if (!user.age && user.birthYear) {
        updates.age = new Date().getFullYear() - parseInt(user.birthYear);
      }

      // languages 업데이트
      if (!user.languages || user.languages.length === 0) {
        updates.languages = [user.primaryLanguage, user.targetLanguage];
      }

      if (Object.keys(updates).length > 0) {
        await User.findByIdAndUpdate(user._id, updates);
        console.log(`사용자 ${user.name} 업데이트 완료`);
      }
    }

    console.log('모든 사용자 업데이트가 완료되었습니다.');
  } catch (error) {
    console.error('업데이트 중 오류 발생:', error);
  } finally {
    await mongoose.disconnect();
  }
}

updateUserFields(); 