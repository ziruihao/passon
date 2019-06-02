import { createAppContainer, createStackNavigator } from 'react-navigation';
import ProfileSelf from '../containers/Profile/ProfileSelf';
import AddSkillTeach from '../containers/Skill/ModifySkill/AddSkillTeach';
import EditSkillTeach from '../containers/Skill/ModifySkill/EditSkillTeach';
import AddSkillLearn from '../containers/Skill/ModifySkill/AddSkillLearn';
import EditSkillLearn from '../containers/Skill/ModifySkill/EditSkillLearn';

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
