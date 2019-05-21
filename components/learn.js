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
  CardItem,
  Button,
  Left,
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

      <CardItem style={{ paddingVertical: 0 }}>
        <Left>
          <Button onPress={() => props.navigation.navigate('AddSkillLearn')}
            title="Add Skill"
          />
        </Left>
        <Body>
          <Button onPress={() => props.navigation.navigate('EditSkillLearn')}
            title="Edit Skill"
          />
        </Body>
      </CardItem>
    </Container>
  );
};

export default Learn;
