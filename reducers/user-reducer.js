import { ActionTypes } from '../actions';

// From assignment page
const initialState = {
  // all: [],
  teachers: [],
  learners: [],
  both: [],
  current: null,
  self: null,
};

// This is between the Firebase DB and the actual display
// Central redux store; get the posts from here
// When change posts, also need to update the store (not just the content)
// This updates the store; handles manipulating the state
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      return Object.assign({}, state, {
        current: action.payload,
      });
    case ActionTypes.SAVE_USER:
      return Object.assign({}, state, {
        self: action.payload,
      });
    case ActionTypes.SAVE_TEACHERS:
      return Object.assign({}, state, {
        teachers: action.payload,
      });
    case ActionTypes.SAVE_LEARNERS:
      return Object.assign({}, state, {
        learners: action.payload,
      });
    default: // Delete post uses fetch post to update central store
      return state;
  }
};

export default UserReducer;
