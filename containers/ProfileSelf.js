/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { fetchUser, fetchSelf } from '../actions';
import Learns from '../components/learns';
import Teaches from '../components/teaches';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 300,
  },
});

class ProfileSelf extends Component {
  // adapted from https://reactnavigation.org/docs/en/navigation-prop.html#addlistener-subscribe-to-updates-to-navigation-lifecycle
  // Michelle (our TA) suggested using focus since our screen wasn't updating every time
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.props.fetchSelf();
    }
  }

  renderTeaches() {
    // this.props.fetchSelf();
    return <View><Teaches teaches={this.props.self.teach} nav={this.props.navigation} /></View>;
  }

  renderLearns() {
    // this.props.fetchSelf();
    return <View><Learns learns={this.props.self.learn} nav={this.props.navigation} /></View>;
  }

  render() {
    if (this.props.self === null) {
      return (<Text>Loading</Text>);
    } else {
      return ( // Button source: https://stackoverflow.com/questions/43895772/the-title-prop-of-a-button-must-be-a-string-react-native
        <View style={styles.container}>
          <Text>
            Teach:
          </Text>
          {/* <View><Teaches teaches={this.props.User.teach} /></View> */}
          {this.renderTeaches()}
          <Button onPress={() => this.props.navigation.navigate('AddSkillTeach')}
            title="Add Skill"
          />
          {/* <Button onPress={() => this.props.navigation.navigate('EditSkillTeach')}
            title="Edit Skill"
          /> */}
          <Text>
            Learn:
          </Text>
          {this.renderLearns()}
          {/* <View><Learns learns={this.props.User.learn} /></View> */}
          <Button onPress={() => this.props.navigation.navigate('AddSkillLearn')}
            title="Add Skill"
          />
          {/* <Button onPress={() => this.props.navigation.navigate('EditSkillLearn')}
            title="Edit Skill"
          /> */}
        </View>
      );
    }
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    self: reduxState.user.self,
  };
}

export default withNavigationFocus(connect(mapReduxStateToProps, { fetchUser, fetchSelf })(ProfileSelf));
