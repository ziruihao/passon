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
import Learns from '../components/learns';
import Teaches from '../components/teaches';

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
    if (this.props.user === null) {
      return (<Text>Loading</Text>);
    } else {
      return (
        <View>
          <View>
            <Text>{this.props.user.firstName}</Text>
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
