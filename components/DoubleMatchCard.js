import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Container, Content, TouchableHighlight, Card, CardItem, Left, Icon,
} from 'react-native';
import {
  colors, fonts, padding, dimensions,
} from '../styles/base';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4000F4',
    flex: 1,
    flexDirection: 'column',
  },
  mb: {
    marginBottom: 17,
    width: dimensions.fullWidth - (2 * dimensions.lg),
    height: 170,
    padding: dimensions.sm,
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: fonts.h2,
    color: '#620BC9',
  },

});

const DoubleMatchCard = (props) => {
  return (
    <Container key={props.element.id}>
      <Content style={styles.container}>
        <TouchableHighlight onPress={() => props.intoProfile(props.element)} underlayColor="orange">
          <Card style={styles.mb}>
            <CardItem>
              <Text> {props.element.firstName}</Text>
              <Text> {props.element.lastName}</Text>
            </CardItem>
            <CardItem>
              <CardItem>
                <CardItem>
                  <Left>
                    <Text>Teach Title</Text>
                    <Icon active name="star" />
                    <Text>5 stars</Text>
                    <Text>14 years</Text>
                  </Left>
                </CardItem>
              </CardItem>
            </CardItem>
          </Card>
        </TouchableHighlight>
      </Content>
    </Container>
  );
};

export default DoubleMatchCard;
