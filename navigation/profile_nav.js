import { createAppContainer, createStackNavigator } from 'react-navigation';
import Profile from '../containers/Profile';
// import My_Profile from '../components/my_profile';
import AddSkillTeach from '../containers/AddSkillTeach';
import EditSkillTeach from '../containers/EditSkillTeach';
import AddSkillLearn from '../containers/AddSkillLearn';
import EditSkillLearn from '../containers/EditSkillLearn';

// nest stack navigator to handle two internal views
const ProfileNav = createStackNavigator({
  // keys are the names of the "routes"
  Profile: { screen: Profile },
  AddSkillTeach: { screen: AddSkillTeach },
  EditSkillTeach: { screen: EditSkillTeach },
  AddSkillLearn: { screen: AddSkillLearn },
  EditSkillLearn: { screen: EditSkillLearn },
},
{
  initialRouteName: 'Profile',
  headerMode: 'none',
});

export default createAppContainer(ProfileNav);
