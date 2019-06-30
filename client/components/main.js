/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Font } from 'expo';
import AuthNav from '../navigation/auth_nav';
import MainTabBar from '../navigation/main_tab_bar';

class Main extends Component {
  async componentWillMount() {
    await Font.loadAsync({
      'quicksand-bold': require('../assets/fonts/Quicksand-Bold.ttf'),
      'quicksand-regular': require('../assets/fonts/Quicksand-Regular.ttf'),
    });
  }

  render() {
    if (this.props.authenticated) {
      return (<MainTabBar onNavigationStateChange={null} />);
    } else {
      return (<AuthNav />);
    }
  }
}

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.auth.authenticated,
  };
}

export default connect(mapStateToProps, null)(Main);
