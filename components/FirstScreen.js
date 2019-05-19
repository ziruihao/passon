/* eslint-disable new-cap */
/* eslint-disable react/prefer-stateless-function */
// import React from 'react';
// import { createStackNavigator, createAppContainer } from 'react-navigation';
// import { Button } from 'react-native';
// import SignIn from '../containers/signin';
// import SignUp from '../containers/signup';

// const SignInButton = props => (<Button onPress={() => { props.navigation.navigate(SignIn); }} title="Sign In" />);
// const SignUpButton = props => (<Button onPress={() => { props.navigation.navigate(SignUp); }} title="Sign Up" />);

// // nest stack navigator to handle two internal views
// const FirstScreen = createStackNavigator({
//   // keys are the names of the "routes"
//   SignIn: SignInButton,
//   SignUp: SignUpButton,
// });

// // adapted from https://stackoverflow.com/questions/53367195/invariant-violation-the-navigation-prop-is-missing-for-this-navigator
// const Container = createAppContainer(FirstScreen);

// // export default FirstScreen;
// export default Container;


// import React, { Component } from 'react';
// import { Button, View } from 'react-native';
// import { createStackNavigator, createAppContainer } from 'react-navigation';

// class FirstScreen extends Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Button
//           title="Sign In"
//           onPress={() => this.props.navigation.navigate('Sign In')}
//         />
//         <Button
//           title="Sign Up"
//           onPress={() => this.props.navigation.navigate('Sign Up')}
//         />
//       </View>
//     );
//   }
// }

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: FirstScreen,
//   },
// });

// export default createAppContainer(AppNavigator);

// import { createStackNavigator, createAppContainer } from 'react-navigation';

// import SignUp from '../containers/signup';
// import SignIn from '../containers/signin';

// const FirstScreen = createStackNavigator({
//   // keys are the names of the "routes"
//   SignUp: {
//     screen: SignUp,
//     navigationOptions: {
//       title: 'Sign Up',
//     },
//   },
//   SignIn: {
//     screen: SignIn,
//     navigationOptions: {
//       title: 'Sign In',
//     },
//   },
// });

// export default createAppContainer(FirstScreen);

// import { withNavigation } from 'react-navigation';

// const TempSearch = props => (<Button onPress={() => { props.navigation.navigate('Detail'); }} title="Sign In" />);
// const TempDetail = props => (<Button onPress={() => { props.navigation.pop(); }} title="Sign Up" />);

// nest stack navigator to handle two internal views
// const FirstScreen = createStackNavigator({
//   // keys are the names of the "routes"
//   Search: TempSearch,
//   Detail: TempDetail,
// });

// class FirstScreen extends Component {

// }


// class FirstScreen extends React.Component {
//     static navigationOptions = {
//       title: 'Welcome to PassOn',
//     };

//     render() {
//       return (
//         <View>
//           <Button title="Sign In" onPress={this.props.navigation.navigate('SignIn')} />
//           <Button title="Sign Up" onPress={this.props.navigation.navigate('SignUp')} />
//         </View>
//       );
//     }
// }
// const AuthStack = createStackNavigator({ First: FirstScreen, SignIn, SignUp });

import React from 'react';
import { View, Button, Text } from 'react-native';


const FirstScreen = (props) => {
  return (
    <View>
      <Text>PassOn</Text>
      <Button onPress={() => { props.navigation.navigate('SignIn'); }} title="Sign In" />
      <Button onPress={() => { props.navigation.navigate('SignUp'); }} title="Sign Up" />
    </View>
  );
};

export default FirstScreen;

// export default createAppContainer(AuthStack);
