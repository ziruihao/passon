/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, Button, TextInput, ImageBackground,
} from 'react-native';
import { updateLearn, deleteLearn } from '../actions';
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
  buttonDelete: {
    backgroundColor: '#620BC9',
    borderRadius: 5,
    width: 131,
    height: 41,
    fontSize: fonts.p1,
    margin: 5,
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
        <ImageBackground source={require('../assets/skillBackground.png')} style={{ width: '100%', height: '100%' }}>
          <Text style={styles.title}>Edit Skill: {this.state.title}</Text>
          <View style={styles.buttonDelete}>
            <Button color={colors.white} onPress={() => { this.delete(); }} title="Delete" />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default connect(null, { updateLearn, deleteLearn })(EditSkillLearn);
