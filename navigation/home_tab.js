import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from '../components/Home';
import Profile from '../containers/profile';

// nest stack navigator to handle two internal views
const HomeTab = createStackNavigator({
  // keys are the names of the "routes"
  Home,
  Profile,
});

HomeTab.navigationOptions = {
  tabBarLabel: 'Home',
};

export default HomeTab;
