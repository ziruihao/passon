import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Body,
  Right,
} from 'native-base';
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
  learnCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 70,
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

const Learn = (props) => {
  if (props.user.id === props.self.id) {
    return (
    // <View>
    //   <Text>{props.skill.title}</Text>
    //   <Button onPress={() => props.nav.navigate('EditSkillLearn', { skill: props.skill })} title="Edit Skill" />
    // </View>
      <View style={styles.learnCard}>
        <View style={styles.top}>
          <View><Text style={styles.title}>{props.skill.title}</Text></View>
          <View style={styles.icon}><Ionicons
            name="edit"
            size={16}
            onPress={() => props.nav.navigate('EditSkillTeach', { skill: props.skill })}
          />
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.learnCard}>
        <View><Text style={styles.title}>{props.skill.title}</Text></View>
      </View>
    );
  }
};

export default Learn;
