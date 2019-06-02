import { createStackNavigator } from 'react-navigation';
import MessagingScreen from '../containers/Messaging/Messaging';
import ChatScreen from '../containers/Messaging/Chat';

const MessagingTab = createStackNavigator({
  Overview: { screen: MessagingScreen },
  Chat: { screen: ChatScreen },
}, {
  headerMode: 'screen',
  headerBackTitleVisible: true,
});

export default MessagingTab;
