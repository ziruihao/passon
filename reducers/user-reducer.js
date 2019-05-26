import { ActionTypes } from '../actions';

// From assignment page
const initialState = {
  all: [
    {
      firstName: 'yayyyyy',
      lastName: 'wooh',
      email: 'yee',
      password: '',
      teach: 'woot',
      learn: 'hi',
      profile_pic_url: 'world',
      rating: 'q',
      university: 'q',
      id: 'will be autogenerated',
      // profile_pic_url:
    },
  ],
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
    case ActionTypes.FETCH_USERS:
      return Object.assign({}, state, {
        all: action.payload,
      });
    case ActionTypes.FETCH_SELF:
      console.log(`CHANGING THE STATE RIGHT NOW for self${action.payload}`);
      return Object.assign({}, state, {
        self: action.payload,
      });
    default: // Delete post uses fetch post to update central store
      return state;
  }
};

export default UserReducer;
