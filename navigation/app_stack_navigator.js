/* eslint-disable new-cap */
import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import FirstScreen from '../components/FirstScreen';
import SignIn from '../containers/signin';
import SignUp from '../containers/signup';
import MainTabBar from './main_tab_bar';

const AppStackNavigator = StackNavigator({
  loginFlow: {
    screen: StackNavigator({
      first: { screen: FirstScreen },
      someTab: {
        screen: TabNavigator({
          signin: { screen: SignIn },
          signup: { screen: SignUp },
        }),
      },
    }),
  },
  mainFlow: {
    screen: StackNavigator({
      main: { screen: MainTabBar },
    }),
  },

  render() {
    return <AppStackNavigator />;
  },
});
