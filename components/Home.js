/* eslint-disable react/jsx-pascal-case */

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
import {
  Container,
  Header,
  Content,
  Item,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Input,
  Body,
  Right,
} from 'native-base';

const logo = require('../assets/sunset.jpg');
const cardImage = require('../assets/sunset.jpg');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4000F4',
  },
  mb: {
    marginBottom: 17,
    width: 297,
    height: 170,
  },
});

class Home extends Component {
  static navigationOptions = {
    header: null,
    // title: 'Home',
    // headerStyle: {
    //   backgroundColor: 'white',
    // },
    // headerTintColor: 'black',
  }

  constructor(props) {
    super(props);
    this.state = {
      search_query: '',
      profile: {},
    };
  }

  componentDidMount() {
    // this.props.fetchSkills();
  }

  intoProfile(profile) {
    this.props.navigation.navigate('Profile', profile);
  }

  search(search_query) {
    this.setState({ search_query });
    console.log('querying search');
    console.log(this.state.search_query);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded barStyle="light-content">
          {/* <Item> */}
          {/* <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button> */}
          {/* </Item> */}
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={text => this.search(text)} />
          </Item>
        </Header>
        <Content padder>
          <TouchableHighlight onPress={() => this.intoProfile(this.state.profile)} underlayColor="orange">
            <Card style={styles.mb}>
              <CardItem header>
                <Text>Skillname</Text>
              </CardItem>
              <CardItem footer>
                <CardItem>
                  <Left>
                    <Icon active name="star" />
                    <Text>5 stars</Text>
                    <Text>X yrs</Text>
                  </Left>
                </CardItem>

                <CardItem>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      width: null,
                      height: 200,
                      flex: 1,
                    }}
                    source={cardImage}
                  />
                </CardItem>
              </CardItem>
            </Card>
          </TouchableHighlight>
        </Content>
      </Container>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    AllSkills: reduxState.skills.all,
  };
}

export default connect(mapReduxStateToProps, null)(Home);
