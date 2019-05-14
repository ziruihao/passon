// MODIFIED FROM SA7
import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  content: String,
  tags: String,
  cover_url: String,
  author: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

// create model class
const PostModel = mongoose.model('Posts', PostSchema);

export default PostModel;
