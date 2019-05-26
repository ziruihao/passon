/* eslint-disable global-require */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button, AsyncStorage, ImageBackground, Image, TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchUser, fetchSelf, signoutUser } from '../actions';
import Learns from '../components/learns';
import Teaches from '../components/teaches';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1,
  },
  image: {
    width: 400,
    height: 300,
  },
  bg: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    zIndex: -1,
    position: 'absolute',
    top: '0%',
  },
  tabsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-end',

  },
  tabs: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
  },
  body: {
    flex: 3,
  },
  button: {
    backgroundColor: '#620BC9',
    borderRadius: 5,
    color: '#FFFFFF',
    width: 297,
    height: 41,
  },
});

class ProfileSelf extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teach: false,
    };
    this.toggleTeach = this.toggleTeach.bind(this);
  }

  // renderText = () => {
  //   return (
  //     <div>{this.props.currentUser.}</div>
  //   );
  // };
  componentWillMount() {
    this.props.fetchSelf();
  }

  toggleTeach = () => {
    console.log('TOGGLED');
    this.setState((prevState) => {
      return { teach: !prevState.teach };
    });
  }

  renderTeaches() {
    return <View><Teaches teaches={this.props.Self.teach} /></View>;
  }

  renderLearns() {
    return <View><Learns learns={this.props.Self.learn} /></View>;
  }

  render() {
    if (this.props.Self === null) {
      return (<Text>Loading</Text>);
    } else if (this.state.teach === false) {
      return (
        <View style={styles.container}>
          <Image source={require('../assets/teachBg.jpg')} style={styles.bg} />
          <Image />
          <View style={styles.tabsContainer}>
            <Image source={require('../assets/teachTitleBlank.jpg')} style={styles.tabs} />
            <TouchableHighlight onPress={this.toggleTeach} underlayColor="orange">
              <Image source={require('../assets/learnTitleColor.png')} style={styles.tabs} />
            </TouchableHighlight>
          </View>
          <View style={styles.body}>
            {/* <View><Teaches teaches={this.props.User.teach} /></View> */}
            {this.renderTeaches()}
            <Button onPress={() => this.props.navigation.navigate('AddSkillTeach')}
              underlayColor="orange"
              style={styles.button}
              title="Add Skill"
              type="raised"
              color="#620BC9"
              borderRadius="5"
              BackgroundColor="#FFFFFF"
              width="297"
              height="41"
            />
            {/* <Button onPress={() => this.props.navigation.navigate('EditSkillTeach')}
            title="Edit Skill"
          /> */}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image source={require('../assets/learnBg.jpg')} style={styles.bg} />
          <Image />
          <View style={styles.tabsContainer}>
            <View style={styles.tabs}>
              <TouchableHighlight onPress={this.toggleTeach} underlayColor="orange">
                <Image source={require('../assets/teachTitleColor.png')} style={styles.tabs} />
              </TouchableHighlight>
              <Image source={require('../assets/learnTitleBlank.jpg')} style={styles.tabs} />
            </View>
          </View>
          <View style={styles.body}>
            {this.renderLearns()}
            {/* <View><Learns learns={this.props.User.learn} /></View> */}
            <Button onPress={() => this.props.navigation.navigate('AddSkillLearn')}
              title="Add Skill"
            />
            {/* <Button onPress={() => this.props.navigation.navigate('EditSkillLearn')}
          title="Edit Skill"
        /> */}
            <Button onPress={() => {
              // Uncomment these next two lines to determine whether token has changed
              // console.log("TOKEN");
              // AsyncStorage.getItem('token').then(response => console.log(response));
              AsyncStorage.removeItem('token');
              this.props.signoutUser();
            }}
              title="Sign Out"
            />
          </View>
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

export default connect(mapReduxStateToProps, { fetchUser, fetchSelf, signoutUser })(ProfileSelf);
