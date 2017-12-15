import React, {Component} from 'react';

import Login from '../login';
import SpaceWidget from '../space-widget';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      authorized: false,
      token: null
    };

    this.handleAuthorize = this.handleAuthorize.bind(this);
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
          !this.state.authorized &&
          (
            <Login onAuthorization={this.handleAuthorize} />
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
