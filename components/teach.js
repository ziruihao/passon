import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  mb: {
    marginBottom: 15,
  },
  teachCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 130,
    marginBottom: 22,
    borderColor: '#620BC9',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
});

const Teach = (props) => {
  if (props.user.id === props.self.id) {
    return (
      <View style={styles.teachCard}>
        <Text>{props.skill.title}</Text>
        <Text>{props.skill.years}</Text>
        <Text>{props.skill.bio}</Text>
        <Button onPress={() => props.nav.navigate('EditSkillTeach', { skill: props.skill })} title="Edit Skill" />
      </View>
    );
  } else {
    return (
      <View>
        <Text>{props.skill.title}</Text>
        <Text>{props.skill.years}</Text>
        <Text>{props.skill.bio}</Text>
      </View>
    );
  }
};

export default Teach;
