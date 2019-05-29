/* eslint-disable global-require */
/* eslint-disable consistent-return */
import React from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  ImageBackground,
} from 'react-native';
import {
  colors, fonts, padding, dimensions,
} from '../styles/base';
import {
  fetchUser, fetchChat, fetchSelf, createChat,
} from '../actions';
import Learns from '../components/learns';
import Teaches from '../components/teaches';

const profileImage = require('../assets/profileLight.png');

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

class Profile extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: 'black',
  }

  constructor(props) {
    super(props);

    this.state = {
      teach: true,
    };
  }

  componentDidMount() {
    this.props.fetch_user(this.props.navigation.getParam('_id', null));
    this.props.fetch_self();
    this.props.fetch_chat(this.props.navigation.getParam('_id', null));
  }

  toggleTeach = (event) => {
    this.setState((prevState) => {
      return { teach: event };
    });
  }

  goToChat = () => {
    let first, last, userName, otherUserName;
    if (this.props.self != null) {
      first = this.props.self.firstName;
      last = this.props.self.lastName;
    }
    if (this.props.chat !== undefined) {
      const { chat } = this.props; // not sure why it's an array here
      console.log(`chat in profile: ${JSON.stringify(chat)}`);
      if (chat.userId[0].firstName === first
      && chat.userId[0].lastName === last) {
        userName = `${first} ${last}`;
        otherUserName = `${chat.userId[1].firstName} ${chat.userId[1].lastName}`;
        console.log(`${userName} other: ${otherUserName}`);
      } else if (chat.userId[1].firstName === first
      && chat.userId[1].lastName === last) {
        userName = `${first} ${last}`;
        otherUserName = `${chat.userId[0].firstName} ${chat.userId[0].lastName}`;
        console.log(`${userName} other: ${otherUserName}`);
      } else {
        console.log('names no match');
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
  }

  renderTeaches() {
    if (this.props.user.teach !== null) {
      return (
        <View>
          <Teaches teaches={this.props.user.teach} nav={this.props.navigation} user={this.props.user} self={this.props.self} />
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

  render() {
    if (this.props.user === null) {
      return (<Text>Loading</Text>);
    } else if (this.state.teach) {
      return (
        <View style={styles.appArea}>
          <ImageBackground source={require('../assets/teachBackground.png')} style={styles.bg}>
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
                <Text style={styles.rating}>Avg Rating: {this.props.self.avg_rating}</Text>
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
                  <Text style={styles.addSkillButtonText}>Message</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.appArea}>
          <ImageBackground source={require('../assets/learnBackground.png')} style={styles.bg}>
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
                <Text style={styles.rating}>Avg Rating: {this.props.self.avg_rating}</Text>
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
                  <Text style={styles.addSkillButtonText}>Message</Text>
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
    chat: reduxState.chat.curr,
    user: reduxState.user.current,
    self: reduxState.user.self,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_chat: (otherUserId) => { dispatch(fetchChat(otherUserId)); },
    fetch_self: () => { dispatch(fetchSelf()); },
    fetch_user: (id) => { dispatch(fetchUser(id)); },
  };
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Profile);
