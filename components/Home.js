/* eslint-disable react/no-access-state-in-setstate */
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
import {
  fetchUsers, fetchTeachers, fetchLearners, fetchSearch, fetchSelf,
} from '../actions';

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
      double_matches: [],
      single_matches: [],
    };
    // this.intoProfile = this.intoProfile.bind(this); binding didnt help
  }

  componentDidMount() {
    this.fetchUsers().then(() => {
      this.combineUsers();
    }).catch((error) => {
      console.log(error);
    });

    this.props.fetchSelf();
  }

  fetchUsers() {
    return new Promise((resolve, reject) => {
      this.props.fetchTeachers({
        skills: ['Golf', 'Tennis'],
      }).then(() => {
        this.props.fetchLearners({
          skills: ['Golf'],
        }).then(() => {
          resolve();
        });
      }).catch(error => reject(error));
      // this.props.fetchLearners({ skills: ['Golf'] });
    });
  }

  combineUsers() {
    this.setState({
      double_matches: this.props.teachers.filter((teacher) => {
        let includes = false;
        this.props.learners.forEach((learner) => {
          if (learner.id === teacher.id) includes = true;
        });
        return includes;
      }),
    });
    this.setState({
      single_matches: this.props.teachers.concat(this.props.learners).filter((user) => {
        let notIncludes = true;
        this.state.double_matches.forEach((double_matcher) => {
          if (double_matcher.id === user.id) notIncludes = false;
        });
        return notIncludes;
      }),
    });
    // console.log('teachers');
    // console.log(this.props.teachers);
    // console.log('learners');
    // console.log(this.props.learners);
    // console.log('double');
    // console.log(this.state.double_matches);
    // console.log('single');
    // console.log(this.state.single_matches);
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

  renderContent = () => {
    if (this.state.search_query === '') {
      return (
        <Container>
          {this.renderMatches()}
        </Container>
      );
    } else {
      return (
        <Container>
          {this.renderSearch()}
        </Container>
      );
    }
  };

  renderSearch = () => {
    this.props.fetchSearch({
      skills: [this.state.search_query],
    });

    console.log(this.props.search);

    return (
      this.props.search.map((element) => {
        // console.log('==== ELEMENT ====')
        if (element.id !== this.props.self.id) {
          return (
            <Container key={element.id}>
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
        }
      })
    );
  };

  renderMatches = () => {
    let first, last, userName, otherUserName;
    if (this.props.self != null) {
      first = this.props.self.firstName;
      last = this.props.self.lastName;
    }
    const double_matches = this.state.double_matches.map((element) => {
      if (element.id !== this.props.self.id) {
        return (
          <Container key={element.id}>
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
            {/* <Image /> */}
          </Container>
        );
      }
    });
    const single_matches = this.state.single_matches.map((element) => {
      if (element.id !== this.props.self.id) {
        return (
          <Container key={element.id}>
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
      }
    });
    return (
      <Container>
        <Text>Double Matches</Text>
        {double_matches}
        <Text>Single Matches</Text>
        {single_matches}
      </Container>
    );
  };

  render() {
    return (
      <Container>
        <Header searchBar rounded barStyle="light-content">
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={text => this.search(text)} />
          </Item>
        </Header>
        <Container>
          {this.renderContent()}
        </Container>
      </Container>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    Users: reduxState.user.all,
    teachers: reduxState.user.teachers,
    learners: reduxState.user.learners,
    self: reduxState.user.self,
    search: reduxState.user.search,
  };
}

export default connect(mapReduxStateToProps, {
  fetchUsers, fetchLearners, fetchTeachers, fetchSearch, fetchSelf,
})(Home);
