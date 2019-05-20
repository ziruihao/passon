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
    };
  }

  signIn = () => { // Check that there are no bad or empty values that the user is attempting to signin
    if (this.state.email === ''
      || this.state.password === '') {
      this.setState({ valid_entry: false });
    } else {
      this.props.signinUser({
        email: this.state.email,
        password: this.state.password,
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
        <Text>Please fill in missing fields.</Text>
      );
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
        <TextInput
          placeholder="Password"
          onChangeText={(text) => { this.setState({ password: text }); }}
        />
        <View>
          {this.renderResponse()}
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
