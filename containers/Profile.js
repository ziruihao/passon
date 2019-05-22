/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
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

class Profile extends Component {
  // constructor(props) {
  //   super(props);
  // }

  // renderText = () => {
  //   return (
  //     <div>{this.props.currentUser.}</div>
  //   );
  // };
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return ( // Button source: https://stackoverflow.com/questions/43895772/the-title-prop-of-a-button-must-be-a-string-react-native
      <View style={styles.container}>
        <Text>
          Teach:
        </Text>
        <View><Teaches teaches={this.props.currentUser.teach} /></View>
        <Button onPress={() => this.props.navigation.navigate('AddSkillTeach')}
          title="Add Skill"
        />
        <Button onPress={() => this.props.navigation.navigate('EditSkillTeach')}
          title="Edit Skill"
        />
        <Text>
          Learn:
        </Text>
        <View><Learns learns={this.props.currentUser.learn} /></View>
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

// From Redux SA
const mapStateToProps = state => (
  {
    currentUser: state.user.current,
  }
);

export default connect(mapStateToProps, { fetchUser })(Profile);
