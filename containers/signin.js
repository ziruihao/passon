import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text, View, Button, TextInput,
} from 'react-native';
import { signinUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorEmail: false,
      errorPassword: false,
    };
  }

  signIn = () => { // Check that there are no bad or empty values that the user is attempting to signin
    if (this.state.email === '') {
      this.setState({ errorEmail: true });
    }
    if (this.state.email !== '') {
      this.setState({ errorEmail: false });
    }
    if (this.state.password === '') {
      this.setState({ errorPassword: true });
    }
    if (this.state.password !== '') {
      this.setState({ errorPassword: false });
    }
    if (this.state.email !== '' && this.state.password !== '') {
      this.props.signinUser({
        email: this.state.email,
        password: this.state.password,
      });
      if (this.props.authenticated) {
        this.props.navigation.navigate('Main');
      }
    }
  };

  render() {
    return (
      <View>
        <Text>Sign In</Text>
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
        <View>
          <Button onPress={() => { this.signIn(); }} title="Sign In" />
          <Button onPress={() => { this.props.navigation.navigate('SignUp'); }} title="I don't have an account yet." />
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

export default connect(mapStateToProps, { signinUser })(SignIn);
