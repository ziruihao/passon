import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text, View, Button, TextInput,
} from 'react-native';
import { updateLearn, deleteLearn } from '../actions';

class EditSkillLearn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.navigation.state.params.skill.title,
      id: props.navigation.state.params.skill.id,
    };
  }

  // edit = () => { // Check that there are no bad or empty values that the user is attempting to post
  //   if (this.state.title === '') {
  //     this.setState({ errorTitle: true });
  //   } else {
  //     this.setState({ errorTitle: false });
  //     this.props.updateLearn({
  //       skill: {
  //         title: this.state.title,
  //       },
  //     });
  //     this.props.navigation.navigate('ProfileSelf');
  //   }
  // };

  delete = () => {
    this.props.deleteLearn({
      skill: {
        id: this.state.id,
      },
    });
    this.props.navigation.navigate('ProfileSelf');
  };

  render() {
    return (
      <View>
        <Text>Edit Skill: {this.state.title}</Text>
        <View>
          <Button onPress={() => { this.delete(); }} title="Delete" />
        </View>
      </View>
    );
  }
}

export default connect(null, { updateLearn, deleteLearn })(EditSkillLearn);
