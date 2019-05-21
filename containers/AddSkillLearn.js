import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text, View, Button, TextInput,
} from 'react-native';
import { addLearn } from '../actions';

class AddSkillLearn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      errorTitle: false,
    };
  }

  add = () => { // Check that there are no bad or empty values that the user is attempting to post
    if (this.state.title === '') {
      this.setState({ errorTitle: true });
    } else {
      this.setState({ errorTitle: false });
      this.props.addLearn({
        title: this.state.title,
      });
      this.props.navigation.navigate('Profile');
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
        <View>
          <Button onPress={() => { this.add(); }} title="Save" />
          <Button onPress={() => { this.props.navigation.navigate('Profile'); }} title="Cancel" />
        </View>
      </View>
    );
  }
}

export default connect(null, { addLearn })(AddSkillLearn);
