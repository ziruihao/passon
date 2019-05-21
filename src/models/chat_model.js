import mongoose, { Schema } from 'mongoose';

const ChatSchema = new Schema({
  userId: [{ type: Schema.Types.ObjectId, ref: 'User' }], // each chat belongs to 2 users
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
}, {
  toJSON: {
    virtuals: true,
  },
});

const ChatModel = mongoose.model('Chat', ChatSchema);

export default ChatModel;
