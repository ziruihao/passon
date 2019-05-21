import mongoose, { Schema } from 'mongoose';
// import Rating from './rating_model';


// For storing skills and respective users

const SkillSchema = new Schema({
  title: String,
  years: Number,
  bio: String,
  ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
}, {
  toJSON: {
    virtuals: true,
  },
});

// SkillSchema.virtual('avg_rating').get(function calc() {
//   let sum = 0;
//   let count = 0;
//   this.ratings.forEach((rating) => {
//     rating = new Rating(); // this is manual population to create the virtual
//     count += 1;
//     sum += rating.score;
//   });
//   return sum / count;
// });

const SkillModel = mongoose.model('Skill', SkillSchema);
export default SkillModel;
