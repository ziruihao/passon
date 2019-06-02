/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground,
} from 'react-native';
import { updateLearn, deleteLearn } from '../../../actions';
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


class EditSkillLearn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.navigation.state.params.skill.title,
      id: props.navigation.state.params.skill.id,
    };
  }

  delete = () => {
    this.props.deleteLearn(this.state.id);
    this.props.navigation.navigate('ProfileSelf');
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../../assets/background.png')} style={{ width: '100%', height: '100%' }}>
          <View style={styles.between}>
            <View style={styles.content}>
              <Text style={styles.title}>Edit Skill: {this.state.title}</Text>
              <TouchableOpacity style={styles.button} onPress={() => { this.delete(); }}>
                <Text style={styles.buttonText}>Delete</Text>
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

export default connect(null, { updateLearn, deleteLearn })(EditSkillLearn);
