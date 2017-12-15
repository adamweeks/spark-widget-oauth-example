import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ciscospark from 'ciscospark';

class Login extends Component {
  constructor() {
    super();

    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      ready: false
    };

    this.setupSpark();
  }

  componentWillMount() {
    this.spark.once('ready', () => {
      this.setState({ready: true});

      if (this.spark.canAuthorize) {
        // Authorization is successful
        this.spark.credentials.getUserToken().then((token) => {
          this.props.onAuthorization(token.access_token);
        });
      }
    });
  }

  setupSpark() {
    let redirectUri = `${window.location.protocol}//${window.location.host}`;
    if (window.location.pathname) {
      redirectUri += window.location.pathname;
    }

    this.spark = ciscospark.init({
      config: {
        credentials: {
          client_id: process.env.CISCOSPARK_CLIENT_ID,
          redirect_uri: redirectUri,
          scope: 'spark:all spark:kms'
        }
      }
    });
  }

  handleLogin() {
    // initiate the login sequence if not authenticated.
    this.spark.authorization.initiateLogin();
  }

  render() {
    return (
      <div>
        <button disabled={!this.state.ready} onClick={this.handleLogin}>
          Login
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  onAuthorization: PropTypes.func.isRequired
};

export default Login;
