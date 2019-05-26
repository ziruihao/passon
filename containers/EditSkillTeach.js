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
      title: props.navigation.state.params.skill.title,
      years: props.navigation.state.params.skill.years,
      bio: props.navigation.state.params.skill.bio,
      id: props.navigation.state.params.skill.id,
      errorYears: false,
      errorBio: false,
    };
  }

  edit = () => { // Check that there are no bad or empty values that the user is attempting to post
    if (this.state.years === '') {
      this.setState({ errorYears: true });
    } else {
      this.setState({ errorYears: false });
    }
    if (this.state.bio === '') {
      this.setState({ errorBio: true });
    } else {
      this.setState({ errorBio: false });
    }
    if (this.state.years !== ''
    && this.state.bio !== '') {
      this.props.updateTeach({
        skill: {
          years: this.state.years,
          bio: this.state.bio,
          id: this.state.id,
        },
      });
      this.props.navigation.navigate('ProfileSelf');
    }
  };

  delete = () => {
    this.props.deleteTeach({
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
        <TextInput
          placeholder="Years of experience"
          onChangeText={(text) => { this.setState({ years: Number(text) }); }}
          defaultValue={this.state.years.toString()}
        />
        { this.state.errorYears === true ? (
          <Text>
               Please enter years of experience to proceed.
          </Text>
        ) : null }
        <TextInput
          placeholder="Description of experience"
          onChangeText={(text) => { this.setState({ bio: text }); }}
          defaultValue={this.state.bio}
        />
        { this.state.errorBio === true ? (
          <Text>
              Please enter description of experience to proceed.
          </Text>
        ) : null }
        <Button onPress={() => { this.edit(); }} title="Save" />
        <Button onPress={() => { this.delete(); }} title="Delete" />
      </View>
    );
  }
}

export default connect(null, { updateTeach, deleteTeach })(EditSkillTeach);
