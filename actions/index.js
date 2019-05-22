import axios from 'axios/index';
import { AsyncStorage } from 'react-native';

// From assignment page
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  UPDATE_POST: 'UPDATE_POST', // There are more steps than just using fetch_post (and possibly another command) to do this
  CREATE_POST: 'CREATE_POST',
  DELETE_POST: 'DELETE_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_LEARNS: 'FETCH_LEARNS',
  FETCH_TEACHES: 'FETCH_TEACHES',
  FETCH_LEARN: 'FETCH_LEARN',
  FETCH_TEACH: 'FETCH_TEACH',
};

// From assignment page
const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://sulljohn-cs52-blog.herokuapp.com/api';
// const API_KEY = '?key=j_sullivan';

export function fetchLearn() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users/learn`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_LEARN, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchTeach() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users/teach`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_TEACH, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchLearns() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users/learn`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_LEARNS, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchTeaches() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users/teach`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_TEACHES, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function addLearn(skill) {
  return async (dispatch) => {
    const value = await AsyncStorage.getItem('token');
    axios.post(`${ROOT_URL}/users/learn`, skill, { headers: { authorization: value } }).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function addTeach(skill) {
  return async (dispatch) => {
    const value = await AsyncStorage.getItem('token');
    axios.post(`${ROOT_URL}/users/teach`, skill, { headers: { authorization: value } }).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updateLearn(id, skill) {
  return async (dispatch) => {
    const value = await AsyncStorage.getItem('token');
    axios.put(`${ROOT_URL}/users/${id}/learn`, skill, { headers: { authorization: value } }).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updateTeach(id, skill) {
  return async (dispatch) => {
    const value = await AsyncStorage.getItem('token');
    axios.put(`${ROOT_URL}/users/${id}/teach`, skill, { headers: { authorization: value } }).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function deleteLearn(id) {
  return async (dispatch) => {
    const value = await AsyncStorage.getItem('token');
    axios.delete(`${ROOT_URL}/users/${id}/learn`, { headers: { authorization: value } }).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function deleteTeach(id) {
  return async (dispatch) => {
    const value = await AsyncStorage.getItem('token');
    axios.delete(`${ROOT_URL}/users/${id}/teach`, { headers: { authorization: value } }).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function fetchUser() {
  // console.log('here');

  return (dispatch) => {
    axios.get(`${ROOT_URL}/users`)
      .then((response) => {
        console.log(response.data.message);
        // dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function createUser(post, history) {
  return (dispatch) => {
    // axios.post(`${ROOT_URL}/posts`, post)
    axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } })
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
  return (dispatch) => {
    // axios.put(`${ROOT_URL}/posts/${id}`, post)
    axios.put(`${ROOT_URL}/posts/${id}`, post, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function deleteUser(id, history) {
  return (dispatch) => {
    // axios.delete(`${ROOT_URL}/posts/${id}`)
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
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
  return (dispatch) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}


export function fetchChats() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users`)
      .then((response) => {
        console.log(response.data.message);
        // dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function createChat(id, chat) {
  return (dispatch) => {
    // axios.post(`${ROOT_URL}/posts`, post)
    axios.post(`${ROOT_URL}/messaging/${id}`, chat, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.CREATE_CHAT, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
