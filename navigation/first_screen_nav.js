import { createAppContainer, createStackNavigator } from 'react-navigation';
// import { Button } from 'react-native';
import SignIn from '../containers/signin';
import SignUp from '../containers/signup';
import FirstScreen from '../components/FirstScreen';
import MainTabBar from './main_tab_bar';

// nest stack navigator to handle two internal views
const FirstScreenNav = createStackNavigator({
  // keys are the names of the "routes"
  FirstScreen: { screen: FirstScreen },
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  Main: { screen: MainTabBar },
},
{
  initialRouteName: 'FirstScreen',
  headerMode: 'none',
});

export default createAppContainer(FirstScreenNav);
