import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
// import { View, Text } from 'react-native';
// import Profile from '../containers/profile';
import Messaging from '../components/Messaging';
import HomeTab from './home_tab';
import My_Profile from '../components/my_profile';

const MainTabBar = createBottomTabNavigator(
  {
    HomeTab: {
      screen: HomeTab,
    },
    MessagingTab: {
      screen: Messaging,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'Messaging',

      }),
    },
    My_Profile: {
      screen: My_Profile,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'My Profile',
      }),
    },
  },
  {
    initialRouteName: 'HomeTab',
  },
);

export default createAppContainer(MainTabBar);
