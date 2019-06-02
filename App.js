import { createStore, applyMiddleware, compose } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import devTools from 'remote-redux-devtools';
import { Platform, YellowBox, AsyncStorage } from 'react-native';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import axios from 'axios';
import rootReducer from './reducers/index';
import Main from './components/main';


// actions
import { ActionTypes } from './actions';

const middleware = applyMiddleware(thunk, promise);

const Store = createStore(rootReducer, compose(middleware, devTools({
  name: Platform.OS,
  hostname: 'localhost',
  port: 5678,
})));


console.ignoredYellowBox = ['Remote debugger'];

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);

// const token = AsyncStorage.getItem('token');
// const user = JSON.parse(AsyncStorage.getItem('user'));
// if (token && user !== null) {
//   // console.log(token);
//   axios.defaults.headers.common = { Authorization: AsyncStorage.getItem('token') };
//   Store.dispatch({ type: ActionTypes.AUTH_USER, payload: user });
// }


const App = () => {
  return (
    <Provider store={Store}>
      <Main />
    </Provider>
  );
};

export default App;

// import React from 'react';
// import FirstScreen from './components/FirstScreen';

// // disable really annoying in app warnings
console.disableYellowBox = true;

// const App = (props) => {
//   return <FirstScreen />;
// };

// export default App;
