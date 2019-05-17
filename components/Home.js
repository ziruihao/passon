/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
  Text,
  ListView,
  TouchableHighlight,
} from 'react-native';
import Skill_Card from './Skill_Card';
import { fetchSkills } from '../actions';

const logo = require('../assets/sunset.jpg');
const cardImage = require('../assets/sunset.jpg');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  mb: {
    marginBottom: 15,
  },
});

class Home extends Component {
  componentDidMount() {
    this.props.fetchSkills();
  }

  intoProfile(profile) {
    this.props.navigation.navigate('User Profile', { profile });
  }

  render() {
    const skill_list = this.props.AllSkills.map((element) => {
      return (
        <div>
          <h1>{element.username}</h1>
          <h1>{element.skillname}</h1>
          <h1>{element.description}</h1>
          <h1>{element.rating}</h1>
        </div>
      );

      // return (
      //   // <TouchableHighlight onPress={() => { this.intoProfile(profile); }} underlayColor="orange">
      //     <div className="posts">
      //       <h1>{element.title}</h1>
      //       <h3>{element.tags}</h3>
      //       <img src={element.cover_url} alt="cover" />
      //     </div>
      //           <Container style={styles.container}>
      //           <Header>
      //             <Body>
      //               <Title>{element.name}</Title>
      //             </Body>
      //             <Right />
      //           </Header>

      //           <Content padder>
      //             <Card style={styles.mb}>
      //               <CardItem>
      //                 <Left>
      //                   <Thumbnail source={logo} />
      //                   <Body>
      //                     <Text>{element.description}</Text>
      //                   </Body>
      //                 </Left>
      //               </CardItem>

      //               <CardItem cardBody>
      //                 <Image
      //                   style={{
      //                     resizeMode: 'cover',
      //                     width: null,
      //                     height: 200,
      //                     flex: 1,
      //                   }}
      //                   source={cardImage}
      //                 />
      //               </CardItem>

      //               <CardItem style={{ paddingVertical: 0 }}>
      //                 <Left>
      //                   <Button transparent>
      //                     <Icon active name="thumbs-up" />
      //                     <Text>{element.skill}</Text>
      //                   </Button>
      //                 </Left>
      //                 <Body>
      //                   <Button transparent>
      //                     <Icon active name="chatbubbles" />
      //                     <Text>{element.rating}</Text>
      //                   </Button>
      //                 </Body>
      //                 <Right>
      //                   <Text>11h ago</Text>
      //                 </Right>
      //               </CardItem>
      //             </Card>
      //           </Content>
      //         </Container>
      //   {/* </TouchableHighlight> */}
      // );
    });
    return skill_list;
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    AllSkills: reduxState.posts.all,
  };
}

export default connect(mapReduxStateToProps, { fetchSkills })(Home);
