import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text, View, Button, TextInput,
} from 'react-native';
import { updateSkill, deleteSkill } from '../actions';

class AddSkill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skill: '',
      years: '',
      description: '',
    };
  }

    edit = () => { // Check that there are no bad or empty values that the user is attempting to post
      if (this.state.skill === ''
      || this.state.years === ''
      || this.state.description === '') {
        this.setState({ valid_entry: false });
      } else {
        this.props.updateSkill({
          skill: this.state.skill,
          years: this.state.years,
          description: this.state.description,
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
          onChangeText={(text) => { this.setState({ skill: text }); }}
        />
        <TextInput
          placeholder="Years of experience"
          onChangeText={(text) => { this.setState({ years: text }); }}
        />
        <TextInput
          placeholder="Description of experience"
          onChangeText={(text) => { this.setState({ description: text }); }}
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

export default connect(null, { updateSkill, deleteSkill })(AddSkill);
