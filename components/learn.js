import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Body,
  Right,
} from 'native-base';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  mb: {
    marginBottom: 15,
  },
});

const Learn = (props) => {
  return (
    <Container style={styles.container}>
      <Header>
        <Body>
          <Title>{props.title}</Title>
        </Body>
        <Right />
      </Header>
    </Container>
  );
};

export default Learn;
