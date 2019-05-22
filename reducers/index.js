// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import SkillReducer from './skill-reducer';
import AuthReducer from './auth-reducer';
<<<<<<< HEAD
import ChatReducer from './chat-reducer';
=======
import UserReducer from './user-reducer';
>>>>>>> aa6ef4918060b90e908fbd1fb96fe7b0b7f9fa05

const rootReducer = combineReducers({
  skills: SkillReducer,
  auth: AuthReducer,
<<<<<<< HEAD
  chat: ChatReducer,
=======
  user: UserReducer,
>>>>>>> aa6ef4918060b90e908fbd1fb96fe7b0b7f9fa05
});

export default rootReducer;
