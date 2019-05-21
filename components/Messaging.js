/* eslint-disable new-cap */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import {
  StyleSheet, View, Button, // FlatList,
} from 'react-native';

class Messaging extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // chats: 'various chats',
      //    data: [],
    };
  }

  render() {
    return (
      <View style={styles.container}>


        <Button title="Go to Chat"
          onPress={() => this.props.navigation.navigate('Chat')}
        >
          Go to Chat
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
  },
  nameInput: { // 3. <- Add a style for the input
    height: 24 * 2,
    margin: 24,
    paddingHorizontal: 24,
    borderColor: '#111111',
    borderWidth: 1,
  },
});

export default Messaging;
