import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from '../containers/Home';
import Profile from '../containers/Profile/Profile';
import ProfileNav from './profile_nav';
import AddRating from '../containers/Skill/ModifySkill/AddRating';

// nest stack navigator to handle two internal views
const HomeTab = createStackNavigator({
  // keys are the names of the "routes"
  Home,
  Profile,
  ProfileNav,
  AddRating,
});

// // override some navigation options - set a pretty icon
// HomeTab.navigationOptions = ({ navigation }) => ({
//   tabBarLabel: 'Home',
// },
// );

export default HomeTab;
