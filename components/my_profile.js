import React from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
  Text,
  ListView,
  TouchableHighlight,
} from 'react-native';
import { fetchSelf } from '../actions/index';

class My_Profile extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: 'black',
  }

  componentDidMount() {
    this.props.fetchSelf();
    console.log(this.props.Self);
  }

  render() {
    if (this.props.Self === null) {
      return (<Text>Loading</Text>);
    } else {
      return (
        <View>
          <Text>{this.props.Self.email}</Text>
          <Text>{this.props.Self.firstName}</Text>
        </View>
      );
    }
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    Self: reduxState.user.current,
  };
}

export default connect(mapReduxStateToProps, { fetchSelf })(My_Profile);
