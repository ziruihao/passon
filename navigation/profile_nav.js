import { createAppContainer, createStackNavigator } from 'react-navigation';
import ProfileSelf from '../containers/ProfileSelf';
import AddSkillTeach from '../containers/AddSkillTeach';
import EditSkillTeach from '../containers/EditSkillTeach';
import AddSkillLearn from '../containers/AddSkillLearn';
import EditSkillLearn from '../containers/EditSkillLearn';

// nest stack navigator to handle two internal views
const ProfileNav = createStackNavigator({
  // keys are the names of the "routes"
  ProfileSelf: { screen: ProfileSelf },
  AddSkillTeach: { screen: AddSkillTeach },
  EditSkillTeach: { screen: EditSkillTeach },
  AddSkillLearn: { screen: AddSkillLearn },
  EditSkillLearn: { screen: EditSkillLearn },
},
{
  initialRouteName: 'ProfileSelf',
  headerMode: 'none',
});

export default createAppContainer(ProfileNav);
