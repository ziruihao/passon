import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import Learn from '../components/learn';
import { fetchLearns } from '../actions/index';

class Learns extends Component {
  componentDidMount() {
    this.props.fetchLearns();
  }

  render() {
    const learnSkills = this.props.allLearns.map((item) => {
      return <Learn key={item.id} learnId={item.id} title={item.title} />;
    });

    return (
      <View>
        { learnSkills }
      </View>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    allLearns: reduxState.learns.all,
  };
}

export default connect(mapStateToProps, { fetchLearns })(Learns);
