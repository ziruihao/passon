import mongoose, { Schema } from 'mongoose';

// For storing skills and respective users

const SkillSchema = new Schema({
  title: String,
  user: String,
  years: Number,
  bio: String,
  ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
}, {
  toJSON: {
    virtuals: true,
  },
});

SkillSchema.virtual('avg_rating').get(function calc() {
  let sum = 0;
  let count = 0;
  this.ratings.forEach((rating) => {
    count += 1;
    sum += rating.score;
  });
  return sum / count;
});

const SkillModel = mongoose.model('Skill', SkillSchema);
export default SkillModel;
