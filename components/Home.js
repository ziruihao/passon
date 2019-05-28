/* eslint-disable no-param-reassign */
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
  TouchableHighlight,
  FlatList,
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
  fetchUsers, fetchTeachers, fetchLearners, fetchSelf,
} from '../actions';
import DoubleMatchCard from './DoubleMatchCard';

// const cardImage = require('../assets/sunset.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    width: '100%',
  },
  cards: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  // mb: {
  //   marginBottom: 17,
  //   width: dimensions.fullWidth - (2 * dimensions.lg),
  //   height: 170,
  //   padding: dimensions.sm,
  //   flex: 1,
  // },
  title: {
    flex: 1,
    fontSize: fonts.h2,
    color: '#620BC9',
  },
  card: {
    height: 170,
    width: 297,
    borderRadius: 10,
    color: '#FFFFFF',
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
    this.props.fetchSelf().then(() => {
      this.fetchUsers([]).then(() => { // we need to pass in that empty array
        this.combineUsers();
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  // why do we need this?
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.fetchUsers([]).then(() => {
        this.combineUsers();
      }).catch((error) => {
        console.log(error);
      });
      this.props.fetchSelf();
    }
  }

  /**
   * Handles rendering for a [user].
   */
  renderUser = (element) => {
    console.log(element.item.id === this.props.self.id);
    if (element.item.id !== this.props.self.id) {
      return (
        <Content style={styles.container}>
          {/* <Image source={require('gradient-background.svg')} style={{ width: '100%', height: '100%' }} /> */}
          <TouchableHighlight onPress={() => this.intoProfile(element.item)} underlayColor="orange">
            <Card style={styles.mb}>
              <CardItem>
                <Text> {element.item.firstName}</Text>
                <Text> {element.item.lastName}</Text>
              </CardItem>
              <CardItem>
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
      );
    }
  };

  /**
   * Fetches both [teachers] and [learners] based on a [search_query] and [self.teach].
   * @param {Array} learn_arr
   */
  fetchUsers(learn_arr) {
    const teach_arr = [];
    this.props.self.teach.forEach(elem => teach_arr.push(elem.title));
    if (learn_arr.length === 0 || learn_arr[0] === '') learn_arr = this.props.self.learn.map(elem => elem.title);

    // We want to fetch the teachers for this user's learn and
    // the learners for this user's teaches to facilitate matching
    return new Promise((resolve, reject) => {
      this.props.fetchTeachers({
        skills: learn_arr,
      }).then(() => {
        this.props.fetchLearners({
          skills: teach_arr,
        }).then(() => {
          resolve();
        });
      }).catch(error => reject(error));
      // this.props.fetchLearners({ skills: ['Golf'] });
    });
  }

  /**
   * Algorithm to combine [learners] and [teachers] fetched from API into [single_matches] and [double_matches].
   */
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
      single_matches: this.props.teachers.filter((user) => {
        let notIncludes = true;
        this.state.double_matches.forEach((double_matcher) => {
          if (double_matcher.id === user.id) notIncludes = false;
        });
        return notIncludes;
      }),
    });
    console.log('teachers');
    console.log(this.props.teachers);
    console.log('learners');
    console.log(this.props.learners);
    console.log('double');
    console.log(this.state.double_matches);
    console.log('single');
    console.log(this.state.single_matches);
  }


  intoProfile(profile) {
    // console.log('Profile: +++++++++++++++++++ ');
    // console.log(profile);
    this.props.navigation.navigate('Profile', profile);
  }

  /**
   * Handles a change in the search bar, and then sends [search_query] to API for results.
   * @param {String} search_query
   */
  search(search_query) {
    this.setState({ search_query }, () => {
      this.fetchUsers(this.state.search_query.split(' ')).then(() => {
        this.combineUsers();
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  /**
   * Handles rendering for all users that are fetched.
   * TO-DO make a pretty loading screen as a component that we can use everywhere
   */
  renderContent = () => {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/background.png')} style={{ width: '100%', height: '100%' }}>
          <View style={styles.container}>
            {this.renderMatches()}
          </View>
        </ImageBackground>
      </View>
    );
  };

  /**
   * Handles rendering the division between [single_matches] and [double_matches].
   */
  renderMatches = () => {
    let first, last, userName, otherUserName;
    if (this.props.self != null) {
      first = this.props.self.firstName;
      last = this.props.self.lastName;
    }
    // const double_matches = this.state.double_matches.map(element => this.renderUser(element));
    // const single_matches = this.state.single_matches.map(element => this.renderUser(element));

    console.log('WOOO');
    console.log(this.state.single_matches);
    return (
      <View style={styles.cards}>
        <Text>Double Matches</Text>
        <FlatList
          data={this.state.double_matches}
          renderItem={this.renderUser}
          keyExtractor={item => item.id}
        />

        <Text>Single Matches</Text>
        <FlatList
          data={this.state.single_matches}
          renderItem={this.renderUser}
          keyExtractor={item => item.id}

        />
        {/* {single_matches} */}
      </View>
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
  fetchUsers, fetchLearners, fetchTeachers, fetchSelf,
})(Home);
