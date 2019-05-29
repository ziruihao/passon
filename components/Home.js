/* eslint-disable max-len */
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
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  ImageBackground,
} from 'react-native';
import { Font } from 'expo';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ActionViewColumn } from 'material-ui/svg-icons';
import {
  colors, fonts, padding, dimensions,
} from '../styles/base';
import {
  fetchUsers, fetchTeachers, fetchLearners, fetchSelf,
} from '../actions';
import DoubleMatchCard from './DoubleMatchCard';

const cardImage = require('../assets/profile.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    width: '100%',
  },
  appArea: {
    top: getStatusBarHeight(),
    width: '100%',
  },
  searchBar: {
    width: 300,
    height: 45,
    backgroundColor: colors.white,
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  content: {
    alignItems: 'center',
    width: dimensions.fullWidth,
  },
  sectionHeaderArea: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: fonts.h3,
    color: colors.white,
    margin: 10,
    marginTop: '10%',
    fontFamily: 'quicksand-bold',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: '10%',
    width: 300,
    flex: 0,
    flexWrap: 'wrap',
    fontFamily: 'quicksand-regular',
  },
  card: {
    backgroundColor: 'white',
    width: 297,
    height: 170,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 20,
  },
  left: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  right: {
    flex: 0,
    width: '30%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    color: colors.primary,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'quicksand-bold',
  },
  cards: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  title: {
    fontSize: fonts.h2,
    color: colors.white,
    margin: 20,
    marginTop: '10%',
    fontFamily: 'quicksand-bold',
    width: '70%',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    padding: 5,
    color: colors.accent,
  },
  appContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  skillTitle: {
    color: colors.primary,
    fontSize: fonts.p1,
    marginBottom: 10,
    fontFamily: 'quicksand-bold',
  },
  years: {
    color: '#505050',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'quicksand-bold',
  },
  bio: {
    color: '#505050',
    fontSize: 14,
    fontFamily: 'quicksand-regular',
  },
  rating: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: 'quicksand-regular',
  },
  ratingYears: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  profileImage: {
    width: 64,
    height: 64,
    marginBottom: 10,
  },
  nameContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
      fontLoaded: false,
    };
    // this.intoProfile = this.intoProfile.bind(this); binding didnt help
  }

  // Source: https://reactnavigation.org/docs/en/function-after-focusing-screen.html
  // componentDidMount() {
  //   const { navigation } = this.props;
  //   this.focusListener = navigation.addListener('didFocus', () => {
  //     this.props.fetchSelf().then(() => {
  //       this.fetchUsers([]).then(() => { // we need to pass in that empty array
  //         this.combineUsers();
  //       }).catch((error) => {
  //         console.log(error);
  //       });
  //     });
  //   });
  // }

  // Source: https://reactnavigation.org/docs/en/function-after-focusing-screen.html
  async componentDidMount() {
    await Font.loadAsync({
      'quicksand-bold': require('../assets/fonts/Quicksand-Bold.ttf'),
      'quicksand-regular': require('../assets/fonts/Quicksand-Regular.ttf'),
    }).then((response) => {
      this.setState({ fontLoaded: true });
    })
      .catch((error) => {
        console.log(error);
      });

    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.fetchSelf().then(() => {
        this.fetchUsers([]).then(() => { // we need to pass in that empty array
          this.combineUsers();
        }).catch((error) => {
          console.log(error);
        });
      });
    });
  }


  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  calcRating = (element) => {
    let sum = 0;
    let count = 0;

    element.teach.forEach(skill => skill.ratings.forEach((rating) => {
      sum += rating.score;
      count += 1;
    }));

    if (count === 0) return -1;
    else return (sum / count).toFixed(1);
  };

  renderRating = (element) => {
    const avg_rating = this.calcRating(element.item);

    if (avg_rating === -1) {
      return (
        <Text>No ratings</Text>
      );
    } else {
      return (
        <Text>Avg Rating: {avg_rating}</Text>
      );
    }
  };

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
    this.props.navigation.navigate('Profile', profile);
  }

  /**
   * Handles rendering for a [user].
   */
  renderUser = (element) => {
    if (element.item.id !== this.props.self.id) {
      return (
        <TouchableOpacity key={element.item.id} onPress={() => this.intoProfile(element.item)} underlayColor="orange" style={styles.mb}>
          <View style={styles.card}>
            <View style={styles.left}>
              {
                this.state.fontLoaded ? (
                  <Text style={styles.skillTitle}> {element.item.teach[0].title}</Text>
                ) : null
              }
              <View style={styles.ratingYears}>
                {
                  this.state.fontLoaded ? (
                    <Text style={styles.years}> {element.item.teach[0].years} yrs</Text>
                  ) : null
                }
                {/* <Icon active name="star" /> */}
                {
                  this.state.fontLoaded ? (
                    <Text style={styles.rating}>{this.renderRating(element)} X stars</Text>
                  ) : null
                }
              </View>
              {
                this.state.fontLoaded ? (
                  <Text style={styles.bio}> {element.item.teach[0].bio}</Text>
                ) : null
              }
            </View>
            <View style={styles.right}>
              <Image
                style={styles.profileImage}
                source={cardImage}
              />
              <View style={styles.nameContainer}>
                {
                  this.state.fontLoaded ? (
                    <Text style={styles.name}>{element.item.firstName} {element.item.lastName}</Text>
                  ) : null
                }
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else return null;
  };

  /**
   * Handles rendering the division between [single_matches] and [double_matches].
   */
  renderMatches = () => {
    return (
      <ScrollView>
        <View style={styles.sectionHeaderArea}>
          {
            this.state.fontLoaded ? (
              <Text style={styles.sectionHeader}>Double Matches</Text>
            ) : null
          }
          {
            this.state.fontLoaded ? (
              <Text style={styles.sectionDescription}>A perfect match! These members have a skill you want to learn and want to learn a skill you can teach.</Text>
            ) : null
          }
        </View>
        {this.state.double_matches.map(user => this.renderUser({ item: user }))}
        <View style={styles.sectionHeaderArea}>
          {
            this.state.fontLoaded ? (
              <Text style={styles.sectionHeader}>Single Matches</Text>
            ) : null
          }
          {
            this.state.fontLoaded ? (
              <Text style={styles.sectionDescription}>These members have a skill you want to learn but haven’t expressed interest in learning a skill you are able to teach. However, they may be interested in learning something new!</Text>
            ) : null
          }
        </View>
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
            <View style={styles.appContainer}>
              {
                this.state.fontLoaded ? (
                  <Text style={styles.title}>What would you like to learn?</Text>
                ) : null
              }
              <TextInput
                value={this.state.search_query}
                onChangeText={text => this.search(text)}
                style={styles.searchBar}
                placeholder="Search for skills"
              />
              <View style={styles.content}>
                {this.renderMatches()}
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
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
