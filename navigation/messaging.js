import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MessagingScreen from '../components/Messaging';
import ChatScreen from '../components/Chat';

// nest stack navigator to handle two internal views
const MessagingTab = createStackNavigator({
  // keys are the names of the "routes"
  Overview: { screen: MessagingScreen },
  Chat: { screen: ChatScreen },
});

export default MessagingTab;
