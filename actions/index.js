import axios from 'axios/index';
import { AsyncStorage } from 'react-native';
// From assignment page
export const ActionTypes = {
  // signin or signup
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  SAVE_USER: 'SAVE_USER',

  // getting users
  FETCH_USER: 'FETCH_USER',
  FETCH_USERS: 'FETCH_USERS',
  FETCH_SELF: 'FETCH_SELF',

  // chats
  GET_CHATS: 'GET_CHATS',

};

// From assignment page
const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://sulljohn-cs52-blog.herokuapp.com/api';
// const API_KEY = '?key=j_sullivan';

export function addLearn(skill) {
  return async (dispatch) => {
    axios.post(`${ROOT_URL}/learn`, skill).then((response) => {
      console.log(response.data);
    })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function addTeach(skill) {
  return async (dispatch) => {
    axios.post(`${ROOT_URL}/teach`, skill).then((response) => {
      console.log(response.data);
    })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updateLearn(skill) {
  return async (dispatch) => {
    axios.put(`${ROOT_URL}/learn`, skill).then((response) => {
      console.log(response.data);
    })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updateTeach(skill) {
  return async (dispatch) => {
    axios.put(`${ROOT_URL}/teach`, skill).then((response) => {
      console.log(response.data);
    })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function deleteLearn(id) {
  return async (dispatch) => {
    axios.delete(`${ROOT_URL}/learn`, { data: { id } }).then((response) => {
      console.log(response.data);
    })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function deleteTeach(id) {
  return async (dispatch) => {
    axios.delete(`${ROOT_URL}/teach`, { data: { id } }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log('ERRRRRRRRRRRRR');
      console.log(error.message);
    });
  };
}

export function fetchUser(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users/${id}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function fetchUsers(id) {
  return (dispatch) => {
    // console.log('================================================================================================================================================================');
    axios.get(`${ROOT_URL}/users`)
      .then((response) => {
        // eslint-disable-next-line max-len
        dispatch({ type: ActionTypes.FETCH_USERS, payload: response.data });
      })
      .catch((error) => {
        // eslint-disable-next-line max-len
        // console.log('f+_++__++++++++++++++++++++++f+_++__++++++++++++++++++++++f+_++__++++++++++++++++++++++f+_++__++++++++++++++++++++++f+_++__++++++++++++++++++++++f+_++__++++++++++++++++++++++f+_++__++++++++++++++++++++++f+_++__++++++++++++++++++++++f+_++__++++++++++++++++++++++f+_++__++++++++++++++++++++++');
        console.log(error);
      });
  };
}

export function fetchSelf() {
  return async (dispatch) => {
    axios.get(`${ROOT_URL}/self`)
      .then((response) => {
        dispatch({ type: ActionTypes.SAVE_USER, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updateUser(id, post) {
  return async (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, post)
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function deleteUser(id, history) {
  return async (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`)
      .then(() => {
        dispatch({ type: ActionTypes.UPDATE_POST, payload: null });
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ email, password }) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signin endpoint
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));

  // const token = await AsyncStorage.getItem('token');

  return (dispatch) => {
    // axios.post(`${ROOT_URL}/posts`, post)
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(async (response) => {
        await dispatch({ type: ActionTypes.AUTH_USER, payload: response.data.token });
        await AsyncStorage.setItem('token', response.data.token);
        axios.defaults.headers.common = { authorization: response.data.token };
        await dispatch({ type: ActionTypes.SAVE_USER, payload: response.data.user });
      })
      .catch((error) => {
        dispatch(authError(`Sign In Failed: ${error.data}`));
      });
  };
}

export function signupUser({
  firstName, lastName, email, password, university,
}) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));

  return (dispatch) => {
    // axios.post(`${ROOT_URL}/posts`, post)
    axios.post(`${ROOT_URL}/signup`, {
      firstName, lastName, email, password, university,
    })
      .then(async (response) => {
        await dispatch({ type: ActionTypes.AUTH_USER, payload: response.data.token });
        await AsyncStorage.setItem('token', response.data.token);
        axios.defaults.headers.common = { authorization: response.data.token };
        await dispatch({ type: ActionTypes.SAVE_USER, payload: response.data.user });
        // history.push('/');
      })
      .catch((error) => {
        dispatch(authError(`Sign Up Failed: ${error}`));
      });
  };
}


// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return async (dispatch) => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}

// TODO
export function fetchChats() {
  return async (dispatch) => {
    const value = await AsyncStorage.getItem('token');
    axios.get(`${ROOT_URL}/messaging`, { headers: { authorization: value } })
      .then((response) => {
        dispatch({ type: ActionTypes.GET_CHATS, payload: response.data });
      })
      .catch((error) => {
      //  console.log(error);
      });
  };
}

export function createChat(chat) {
  return async (dispatch) => {
    const value = await AsyncStorage.getItem('token');
    axios.post(`${ROOT_URL}/messaging`, chat, { headers: { authorization: value } })
      .then((response) => {
        dispatch({ type: ActionTypes.CREATE_CHAT, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

// export function saveMessage(message) {
//   return async (dispatch) => {
//     const value = await AsyncStorage.getItem('token');
//     axios.post(`${ROOT_URL}/messaging`, chat, { headers: { authorization: value } })
//       .then((response) => {
//         dispatch({ type: ActionTypes.CREATE_CHAT, payload: response.data });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// }
