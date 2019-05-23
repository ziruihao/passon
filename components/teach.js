import React from 'react';
import {
  StyleSheet, Text, View,
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
  return (
    <View>
      <Text>{props.title}</Text>
      <Text>{props.years}</Text>
      <Text>{props.bio}</Text>
    </View>
  );
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
