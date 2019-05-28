/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FirstScreenNav from '../navigation/first_screen_nav';
import MainTabBar from '../navigation/main_tab_bar';

class Main extends Component {
  render() {
    // return (<FirstScreenNav />);
    if (this.props.authenticated) {
      return (<MainTabBar onNavigationStateChange={null} />);
    } else {
      return (<FirstScreenNav />); // don't change, we can't load [<MainTabBar>] because [axios.defaults.headers] may not be set yet.
    }
  }
}

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.auth.authenticated,
  };
}

export default connect(mapStateToProps, null)(Main);
