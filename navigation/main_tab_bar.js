import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
// import { View, Text } from 'react-native';
// import Profile from '../containers/profile';
import Messaging from '../components/messaging';
import HomeTab from './home_tab';
import Home from '../components/home';

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
    // Profile: {
    //   screen: Profile,
    //   navigationOptions: ({ navigation }) => ({
    //     tabBarLabel: 'Profile',
    //   }),
    // },
  },
  {
    initialRouteName: 'HomeTab',
  },
);

export default createAppContainer(MainTabBar);
