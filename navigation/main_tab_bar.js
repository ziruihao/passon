import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
// import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import Profile from '../containers/Profile';
import Messaging from '../components/Messaging';
import Home from '../components/Home';
import SignInScreen from '../containers/signin';
import SignUpScreen from '../containers/signup';

// const AboutTab = (props) => {
//   return <View style={{ flex: 1, justifyContent: 'center' }}><Text>about</Text></View>;
// };

// const SearchTab = (props) => {
//   return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Search</Text></View>;
// };

// const FirstScreen = createStackNavigator({
//   SignIn: { screen: SignInScreen },
//   SignUp: { screen: SignUpScreen },
// });

const MainTabBar = createBottomTabNavigator(
  {
    SignUpScreen,
    SignInScreen,
    // FirstScreen,
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="info-circle"
            size={26}
            color={focused ? '#58AADA' : 'grey'}
          />
        ),
      }),
    },
    Messaging: {
      screen: Messaging,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'Messaging',
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="info-circle"
            size={26}
            color={focused ? '#58AADA' : 'grey'}
          />
        ),
      }),
    },
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'Profile',
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="info-circle"
            size={26}
            color={focused ? '#58AADA' : 'grey'}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: 'SignInScreen',
  },
);

export default createAppContainer(MainTabBar);
