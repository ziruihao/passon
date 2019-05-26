import React from 'react';
import {
  StyleSheet, Text, View, Button,
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
  // <Container style={styles.container}>
  //   <Header>
  //     <Body>
  //       <Title>{props.title}</Title>
  //     </Body>
  //     <Right />
  //   </Header>
  // </Container>
  if (props.user.id === props.self.id) {
    return (
      <View>
        <Text>{props.skill.title}</Text>
        <Button onPress={() => props.nav.navigate('EditSkillLearn', { skill: props.skill })} title="Edit Skill" />
      </View>
    );
  } else {
    return (
      <View>
        <Text>{props.skill.title}</Text>
      </View>
    );
  }
};

export default Learn;
