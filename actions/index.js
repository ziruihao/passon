import axios from 'axios/index';
import { AsyncStorage } from 'react-native';

export const ActionTypes = {
  // signin or signup
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  SAVE_USER: 'SAVE_USER',

  // getting users
  FETCH_USER: 'FETCH_USER',

  // chats
  GET_CHATS: 'GET_CHATS',

  // teachers
  SAVE_TEACHERS: 'SAVE_TEACHERS',
  SAVE_LEARNERS: 'SAVE_LEARNERS',
  GET_CHAT: 'GET_CHAT',
};

// export const ROOT_URL = 'http://localhost:9090/api';
export const ROOT_URL = 'https://passon.herokuapp.com/api';

/**
 * Sends request to PassOn API to add a Learnable Skill to the [user]'s own profile.
 * @param {*} skill
 */
export function addLearn(skill) {
  return async () => {
    axios.post(`${ROOT_URL}/learn`, skill)
      .catch((error) => {
        console.log(error.message);
      });
  };
}

/**
 * Sends request to PassOn API to add a Teachable Skill to the [user]'s own profile.
 * @param {*} skill
 */
export function addTeach(skill) {
  return async () => {
    axios.post(`${ROOT_URL}/teach`, skill)
      .catch((error) => {
        console.log(error.message);
      });
  };
}

/**
 * Updates a [user]'s own Learnable Skill via the PassOn API
 * @param {*} skill
 */
export function updateLearn(skill) {
  return async (dispatch) => {
    axios.put(`${ROOT_URL}/learn`, skill).then((response) => {
      console.log(response.data);
    })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

/**
 * Updates a [user]'s own Learnable Skill via the PassOn API
 * @param {*} skill
 */
export function updateTeach(skill) {
  return async () => {
    axios.put(`${ROOT_URL}/teach`, skill).then((response) => {
      console.log(response.data);
    })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

/**
 * Deletes a user's own Learnable Skill via the PassOn API.
 * @param {String} id
 */
export function deleteLearn(id) {
  return async () => {
    axios.delete(`${ROOT_URL}/learn`, { data: { id } })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

/**
 * Deletes a [user]'s own Teachable Skill via the PassOn API.
 * @param {String} id
 */
export function deleteTeach(id) {
  return async () => {
    axios.delete(`${ROOT_URL}/teach`, { data: { id } }).catch((error) => {
      console.log(error.message);
    });
  };
}

/**
 * Fetches the public data of a specific [user] from the PassOn API.
 * @param {String} id
 */
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

/**
 * Grabs a [user]'s personal private information from the PassOn API.
 */
export function fetchSelf() {
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

/**
 * Queries the PassOn API for all [user]s that can teach a set of [skills].
 * @param {Array<String>} skills
 */
export function fetchTeachers(skills) {
  return dispatch => new Promise(((resolve, reject) => {
    axios.post(`${ROOT_URL}/teachers`, skills).then((response) => {
      dispatch({ type: ActionTypes.SAVE_TEACHERS, payload: response.data });
      resolve(response.data);
    }).catch((error) => {
      reject(error.message);
    });
  }));
}

/**
 * Queries the PassOn API for all [user]s that want to learn a set of [skills].
 * @param {Array<String>} skills
 */
export function fetchLearners(skills) {
  return dispatch => new Promise(((resolve, reject) => {
    axios.post(`${ROOT_URL}/learners`, skills).then((response) => {
      dispatch({ type: ActionTypes.SAVE_LEARNERS, payload: response.data });
      resolve(response.data);
    }).catch((error) => {
      reject(error.message);
    });
  }));
}

/**
 * Handles an error in authentication.
 * @param {String} error
 */
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

/**
 * Manages sign in.
 * @param {*} credentials
 * @param {Navigator} navigation
 */
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

/**
 * Handles sign up.
 * @param {*} Credentials
 * @param {Navigator} navigation
 */
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


/**
 * Handles sign out.
 */
export function signoutUser() {
  return async (dispatch) => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
  };
}


export function fetchChats() {
  return async (dispatch) => {
    axios.get(`${ROOT_URL}/messaging`)
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
    axios.get(`${ROOT_URL}/messaging/${otherId}`)
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
    axios.post(`${ROOT_URL}/messaging`, chat)
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
