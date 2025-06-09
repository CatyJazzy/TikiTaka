import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  birthYear: {
    type: String,
    required: true,
  },
  birthMonth: {
    type: String,
    required: true,
  },
  birthDay: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  otherGender: String,
  primaryLanguage: {
    type: String,
    required: true,
  },
  targetLanguage: {
    type: String,
    required: true,
  },
  canSpeakEnglish: {
    type: Boolean,
    default: false,
  },
  activities: [{
    type: String,
  }],
  otherActivity: String,
  profileImage: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  portalImage: String,
  genderPreference: {
    type: String,
    enum: ['same', 'any']
  },
  priority: {
    type: String,
    enum: ['language', 'activity']
  },
  age: {
    type: Number,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  preferredActivities: [{
    type: String
  }],
  languages: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 비밀번호 해싱 미들웨어
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// 비밀번호 검증 메서드
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema); 