// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import PostReducer from './post-reducer';
import AuthReducer from './auth-reducer';
import SkillReducer from './skill-reducer';

const rootReducer = combineReducers({
  posts: PostReducer,
  auth: AuthReducer,
  skills: SkillReducer,
});

export default rootReducer;
