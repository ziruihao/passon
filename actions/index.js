import axios from 'axios/index';
// import { AsyncStorage } from 'react-native';

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
  FETCH_SKILLS: 'FETCH_SKILLS',
  FETCH_SKILL: 'FETCH_SKILL',
  UPDATE_SKILL: 'UPDATE_SKILL',
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
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, payload: response.data.token });
        // AsyncStorage.setItem('token', response.data.token);
        // history.push('/');
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
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, payload: response.data.token });
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

export function createChat(chat) {
  return (dispatch) => {
    console.log(`in actions: chat is${chat}`);
    // TODO ******** localStorage token commented out for now
    axios.post(`${ROOT_URL}/messaging`, chat, { headers: { } }) // authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.CREATE_CHAT, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
