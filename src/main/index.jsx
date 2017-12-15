import React, {Component} from 'react';

import Login from '../login';

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
            <div>{this.state.token}</div>
          )
        }
      </div>
    );
  }
}

export default Main;
