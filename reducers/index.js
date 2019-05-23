// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import ChatReducer from './chat-reducer';
import TeachSkillReducer from './skill-reducer-teach';
import LearnSkillReducer from './skill-reducer-learn';
import UserReducer from './user-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  chat: ChatReducer,
  teaches: TeachSkillReducer,
  learns: LearnSkillReducer,
  user: UserReducer,
});

export default rootReducer;
