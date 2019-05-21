import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text, View, Button, TextInput,
} from 'react-native';
import { updateSkill, deleteSkill } from '../actions';

class EditSkillLearn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }

  edit = () => { // Check that there are no bad or empty values that the user is attempting to post
    if (this.state.title === '') {
      this.setState({ valid_entry: false });
    } else {
      this.props.updateSkill({
        title: this.state.title,
      });
      this.props.navigation.navigate('Profile');
    }
  };

  delete = () => {
    this.props.deleteSkill();
    this.props.navigation.navigate('Profile');
  };

  renderResponse = () => {
    if (!this.state.valid_entry) {
      return (
        <Text>Field missing</Text>
      );
    } else {
      return (
        <Text>Please fill in missing fields.</Text>
      );
    }
  };

  render() {
    return (
      <View>
        <Text>Edit Skill</Text>
        <TextInput
          placeholder="Skill"
          onChangeText={(text) => { this.setState({ title: text }); }}
        />
        <View>
          {this.renderResponse()}
          <Button onPress={() => { this.edit(); }} title="Save" />
          <Button onPress={() => { this.delete(); }} title="Delete" />
        </View>
      </View>
    );
  }
}

export default connect(null, { updateSkill, deleteSkill })(EditSkillLearn);
