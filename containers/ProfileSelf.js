/* eslint-disable global-require */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button, AsyncStorage, ImageBackground, TouchableOpacity, ScrollView,
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
  appArea: {
    top: dimensions.statusBarHeight,
    // justifyContent: 'space-around',
    // alignItems: 'center',
  },
  bg: {
    resizeMode: 'cover',
    width: dimensions.fullWidth,
    height: 2.1653 * dimensions.fullWidth,
    zIndex: -1,
    top: 0,
  },
  tabsContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    width: dimensions.fullWidth,
    height: 0.2560 * dimensions.fullWidth,
    borderWidth: 1,
  },
  teachLearnButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '40%',
    borderWidth: 1,
  },
  teachLearnButtonTextActive: {
    fontSize: 0.0587 * dimensions.fullWidth,
    fontWeight: '600',
    color: colors.primary,
  },
  teachLearnButtonTextInactive: {
    fontSize: 0.0587 * dimensions.fullWidth,
    fontWeight: '600',
    color: colors.white,
  },
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  name: {
    fontSize: fonts.h3,
    color: '#FFFFFF',
  },
  profileContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: 0.4026 * dimensions.fullWidth,
    borderWidth: 1,
  },
  signOut: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  rating: {
    fontSize: fonts.p1,
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: dimensions.fullWidth,
    paddingBottom: '5%',
    borderWidth: 1,

  },
  addSkillButton: {
    backgroundColor: '#620BC9',
    borderRadius: 5,
    color: '#FFFFFF',
    width: '75%',
    height: 41,
    zIndex: 0,
  },
  svg: {
    width: '100%',
  },
});

class ProfileSelf extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teach: true,
    };
    this.toggleTeach = this.toggleTeach.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.props.fetchSelf();
    }
  }

  toggleTeach = (event) => {
    this.setState({ teach: event });
  }

  renderTeaches() {
    if (this.props.self.teach != null) {
      return (
        <View>
          <Teaches teaches={this.props.self.teach} nav={this.props.navigation} user={this.props.self} self={this.props.self} />
        </View>
      );
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
    } else if (this.state.teach) {
      return (
        <View style={styles.appArea}>
          <ImageBackground source={require('../assets/teachBackground.png')} style={styles.bg}>
            <View style={styles.signOut}>
              <Button
                color={colors.white}
                onPress={() => {
                  AsyncStorage.removeItem('token');
                  this.props.signoutUser();
                }}
                title="Sign Out"
              />
            </View>
            <View style={styles.profileContainer}>
              <Text style={styles.name}>
                {this.props.self.firstName} {this.props.self.lastName}
              </Text>
              <Text style={styles.rating}>Avg Rating: {this.props.self.avg_rating}</Text>
            </View>
            <View style={styles.tabsContainer}>
              <TouchableOpacity onPress={() => { this.toggleTeach(true); }} style={styles.teachLearnButton}>
                <Text style={styles.teachLearnButtonTextActive}>Teach</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.toggleTeach(false); }} style={styles.teachLearnButton}>
                <Text style={styles.teachLearnButtonTextInactive}>Learn</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
              <ScrollView>
                {this.renderTeaches()}
              </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button onPress={() => this.props.navigation.navigate('AddSkillTeach')}
                  title="Add Skill"
                  color="#FFFFFF"
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.appArea}>
          <ImageBackground source={require('../assets/learnBackground.png')} style={styles.bg}>
            <View style={styles.signOut}>
              <Button
                color={colors.white}
                onPress={() => {
                  AsyncStorage.removeItem('token');
                  this.props.signoutUser();
                }}
                title="Sign Out"
              />
            </View>
            <View style={styles.profileContainer}>
              <Text style={styles.name}>
                {this.props.self.firstName} {this.props.self.lastName}
              </Text>
              <Text style={styles.rating}>Avg Rating: {this.props.self.avg_rating}</Text>
            </View>
            <View style={styles.tabsContainer}>
              <TouchableOpacity onPress={() => { this.toggleTeach(true); }} style={styles.teachLearnButton}>
                <Text style={styles.teachLearnButtonTextInactive}>Teach</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.toggleTeach(false); }} style={styles.teachLearnButton}>
                <Text style={styles.teachLearnButtonTextActive}>Learn</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.body}> */}
            <View style={styles.cardContainer}>
              {/* <FlatList
                data={this.props.self.learns}
                renderItem={this.renderLearns}
                keyExtractor={item => item.id}
              /> */}
              <ScrollView>
                {this.renderLearns()}
              </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.addSkillButton}>
                <Button onPress={() => this.props.navigation.navigate('AddSkillLearn')}
                  title="Add Skill"
                  color="#FFFFFF"
                />
              </View>
            </View>
            {/* </View> */}
          </ImageBackground>
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
