/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import Learn from './learn';

class Learns extends Component {
  render() {
    const learnSkills = this.props.learns.map((item) => {
      return <Learn key={item.id} nav={this.props.nav} skill={item} user={this.props.user} self={this.props.self} />;
    });

    return (
      <View>
        { learnSkills }
      </View>
    );
  }
}

export default Learns;
