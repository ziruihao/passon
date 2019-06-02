/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground,
} from 'react-native';
import { addLearn } from '../../../actions';
import {
  colors, fonts, padding, dimensions,
} from '../../../styles/base';

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
  error: {
    color: colors.white,
  },
  buttonText: {
    fontFamily: 'quicksand-bold',
    color: colors.accent,
    fontSize: 20,
  },
});

class AddSkillLearn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      errorTitle: false,
    };
  }

  add = () => { // Check that there are no bad or empty values that the user is attempting to post
    if (this.state.title === '') {
      this.setState({ errorTitle: true });
    } else {
      this.setState({ errorTitle: false });
      this.props.addLearn({
        skill: {
          title: this.state.title,
        },
      });
      this.props.navigation.navigate('ProfileSelf');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/background.png')} style={{ width: '100%', height: '100%' }}>
          <View style={styles.between}>
            <View style={styles.content}>
              <Text style={styles.title}>Add Skill</Text>
              { this.state.errorTitle === true ? (
                <Text style={styles.error}>
                  Please enter skill title to proceed.
                </Text>
              ) : null }
              <TextInput
                style={styles.input}
                placeholder="Skill"
                placeholderTextColor="#9A989E"
                onChangeText={(text) => { this.setState({ title: text }); }}
              />
              <TouchableOpacity style={styles.button} onPress={() => { this.add(); }}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate('ProfileSelf'); }}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default connect(null, { addLearn })(AddSkillLearn);
