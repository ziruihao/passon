/* eslint-disable new-cap */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import {
  StyleSheet, View, Button, TextInput, FlatList, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchChats, createChat } from '../actions';

class Messaging extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // chats: 'various chats',
      //    data: [],
      otherUser: 'Other User ID?',
    };
  }

  componentDidMount() {
    this.props.fetch_chats();
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
   */

  render() {
    console.log(`this.props.chat: ${this.props.chats}`);
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.chats}
          renderItem={({ item }) => (
            <div><Text style={styles.item}>{item.userId}</Text>
              <Text style={styles.item}>{(item.messages == null) ? '' : item.messages[0]}</Text>
            </div>
          )}
        />
        <Text>{`chats: ${this.props.chats}`}</Text>
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
    backgroundColor: 'rgb(240,240,240)',
    margin: 50,
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
}
);

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_chats: () => { dispatch(fetchChats()); },
    create_chat: (chat) => { dispatch(createChat(chat)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messaging);
