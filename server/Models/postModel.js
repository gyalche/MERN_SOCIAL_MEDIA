import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: String,
    likes: [],
    createdAt: { type: Date, default: new Date() },
    image: String,
  },
  { timestamps: true }
);

var postModel = mongoose.model('posts', postSchema);
export default postModel;
