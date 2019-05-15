import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button
} from 'react-native';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 300,
  },
});

class Profile extends Component {
  // constructor(props) {
  //   super(props);
  // }

  renderText = () => {
    return (
      <div>{this.props.current}</div>
    );
  };

  render() {
    return ( // Button source: https://stackoverflow.com/questions/43895772/the-title-prop-of-a-button-must-be-a-string-react-native
      <View style={styles.container}>
        <Text>
          Click the button below to update the text.
        </Text>
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this.props.fetchUser()}
          title="Press Me"
        >
          Press Me
        </Button>
      </View>
    );
  }
}

// From Redux SA
const mapStateToProps = state => (
  {
    post: state.posts.current,
  }
);

export default connect(mapStateToProps, { fetchUser })(Profile);
