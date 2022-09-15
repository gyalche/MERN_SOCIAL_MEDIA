import mongoose from 'mongoose';

const chatScema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const ChatModel = mongoose.model('Chat', chatScema);
export default ChatModel;
