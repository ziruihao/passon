import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text, View, Button, TextInput,
} from 'react-native';
import { createSkill } from '../actions';

class AddSkillLearn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }

  add = () => { // Check that there are no bad or empty values that the user is attempting to post
    if (this.state.title === '') {
      this.setState({ valid_entry: false });
    } else {
      this.props.createSkill({
        title: this.state.title,
      });
      this.props.navigation.navigate('Profile');
    }
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
        <Text>Add Skill</Text>
        <TextInput
          placeholder="Skill"
          onChangeText={(text) => { this.setState({ title: text }); }}
        />
        <View>
          {this.renderResponse()}
          <Button onPress={() => { this.add(); }} title="Save" />
          <Button onPress={() => { this.props.navigation.navigate('Profile'); }} title="Cancel" />
        </View>
      </View>
    );
  }
}

export default connect(null, { createSkill })(AddSkillLearn);
