import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MessagingScreen from '../containers/Messaging';
import ChatScreen from '../containers/Chat';

// nest stack navigator to handle two internal views
const MessagingTab = createStackNavigator({
  // keys are the names of the "routes"
  Overview: { screen: MessagingScreen },
  Chat: { screen: ChatScreen },
}, {
  headerMode: 'screen',
  headerBackTitleVisible: true,
});

export default MessagingTab;
