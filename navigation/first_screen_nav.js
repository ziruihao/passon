import { createStackNavigator } from 'react-navigation';
// import { Button } from 'react-native';
import SignIn from '../containers/signin';
import SignUp from '../containers/signup';

// nest stack navigator to handle two internal views
const FirstScreenNav = createStackNavigator({
  // keys are the names of the "routes"
  SignIn,
  SignUp,
});

export default FirstScreenNav;
