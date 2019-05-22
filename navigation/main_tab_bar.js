import React from 'react';
import {
  createAppContainer, createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import HomeTab from './home_tab';
import My_Profile from '../components/my_profile';
import MessagingScreen from '../components/Messaging';
import ChatScreen from '../components/Chat';

const Messaging = createStackNavigator({
  Overview: { screen: MessagingScreen },
  Chat: { screen: ChatScreen },
});


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
