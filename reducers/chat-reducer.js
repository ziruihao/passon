import { ActionTypes } from '../actions';

// From assignment page
const initialState = {
  chats: [
  ],
  curr: null,
};

// This is between the Firebase DB and the actual display
// Central redux store; get the posts from here
// When change posts, also need to update the store (not just the content)
// This updates the store; handles manipulating the state
const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_CHATS:
      return Object.assign({}, state, {
        chats: action.payload,
      });
    case ActionTypes.GET_CHAT:
      return Object.assign({}, state, {
        curr: action.payload,
      });
    default: // Delete post uses fetch post to update central store
      return state;
  }
};

export default ChatReducer;
