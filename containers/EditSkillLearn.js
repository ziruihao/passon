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

  delete = () => {
    this.props.deleteLearn(this.state.id);
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
