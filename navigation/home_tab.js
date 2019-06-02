import { createStackNavigator } from 'react-navigation';
import Home from '../containers/Home';
import Profile from '../containers/Profile/Profile';
import ProfileNav from './profile_nav';
import AddRating from '../containers/Skill/ModifySkill/AddRating';

const HomeTab = createStackNavigator({
  Home,
  Profile,
  ProfileNav,
  AddRating,
});

export default HomeTab;
