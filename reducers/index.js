// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import SkillReducer from './skill-reducer';
import AuthReducer from './auth-reducer';
import ChatReducer from './chat-reducer';

const rootReducer = combineReducers({
  skills: SkillReducer,
  auth: AuthReducer,
  chat: ChatReducer,
});

export default rootReducer;
