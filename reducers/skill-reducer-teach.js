import { ActionTypes } from '../actions';

// From assignment page
const initialState = {
  all: [],
  current: '',
};

// This is between the Firebase DB and the actual display
// Central redux store; get the posts from here
// When change posts, also need to update the store (not just the content)
// This updates the store; handles manipulating the state
const LearnSkillReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_LEARNS:
      return Object.assign({}, state, {
        all: action.payload,
      });
    case ActionTypes.FETCH_LEARN:
      return Object.assign({}, state, {
        current: action.payload,
      });
    default: // Delete post uses fetch post to update central store
      return state;
  }
};

export default LearnSkillReducer;
