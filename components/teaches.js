/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import Teach from './teach';

class Teaches extends Component {
  render() {
    const teachSkills = this.props.teaches.map((item) => {
      return <Teach key={item.id} nav={this.props.nav} skill={item} user={this.props.user} self={this.props.self} />;
    });

    return (
      <View>
        { teachSkills }
      </View>
    );
  }
}

export default Teaches;
