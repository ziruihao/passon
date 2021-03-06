/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-duplicates */
/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, Button, TextInput, ImageBackground, TouchableOpacity, Image,
} from 'react-native';
import Expo from 'expo';
import { signupUser } from '../../actions';
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
      choosingImage: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      university: '',
      profileImage: {},
      errorFirstName: false,
      errorLastName: false,
      errorEmail: false,
      errorPassword: false,
      errorUniversity: false,
    };
  }

  pickProfileImage = async () => {
    const Permissions = Expo.Permissions;
    // const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status.status === 'granted') {
      const options = {
        mediaTypes: 'Images',
      };
      // const pickedImage = await ImagePicker.launchImageLibraryAsync(options);
      // this.setState({ profileImage: pickedImage });
      // uploadImage(this.state.file).then((url) => {
      //   this.setState(prevState => ({
      //     input: Object.assign({}, prevState.input, { cover_url: url }),
      //   }));
      //   // use url for content_url and
      //   // either run your createPost actionCreator
      //   // or your updatePost actionCreator
      //   this.props.makePost(inputModified, this.props.history);
      // }).catch((error) => {
      // });
    } else {
      throw new Error('Location permission not granted');
    }
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
    }
  };

  render() {
    if (!this.state.choosingImage) {
      return (
        <View style={styles.container}>
          <ImageBackground source={require('../../assets/background.png')} style={{ width: dimensions.fullWidth, height: dimensions.fullHeight }}>
            <View style={styles.between}>
              <View style={styles.content}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Create an Account</Text>
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
                <TouchableOpacity style={styles.button} onPress={() => { this.pickProfileImage(); }}>
                  <Text style={styles.buttonText}>Pick Profile Image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.signUp}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
                <Image source={{ uri: this.state.profileImage.uri }} style={{ width: this.state.profileImage.width, height: this.state.profileImage.height }} />
              </View>
              <View style={styles.smallText}><Button color={colors.white} onPress={() => { this.props.navigation.navigate('SignIn'); }} title="I already have an account." /></View>
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground source={require('../../assets/background.png')} style={{ width: dimensions.fullWidth, height: dimensions.fullHeight }}>
            <View style={styles.between}>
              <View style={styles.content}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Pick Profile Image</Text>
                  <TouchableOpacity style={styles.button} onPress={this.pickProfileImage}>
                    <Text style={styles.buttonText}>Choose</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={this.signUp}>
                    <Text style={styles.buttonText}>Skip</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.auth.authenticated,
    authError: reduxState.auth.error,
  };
}

export default connect(mapStateToProps, { signupUser })(SignUp);
