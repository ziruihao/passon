import React from 'react';
import {
  createAppContainer, createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import HomeTab from './home_tab';
import MessagingTab from './messaging';
import ProfileNav from './profile_nav';

const MainTabBar = createBottomTabNavigator(
  {
    HomeTab: {
      screen: HomeTab,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: ' ',
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="home"
            size={26}
            color={focused ? '#4C01ED' : 'grey'}
          />
        ),
      }),
    },
    MessagingTab: {
      screen: MessagingTab,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: ' ',
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="comments"
            size={26}
            color={focused ? '#4C01ED' : 'grey'}
          />
        ),
      }),
    },
    ProfileTab: {
      screen: ProfileNav,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: ' ',
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="user"
            size={26}
            color={focused ? '#4C01ED' : 'grey'}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: 'HomeTab',
    headerMode: 'none',
  },
);

export default createAppContainer(MainTabBar);
