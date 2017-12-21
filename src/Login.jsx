import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor() {
    super();

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillMount() {
    if (this.props.spark.canAuthorize) {
      // Authorization is successful
      this.props.spark.credentials.getUserToken().then((token) => {
        this.props.onAuthorization(token.access_token);
      });
    }
  }

  handleLogin() {
    // initiate the login sequence if not authenticated.
    this.props.spark.authorization.initiateLogin();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleLogin}>
          Login
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  onAuthorization: PropTypes.func.isRequired,
  spark: PropTypes.object.isRequired
};

export default Login;
