import React from 'react';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {
  colors, fonts, padding, dimensions,
} from '../../styles/base';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
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

class Teaches extends React.Component {
  intoRating = (skill) => {
    this.props.nav.navigate('AddRating', skill);
  };

  arrAvg = (arr) => {
    let sum = 0;
    let ct = 0;

    for (let i = 0; i < arr.length; i += 1) {
      sum += arr[i].score;
      ct += 1;
    }

    if (ct === 0) {
      return (
        <Text>No rating</Text>
      );
    } else {
      const avg = (sum / ct).toFixed(1);

      return (
        <Text>{avg} rating</Text>
      );
    }
  };

  render() {
    const teachSkills = this.props.teaches.map((skill) => {
      if (this.props.user.id === this.props.self.id) {
        return (
          <View key={skill.id} style={styles.teachCard}>
            <View style={styles.top}>
              <View><Text style={styles.title}>{skill.title}</Text></View>
              <View style={styles.icon}><Ionicons
                name="edit"
                size={16}
                onPress={() => this.props.nav.navigate('EditSkillTeach', { skill })}
              />
              </View>
            </View>
            <Text style={styles.years}>{skill.years} yrs | {this.arrAvg(skill.ratings)}</Text>
            <Text style={styles.bio}>{skill.bio}</Text>
          </View>
        );
      } else {
        return (
          <View key={skill.id} style={styles.teachCard}>
            <View style={styles.top}>
              <View><Text style={styles.title}>{skill.title}</Text></View>
              <View style={styles.icon}><Ionicons
                name="star"
                size={16}
                onPress={() => this.intoRating(skill)}
              />
              </View>
            </View>
            <Text style={styles.years}>{skill.years} yrs | {this.arrAvg(skill.ratings)}</Text>
            <Text style={styles.bio}>{skill.bio}</Text>
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
    });

    return (
      <View>
        {teachSkills}
      </View>
    );
  }
}

export default Teaches;
