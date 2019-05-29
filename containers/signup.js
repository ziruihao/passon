/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, Button, TextInput, ImageBackground, TouchableOpacity,
} from 'react-native';
import { Font } from 'expo';
import { signupUser } from '../actions';
import {
  colors, fonts, padding, dimensions,
} from '../styles/base';

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
    color: '#FFFFFF',
    margin: 30,
    fontFamily: 'quicksand-bold',
  },
  input: {
    width: 276,
    height: 45,
    backgroundColor: '#FFFFFF',
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
    color: '#FFFFFF',
  },
  buttonText: {
    fontFamily: 'quicksand-bold',
    color: colors.accent,
    fontSize: 20,
  },
  titleContainer: {
    flex: 0,
    justifyContent: 'center',
    textAlign: 'center',
  },
});

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
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'quicksand-bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    }).then((response) => {
      this.setState({ fontLoaded: true });
    })
      .catch((error) => {
        console.log(error);
      });
  }

  signUp = async () => { // Check that there are no bad or empty values that the user is attempting to signup
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
      await this.props.signupUser({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        university: this.state.university,
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
        <ImageBackground source={require('../assets/background.png')} style={{ width: '100%', height: '100%' }}>
          <View style={styles.between}>
            <View style={styles.content}>
              <View style={styles.titleContainer}>
                {
                  this.state.fontLoaded ? (
                    <Text style={styles.title}>Create an Account</Text>
                  ) : null
                }
              </View>
              { this.state.errorFirstName === true ? (
                <Text style={styles.errorText}>
              Please enter first name to proceed.
                </Text>
              ) : null }
              <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={(text) => { this.setState({ firstName: text }); }}
              />
              { this.state.errorLastName === true ? (
                <Text style={styles.errorText}>
               Please enter last name to proceed.
                </Text>
              ) : null }
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={(text) => { this.setState({ lastName: text }); }}
              />
              { this.state.errorEmail === true ? (
                <Text style={styles.errorText}>
                Please enter email to proceed.
                </Text>
              ) : null }
              <TextInput
                style={styles.input}
                placeholder="Email"
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
                secureTextEntry
                onChangeText={(text) => { this.setState({ password: text }); }}
              />
              { this.state.errorUniversity === true ? (
                <Text style={styles.errorText}>
              Please enter university to proceed.
                </Text>
              ) : null }
              <TextInput
                style={styles.input}
                placeholder="University"
                onChangeText={(text) => { this.setState({ university: text }); }}
              />
              {
                this.state.fontLoaded ? (
                  <TouchableOpacity style={styles.button} onPress={() => { this.signUp(); }}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>
                ) : null
              }
            </View>
            <View style={styles.smallText}><Button color={colors.white} onPress={() => { this.props.navigation.navigate('SignIn'); }} title="I already have an account." /></View>
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

export default connect(mapStateToProps, { signupUser })(SignUp);
