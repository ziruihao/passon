/* eslint-disable no-param-reassign */
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';
import { connect } from 'react-redux';
// import { fetchChats, createChat, fetchSelf } from '../actions';

class Chat extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      title: (navigation.state.params || {}).otherUserName || 'Chat!',
    });

    constructor(props) {
      super(props);
      const room = this.props.navigation.getParam('id', null); // would be chat's objectID

      // Creating the socket-client instance will automatically connect to the server.
      const socket = io('http://localhost:3000');
      socket.on('connect', () => {
      // Connected, let's sign-up for to receive messages for this room
        socket.emit('room', room); // chatID passed in from props
      });

      // socket.on('message', (data) => {
      //   console.log('Incoming message:', data);
      // });
      // socket.on('received', (message) => {
      //   console.log('Incoming message:', message);
      //   const oldMessages = () => this.state.messages;
      //   this.setState({ messages: oldMessages.concat(message) });
      // });
      this.state = {
        socket,
        messages: [],
        counter: 1,
      };
      this.sendMessage = this.sendMessage.bind(this);
    }

    componentWillMount() {
      this.setState({
        messages: [],
      });

      const pastMsgs = this.props.navigation.getParam('messages', null); // is an array
      if (pastMsgs !== undefined && pastMsgs !== null && pastMsgs.length > 0) {
        pastMsgs.forEach((msg) => {
          const who = (msg.userId === this.props.self.id)
            ? this.props.navigation.getParam('userName', 'myName')
            : this.props.navigation.getParam('otherUserName', 'theirName');

          msg.user = {
            _id: msg.userId,
            name: who,
          };
          delete msg.userId;
          delete msg.__v;
          delete msg.chatId;
          delete msg.id;
        });
        this.setState((previousState) => {
          const temp = previousState.messages;
          pastMsgs.slice().reverse().forEach((msg) => {
            temp.push(msg);
          });
          return {
            messages: temp,
          };
        });
      }
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
      this.state.socket.emit('message', message);

      const msg = {
        _id: this.state.counter,
        text: messages[0].text,
        createdAt: messages[0].createdAt,
        user: {
          _id: this.props.self.id,
          name: `${this.props.self.firstName} ${this.props.self.lastName}`,
          // avatar: 'https://placeimg.com/140/140/any',
        },
      };
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, msg),
        };
      }, () => {
        this.setState(prevState => ({
          counter: prevState.counter + 1,
        }));
      });
    }

    render() {
      return (
        <GiftedChat
          messages={this.state.messages
          }
          onSend={messages => this.sendMessage(messages)}
          user={{
            _id: this.props.self.id,
          }}
        />
      );
    }
}
const mapStateToProps = state => ({
  self: state.user.self,
}
);

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
