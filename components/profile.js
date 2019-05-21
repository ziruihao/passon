import React from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
  Text,
  ListView,
  TouchableHighlight,
} from 'react-native';
import {
  colors, fonts, padding, dimensions,
} from '../styles/base';
import { fetchUser } from '../actions';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding.sm,
    paddingVertical: padding.lg,
    width: dimensions.fullWidth,
    fontFamily: fonts.primary,
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

  // componentDidMount() {
  //   this.props.fetchUser(this.props.User.id);
  // }

  render() {
    console.log(`User in render: ${this.props.User}`);
    return (
      <View>
        <Text>{this.props.User}</Text>
        {/* <Text>{this.props.User.lastname}</Text>
        <Text>{this.props.User.email}</Text>
        <Text>{this.props.User.teach}</Text>
        <Text>{this.props.User.learn}</Text>
        <Text>{this.props.User.rating}</Text>
        <Text>{this.props.User.univerity}</Text> */}
      </View>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    User: reduxState.user.current,
  };
}

export default connect(mapReduxStateToProps, { fetchUser })(Profile);
