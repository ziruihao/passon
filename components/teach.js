import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Button,
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
  if (props.user.id === props.self.id) {
    return (
      <View>
        <Text>{props.skill.title}</Text>
        <Text>{props.skill.years}</Text>
        <Text>{props.skill.bio}</Text>
        <Button onPress={() => props.nav.navigate('EditSkillTeach', { skill: props.skill })} title="Edit Skill" />
      </View>
    );
  } else {
    return (
      <View>
        <Text>{props.skill.title}</Text>
        <Text>{props.skill.years}</Text>
        <Text>{props.skill.bio}</Text>
      </View>
    );
  }
};

export default Teach;

// <Container style={styles.container}>
//   <Header>
//     <Body>
//       <Title>{props.title}</Title>
//     </Body>
//     <Right />
//   </Header>

//   <Content padder>
//     <Card style={styles.mb}>
//       <CardItem>
//         <Left>
//           <Body>
//             <Text>{props.years}</Text>
//             <Text>{props.bio}</Text>
//           </Body>
//         </Left>
//       </CardItem>
//     </Card>
//   </Content>
// </Container>
