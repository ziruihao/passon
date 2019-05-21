import React, { Component } from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/index';
import Learns from './learns';
import Teaches from './teaches';


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

  renderText = () => {
    return (
      <div>{this.props.current}</div>
    );
  };

  render() {
    return ( // Button source: https://stackoverflow.com/questions/43895772/the-title-prop-of-a-button-must-be-a-string-react-native
      <View style={styles.container}>
        <Text>
          Teach:
        </Text>
        {/* <Button onPress={() => this.props.navigation.navigate('AddSkillTeach')}
          title="Add Skill"
        />
        <Button onPress={() => this.props.navigation.navigate('EditSkillTeach')}
          title="Edit Skill"
        /> */}
        <View>{Teaches}</View>
        <Text>
          Learn:
        </Text>
        <View>{Learns}</View>
        {/* <Button onPress={() => this.props.navigation.navigate('AddSkillLearn')}
          title="Add Skill"
        />
        <Button onPress={() => this.props.navigation.navigate('EditSkillLearn')}
          title="Edit Skill"
        /> */}
      </View>
    );
  }
}

// From Redux SA
const mapStateToProps = state => (
  {
    post: state.posts.current,
  }
);

export default connect(mapStateToProps, { fetchUser })(Profile);
