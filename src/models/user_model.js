// MODIFIED FROM SA7
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  username: { type: String },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
});

UserSchema.set('toJSON', {
  virtuals: true,
});

const SALT_WORK_FACTOR = 10;

// I based this part on the bcrypt documentation; source: https://www.npmjs.com/package/bcryptjs
// I also referenced this StackOverflow link from the CS52 assignment page for this lab;
// source: https://stackoverflow.com/questions/14588032/mongoose-password-hashing
UserSchema.pre('save', function beforeUserSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  // const model = this;
  const user = this;

  // If old password, don't do anything
  if (!user.isModified('password')) return next();

  // If password modified at all, do this
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);

  user.password = bcrypt.hashSync(user.password, salt);

  // when done run the **next** callback with no arguments
  // call next with an error if you encounter one
  return next();
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    return callback(null, isMatch);
  });
};

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
