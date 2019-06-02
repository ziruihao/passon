/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, ImageBackground, TouchableOpacity, Image,
} from 'react-native';
import { Font } from 'expo';
import {
  colors, fonts, padding, dimensions,
} from '../styles/base';
import { signinUser } from '../actions';

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
  title: {
    fontFamily: 'quicksand-bold',
    fontSize: fonts.h1,
    color: '#FFFFFF',
    margin: 20,
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
  buttonText: {
    fontFamily: 'quicksand-bold',
    color: colors.accent,
    fontSize: 20,
  },
  logo: {
    width: '50%',
    height: '25%',
    flex: 0,
    resizeMode: 'contain',
  },
});
const authTestUser = (props) => {
  props.signinUser({
    email: 'Passon',
    password: 'password',
  }, props.navigation);
};
class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/background.png')} style={{ width: '100%', height: '100%' }}>
          <View style={styles.content}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            {
              this.state.fontLoaded ? (
                <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate('SignIn'); }}>
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
              ) : null
            }
            {
              this.state.fontLoaded ? (
                <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate('SignUp'); }}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              ) : null
            }
          </View>
        </ImageBackground>
      </View>
    );
  }
}
export default connect(null, { signinUser })(Splash);
