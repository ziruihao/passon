// MODIFIED FROM SA7
import mongoose, { Schema } from 'mongoose';

// For storing skills and respective users

const Skill = new Schema({
  title: String,
  users: [String],
});

// create model class
const SkillModel = mongoose.model('Skill', Skill);

export default SkillModel;
