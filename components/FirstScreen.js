import React from 'react';
import { View, Button, Text } from 'react-native';

const FirstScreen = (props) => {
  return (
    <View>
      <Text style={{ margin: 50 }}>PassOn</Text>
      <Button onPress={() => { props.navigation.navigate('SignIn'); }} title="Sign In" />
      <Button onPress={() => { props.navigation.navigate('SignUp'); }} title="Sign Up" />
    </View>
  );
};

export default FirstScreen;
