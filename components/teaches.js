/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  View,
  Text, Button,
} from 'react-native';
import Teach from './teach';

class Teaches extends Component {
  intoRating(item) {
    // console.log('Profile: +++++++++++++++++++ ');
    // console.log(profile);
    this.props.nav.navigate('AddRating', item);
  }

  render() {
    const teachSkills = this.props.teaches.map((item) => {
      return (
        <View>
          <Teach key={item.id} nav={this.props.nav} skill={item} user={this.props.user} self={this.props.self} />
          <Button title="Add rating"
            onPress={() => this.intoRating(item)}
          />
        </View>
      );
    });

    return (
      <View>
        { teachSkills }
      </View>
    );
  }
}

export default Teaches;
