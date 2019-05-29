/* eslint-disable global-require */
/* eslint-disable consistent-return */
import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { addRating } from '../actions';
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

class AddRating extends React.Component {
  static navigationOptions = {
    title: 'Add a Rating',
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: 'black',
  };

  constructor(props) {
    super(props);

    this.state = {
      score: '',
      errorRating: false,
    };
  }

  add = () => {
    if (this.state.score === '') {
      this.setState({ errorRating: true });
    } else {
      this.setState({ errorRating: false });
    }
    if (this.state.score !== '') {
      this.props.addRating({
        skill: {
          id: this.props.navigation.state.params.id,
          score: this.state.score,
        },
      });
      this.props.navigation.navigate('Profile');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/background.png')} style={{ width: '100%', height: '100%' }}>
          <View style={styles.between}>
            <View style={styles.content}>
              <Text style={styles.title}>Add Rating</Text>
              { this.state.errorRating === true ? (
                <Text>
                  Please enter rating score to proceed.
                </Text>
              ) : null }
              <TextInput
                style={styles.input}
                placeholder="Rating"
                placeholderTextColor="#9A989E"
                onChangeText={(text) => { this.setState({ score: text }); }}
              />
              <TouchableOpacity style={styles.button} onPress={() => { this.add(); }}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate('Profile'); }}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default connect(null, { addRating })(AddRating);
