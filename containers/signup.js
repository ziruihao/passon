import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text, View, Button, TextInput,
} from 'react-native';
import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      university: '',
    };
  }

  signUp = () => { // Check that there are no bad or empty values that the user is attempting to signup
    if (this.state.firstName === ''
      || this.state.lastName === ''
      || this.state.email === ''
      || this.state.password === ''
      || this.state.university === '') {
      this.setState({ valid_entry: false });
    } else {
      this.props.signupUser({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        university: this.state.university,
      });
      if (this.props.authenticated) {
        this.props.navigation.navigate('Main');
      }
    }
  };

  renderResponse = () => {
    if (!this.state.valid_entry) {
      return (
        <Text>Field missing</Text>
      );
    } else {
      return (
        <Text>Please fill in missing fields</Text>
      );
    }
  };

  render() {
    return (
      <View>
        <Text style={{ margin: 50 }}>Create an Account</Text>
        <TextInput
          placeholder="First Name"
          onChangeText={(text) => { this.setState({ firstName: text }); }}
        />
        <TextInput
          placeholder="Last Name"
          onChangeText={(text) => { this.setState({ lastName: text }); }}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(text) => { this.setState({ email: text }); }}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => { this.setState({ password: text }); }}
        />
        <TextInput
          placeholder="University"
          onChangeText={(text) => { this.setState({ university: text }); }}
        />
        <View>
          {this.renderResponse()}
          <Button onPress={() => { this.signUp(); }} title="Sign Up" />
          <Button onPress={() => { this.props.navigation.navigate('SignIn'); }} title="I already have an account." />
        </View>
      </View>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.auth.authenticated,
  };
}

export default connect(mapStateToProps, { signupUser })(SignUp);
