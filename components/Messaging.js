/* eslint-disable global-require */
/* eslint-disable new-cap */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text, Image,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchChats, createChat, fetchSelf } from '../actions';
import {
  colors, fonts, padding, dimensions,
} from '../styles/base';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1,
    width: '100%',
    height: '100%',
    top: '0%',
  },
  bg: {
    flex: 1,
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
    zIndex: -1,
    position: 'absolute',
    top: '0%',
  },
  title: {
    position: 'absolute',
    width: 280,
    height: 35,
    left: 48,
    top: 43,

    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 28,
    lineHeight: 35,
    /* identical to box height */
    textAlign: 'center',
    letterSpacing: 0.208576,

    color: '#FDFCFF',
  },
  chat: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FDFCFF',
    borderRadius: 10,
    width: 300,
    height: 100,
    maxWidth: 300,
    maxHeight: 100,
    margin: 7,
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  userName: {
    color: '#620BC9',
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 17,
    /* identical to box height */
    textAlign: 'center',
    letterSpacing: 0.208576,
  },
  profile_img: {
    width: 64,
    height: 64,
    marginLeft: 10,
    marginRight: 10,
  },
});
class Messaging extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // otherUser: 'Other User email?',
    };
    this.props.fetch_chats();
  }

  componentDidMount() {
    setInterval(() => {
      this.props.fetch_chats();
    }, 3000);

    this.props.fetch_self();
  }

  render() {
    // console.log(`CHATTTTT: ${JSON.stringify(this.props.chats)}+`);
    let first, last;
    if (this.props.self != null) {
      first = this.props.self.firstName;
      last = this.props.self.lastName;
    }
    return (

      <View style={styles.container}>
        <Image source={require('../assets/background.png')} style={styles.bg} />
        <Text style={styles.title}>Chats</Text>
        <View style={styles.chatContainer}>
          { // (this.props.chats[0] === undefined) ? <Text> nothing </Text> : (
          this.props.chats.map((chat) => {
            let displayName, userName, otherUserName;
            if (chat.userId[0].firstName === first
              && chat.userId[0].lastName === last) {
              userName = `${first} ${last}`;
              otherUserName = `${chat.userId[1].firstName} ${chat.userId[1].lastName}`;
              displayName = (
                <View>
                  <Text style={styles.userName}>{chat.userId[1].firstName}
                    {' '}
                    {chat.userId[1].lastName}
                  </Text>
                </View>
              );
            } else if (chat.userId[1].firstName === first
              && chat.userId[1].lastName === last) {
              userName = `${first} ${last}`;
              otherUserName = `${chat.userId[0].firstName} ${chat.userId[0].lastName}`;
              displayName = (
                <View>
                  <Text style={styles.userName}>{chat.userId[0].firstName}
                    {' '} {chat.userId[0].lastName}
                  </Text>
                </View>
              );
            } else {
              return null;
            }
            return (
              <TouchableOpacity
                onPress={() => {
                  const pass = {
                    messages: chat.messages, id: chat.id, userName, otherUserName,
                  };
                  this.props.navigation.navigate('Chat', pass);
                }}
              >
                <View style={styles.chat}>
                  <View>
                    <Image source={require('../assets/profile.png')} style={styles.profile_img} />
                  </View>
                  <View>
                    {displayName}
                    <Text>{chat.messages[chat.messages.length - 1].createdAt.substring(5, 5)}</Text>

                    <Text>{chat.messages[chat.messages.length - 1].text}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        }

        </View>
        {/* <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.setState({ otherUser: text })}
          value={this.state.otherUser}
        />
        <Button title="create Chat"
          onPress={() => {
            console.log('create chat pressed');
            const chat = {
              email: this.state.otherUser, // email of the target message user
              messages: [],
            };
            this.props.create_chat(chat);
          }}
        >Create New Chat
        </Button> */}
      </View>
    );
  }
}


const mapStateToProps = state => ({
  chats: state.chat.chats,
  self: state.user.self,
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
