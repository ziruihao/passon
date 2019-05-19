import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';
// import Card from '@material-ui/core/Card';
// import Button from '@material-ui/core/Button';
// import { signupUser } from '../actions';
import {
  Text, View, Button, Input,
} from 'react-native';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      university: '',
    };

    // this.onInputChange = this.onInputChange.bind(this);
    // this.post = this.post.bind(this);
    // this.renderResponse = this.renderResponse.bind(this);
  }

  onInputChange = (e) => {
    switch (e.target.id) {
      case 'name':
        this.setState({ name: e.target.value });
        break;
      case 'email':
        this.setState({ email: e.target.value });
        break;
      case 'password':
        this.setState({ password: e.target.value });
        break;
      case 'university':
        this.setState({ university: e.target.value });
        break;
      default:
        break;
    }
  };

  post = () => { // Check that there are no bad or empty values that the user is attempting to post
    if (this.state.name === ''
      || this.state.email === ''
      || this.state.password === ''
      || this.state.university === '') {
      this.setState({ valid_entry: false });
    } else {
      // this.props.signupUser({
      //   name: this.state.name,
      //   email: this.state.email,
      //   password: this.state.password,
      //   university: this.state.university,
      // }, this.props.history);
      console.log('sign up');
    }
  };

  renderResponse = () => {
    if (!this.state.valid_entry) {
      return (
        <div className="bad_input">Field missing</div>
      );
    } else {
      return (
        <div>Please fill in missing fields</div>
      );
    }
  };

  render() {
    return (
      <View>
        <Text>Create an Account</Text>
        <Input
          placeholder="Full Name"
          onChange={this.onInputChange}
          className="post_content"
          id="name"
        />
        <Input
          placeholder="Email"
          onChange={this.onInputChange}
          className="post_content"
          id="email"
        />
        <Input
          placeholder="Password"
          onChange={this.onInputChange}
          className="post_content"
          id="password"
          type="password"
        />
        <Input
          placeholder="University"
          onChange={this.onInputChange}
          className="post_content"
          id="university"
        />
        <View>
          {this.renderResponse()}
          <Button onPress={this.post}>Sign Up</Button>
          <Button>I already have an account.</Button>
          {/* <Button variant="contained"><NavLink to="/signin" className="link">I already have an account.</NavLink></Button> */}
        </View>
      </View>
    );
  }
}

// export default withRouter(connect(null, { signupUser })(SignUp));
// export default withRouter((SignUp));
export default SignUp;
