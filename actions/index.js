import axios from 'axios/index';
import { AsyncStorage } from 'react-native';

// From assignment page
export const ActionTypes = {
  FETCH_SKILLS: 'FETCH_SKILLS',
  FETCH_SKILL: 'FETCH_SKILL',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  UPDATE_SKILL: 'UPDATE_SKILL',
  FETCH_USER: 'FETCH_USER',
  FETCH_SELF: 'FETCH_SELF',

  // Old actions
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_POST: 'FETCH_POST',
  UPDATE_POST: 'UPDATE_POST', // There are more steps than just using fetch_post (and possibly another command) to do this
  CREATE_POST: 'CREATE_POST',
  DELETE_POST: 'DELETE_POST',
};

// From assignment page
const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://sulljohn-cs52-blog.herokuapp.com/api';
// const API_KEY = '?key=j_sullivan';

// // From assignment page
export function fetchSkills() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/skills`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_SKILLS, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function fetchSkill(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/skills/${id}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_SKILL, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}


export function createSkill(skill) {
  return (dispatch) => {
    // axios.post(`${ROOT_URL}/posts`, post)
    axios.post(`${ROOT_URL}/skills`, skill)
      .then((response) => {
        // dispatch({ type: ActionTypes.CREATE_POST, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updateSkill(id, skill) {
  return (dispatch) => {
    // axios.put(`${ROOT_URL}/posts/${id}`, post)
    axios.put(`${ROOT_URL}/skills/${id}`, skill)
      .then((response) => {
        // dispatch({ type: ActionTypes.UPDATE_SKILL, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function deleteSkill(id) {
  return (dispatch) => {
    // axios.delete(`${ROOT_URL}/posts/${id}`)
    axios.delete(`${ROOT_URL}/skills/${id}`)
      .then(() => {
        // dispatch({ type: ActionTypes.UPDATE_SKILL, payload: null });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function fetchUser(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users/${id}`)
      .then((response) => {
        console.log('fetch user');
        console.log(response.data.message);
        dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function fetchSelf() {
  return async (dispatch) => {
    console.log('fetch self');
    const value = await AsyncStorage.getItem('token');
    axios.get(`${ROOT_URL}/users/self`, { headers: { authorization: value } })
      .then((response) => {
        // console.log(`Response self data: ${JSON.stringify(response.data)}`);
        dispatch({ type: ActionTypes.FETCH_SELF, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function createUser(post, history) {
  return async (dispatch) => {
    // axios.post(`${ROOT_URL}/posts`, post)
    const value = await AsyncStorage.getItem('token');
    axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: value } })
      .then((response) => {
        dispatch({ type: ActionTypes.CREATE_POST, payload: response.data });
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updateUser(id, post) {
  return async (dispatch) => {
    // axios.put(`${ROOT_URL}/posts/${id}`, post)
    const value = await AsyncStorage.getItem('token');
    axios.put(`${ROOT_URL}/posts/${id}`, post, { headers: { authorization: value } })
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
    // axios.delete(`${ROOT_URL}/posts/${id}`)
    const value = await AsyncStorage.getItem('token');
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: value } })
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
        dispatch({ type: ActionTypes.AUTH_USER, payload: response.data.token });
        await AsyncStorage.setItem('token', response.data.token);
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
        dispatch({ type: ActionTypes.AUTH_USER, payload: response.data.token });
        await AsyncStorage.setItem('token', response.data.token);
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
        console.log(`getChats response: ${JSON.stringify(response.data)}`);
        dispatch({ type: ActionTypes.GET_CHATS, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
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
