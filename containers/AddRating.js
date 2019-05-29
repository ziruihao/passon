/* eslint-disable consistent-return */
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';
import { addRating } from '../actions';

class AddRating extends React.Component {
  static navigationOptions = {
    title: 'Add a Rating',
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: 'black',
  };

  constructor(props) {
    super(props);

    this.state = {
      score: '',
      errorRating: false,
    };
  }

  add = () => { // Check that there are no bad or empty values that the user is attempting to post
    if (this.state.score === '') {
      this.setState({ errorRating: true });
    } else {
      this.setState({ errorRating: false });
    }
    if (this.state.score !== '') {
      console.log('RATING SPOT');
      console.log(this.props);

      this.props.addRating({
        skill: {
          id: this.props.navigation.state.params.id,
          score: this.state.score,
        },
      });
      this.props.navigation.navigate('Profile');
    }
  };

  render() {
    return (
      <View style={{ margin: 50 }}>
        <Text>Add Skill</Text>
        <TextInput
          placeholder="Ratings"
          onChangeText={(text) => { this.setState({ score: text }); }}
        />
        { this.state.errorRating === true ? (
          <Text>
            Please enter rating score to proceed.
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

export default connect(null, { addRating })(AddRating);
