// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import SkillReducer from './skill-reducer';
import AuthReducer from './auth-reducer';

const rootReducer = combineReducers({
  posts: SkillReducer,
  auth: AuthReducer,
});

export default rootReducer;
