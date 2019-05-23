/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import Teach from './teach';

class Teaches extends Component {
  render() {
    console.log('TEACHES COMPONENT');
    console.log(this.props.teaches);

    const teachSkills = this.props.teaches.map((item) => {
      return <Teach key={item.id} teachId={item.id} title={item.title} years={item.years} bio={item.bio} ratings={item.ratings} />;
    });

    return (
      <View>
        { teachSkills }
      </View>
    );
  }
}

export default Teaches;
