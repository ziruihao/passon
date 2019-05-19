// import { createStore, applyMiddleware, compose } from 'redux';
// import React from 'react';
// import { Provider } from 'react-redux';
// import devTools from 'remote-redux-devtools';
// import { Platform } from 'react-native';
// import promise from 'redux-promise';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
// // import MainTabBar from './navigation/main_tab_bar';
// import FirstScreen from './components/FirstScreen';
// import rootReducer from './reducers/index';

// // Source: https://stackoverflow.com/questions/53737943/typeerror-undefined-is-not-an-object-evaluating-store-getstate
// const middleware = applyMiddleware(thunk, promise, logger);

// const Store = createStore(rootReducer, compose(middleware, devTools({
//   name: Platform.OS,
//   hostname: 'localhost',
//   port: 5678,
// })));

// const App = () => {
//   return (
//     <Provider store={Store}>
//       <FirstScreen />
//       {/* <MainTabBar /> */}
//     </Provider>
//   );
// };

// export default App;

import React from 'react';
import FirstScreen from './components/FirstScreen';

// disable really annoying in app warnings
console.disableYellowBox = true;

const App = (props) => {
  return <FirstScreen />;
};

export default App;
