import React, {Component} from 'react';
import ciscospark from 'ciscospark';

import Login from './Login';
import Logout from './Logout';
import SpaceWidget from './SpaceWidget';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      authorized: false,
      ready: false,
      token: null
    };

    this.setupSpark();
  }

  componentWillMount() {
    this.spark.once('ready', () => {
      this.setState({ready: true});

      if (this.spark.canAuthorize) {
        // Authorization is successful
        this.spark.credentials.getUserToken().then((token) => {
          this.handleAuthorize(token.access_token);
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


  handleAuthorize(token) {
    this.setState({
      authorized: true,
      token
    });
  }

  render() {
    return (
      <div>
        Spark OAuth Demo <br />
        {
          !this.state.ready &&
          <div>Loading...</div>
        }
        {
          this.state.ready && !this.state.authorized &&
          (
            <Login ready={this.state.ready} spark={this.spark} />
          )
        }
        {
          this.state.ready && this.state.authorized &&
          (
            <div>
              <Logout spark={this.spark} />
              <SpaceWidget token={this.state.token} />
            </div>
          )
        }
      </div>
    );
  }
}

export default Main;
