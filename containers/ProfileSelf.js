/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
import { connect } from 'react-redux';
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
  // constructor(props) {
  //   super(props);
  // }

  // renderText = () => {
  //   return (
  //     <div>{this.props.currentUser.}</div>
  //   );
  // };
  componentWillMount() {
    this.props.fetchSelf();
  }

  renderTeaches() {
    // if (this.props.User === null) {
    //   this.props.fetchSelf();
    // }
    console.log('RENDER TEACHES=================');
    console.log(this.props.Self);
    return <View><Teaches teaches={this.props.Self.teach} /></View>;
  }

  renderLearns() {
    // if (this.props.User === null) {
    //   this.props.fetchSelf();
    // }
    console.log('RENDER learns=================');
    console.log(this.props.Self);
    return <View><Learns learns={this.props.Self.learn} /></View>;
  }

  render() {
    if (this.props.Self === null) {
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
          <Button onPress={() => this.props.navigation.navigate('EditSkillTeach')}
            title="Edit Skill"
          />
          <Text>
            Learn:
          </Text>
          {this.renderLearns()}
          {/* <View><Learns learns={this.props.User.learn} /></View> */}
          <Button onPress={() => this.props.navigation.navigate('AddSkillLearn')}
            title="Add Skill"
          />
          <Button onPress={() => this.props.navigation.navigate('EditSkillLearn')}
            title="Edit Skill"
          />
        </View>
      );
    }
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    Self: reduxState.user.current,
  };
}

export default connect(mapReduxStateToProps, { fetchUser, fetchSelf })(ProfileSelf);
