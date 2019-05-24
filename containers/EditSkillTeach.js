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
        title: this.state.title,
        years: this.state.years,
        bio: this.state.bio,
        ratings: this.state.ratings,
      },
    });
    this.props.navigation.navigate('ProfileSelf');
  };

  delete = () => {
    this.props.deleteTeach({
      skill: {
        title: this.state.title,
        years: this.state.years,
        bio: this.state.bio,
        ratings: this.state.ratings,
      },
    });
    this.props.navigation.navigate('ProfileSelf');
  };

  render() {
    console.log('EDIT SKILL TEACH========');
    console.log(this.props);
    // console.log(this.props.skillTitle);
    // console.log(this.props.skillYears);
    // console.log(this.props.skillBio);
    return (
      <View>
        <Text>Edit Skill</Text>
        <TextInput
          placeholder="Skill"
          onChangeText={(text) => { this.setState({ title: text }); }}
          defaultValue={this.props.skillTitle}
        />
        <TextInput
          placeholder="Years of experience"
          onChangeText={(text) => { this.setState({ years: text }); }}
          defaultValue={this.props.skillYears}
        />
        <TextInput
          placeholder="Description of experience"
          onChangeText={(text) => { this.setState({ bio: text }); }}
          defaultValue={this.props.skillBio}
        />
        <Button onPress={() => { this.edit(); }} title="Save" />
        <Button onPress={() => { this.delete(); }} title="Delete" />
      </View>
    );
  }
}

export default connect(null, { updateTeach, deleteTeach })(EditSkillTeach);
