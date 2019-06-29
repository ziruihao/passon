/* eslint-disable global-require */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  StyleSheet, View, Text, AsyncStorage, ImageBackground, TouchableOpacity, ScrollView, Image,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import axios from 'axios/index';
import {
  fetchUser, fetchSelf, signoutUser, ROOT_URL,
} from '../../actions';
import Learns from '../Skill/Learns';
import Teaches from '../Skill/Teaches';
import {
  colors, fonts, dimensions,
} from '../../styles/base';

const profileImage = require('../../assets/profileLight.png');

const styles = StyleSheet.create({
  appArea: {
    top: dimensions.statusBarHeight,
  },
  bg: {
    resizeMode: 'cover',
    width: dimensions.fullWidth,
    height: 2.1653 * dimensions.fullWidth,
    zIndex: -1,
    top: 0,
  },
  tabsContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    width: dimensions.fullWidth,
    height: 0.2560 * dimensions.fullWidth,
  },
  teachLearnButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '40%',
    fontFamily: 'quicksand-bold',
  },
  teachLearnButtonTextActive: {
    fontSize: 0.0587 * dimensions.fullWidth,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: 'quicksand-bold',
  },
  teachlearnButtonTextActiveUnderline: {
    backgroundColor: colors.primary,
    width: 0.1707 * dimensions.fullWidth,
    height: 4,
    marginTop: 8,
    fontFamily: 'quicksand-bold',
  },
  teachLearnButtonTextInactive: {
    fontSize: 0.0587 * dimensions.fullWidth,
    fontWeight: '600',
    color: colors.white,
    fontFamily: 'quicksand-bold',
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  name: {
    fontSize: 0.0747 * dimensions.fullWidth,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'quicksand-bold',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 0.4026 * dimensions.fullWidth,
    marginTop: 10,
  },
  profileContainerLeft: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  profileImage: {
    width: 64,
    height: 64,
    margin: 20,
  },
  profileContainerRight: {
    flex: 0,
    width: '30%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOut: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    margin: 5,
  },
  rating: {
    fontSize: fonts.p1,
    color: '#FFFFFF',
    fontFamily: 'quicksand-regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: dimensions.fullWidth,
    paddingBottom: '5%',
  },
  addSkillButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    width: 300,
    height: 41,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    marginTop: 20,
    marginBottom: 20,
  },
  contentContainer: {
    maxHeight: dimensions.fullHeight * 0.4,
  },
  addSkillButtonText: {
    color: colors.white,
    fontFamily: 'quicksand-bold',
    fontSize: 18,
  },
  signOutText: {
    color: colors.white,
    fontFamily: 'quicksand-regular',
    fontSize: 14,
  },
});

class ProfileSelf extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teach: true,
      mutual: [],
    };
  }

  componentDidMount() {
    const arr = [];

    this.props.fetchSelf()
      .then(() => {
        console.log('entered');

        this.props.self.matched_users.forEach((user) => {
          console.log(`${ROOT_URL}/users/${user.id}`);

          axios.get(`${ROOT_URL}/users/${user.id}`)
            .then((response) => {
              console.log(response.data);
              // return response.json();

              let found = false;

              for (let i = 0; i < response.data.matched_users.length; i += 1) {
                if (response.data.matched_users[i]._id === this.props.self._id) found = true;
              }

              if (found) {
                arr.push(`${user.firstName} ${user.lastName}`);
                this.setState({ mutual: arr });
              }
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
    const avg_rating = this.calcRating(element);

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

  toggleTeach = (event) => {
    this.setState({ teach: event });
  };

  renderTeaches() {
    if (this.props.self.teach !== null) {
      return (
        <View>
          <Teaches teaches={this.props.self.teach} nav={this.props.navigation} user={this.props.self} self={this.props.self} />
        </View>
      );
    } else {
      return (
        <View />
      );
    }
  }

  renderLearns() {
    if (this.props.self.learn !== null) {
      return (
        <View>
          <Learns learns={this.props.self.learn} nav={this.props.navigation} user={this.props.self} self={this.props.self} />
        </View>
      );
    } else {
      return (
        <View />
      );
    }
  }

  // Source: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  renderMatchedUsers = () => {
    return (
      <View>
        <Text>
          Mutually matched users:
        </Text>
        <Text>
          {this.state.mutual.map((elem) => {
            return (
              <Text>{'- '}{elem}{'\n'}</Text>
            );
          })}
        </Text>
      </View>
    );
  };

  render() {
    if (this.props.self === null) {
      return (<Text>Loading</Text>);
    } else if (this.state.teach) {
      return (
        <View style={styles.appArea}>
          <ImageBackground source={require('../../assets/teachBackground.png')} style={styles.bg}>

            <View style={styles.signOut}>
              <TouchableOpacity onPress={this.props.signoutUser}
                style={styles.signOut}
              >
                <Text style={styles.signOutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.profileContainer}>
              <View style={styles.right}>
                <Image
                  style={styles.profileImage}
                  source={profileImage}
                />
              </View>
              <View style={styles.left}>
                <Text style={styles.name}>
                  {this.props.self.firstName} {this.props.self.lastName}
                </Text>
                <Text style={styles.rating}>{this.renderRating(this.props.self)}</Text>
              </View>
            </View>
            <View style={styles.tabsContainer}>
              <TouchableOpacity onPress={() => { this.toggleTeach(true); }} style={styles.teachLearnButton}>
                <Text style={styles.teachLearnButtonTextActive}>Teach</Text>
                <View style={styles.teachlearnButtonTextActiveUnderline} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.toggleTeach(false); }} style={styles.teachLearnButton}>
                <Text style={styles.teachLearnButtonTextInactive}>Learn</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.cardContainer}>
                <ScrollView style={styles.scrollView}>
                  {this.renderTeaches()}
                </ScrollView>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddSkillTeach')} style={styles.addSkillButton}>
                  <Text style={styles.addSkillButtonText}>Add Skill</Text>
                </TouchableOpacity>
              </View>
              {this.renderMatchedUsers()}
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.appArea}>
          <ImageBackground source={require('../../assets/learnBackground.png')} style={styles.bg}>

            <View style={styles.signOut}>
              <TouchableOpacity onPress={() => {
                AsyncStorage.removeItem('token');
                this.props.signoutUser();
              }}
                style={styles.signOut}
              >
                <Text style={styles.signOutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.profileContainer}>
              <View style={styles.right}>
                <Image
                  style={styles.profileImage}
                  source={profileImage}
                />
              </View>
              <View style={styles.left}>
                <Text style={styles.name}>
                  {this.props.self.firstName} {this.props.self.lastName}
                </Text>
                <Text style={styles.rating}>{this.renderRating(this.props.self)}</Text>
              </View>
            </View>
            <View style={styles.tabsContainer}>
              <TouchableOpacity onPress={() => { this.toggleTeach(true); }} style={styles.teachLearnButton}>
                <Text style={styles.teachLearnButtonTextInactive}>Teach</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.toggleTeach(false); }} style={styles.teachLearnButton}>
                <Text style={styles.teachLearnButtonTextActive}>Learn</Text>
                <View style={styles.teachlearnButtonTextActiveUnderline} />
              </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.cardContainer}>
                <ScrollView style={styles.scrollView}>
                  {this.renderLearns()}
                </ScrollView>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddSkillLearn')} style={styles.addSkillButton}>
                  <Text style={styles.addSkillButtonText}>Add Skill</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}


function mapReduxStateToProps(reduxState) {
  return {
    self: reduxState.user.self,
  };
}

export default withNavigationFocus(connect(mapReduxStateToProps, { fetchUser, fetchSelf, signoutUser })(ProfileSelf));
