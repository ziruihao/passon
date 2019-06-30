/* eslint-disable global-require */
/* eslint-disable consistent-return */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {
  colors, fonts, dimensions,
} from '../../styles/base';
import {
  fetchUser, fetchChat, fetchSelf, addMatch,
} from '../../actions';
import Learns from '../Skill/Learns';
import Teaches from '../Skill/Teaches';

const profileImage = require('../../assets/profileLight.png');

const styles = StyleSheet.create({
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
  buttonMessage: {
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
  buttonText: {
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

class Profile extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: 'black',
  };

  constructor(props) {
    super(props);

    this.state = {
      teach: true,
      my_match: false,
      tgt_match: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.fetchUser(this.props.navigation.getParam('_id', null)).then(() => {
        this.props.fetchSelf().then(() => {
          for (let i = 0; i < this.props.self.matched_users.length; i += 1) {
            if (this.props.self.matched_users[i]._id === this.props.user._id) {
              this.setState({ my_match: true });
            }
          }
          for (let i = 0; i < this.props.user.matched_users.length; i += 1) {
            if (this.props.user.matched_users[i]._id === this.props.self._id) {
              this.setState({ tgt_match: true });
            }
          }
        });
      });

      this.props.fetchChat(this.props.navigation.getParam('_id', null));
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
    this.setState(() => {
      return { teach: event };
    });
  };

  goToChat = () => {
    let first, last, userName, otherUserName;
    if (this.props.self != null) {
      first = this.props.self.firstName;
      last = this.props.self.lastName;
    }
    if (this.props.chat !== undefined) {
      const { chat } = this.props;
      if (chat.userId[0].firstName === first
      && chat.userId[0].lastName === last) {
        userName = `${first} ${last}`;
        otherUserName = `${chat.userId[1].firstName} ${chat.userId[1].lastName}`;
      } else if (chat.userId[1].firstName === first
      && chat.userId[1].lastName === last) {
        userName = `${first} ${last}`;
        otherUserName = `${chat.userId[0].firstName} ${chat.userId[0].lastName}`;
      } else {
        return null;
      }

      const pass = {
        messages: chat.messages,
        id: chat.id,
        userName,
        otherUserName,
      };
      this.props.navigation.navigate('Chat', pass);
    }
  };

  addConnection = () => {
    this.props.addMatch(this.props.user._id);
    this.setState({ my_match: true });
  };

  renderTeaches() {
    if (this.props.user.teach !== null) {
      return (
        <View>
          <Teaches teaches={this.props.user.teach} nav={this.props.navigation} user={this.props.user} self={this.props.self} prev_state={this.state} />
        </View>
      );
    } else {
      return (
        <View />
      );
    }
  }

  renderLearns() {
    if (this.props.user.learn !== null) {
      return (
        <View>
          <Learns learns={this.props.user.learn} nav={this.props.navigation} user={this.props.user} self={this.props.self} />
        </View>
      );
    } else {
      return (
        <View />
      );
    }
  }

  renderConnection = () => {
    if (!this.state.my_match) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => { this.addConnection(); }} style={styles.buttonMessage}>
            <Text style={styles.buttonText}>Add Connection</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.my_match && !this.state.tgt_match) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonMessage}>
            <Text style={styles.buttonText}>Waiting for them ...</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonMessage}>
            <Text style={styles.buttonText}>Already Connected</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    if (this.props.user === null) {
      return (<Text>Loading</Text>);
    } else if (this.state.teach) {
      return (
        <View style={styles.appArea}>
          <ImageBackground source={require('../../assets/teachBackground.png')} style={styles.bg}>
            <View style={styles.profileContainer}>
              <View style={styles.right}>
                <Image
                  style={styles.profileImage}
                  source={profileImage}
                />
              </View>
              <View style={styles.left}>
                <Text style={styles.name}>
                  {this.props.user.firstName} {this.props.user.lastName}
                </Text>
                <Text style={styles.rating}>{this.renderRating(this.props.user)}</Text>
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
                <TouchableOpacity onPress={() => { this.goToChat(); }} style={styles.buttonMessage}>
                  <Text style={styles.buttonText}>Message</Text>
                </TouchableOpacity>
              </View>
              {this.renderConnection()}
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.appArea}>
          <ImageBackground source={require('../../assets/learnBackground.png')} style={styles.bg}>
            <View style={styles.profileContainer}>
              <View style={styles.right}>
                <Image
                  style={styles.profileImage}
                  source={profileImage}
                />
              </View>
              <View style={styles.left}>
                <Text style={styles.name}>
                  {this.props.user.firstName} {this.props.user.lastName}
                </Text>
                <Text style={styles.rating}>{this.renderRating(this.props.user)}</Text>
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
                <TouchableOpacity onPress={() => { this.goToChat(); }} style={styles.buttonMessage}>
                  <Text style={styles.buttonText}>Message</Text>
                </TouchableOpacity>
              </View>
              {this.renderConnection()}
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    chat: reduxState.chat.curr,
    user: reduxState.user.current,
    self: reduxState.user.self,
  };
}


export default connect(mapReduxStateToProps, {
  fetchChat, fetchUser, fetchSelf, addMatch,
})(Profile);
