import { ActionTypes } from '../actions';

// From assignment page
const initialState = {
  chats: [
    // {
    //   userId: [{
    //     // teach: [],
    //     // learn: [],
    //     _id: '',
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //   }],
    //   messages: [],
    //   _id: '',
    // },
  ],
  curr: '',
};

// This is between the Firebase DB and the actual display
// Central redux store; get the posts from here
// When change posts, also need to update the store (not just the content)
// This updates the store; handles manipulating the state
const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_CHATS:
      console.log(`in reducer, payload: ${action.payload}`);
      return {
        chats: action.payload,
        curr: '',
      };
    default: // Delete post uses fetch post to update central store
      return state;
  }
};

export default ChatReducer;
