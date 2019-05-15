/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
// import {
//   Left, Button, Icon, Container,
// } from 'react-native';
import Skill_Card from './Skill_Card';

class Home extends Component {
  render() {
    return (
    // <Container>
    //   <Left>
    //     <Button transparent onPress={() => this.props.navigation.goBack()}>
    //       <Icon name="arrow-back" />
    //     </Button>
    //   </Left>

      // </Container>
      <Skill_Card />
    );
  }
}


export default Home;
