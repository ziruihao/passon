/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground,
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: fonts.h3,
//     color: '#FFFFFF',
//     margin: 30,
//   },
//   input: {
//     width: 276,
//     height: 45,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 5,
//     padding: 10,
//     marginTop: 30,
//     marginBottom: 10,
//     color: '#2D2A32',
//     borderWidth: 1,
//     borderColor: '#620BC9',
//   },
//   buttonDelete: {
//     backgroundColor: '#620BC9',
//     borderRadius: 5,
//     width: 131,
//     height: 41,
//     fontSize: fonts.p1,
//     margin: 5,
//   },
//   buttonCancel: {
//     backgroundColor: '#A21F77',
//     borderRadius: 5,
//     width: 131,
//     height: 41,
//     fontSize: fonts.p1,
//     margin: 5,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
// });

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
        <ImageBackground source={require('../assets/background.png')} style={{ width: '100%', height: '100%' }}>
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

    // <View style={styles.container}>
    //   <ImageBackground source={require('../assets/skillBackground.png')} style={{ width: '100%', height: '100%' }}>
    //     <View style={styles.content}>
    //       <Text style={styles.title}>Edit Skill: {this.state.title}</Text>
    //       <View style={styles.buttonContainer}>
    //         <View style={styles.buttonDelete}>
    //           <Button color={colors.white} onPress={() => { this.delete(); }} title="Delete" />
    //         </View>
    //         <View style={styles.buttonCancel}><Button color={colors.white} onPress={() => { this.props.navigation.navigate('ProfileSelf'); }} title="Cancel" /></View>
    //       </View>
    //     </View>
    //   </ImageBackground>
    // </View>
    );
  }
}

export default connect(null, { updateLearn, deleteLearn })(EditSkillLearn);
