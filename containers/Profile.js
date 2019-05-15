import React, { Component } from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
    return (
      <View style={styles.container}>
        <Text>
          Click the button below to update the text.
        </Text>
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

export default withRouter(connect(mapStateToProps, { fetchUser })(Profile));
