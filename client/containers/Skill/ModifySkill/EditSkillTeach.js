/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground,
} from 'react-native';
import { updateTeach, deleteTeach } from '../../../actions';
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


class EditSkillTeach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.navigation.state.params.skill.title,
      years: props.navigation.state.params.skill.years,
      bio: props.navigation.state.params.skill.bio,
      id: props.navigation.state.params.skill.id,
      errorYears: false,
      errorBio: false,
    };
  }

  edit = () => { // Check that there are no bad or empty values that the user is attempting to post
    if (this.state.years === '') {
      this.setState({ errorYears: true });
    } else {
      this.setState({ errorYears: false });
    }
    if (this.state.bio === '') {
      this.setState({ errorBio: true });
    } else {
      this.setState({ errorBio: false });
    }
    if (this.state.years !== ''
    && this.state.bio !== '') {
      this.props.updateTeach({
        skill: {
          years: this.state.years,
          bio: this.state.bio,
          id: this.state.id,
        },
      });
      this.props.navigation.navigate('ProfileSelf');
    }
  };

  delete = () => {
    this.props.deleteTeach(this.state.id);
    this.props.navigation.navigate('ProfileSelf');
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../../assets/background.png')} style={{ width: '100%', height: '100%' }}>
          <View style={styles.between}>
            <View style={styles.content}>
              <Text style={styles.title}>Edit Skill: {this.state.title}</Text>
              { this.state.errorYears === true ? (
                <Text style={styles.error}>
                  Please enter years of experience to proceed.
                </Text>
              ) : null }
              <TextInput
                style={styles.input}
                placeholderTextColor="#9A989E"
                placeholder="Years of experience"
                keyboardType="numeric"
                onChangeText={(text) => { this.setState({ years: Number(text) }); }}
                defaultValue={this.state.years.toString()}
              />
              { this.state.errorBio === true ? (
                <Text style={styles.error}>
                  Please enter description of experience to proceed.
                </Text>
              ) : null }
              <TextInput
                style={styles.input}
                placeholderTextColor="#9A989E"
                placeholder="Description of experience"
                onChangeText={(text) => { this.setState({ bio: text }); }}
                defaultValue={this.state.bio}
              />
              <TouchableOpacity style={styles.button} onPress={() => { this.edit(); }}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
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

export default connect(null, { updateTeach, deleteTeach })(EditSkillTeach);
