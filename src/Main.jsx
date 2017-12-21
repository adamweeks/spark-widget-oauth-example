import React, {Component} from 'react';

import Login from './Login';
import SpaceWidget from './SpaceWidget';
import createSpark from './spark';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      authorized: false,
      token: null,
      ready: false
    };

    this.handleAuthorize = this.handleAuthorize.bind(this);

    this.setupSpark();
  }

  setupSpark() {
    createSpark().then((spark) => {
      this.sparkInstance = spark;
      this.setState({ready: true});
    });
  }

  handleAuthorize(token) {
    this.setState({
      authorized: true,
      token
    });
  }

  render() {
    if (!this.state.ready) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div>
        Spark OAuth Demo <br />
        {
          !this.state.authorized &&
          (
            <Login onAuthorization={this.handleAuthorize} spark={this.sparkInstance} />
          )
        }
        {
          this.state.authorized &&
          (
            <SpaceWidget token={this.state.token} />
          )
        }
      </div>
    );
  }
}

export default Main;
