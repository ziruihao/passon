// MODIFIED FROM SA7
// NOT NEEDED FOR OUR PROJECT
import mongoose, { Schema } from 'mongoose';

const RatingSchema = new Schema({
  score: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const RatingModel = mongoose.model('Rating', RatingSchema);

export default RatingModel;
