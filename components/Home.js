/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable global-require */
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
import { ActionViewColumn } from 'material-ui/svg-icons';
import {
  colors, fonts, padding, dimensions,
} from '../styles/base';
import { fetchUsers, fetchSelf } from '../actions';

const cardImage = require('../assets/sunset.jpg');

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
    };
    // this.intoProfile = this.intoProfile.bind(this); binding didnt help
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchSelf();
  }

  intoProfile(profile) {
    console.log('Profile: +++++++++++++++++++ ');
    console.log(profile);
    this.props.navigation.navigate('Profile', profile);
  }

  search(search_query) {
    this.setState({ search_query });
    console.log('querying search');
    console.log(this.state.search_query);
  }

  render() {
    let first, last, userName, otherUserName;
    if (this.props.self != null) {
      first = this.props.self.firstName;
      last = this.props.self.lastName;
    }
    const users = this.props.Users.map((element) => {
      // if (element.firstName !== first
      //   && element.lastName !== last) {
      return (
        <Container>
          {/* <Image source={require('gradient-background.svg')} style={{ width: '100%', height: '100%' }} /> */}
          <Content style={styles.container}>
            <TouchableHighlight onPress={() => this.intoProfile(element)} underlayColor="orange">
              <Card style={styles.mb}>
                <CardItem>
                  <Text> {element.firstName}</Text>
                  <Text> {element.lastName}</Text>
                  <Text> {element.email}</Text>
                </CardItem>
                <CardItem>
                  <CardItem>
                    <Text> {element.firstName}</Text>
                    <Text> {element.lastName}</Text>
                    <Text> {element.email}</Text>
                  </CardItem>
                  <CardItem>
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
                </CardItem>
              </Card>
            </TouchableHighlight>
          </Content>
          {/* <Image /> */}
        </Container>
      );
    });
    return (
      <Container>
        <Header searchBar rounded barStyle="light-content">
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={text => this.search(text)} />
          </Item>
        </Header>
        {users}
      </Container>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    Users: reduxState.user.all,
    self: reduxState.user.self,
  };
}

export default connect(mapReduxStateToProps, { fetchUsers, fetchSelf })(Home);
