import { createAppContainer, createStackNavigator } from 'react-navigation';
import SignIn from '../containers/Auth/Signin';
import SignUp from '../containers/Auth/Signup';
import Splash from '../components/Splash';
import MainTabBar from './main_tab_bar';

const AuthNav = createStackNavigator({
  Splash: { screen: Splash },
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  Main: { screen: MainTabBar },
},
{
  initialRouteName: 'Splash',
  headerMode: 'none',
});

export default createAppContainer(AuthNav);
