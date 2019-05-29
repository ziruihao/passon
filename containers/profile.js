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
  ListView,
  TouchableHighlight,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 300,
  },
  bg: {
    flex: -1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    zIndex: -1,
    position: 'absolute',
    top: '0%',
  },
  tabsContainer: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    // flexWrap: 'nowrap',
    alignItems: 'center',
  },
  tabs: {
    marginLeft: 50,
    marginRight: 50,
    width: 120,
    height: 50,
    resizeMode: 'contain',
    top: 40,
  },
  cardContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  name: {
    fontSize: fonts.h3,
    color: '#FFFFFF',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  signOut: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  rating: {
    fontSize: fonts.p1,
    color: '#FFFFFF',
  },
  buttonMessage: {
    backgroundColor: '#620BC9',
    borderRadius: 5,
    color: '#FFFFFF',
    width: '75%',
    height: 41,
    zIndex: 0,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: dimensions.fullWidth,
    paddingBottom: '5%',
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
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.fetch_user(this.props.navigation.getParam('_id', null));
      this.props.fetch_self();
      this.props.fetch_chat(this.props.navigation.getParam('_id', null));
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
    if (this.props.self.teach != null) {
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
    return <View><Learns learns={this.props.user.learn} nav={this.props.navigation} user={this.props.user} self={this.props.self} /></View>;
  }

  render() {
    if (this.props.user === null) {
      return (<Text>Loading</Text>);
    } else if (this.state.teach === true) {
      return (
        <View style={styles.container}>
          <ImageBackground source={require('../assets/teachBackground.png')} style={{ width: '100%', height: '100%' }}>
            <View style={styles.profileContainer}>
              <Text style={styles.name}>
                {this.props.user.firstName} {this.props.user.lastName}
              </Text>
              <Text style={styles.rating}>{this.renderRating(this.props.user)}</Text>
            </View>
            <View style={styles.tabsContainer}>
              <Button onPress={() => { this.toggleTeach(true); }}
                title="Teach"
                color="#620BC9"
              />
              <Button onPress={() => { this.toggleTeach(false); }}
                title="Learn"
                color="#FFFFFF"
              />
            </View>
            <View style={styles.cardContainer}>
              <ScrollView>
                {this.renderTeaches()}
              </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonMessage}>
                <Button color={colors.white}
                  title="Go to Chat"
                  onPress={() => { this.goToChat(); }}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground source={require('../assets/learnBackground.png')} style={{ width: '100%', height: '100%' }}>
            <View style={styles.profileContainer}>
              <Text style={styles.name}>
                {this.props.user.firstName} {this.props.user.lastName}
              </Text>
              <Text style={styles.rating}>Avg Rating: {this.props.user.avg_rating}</Text>
            </View>
            <View style={styles.tabsContainer}>
              <Button onPress={() => { this.toggleTeach(true); }}
                title="Teach"
                color="#FFFFFF"
              />
              <Button onPress={() => { this.toggleTeach(false); }}
                title="Learn"
                color="#620BC9"
              />
            </View>
            <View style={styles.cardContainer}>
              <ScrollView>
                {this.renderLearns()}
              </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonMessage}>
                <Button color={colors.white}
                  title="Go to Chat"
                  onPress={() => { this.goToChat(); }}
                />
              </View>
            </View>
            <View style={styles.button}>
              <Button title="Go to Chat"
                color="white"
                onPress={() => {
                // this.setState({ btn: true });
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
                }}
              />
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
