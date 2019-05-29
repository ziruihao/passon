import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 300,
    height: 'auto',
    borderColor: colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 10,
  },
  title: {
    color: colors.primary,
    fontSize: fonts.p1,
    margin: 10,
    fontFamily: 'quicksand-regular',
  },
  years: {
    color: '#505050',
    fontSize: 14,
    fontFamily: 'quicksand-bold',
  },
  bio: {
    color: '#505050',
    fontSize: 14,
    fontFamily: 'quicksand-regular',
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
  addRatingText: {
    color: colors.accent,
    fontSize: 14,
    fontFamily: 'quicksand-regular',
  },
  buttonContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Teach extends Component {
  intoRating = (item) => {
    // console.log('Profile: +++++++++++++++++++ ');
    // console.log(profile);
    this.props.nav.navigate('AddRating', item);
  }

  render() {
    if (this.props.user.id === this.props.self.id) {
      return (
        <View style={styles.teachCard}>
          <View style={styles.top}>
            <View><Text style={styles.title}>{this.props.skill.title}</Text></View>
            <View style={styles.icon}><Ionicons
              name="edit"
              size={16}
              onPress={() => this.props.nav.navigate('EditSkillTeach', { skill: this.props.skill })}
            />
            </View>
          </View>
          <Text style={styles.years}>{this.props.skill.years} yrs</Text>
          <Text style={styles.bio}>{this.props.skill.bio}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.teachCard}>
          <View style={styles.top}>
            <View><Text style={styles.title}>{this.props.skill.title}</Text></View>
            <View style={styles.icon}><Ionicons
              name="star"
              size={16}
              onPress={() => this.intoRating(this.props.skill)}
            />
            </View>
          </View>
          {/* <Text style={styles.title}>{this.props.skill.title}</Text> */}
          <Text style={styles.years}>{this.props.skill.years} yrs</Text>
          <Text style={styles.bio}>{this.props.skill.bio}</Text>
          {/* <Button title="Add rating"
            onPress={() => this.intoRating(this.props.skill)}
          /> */}
          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => this.intoRating(this.props.skill)}>
              <Text style={styles.addRatingText}>Add Rating</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      );
    }
  }
}

export default Teach;
