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

const bg = require('../assets/gradient-background.svg');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4000F4',
  },
  mb: {
    marginBottom: 17,
    width: 297,
    height: 170,
  },
});

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
