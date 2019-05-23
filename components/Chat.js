/* eslint-disable no-param-reassign */
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';
import { connect } from 'react-redux';
// import { fetchChats, createChat, fetchSelf } from '../actions';

class Chat extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      title: (navigation.state.params || {}).name || 'Chat!',
    });

    constructor(props) {
      super(props);
      const room = this.props.id; // would be chat's objectID

      // Creating the socket-client instance will automatically connect to the server.
      const socket = io('http://localhost:3000');
      socket.on('connect', () => {
      // Connected, let's sign-up for to receive messages for this room
        socket.emit('room', room); // chatID passed in from props
      });

      // socket.on('message', (data) => {
      //   console.log('Incoming message:', data);
      // });
      socket.on('received', (message) => {
        console.log('Incoming message:', message);
        const oldMessages = () => this.state.messages;
        this.setState({ messages: oldMessages.concat(message) });
      });
      this.state = {
        socket,
        messages: [],
      };
      this.sendMessage = this.sendMessage.bind(this);
    }

    componentWillMount() {
      this.setState({
        messages: [
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ],
      });

      const pastMsg = this.props.navigation.getParam('messages', null);
      if (pastMsg !== undefined && pastMsg !== null && pastMsg.length > 0) {
        pastMsg.forEach((msg) => {
          msg.user = {
            _id: 1,
            name: 'first plus last',
          };
        });
        this.setState(previousState => ({
          messages: previousState.messages.push(pastMsg),
        }));
      }
      console.log(`messages state: ${this.state.messages}`);
    }

    sendMessage(messages = []) {
      const message = {
        body: {
          text: messages[0].text,
          createdAt: messages[0].createdAt,
          userId: this.props.self.id,
          chatId: this.props.navigation.getParam('id', {}),
        },
      };

      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));
      console.log(`in sendMessage, chatID: ${message.body.chatId}`);
      this.state.socket.emit('message', message);
    }

    render() {
      return (
        <GiftedChat
          messages={this.state.messages
          }
          onSend={messages => this.sendMessage(messages)}
        />
      );
    }
}
const mapStateToProps = state => ({
  self: state.user.current,
}
);

const mapDispatchToProps = (dispatch) => {
  return {
    // save_message: () => { dispatch(fetchChats()); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
