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
});

const Teach = (props) => {
  if (props.user.id === props.self.id) {
    return (
      <View>
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
