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
  return (
    // <Container style={styles.container}>
    //   <Header>
    //     <Body>
    //       <Title>{props.title}</Title>
    //     </Body>
    //     <Right />
    //   </Header>
    // </Container>
    <View>
      <Text>{props.title}</Text>
      <Button onPress={() => props.nav.navigate('EditSkillLearn')} title="Edit Skill" />
    </View>
  );
};

export default Learn;
