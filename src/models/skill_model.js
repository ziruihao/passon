// MODIFIED FROM SA7
// NOT NEEDED FOR OUR PROJECT
import mongoose, { Schema } from 'mongoose';

const SkillSchema = new Schema({
  title: String,
  description: String,
});

const SkillModel = mongoose.model('Skill', SkillSchema);

export default SkillModel;
