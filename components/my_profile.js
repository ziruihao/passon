import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
  Text,
  ListView,
  TouchableHighlight,
} from 'react-native';

class Profile extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: 'black',
  }

  render() {
    return (
      <View>
        <Text>My Profile</Text>
      </View>
    );
  }
}

export default Profile;
