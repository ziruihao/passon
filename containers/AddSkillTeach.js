import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text, View, Button, TextInput,
} from 'react-native';
import { addTeach } from '../actions';

class AddSkillTeach extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      years: '',
      bio: '',
      ratings: [],
      errorTitle: false,
      errorYears: false,
      errorBio: false,
    };
  }

  add = () => { // Check that there are no bad or empty values that the user is attempting to post
    if (this.state.title === '') {
      this.setState({ errorTitle: true });
    } else {
      this.setState({ errorTitle: false });
    }
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
    if (this.state.title !== ''
    && this.state.years !== ''
    && this.state.bio !== '') {
      this.props.addTeach({
        skill: {
          title: this.state.title,
          years: this.state.years,
          bio: this.state.bio,
          ratings: this.state.ratings,
        },
      });
      this.props.navigation.navigate('ProfileSelf');
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
        { this.state.errorTitle === true ? (
          <Text>
               Please enter skill title to proceed.
          </Text>
        ) : null }
        <TextInput
          placeholder="Years of experience"
          onChangeText={(text) => { this.setState({ years: text }); }}
        />
        { this.state.errorYears === true ? (
          <Text>
               Please enter years of experience to proceed.
          </Text>
        ) : null }
        <TextInput
          placeholder="Description of experience"
          onChangeText={(text) => { this.setState({ bio: text }); }}
        />
        { this.state.errorBio === true ? (
          <Text>
               Please enter description of experience to proceed.
          </Text>
        ) : null }
        <View>
          <Button onPress={() => { this.add(); }} title="Save" />
          <Button onPress={() => { this.props.navigation.navigate('ProfileSelf'); }} title="Cancel" />
        </View>
      </View>
    );
  }
}

export default connect(null, { addTeach })(AddSkillTeach);
