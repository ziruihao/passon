/* eslint-disable global-require */
import React from 'react';
import {
  StyleSheet, View, Button, Text, ImageBackground,
} from 'react-native';
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
  title: {
    fontSize: fonts.h1,
    color: '#FFFFFF',
    margin: 20,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    width: 213,
    height: 53,
    fontSize: fonts.h1,
    justifyContent: 'center',
    margin: 10,
  },
});

const FirstScreen = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/background.png')} style={{ width: '100%', height: '100%' }}>
        <View style={styles.content}>
          <Text style={styles.title}>PassOn</Text>
          <View style={styles.button}><Button color={colors.posButton} onPress={() => { props.navigation.navigate('SignIn'); }} title="Sign In" /></View>
          <View style={styles.button}><Button color={colors.posButton} onPress={() => { props.navigation.navigate('SignUp'); }} title="Sign Up" /></View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default FirstScreen;
