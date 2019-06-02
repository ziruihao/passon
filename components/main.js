/* eslint-disable global-require */
/* eslint-disable react/prefer-stateless-function */
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

  componentWillUnmount() {
    console.log('MAIN UNMOUNTED FUCK');
  }

  render() {
    if (this.props.authenticated) {
      return (<MainTabBar onNavigationStateChange={null} />);
    } else {
      return (<AuthNav />); // don't change, we can't load [<MainTabBar>] because [axios.defaults.headers] may not be set yet.
    }
  }
}

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.auth.authenticated,
  };
}

export default connect(mapStateToProps, null)(Main);
