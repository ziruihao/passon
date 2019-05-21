import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import Teach from '../components/teach';
import { fetchTeaches } from '../actions/index';

class Learns extends Component {
  componentDidMount() {
    this.props.fetchTeaches();
  }

  render() {
    const teachSkills = this.props.allTeaches.map((item) => {
      return <Teach key={item.id} teachId={item.id} title={item.title} years={item.years} bio={item.bio} ratings={item.ratings} />;
    });

    return (
      <View>
        { teachSkills }
      </View>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    allTeaches: reduxState.teaches.all,
  };
}

export default connect(mapStateToProps, { fetchTeaches })(Learns);
