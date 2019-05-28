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

  // chats
  GET_CHATS: 'GET_CHATS',

  // teachers
  SAVE_TEACHERS: 'SAVE_TEACHERS',
  SAVE_LEARNERS: 'SAVE_LEARNERS',
  GET_CHAT: 'GET_CHAT',
  FETCH_LEARNS: 'FETCH_LEARNS',
  FETCH_TEACHES: 'FETCH_TEACHES',
  FETCH_LEARN: 'FETCH_LEARN',
  FETCH_TEACH: 'FETCH_TEACH',
};

// From assignment page
const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://passon.herokuapp.com/api';
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
      console.log(error.message);
    });
  };
}

export function fetchUser(id) {
  return dispatch => new Promise(((resolve, reject) => {
    axios.get(`${ROOT_URL}/users/${id}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.message);
      });
  }));
}

export function fetchUsers(id) {
  return dispatch => new Promise(((resolve, reject) => {
    axios.get(`${ROOT_URL}/users`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_USERS, payload: response.data });
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.message);
      });
  }));
}

export function fetchSelf() {
  console.log(axios.defaults.headers.common);
  return dispatch => new Promise(((resolve, reject) => {
    axios.post(`${ROOT_URL}/self`)
      .then((response) => {
        dispatch({ type: ActionTypes.SAVE_USER, payload: response.data });
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.message);
      });
  }));
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

export function fetchTeachers(skills) {
  return dispatch => new Promise(((resolve, reject) => {
    axios.post(`${ROOT_URL}/teachers`, skills).then((response) => {
      // console.log('aaa');
      dispatch({ type: ActionTypes.SAVE_TEACHERS, payload: response.data });
      resolve(response.data);
    }).catch((error) => {
      reject(error.message);
    });
  }));
}

export function fetchLearners(skills) {
  return dispatch => new Promise(((resolve, reject) => {
    axios.post(`${ROOT_URL}/learners`, skills).then((response) => {
      // console.log('bbb');
      dispatch({ type: ActionTypes.SAVE_LEARNERS, payload: response.data });
      resolve(response.data);
    }).catch((error) => {
      reject(error.message);
    });
  }));
}


// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ email, password }, navigation) {
  return async (dispatch) => {
    const response = await axios.post(`${ROOT_URL}/signin`, { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    axios.defaults.headers.common = await { authorization: response.data.token };
    await dispatch({ type: ActionTypes.SAVE_USER, payload: response.data.user });
    await navigation.navigate('Main');
    await dispatch({ type: ActionTypes.AUTH_USER, payload: response.data.token });
  };
}

export function signupUser({
  firstName, lastName, email, password, university,
}, navigation) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, {
      firstName, lastName, email, password, university,
    })
      .then(async (response) => {
        await AsyncStorage.setItem('token', response.data.token);
        axios.defaults.headers.common = { authorization: response.data.token };
        await dispatch({ type: ActionTypes.SAVE_USER, payload: response.data.user });
        await navigation.navigate('Main');
        await dispatch({ type: ActionTypes.AUTH_USER, payload: response.data.token });
      })
      .catch((error) => {
        dispatch(authError(`Sign Up Failed: ${error}`));
      });
  };
}


// deletes token from localstorage
// and deauths
export function signoutUser(navigation) {
  return async (dispatch) => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    navigation.navigate('FirstScreen');
  };
}

export function fetchChats() {
  return async (dispatch) => {
    const value = await AsyncStorage.getItem('token');
    axios.get(`${ROOT_URL}/messaging`, { headers: { authorization: value } })
      .then((response) => {
        dispatch({ type: ActionTypes.GET_CHATS, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function fetchChat(otherId) {
  return async (dispatch) => {
    const value = await AsyncStorage.getItem('token');
    axios.get(`${ROOT_URL}/messaging/${otherId}`, { headers: { authorization: value } })
      .then((response) => {
        dispatch({ type: ActionTypes.GET_CHAT, payload: response.data });
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

export function addRating(skill) {
  return async (dispatch) => {
    axios.post(`${ROOT_URL}/addRating`, skill).then((response) => {
      console.log(response.data);
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
