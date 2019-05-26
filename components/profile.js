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
import Learns from './learns';
import Teaches from './teaches';

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

  componentDidMount() {
    this.props.fetchUser(this.props.navigation.state.params._id);
  }

  render() {
    console.log(`User in render: ${this.props.user}`);
    if (this.props.user === null) {
      return (<Text>Loading</Text>);
    } else {
      return (
        <View>
          <View>
            <Text>{this.props.user.firstName}</Text>
            {/* <Text>{this.props.User.lastname}</Text>
            <Text>{this.props.User.email}</Text>
            <Text>{this.props.User.teach}</Text>
            <Text>{this.props.User.learn}</Text>
            <Text>{this.props.User.rating}</Text>
            <Text>{this.props.User.univerity}</Text> */}
          </View>
          <View><Text>Teach:</Text></View>
          <View><Teaches teaches={this.props.user.teach} nav={this.props.navigation} user={this.props.user} self={this.props.self} /></View>
          <View><Text>Learn:</Text></View>
          <View><Learns learns={this.props.user.learn} nav={this.props.navigation} user={this.props.user} self={this.props.self} /></View>
        </View>
      );
    }
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    user: reduxState.user.current,
    self: reduxState.user.self,
  };
}

export default connect(mapReduxStateToProps, { fetchUser })(Profile);
