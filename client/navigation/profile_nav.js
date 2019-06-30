import { createAppContainer, createStackNavigator } from 'react-navigation';
import ProfileSelf from '../containers/Profile/ProfileSelf';
import AddSkillTeach from '../containers/Skill/ModifySkill/AddSkillTeach';
import EditSkillTeach from '../containers/Skill/ModifySkill/EditSkillTeach';
import AddSkillLearn from '../containers/Skill/ModifySkill/AddSkillLearn';
import EditSkillLearn from '../containers/Skill/ModifySkill/EditSkillLearn';

const ProfileNav = createStackNavigator({
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
