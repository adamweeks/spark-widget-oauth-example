import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor() {
    super();

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    // initiate the login sequence if not authenticated.
    this.props.spark.authorization.initiateLogin();
  }

  render() {
    return (
      <div>
        <button disabled={!this.props.ready} onClick={this.handleLogin}>
          Login
        </button>
      </div>
    );
  }
}

Login.defaultProps = {
  ready: false
};

Login.propTypes = {
  ready: PropTypes.bool,
  spark: PropTypes.object.isRequired
};

export default Login;
