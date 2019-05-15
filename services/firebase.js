import firebase from 'firebase';
import 'firebase/auth';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDkxDp2e9fMLmUyLxJ8vlR5qcApplKVmHc',
  authDomain: 'passon.firebaseapp.com',
  databaseURL: 'https://passon.firebaseio.com',
  projectId: 'passon',
  storageBucket: 'passon.appspot.com',
  messagingSenderId: '95113840111',
};
firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();

// // modular functions from firebase wrapper
// import * as db from './services/datastore';

/**
 * Logs the user in via firebase.
 */
export function auth(uidCallback) {
  firebase.auth().signInWithPopup(provider).then((result) => {
    const { uid } = result.user;
    const { displayName } = result.user;
    const { photoURL } = result.user;
    uidCallback(uid, displayName, photoURL);
    console.log(`user ${displayName} logged in`);
  }).catch((error) => {
    console.log(`error in authentication: ${error}`);
  });
}

/**
 * Logs the user out via firebase.
 */
export function deAuth() {
  firebase.auth().signOut().then(() => {
  }).catch((error) => {
    console.log(`error in deauthentication: ${error}`);
  });
}
