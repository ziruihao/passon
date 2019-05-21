import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';

class Chat extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      title: (navigation.state.params || {}).name || 'Chat!',
    });

    constructor(props) {
      super(props);
      const room = 'abc123'; // would be other user's id from this.props

      // Creating the socket-client instance will automatically connect to the server.
      const socket = io('http://localhost:3000');
      socket.on('connect', () => {
      // Connected, let's sign-up for to receive messages for this room
        socket.emit('room', room);
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
    }

    sendMessage(messages = []) {
      console.log(`messages sent: ${JSON.stringify(messages)}`);
      const message = {
        body: {
          text: messages[0].text,
          createdAt: messages[0].createdAt,
          userId: messages[0].user,
          chatId: messages[0]._id,
        },
      };
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));
      this.state.socket.emit('message', message);
    }

    render() {
      return (
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.sendMessage(messages)}
          user={{
            _id: 1,
          }}
        />
      );
    }
}
export default Chat;
