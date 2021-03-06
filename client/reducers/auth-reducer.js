import { ActionTypes } from '../actions';

// From assignment page
const initialState = {
  token: '',
  authenticated: false,
  error: '',
};

// This is between the Firebase DB and the actual display
// Central redux store; get the posts from here
// When change posts, also need to update the store (not just the content)
// This updates the store; handles manipulating the state
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return Object.assign({}, state, {
        token: action.payload,
        authenticated: true,
      });
    case ActionTypes.DEAUTH_USER:
      return Object.assign({}, state, {
        token: '',
        authenticated: false,
      });
    case ActionTypes.AUTH_ERROR:
      return Object.assign({}, state, {
        token: '',
        authenticated: false,
        error: action.message,
      });
    default: // Delete post uses fetch post to update central store
      return state;
  }
};

export default AuthReducer;
