import { createAppContainer, createStackNavigator } from 'react-navigation';
import Profile from '../containers/Profile';
import AddSkill from '../containers/AddSkill';
import EditSkill from '../containers/EditSkill';

// nest stack navigator to handle two internal views
const ProfileNav = createStackNavigator({
  // keys are the names of the "routes"
  Profile: { screen: Profile },
  AddSkill: { screen: AddSkill },
  EditSkill: { screen: EditSkill },
},
{
  initialRouteName: 'Profile',
  headerMode: 'none',
});

export default createAppContainer(ProfileNav);
