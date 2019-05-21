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
      errorFirstName: false,
      errorLastName: false,
      errorEmail: false,
      errorPassword: false,
      errorUniversity: false,
    };
  }

  signUp = () => { // Check that there are no bad or empty values that the user is attempting to signup
    if (this.state.firstName === '') {
      this.setState({ errorFirstName: true });
    } else {
      this.setState({ errorFirstName: false });
    }
    if (this.state.lastName === '') {
      this.setState({ errorLastName: true });
    } else {
      this.setState({ errorLastName: false });
    }
    if (this.state.email === '') {
      this.setState({ errorEmail: true });
    } else {
      this.setState({ errorEmail: false });
    }
    if (this.state.password === '') {
      this.setState({ errorPassword: true });
    } else {
      this.setState({ errorPassword: false });
    }
    if (this.state.university === '') {
      this.setState({ errorUniversity: true });
    } else {
      this.setState({ errorUniversity: false });
    }
    if (this.state.firstName !== ''
    && this.state.lastName !== ''
    && this.state.email !== ''
    && this.state.password !== ''
    && this.state.university !== '') {
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

  render() {
    return (
      <View>
        <Text>Create an Account</Text>
        <TextInput
          placeholder="First Name"
          onChangeText={(text) => { this.setState({ firstName: text }); }}
        />
        { this.state.errorFirstName === true ? (
          <Text>
              Please enter first name to proceed.
          </Text>
        ) : null }
        <TextInput
          placeholder="Last Name"
          onChangeText={(text) => { this.setState({ lastName: text }); }}
        />
        { this.state.errorLastName === true ? (
          <Text>
               Please enter last name to proceed.
          </Text>
        ) : null }
        <TextInput
          placeholder="Email"
          onChangeText={(text) => { this.setState({ email: text }); }}
        />
        { this.state.errorEmail === true ? (
          <Text>
                Please enter email to proceed.
          </Text>
        ) : null }
        <TextInput
          placeholder="Password"
          onChangeText={(text) => { this.setState({ password: text }); }}
        />
        { this.state.errorPassword === true ? (
          <Text>
              Please enter password to proceed.
          </Text>
        ) : null }
        <TextInput
          placeholder="University"
          onChangeText={(text) => { this.setState({ university: text }); }}
        />
        { this.state.errorUniversity === true ? (
          <Text>
              Please enter university to proceed.
          </Text>
        ) : null }
        <View>
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
