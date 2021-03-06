/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable global-require */
/* eslint-disable new-cap */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text, Image,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchChats, createChat, fetchSelf } from '../../actions';
import {
  colors, fonts, padding, dimensions,
} from '../../styles/base';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
    marginTop: 80,

    fontFamily: 'quicksand-bold',
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
    width: 350,
    height: 100,
    maxWidth: 300,
    maxHeight: 100,
    margin: 5,
    alignItems: 'center',
  },
  chatContainer: {
    marginTop: 30,
  },
  userName: {
    color: '#620BC9',
    fontFamily: 'quicksand-bold',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.208576,
  },
  profile_img: {
    width: 64,
    height: 64,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontFamily: 'quicksand-regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 7,
    paddingRight: 7,
    maxHeight: 30,
  },
});

class Messaging extends Component {
  static navigationOptions = {
    headerTransparent: true,
  };

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
    let first, last;
    if (this.props.self != null) {
      first = this.props.self.firstName;
      last = this.props.self.lastName;
    }
    return (

      <View style={styles.container}>
        <Image source={require('../../assets/background.png')} style={styles.bg} />
        <Text style={styles.title}>Chats</Text>
        <View style={styles.chatContainer}>
          {
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
            if (chat.messages.length > 0) {
              return (
                <TouchableOpacity key={chat.id}
                  onPress={() => {
                    const pass = {
                      messages: chat.messages, id: chat.id, userName, otherUserName,
                    };
                    this.props.navigation.navigate('Chat', pass);
                  }}
                >
                  <View style={styles.chat}>
                    <View>
                      <Image source={require('../../assets/profileDark.png')} style={styles.profile_img} />
                    </View>

                    <View style={{ flex: 1, flexDirection: 'column' }}>
                      <View style={styles.dateContainer}>
                        <Text style={styles.text}>{chat.messages[chat.messages.length - 1].createdAt.substring(5, 10)}</Text>
                      </View>
                      <View style={{
                        flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 7,
                      }}
                      >
                        {displayName}
                        <Text style={styles.text}>{(chat.messages[chat.messages.length - 1].text.length > 30)
                          ? `${chat.messages[chat.messages.length - 1].text.substring(0, 30)}...`
                          : chat.messages[chat.messages.length - 1].text}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }
          })
        }

        </View>
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
