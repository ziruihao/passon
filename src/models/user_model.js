/* eslint-disable prefer-arrow-callback */
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
// import Skill from './skill_model';

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  teach: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
  learn: [{ type: Schema.Types.ObjectId, ref: 'Skill' }], // this skill model should have less info than the [teach] one, ONLY populate [title].
  profile_pic_url: String,
  university: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

/**
 * Calculates the [avg_rating] virtual based on all the [rating]s of each [skill] the [user] has.
 */
UserSchema.virtual('avg_rating').get(function calc() {
  const sum = 0;
  const count = 0;
  // this.teach.forEach((skill) => {
  //   skill.ratings.forEach((rating) => {
  //     count += 1;
  //     sum += rating.score;
  //   });
  // });
  return sum / count;
});


/**
 * Authentication
 */

const SALT_WORK_FACTOR = 10;

// I based this part on the bcrypt documentation; source: https://www.npmjs.com/package/bcryptjs
// I also referenced this StackOverflow link from the CS52 assignment page for this lab;
// source: https://stackoverflow.com/questions/14588032/mongoose-password-hashing
UserSchema.pre('save', function beforeUserSave(next) {
  const user = this;

  // this route will only be called if the user is just changing email or name
  if (!user.isModified('password')) return next();

  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);

  user.password = bcrypt.hashSync(user.password, salt);

  return next();
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    return callback(null, isMatch);
  });
};

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
