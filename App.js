import { createStore, applyMiddleware, compose } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import devTools from 'remote-redux-devtools';
import { Platform, YellowBox } from 'react-native';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import MainTabBar from './navigation/main_tab_bar';
import rootReducer from './reducers/index';

// Source: https://stackoverflow.com/questions/53737943/typeerror-undefined-is-not-an-object-evaluating-store-getstate
const middleware = applyMiddleware(thunk, promise, logger);

const Store = createStore(rootReducer, compose(middleware, devTools({
  name: Platform.OS,
  hostname: 'localhost',
  port: 5678,
})));


console.ignoredYellowBox = ['Remote debugger'];

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);


const App = () => {
  return (
    <Provider store={Store}>
      <MainTabBar />
    </Provider>
  );
};

export default App;
