/* eslint-disable new-cap */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import {
  StyleSheet, View, Button, TextInput, FlatList, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchChats, createChat, fetchSelf } from '../actions';

class Messaging extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // chats: 'various chats',

      otherUser: 'Other User ID?',
    };
    this.props.fetch_chats();
  }

  componentDidMount() {
    setInterval(() => {
      this.props.fetch_chats();
    }, 3000);

    this.props.fetch_self();
  }

  /**
   * NOTE_FOR_SELF
   * TODOs:
   * 1. react-native version localStorage in the createChat process (req.user is email)
   * 2. edit createChat in message_controller in backend (find users based on email,
   * as opposed to creating new users to be stored into the chat)
   * 3. make sure DB has some proper users with proper emails to be found
   * 4. fetch Chats based on this user's id in all chats (Chat.foreach...)
   * 5. create tabs based on the fetched chats
   *
   *         <Text style={styles.item}>{item.userId}</Text>
        <Text>{this.props.chats}</Text>
   */

  render() {
    console.log(`CHATTTTT: ${JSON.stringify(this.props.chats[0])}+`);
    let first, last;
    if (this.props.self != null) {
      first = this.props.self.firstName;
      last = this.props.self.lastName;
    }
    return (

      <View style={styles.container}>
        <Text>Chats</Text>
        { // (this.props.chats[0] === undefined) ? <Text> nothing </Text> : (
          this.props.chats.map((chat) => {
            let displayName;
            if (chat.userId[0].firstName === first
              && chat.userId[0].lastName === last) {
              displayName = (
                <View>
                  <Text style={styles.text}>{chat.userId[1].firstName}
                    {' '}
                    {chat.userId[1].lastName}
                  </Text>
                </View>
              );
            } else if (chat.userId[1].firstName === first
              && chat.userId[1].lastName === last) {
              displayName = (
                <View>
                  <Text style={styles.text}>{chat.userId[0].firstName}
                    {' '} {chat.userId[0].lastName}
                  </Text>
                </View>
              );
            } else {
              return null;
            }
            return (
              <View>
                {displayName}
                <Button title="Go to Chat"
                  onPress={() => {
                    const pass = { messages: chat.messages, id: chat.id };
                    this.props.navigation.navigate('Chat', pass);
                  }}
                />
              </View>
            );
          })
        }

        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.setState({ otherUser: text })}
          value={this.state.otherUser}
        />
        <Button title="Go to Chat"
          onPress={() => this.props.navigation.navigate('Chat')}
        >
          Go to Chat
        </Button>
        <Button title="create Chat"
          onPress={() => {
            console.log('create chat pressed');
            const chat = {
              email: this.state.otherUser, // email of the target message user
              messages: [],
              user: 'temp user id', // this will be deleted in the future
            };
            this.props.create_chat(chat);
          }}
        >Create New Chat
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(220,220,220)',
    margin: 50,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nameInput: { // 3. <- Add a style for the input
    height: 24 * 2,
    margin: 24,
    paddingHorizontal: 24,
    borderColor: '#111111',
    borderWidth: 1,
  },
});

const mapStateToProps = state => ({
  // auth: state.auth.authenticated,
  chats: state.chat.chats,
  self: state.user.current,
}
);

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_chats: () => { dispatch(fetchChats()); },
    create_chat: (chat) => { dispatch(createChat(chat)); },
    fetch_self: () => { dispatch(fetchSelf()); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messaging);
