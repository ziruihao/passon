import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  text: String,
  createdAt: Date,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  chatId: { type: Schema.Types.ObjectId, ref: 'Chat' },
}, {
  toJSON: {
    virtuals: true,
  },
});

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;
