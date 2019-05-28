import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {
  colors, fonts, padding, dimensions,
} from '../styles/base';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  // mb: {
  //   marginBottom: 15,
  // },
  teachCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 130,
    // marginBottom: 22,
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

const Teach = (props) => {
  if (props.user.id === props.self.id) {
    return (
      <View style={styles.teachCard}>
        <View style={styles.top}>
          <View><Text style={styles.title}>{props.skill.title}</Text></View>
          <View style={styles.icon}><Ionicons
            name="edit"
            size={16}
            onPress={() => props.nav.navigate('EditSkillTeach', { skill: props.skill })}
          />
          </View>
        </View>
        <Text style={styles.years}>{props.skill.years} yrs</Text>
        <Text style={styles.bio}>{props.skill.bio}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.teachCard}>
        <Text style={styles.title}>{props.skill.title}</Text>
        <Text style={styles.years}>{props.skill.years}</Text>
        <Text style={styles.bio}>{props.skill.bio}</Text>
      </View>
    );
  }
};

export default Teach;
