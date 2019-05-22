import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text, View, Button, TextInput,
} from 'react-native';
import { updateTeach, deleteTeach } from '../actions';

class EditSkillTeach extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      years: '',
      bio: '',
      ratings: [],
    };
  }

  edit = () => { // Check that there are no bad or empty values that the user is attempting to post
    if (this.state.title === ''
    || this.state.years === ''
    || this.state.bio === '') {
      this.setState({ valid_entry: false });
    } else {
      this.props.updateTeach({
        title: this.state.title,
        years: this.state.years,
        bio: this.state.bio,
        ratings: this.state.ratings,
      });
      this.props.navigation.navigate('Profile');
    }
  };

  delete = () => {
    this.props.deleteTeach({
      title: this.state.title,
      years: this.state.years,
      bio: this.state.bio,
      ratings: this.state.ratings,
    });
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
        <TextInput
          placeholder="Years of experience"
          onChangeText={(text) => { this.setState({ years: text }); }}
        />
        <TextInput
          placeholder="Description of experience"
          onChangeText={(text) => { this.setState({ bio: text }); }}
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

export default connect(null, { updateTeach, deleteTeach })(EditSkillTeach);
