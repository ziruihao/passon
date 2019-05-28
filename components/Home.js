/* eslint-disable no-param-reassign */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable global-require */
/* eslint-disable react/jsx-pascal-case */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  FlatList,
  ScrollView,
  StatusBar,
  TextInput,
  ImageBackground,
} from 'react-native';
import {
  Icon,
} from 'native-base';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ActionViewColumn } from 'material-ui/svg-icons';
import {
  colors, fonts, padding, dimensions,
} from '../styles/base';
import {
  fetchUsers, fetchTeachers, fetchLearners, fetchSelf,
} from '../actions';

const cardImage = require('../assets/sunset.jpg');

const styles = StyleSheet.create({
  appArea: {
    top: getStatusBarHeight(),
    width: '100%',
  },
  searchBar: {
    height: 50,
    backgroundColor: 'white',
    borderColor: 'purple',
    borderWidth: 1,
    borderRadius: 5,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  sectionHeaderArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: fonts.h1,
    color: 'white',
  },
  card: {
    backgroundColor: 'white',
    width: 297,
    height: 170,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {

  },
  leftHead: {
    color: '#620BC9',
    fontSize: 18,
    fontWeight: 'normal',
  },
  leftBio: {
    color: '#656566',
    fontSize: 14,
    fontWeight: 'normal',
  },
  right: {

  },
  name: {
    fontSize: fonts.h3,
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
   * Handles rendering for a [user].
   */
  renderUser = (element) => {
    if (element.item.id !== this.props.self.id) {
      return (
        <TouchableHighlight key={element.item.id} onPress={() => this.intoProfile(element.item)} underlayColor="orange" style={styles.mb}>
          <View style={styles.card}>
            <View style={styles.left}>
              <Text style={styles.leftHead}> {element.item.teach[0].title}</Text>
              <Icon active name="star" />
              <Text style={styles.leftBio}> {element.item.teach[0].bio}</Text>
            </View>
            <View style={styles.right}>
              <Image
                style={{
                  resizeMode: 'cover',
                  width: null,
                  height: 200,
                  flex: 1,
                }}
                source={cardImage}
              />
              <Text style={styles.name}>{element.item.firstName} {element.item.lastName}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    } else return null;
  };

  /**
   * Handles rendering the division between [single_matches] and [double_matches].
   */
  renderMatches = () => {
    // let first, last, userName, otherUserName;
    // if (this.props.self != null) {
    //   first = this.props.self.firstName;
    //   last = this.props.self.lastName;
    // }

    return (
      <ScrollView>
        <View style={styles.sectionHeaderArea}>
          <Text style={styles.sectionHeader}>Double Matches</Text>
          {/* <FlatList
          data={this.state.double_matches}
          renderItem={this.renderUser}
          keyExtractor={item => item.id}
        /> */}
        </View>
        {this.state.double_matches.map(user => this.renderUser({ item: user }))}
        <View style={styles.sectionHeaderArea}>
          <Text style={styles.sectionHeader}>Single Matches</Text>
        </View>
        {/* <FlatList
          data={this.state.single_matches}
          renderItem={this.renderUser}
          keyExtractor={item => item.id}
        /> */}
        {this.state.single_matches.map(user => this.renderUser({ item: user }))}
      </ScrollView>
    );
  };

  render() {
    return (
      <View>
        <View>
          <StatusBar translucent barStyle="dark-content" />
          {/* <Item>
              <Icon name="ios-search" />
              <Input placeholder="Search" onChangeText={text => this.search(text)} />
            </Item> */}
        </View>
        <View style={styles.appArea}>
          <ImageBackground source={require('../assets/background.png')} style={{ width: '100%', height: '100%' }}>
            {/* <Image source={require('gradient-background.svg')} style={{ width: '100%', height: '100%' }} /> */}
            <Icon name="ios-search" />
            <TextInput value={this.state.search_query} onChangeText={text => this.search(text)} style={styles.searchBar} />
            <View style={styles.content}>
              {this.renderMatches()}
            </View>
          </ImageBackground>
        </View>
      </View>
    // <Container>

    //   <Container>
    //     {this.renderContent()}
    //   </Container>
    // </Container>
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
