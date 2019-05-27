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
  Button,
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
    paddingHorizontal: padding.sm,
    paddingVertical: padding.lg,
    width: dimensions.fullWidth,
    fontFamily: fonts.primary,
  },
  profileBox: {
    backgroundColor: 'blue',
    width: dimensions.fullWidth,
    height: 250,
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
      // btn: false,
    };
  }

  componentDidMount() {
    // console.log(`looking at profile of ${this.props.navigation.getParam('firstName', null)}`);
    this.props.fetch_user(this.props.navigation.getParam('_id', null));
    this.props.fetch_self();
    this.props.fetch_chat(this.props.navigation.getParam('_id', null));
    setInterval(() => {
      console.log(`props check: ${JSON.stringify(this.props.chat)}`);
    }, 3000);
  }


  render() {
    if (this.props.User === null) {
      return (<Text>Loading</Text>);
    } else {
      return (
        <View>
          <View>
            <View>
              <Text>{this.props.user.firstName}</Text>
            </View>
            <View><Text>Teach:</Text></View>
            <View><Teaches teaches={this.props.user.teach} nav={this.props.navigation} user={this.props.user} self={this.props.self} /></View>
            <View><Text>Learn:</Text></View>
            <View><Learns learns={this.props.user.learn} nav={this.props.navigation} user={this.props.user} self={this.props.self} /></View>
          </View>
          <Button title="Go to Chat"
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
      );
    }
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    User: reduxState.user.current,
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
