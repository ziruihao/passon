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
      title: '',
      errorTitle: false,
    };
  }

  edit = () => { // Check that there are no bad or empty values that the user is attempting to post
    if (this.state.title === '') {
      this.setState({ errorTitle: true });
    } else {
      this.setState({ errorTitle: false });
      this.props.updateLearn({
        title: this.state.title,
      });
      this.props.navigation.navigate('ProfileSelf');
    }
  };

  delete = () => {
    this.props.deleteLearn({ title: this.state.title });
    this.props.navigation.navigate('ProfileSelf');
  };

  render() {
    return (
      <View>
        <Text>Edit Skill</Text>
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
          <Button onPress={() => { this.edit(); }} title="Save" />
          <Button onPress={() => { this.delete(); }} title="Delete" />
        </View>
      </View>
    );
  }
}

export default connect(null, { updateLearn, deleteLearn })(EditSkillLearn);
