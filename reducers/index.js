// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import PostReducer from './post-reducer';
import AuthReducer from './auth-reducer';

const rootReducer = combineReducers({
  posts: PostReducer,
  auth: AuthReducer,
});

export default rootReducer;
