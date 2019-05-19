import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import { connect } from 'react-redux';
// import Card from '@material-ui/core/Card';
// import Button from '@material-ui/core/Button';
// import { signinUser } from '../actions';
import {
  Text, View, Button, Input,
} from 'react-native';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    // this.onInputChange = this.onInputChange.bind(this);
    // this.post = this.post.bind(this);
    // this.renderResponse = this.renderResponse.bind(this);
  }

  onInputChange = (e) => {
    switch (e.target.id) {
      case 'email':
        this.setState({ email: e.target.value });
        break;
      case 'password':
        this.setState({ password: e.target.value });
        break;
      default:
        break;
    }
  };

  post = () => { // Check that there are no bad or empty values that the user is attempting to post
    if (this.state.email === ''
      || this.state.password === '') {
      this.setState({ valid_entry: false });
    } else {
    //   this.props.signinUser({
    //     email: this.state.email,
    //     password: this.state.password,
    //   }, this.props.history);
      console.log('sign in');
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
        <Text>Sign In</Text>
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
        <div className="post_footer">
          {this.renderResponse()}
          <Button variant="contained" color="primary" onClick={this.post}>Sign In</Button>
          <Button variant="contained"><NavLink to="/signin" className="link">I don't have an account yet.</NavLink></Button>
        </div>
      </View>
    );
  }
}

// export default withRouter(connect(null, { signinUser }(SignIn)));
// export default withRouter((SignIn));
export default SignIn;
