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
import { fetchUsers } from '../actions';

const logo = require('../assets/sunset.jpg');
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
    const users = this.props.Users.map((element) => {
      // console.log('element: ');

      return (
        <Container>
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
    });
    return (
      <Container>
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
        {users}
      </Container>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    Users: reduxState.user.all,
  };
}

export default connect(mapReduxStateToProps, { fetchUsers })(Home);
