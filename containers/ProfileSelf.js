/* eslint-disable global-require */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button, AsyncStorage, ImageBackground, Image, TouchableHighlight, FlatList,
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
    justifyContent: 'space-around',
    flexDirection: 'row',
    // flexWrap: 'nowrap',
    alignItems: 'center',
    paddingBottom: 140,
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
  name: {
    fontSize: fonts.h3,
    color: '#FFFFFF',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  signOut: {
    position: 'absolute',
    top: 0,
    right: 0,
    // margin: 10,
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

  // toggleTeach = () => {
  //   console.log('TOGGLED');
  //   this.setState((prevState) => {
  //     return { teach: !prevState.teach };
  //   });
  // }
  toggleTeach = (event) => {
    this.setState((prevState) => {
      return { teach: event };
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
    } else if (this.state.teach === true) {
      return (
        <View style={styles.container}>
          {/* <Image source={require('../assets/teachBg.jpg')} style={styles.bg} />
          <Image /> */}
          <ImageBackground source={require('../assets/teachBackground.png')} style={{ width: '100%', height: '100%' }}>
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
            <Text>{this.props.self.firstName} {this.props.self.lastName}</Text>
            <Text>Avg Rating: {this.props.self.avg_rating}</Text>
            {/* <View style={styles.tabsContainer}>
              <Image source={require('../assets/teachTitleBlank.jpg')} style={styles.tabs} />
              <TouchableHighlight onPress={this.toggleTeach} underlayColor="orange">
                <Image source={require('../assets/learnTitleColor.png')} style={styles.tabs} />
              </TouchableHighlight>
            </View> */}
            <View style={styles.nameContainer}>
              <Text style={styles.name}>
                {this.props.self.firstName} {this.props.self.lastName}
              </Text>
            </View>
            <View style={styles.tabsContainer}>
              {/* <View><Image source={require('../assets/teachTitleBlank.jpg')} style={styles.tabs} /></View>
              <View>
                <TouchableHighlight onPress={this.toggleTeach} underlayColor="orange">
                  <Image source={require('../assets/learnTitleColor.png')} style={styles.tabs} />
                </TouchableHighlight>
              </View> */}
              <Button onPress={() => { this.toggleTeach(true); }}
                title="Teach"
                color="#620BC9"
              />
              <Button onPress={() => { this.toggleTeach(false); }}
                title="Learn"
                color="#FFFFFF"
              />
            </View>
            <View style={styles.cardContainer}>
              {/* <FlatList
                data={this.props.self.teaches}
                renderItem={this.renderTeaches}
                keyExtractor={item => item.id}
              /> */}
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
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {/* <Image source={require('../assets/learnBg.jpg')} style={styles.bg} />
          <Image /> */}
          <ImageBackground source={require('../assets/learnBackground.png')} style={{ width: '100%', height: '100%' }}>
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
            <View style={styles.nameContainer}>
              <Text style={styles.name}>
                {this.props.self.firstName} {this.props.self.lastName}
              </Text>
            </View>
            <View style={styles.tabsContainer}>
              {/* <View style={styles.tabs}> */}
              {/* <View> */}
              {/* <TouchableHighlight onPress={this.toggleTeach} underlayColor="orange">
                <Image source={require('../assets/teachTitleColor.png')} style={styles.tabs} />
              </TouchableHighlight>
            </View>
            <View><Image source={require('../assets/learnTitleBlank.jpg')} style={styles.tabs} /></View> */}
              {/* </View> */}
              <Button onPress={() => { this.toggleTeach(true); }}
                title="Teach"
                color="#FFFFFF"
              />
              <Button onPress={() => { this.toggleTeach(false); }}
                title="Learn"
                color="#620BC9"
              />
            </View>
            {/* <View style={styles.body}> */}
            <View style={styles.cardContainer}>
              {/* <FlatList
                data={this.props.self.learns}
                renderItem={this.renderLearns}
                keyExtractor={item => item.id}
              /> */}
              {this.renderLearns()}
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
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
