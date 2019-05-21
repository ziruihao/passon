import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from '../components/Home';
import Profile from '../components/profile';

// nest stack navigator to handle two internal views
const HomeTab = createStackNavigator({
  // keys are the names of the "routes"
  Home,
  Profile,
});

// override some navigation options - set a pretty icon
HomeTab.navigationOptions = {
  tabBarLabel: 'Home',
};

export default HomeTab;
