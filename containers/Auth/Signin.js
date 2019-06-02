/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, Button, TextInput, ImageBackground, TouchableOpacity,
} from 'react-native';
import { Font } from 'expo';
import { signinUser } from '../../actions';
import {
  colors, fonts, padding, dimensions,
} from '../../styles/base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  between: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: fonts.h1,
    color: colors.white,
    margin: 30,
    fontFamily: 'quicksand-bold',
  },
  input: {
    width: 276,
    height: 45,
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#2D2A32',
  },
  button: {
    backgroundColor: colors.white,
    borderRadius: 50,
    width: 213,
    height: 53,
    fontSize: fonts.h1,
    margin: 10,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    fontSize: fonts.p3,
    margin: 10,
  },
  errorText: {
    color: colors.white,
  },
  buttonText: {
    fontFamily: 'quicksand-bold',
    color: colors.accent,
    fontSize: 20,
  },
});

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

  signIn = async () => { // Check that there are no bad or empty values that the user is attempting to signin
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
      await this.props.signinUser({
        email: this.state.email,
        password: this.state.password,
      }, this.props.navigation); // we don't need the below code, because the [actionCreator] will navigate for us
      // if (this.props.authenticated) {
      //   this.props.navigation.navigate('Main');
      // } else if (this.props.authError !== '') {
      //   alert('Sign In Failed');
      // }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/background.png')} style={{ width: '100%', height: '100%' }}>
          <View style={styles.between}>
            <View style={styles.content}>
              <Text style={styles.title}>Sign In</Text>
              { this.state.errorEmail === true ? (
                <Text style={styles.errorText}>
                    Please enter email to proceed.
                </Text>
              ) : null }
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#9A989E"
                onChangeText={(text) => { this.setState({ email: text }); }}
              />
              { this.state.errorPassword === true ? (
                <Text style={styles.errorText}>
                    Please enter password to proceed.
                </Text>
              ) : null }
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#9A989E"
                secureTextEntry
                onChangeText={(text) => { this.setState({ password: text }); }}
              />
              <TouchableOpacity style={styles.button} onPress={() => { this.signIn(); }}>
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.smallText}><Button color={colors.white} onPress={() => { this.props.navigation.navigate('SignUp'); }} title="I don't have an account yet." /></View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.auth.authenticated,
    authError: reduxState.auth.error,
  };
}

export default connect(mapStateToProps, { signinUser })(SignIn);
