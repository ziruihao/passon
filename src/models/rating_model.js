import mongoose, { Schema } from 'mongoose';

const RatingSchema = new Schema({
  score: Number,
  // user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  toJSON: {
    virtuals: true,
  },
});

const RatingModel = mongoose.model('Rating', RatingSchema);

export default RatingModel;
