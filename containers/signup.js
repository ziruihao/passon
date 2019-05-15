import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }

  onInputChange = (e) => {
    switch (e.target.id) {
      case 'username':
        this.setState({ username: e.target.value });
        break;
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
    if (this.state.username === ''
      || this.state.email === ''
      || this.state.password === '') {
      this.setState({ valid_entry: false });
    } else {
      this.props.signupUser({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      }, this.props.history);
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
    return ( // Button source: https://material-ui.com/demos/buttons/
      <Card className="post post_body">
        <h1 className="post_content post_title">Sign up to create posts</h1>
        <input
          placeholder="Username"
          onChange={this.onInputChange}
          className="post_content"
          id="username"
        />
        <input
          placeholder="Email"
          onChange={this.onInputChange}
          className="post_content"
          id="email"
        />
        <input
          placeholder="Password"
          onChange={this.onInputChange}
          className="post_content"
          id="password"
          type="password"
        />
        <div className="post_footer">
          {this.renderResponse()}
          <Button variant="contained" color="primary" onClick={this.post}>Submit</Button>
          <Button variant="contained"><NavLink to="/signin" className="link">Existing User?</NavLink></Button>
        </div>
      </Card>
    );
  }
}

export default withRouter(connect(null, { signupUser })(SignUp));
