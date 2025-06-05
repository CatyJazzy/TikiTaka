import { Schema, model, Document } from 'mongoose';

export interface IFriendRequest extends Document {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const friendRequestSchema = new Schema<IFriendRequest>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// 중복 신청 방지를 위한 복합 인덱스
friendRequestSchema.index({ sender: 1, receiver: 1 }, { unique: true });

export const FriendRequest = model<IFriendRequest>('FriendRequest', friendRequestSchema); 