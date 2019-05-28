/* eslint-disable global-require */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button, AsyncStorage, ImageBackground, Image, TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { fetchUser, fetchSelf, signoutUser } from '../actions';
import Learns from '../components/learns';
import Teaches from '../components/teaches';
import {
  colors, fonts, padding, dimensions,
} from '../styles/base';

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
    flex: -1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    zIndex: -1,
    position: 'absolute',
    top: '0%',
  },
  tabsContainer: {
    flex: 1,
    // justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-end',
  },
  tabs: {
    marginLeft: 50,
    marginRight: 50,
    width: 120,
    height: 50,
    resizeMode: 'contain',
    top: 40,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: dimensions.fullWidth,
    paddingBottom: 23,
  },
  button: {
    backgroundColor: '#620BC9',
    borderRadius: 5,
    color: '#FFFFFF',
    width: 297,
    height: 41,
    zIndex: 0,
  },
  cardContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.props.fetchSelf();
    }
  }

  toggleTeach = () => {
    console.log('TOGGLED');
    this.setState((prevState) => {
      return { teach: !prevState.teach };
    });
  }

  renderTeaches() {
    if (this.props.self.teach != null) {
      return (
        <View>
          <Teaches teaches={this.props.self.teach} nav={this.props.navigation} user={this.props.self} self={this.props.self} />
        </View>
      );

      // const teaches = this.props.self.teach.map((element) => {
      //   return (
      //     <View style={styles.teachCard}>
      //       <Teaches teaches={element.teach} nav={this.props.navigation} user={element} self={element} />
      //     </View>
      //   );
      // });
      // return (
      //   <View>
      //     { teaches }
      //   </View>
      // );
    } else {
      return (
        <View />
      );
    }
  }

  renderLearns() {
    return <View><Learns learns={this.props.self.learn} nav={this.props.navigation} user={this.props.self} self={this.props.self} /></View>;
  }

  render() {
    if (this.props.self === null) {
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
          <View style={styles.cardContainer}>
            {this.renderTeaches()}
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button onPress={() => this.props.navigation.navigate('AddSkillTeach')}
                title="Add Skill"
                color="#FFFFFF"
              />
            </View>
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
            <Button onPress={() => this.props.navigation.navigate('AddSkillLearn')}
              title="Add Skill"
            />
            <Button onPress={() => {
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
    self: reduxState.user.self,
  };
}

export default withNavigationFocus(connect(mapReduxStateToProps, { fetchUser, fetchSelf, signoutUser })(ProfileSelf));
