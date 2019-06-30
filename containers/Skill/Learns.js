/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {
  colors, fonts, padding, dimensions,
} from '../../styles/base';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  learnCard: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 300,
    height: 'auto',
    borderColor: '#620BC9',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 10,
  },
  title: {
    color: '#620BC9',
    fontSize: fonts.p1,
    margin: 10,
    fontFamily: 'quicksand-regular',
  },
  years: {
    color: '#505050',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bio: {
    color: '#505050',
    fontSize: 14,
  },
  top: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

class Learns extends React.Component {
  render() {
    const learnSkills = this.props.learns.map((skill) => {
      if (this.props.user._id === this.props.self._id) {
        return (
          <View key={skill.id} style={styles.learnCard}>
            <View style={styles.top}>
              <View><Text style={styles.title}>{skill.title}</Text></View>
              <View style={styles.icon}><Ionicons
                name="edit"
                size={16}
                onPress={() => this.props.nav.navigate('EditSkillLearn', skill)}
              />
              </View>
            </View>
          </View>
        );
      } else {
        return (
          <View key={skill.id} style={styles.learnCard}>
            <View><Text style={styles.title}>{skill.title}</Text></View>
          </View>
        );
      }
    });

    return (
      <View>
        {learnSkills}
      </View>
    );
  }
}

export default Learns;
