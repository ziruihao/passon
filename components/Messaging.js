/* eslint-disable new-cap */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import {
  StyleSheet, View, Button, TextInput,
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

  render() {
    return (
      <View style={styles.container}>
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
              userId: this.state.otherUser,
              messages: {},
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
    flexDirection: 'row',
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
}
);

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_chats: () => { dispatch(fetchChats()); },
    create_chat: (chat) => { dispatch(createChat(chat)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messaging);
