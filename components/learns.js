/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import Learn from './learn';

class Learns extends Component {
  render() {
    const learnSkills = this.props.learns.map((item) => {
      return <Learn key={item.id} learnId={item.id} nav={this.props.nav} title={item.title} />;
    });

    return (
      <View>
        { learnSkills }
      </View>
    );
  }
}

export default Learns;
