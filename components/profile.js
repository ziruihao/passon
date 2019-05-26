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
import { fetchUser, fetchChat, fetchSelf } from '../actions';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding.sm,
    paddingVertical: padding.lg,
    width: dimensions.fullWidth,
    fontFamily: fonts.primary,
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

  componentDidMount() {
    console.log(`looking at profile of ${this.props.navigation.getParam('firstName', null)}`);
    this.props.fetch_user(this.props.navigation.getParam('_id', null));
    this.props.fetch_self();
    this.props.fetch_chat(this.props.navigation.getParam('_id', null));
  }


  render() {
    if (this.props.User === null) {
      return (<Text>Loading</Text>);
    } else {
      return (
        <View>
          <Text>{this.props.User.firstName}</Text>
          {/* <Text>{this.props.User.lastname}</Text>
          <Text>{this.props.User.email}</Text>
          <Text>{this.props.User.teach}</Text>
          <Text>{this.props.User.learn}</Text>
          <Text>{this.props.User.rating}</Text>
          <Text>{this.props.User.univerity}</Text> */}
          <Button title="Go to Chat"
            onPress={() => {
              let first, last, userName, otherUserName;
              if (this.props.User != null) {
                first = this.props.self.firstName;
                last = this.props.self.lastName;
              }


              if (this.props.chat !== null) {
                const chat = this.props.chat[0]; // not sure why it's an array here
                console.log(`chat in profile: ${JSON.stringify(chat)}`);
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
