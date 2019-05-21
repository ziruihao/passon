// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import PostReducer from './post-reducer';
import AuthReducer from './auth-reducer';
import TeachSkillReducer from './skill-reducer-teach';
import LearnSkillReducer from './skill-reducer-learn';

const rootReducer = combineReducers({
  posts: PostReducer,
  auth: AuthReducer,
  teaches: TeachSkillReducer,
  learns: LearnSkillReducer,
});

export default rootReducer;
