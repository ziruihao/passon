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
    };
  }

  edit = () => { // Check that there are no bad or empty values that the user is attempting to post
    // if (this.state.title === ''
    // || this.state.years === ''
    // || this.state.bio === '') {
    //   this.setState({ valid_entry: false });
    // } else {
    //   this.props.updateTeach({
    //     title: this.state.title,
    //     years: this.state.years,
    //     bio: this.state.bio,
    //     ratings: this.state.ratings,
    //   });
    //   this.props.navigation.navigate('ProfileSelf');
    // }
    this.props.updateTeach({
      skill: {
        years: this.state.years,
        bio: this.state.bio,
        id: this.state.id,
      },
    });
    this.props.navigation.navigate('ProfileSelf');
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
        <TextInput
          placeholder="Description of experience"
          onChangeText={(text) => { this.setState({ bio: text }); }}
          defaultValue={this.state.bio}
        />
        <Button onPress={() => { this.edit(); }} title="Save" />
        <Button onPress={() => { this.delete(); }} title="Delete" />
      </View>
    );
  }
}

export default connect(null, { updateTeach, deleteTeach })(EditSkillTeach);
