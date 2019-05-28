/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, Button, TextInput, ImageBackground,
} from 'react-native';
import { addLearn } from '../actions';
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: fonts.h3,
    color: '#FFFFFF',
    margin: 30,
  },
  input: {
    width: 276,
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
    marginBottom: 10,
    color: '#2D2A32',
    borderWidth: 1,
    borderColor: '#620BC9',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonSave: {
    backgroundColor: '#620BC9',
    borderRadius: 5,
    width: 131,
    height: 41,
    fontSize: fonts.p1,
    margin: 5,
  },
  buttonCancel: {
    backgroundColor: '#A21F77',
    borderRadius: 5,
    width: 131,
    height: 41,
    fontSize: fonts.p1,
    margin: 5,
  },
  error: {
    color: '#505050',
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
        <ImageBackground source={require('../assets/skillBackground.png')} style={{ width: '100%', height: '100%' }}>
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
              onChangeText={(text) => { this.setState({ title: text }); }}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.buttonSave}><Button color={colors.white} onPress={() => { this.add(); }} title="Save" /></View>
              <View style={styles.buttonCancel}><Button color={colors.white} onPress={() => { this.props.navigation.navigate('ProfileSelf'); }} title="Cancel" /></View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default connect(null, { addLearn })(AddSkillLearn);
