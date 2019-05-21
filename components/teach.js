import React from 'react';
import {
  StyleSheet, Text,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  mb: {
    marginBottom: 15,
  },
});

const Teach = (props) => {
  return (
    <Container style={styles.container}>
      <Header>
        <Body>
          <Title>{props.title}</Title>
        </Body>
        <Right />
      </Header>

      <Content padder>
        <Card style={styles.mb}>
          <CardItem>
            <Left>
              <Body>
                <Text>{props.years}</Text>
                <Text>{props.bio}</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </Content>

      <CardItem style={{ paddingVertical: 0 }}>
        <Left>
          <Button onPress={() => props.navigation.navigate('AddSkillTeach')}
            title="Add Skill"
          />
        </Left>
        <Body>
          <Button onPress={() => props.navigation.navigate('EditSkillTeach')}
            title="Edit Skill"
          />
        </Body>
      </CardItem>
    </Container>
  );
};

export default Teach;
