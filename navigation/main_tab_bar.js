import React from 'react';
import {
  createAppContainer, createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import HomeTab from './home_tab';
import MessagingScreen from '../components/Messaging';
import ChatScreen from '../components/Chat';
import ProfileNav from './profile_nav';

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
    Profile: {
      screen: ProfileNav,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'My Profile',
      }),
    },
  },
  {
    initialRouteName: 'Profile',
  },
);

export default createAppContainer(MainTabBar);
