import { createAppContainer, createStackNavigator } from 'react-navigation';
import SignIn from '../containers/Auth/signin';
import SignUp from '../containers/Auth/signup';
import Splash from '../components/Splash';
import MainTabBar from './main_tab_bar';

// nest stack navigator to handle two internal views
const AuthNav = createStackNavigator({
  // keys are the names of the "routes"
  Splash: { screen: Splash },
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  Main: { screen: MainTabBar },
},
{
  initialRouteName: 'FirstScreen',
  headerMode: 'none',
});

export default createAppContainer(AuthNav);
