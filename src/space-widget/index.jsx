import React, {Component} from 'react';
import PropTypes from 'prop-types';

const WIDGET_DIV_ID = 'my-ciscospark-widget';

class SpaceWidget extends Component {
  constructor() {
    super();
    this.state = {
      toUserEmail: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      toUserEmail: e.target.value
    });
  }

  handleClick() {
    const widgetEl = document.getElementById(WIDGET_DIV_ID);
    // Init a new widget
    window.ciscospark.widget(widgetEl).spaceWidget({
      accessToken: this.props.token,
      toUserEmail: this.state.toUserEmail
    });
  }

  render() {
    return (
      <div>
        <input
          onChange={this.handleChange}
          placeholder="To User Email"
          value={this.state.toUserEmail}
        /><button onClick={this.handleClick}>Open Widget</button>
        <div id={WIDGET_DIV_ID} style={{width: 500, height: 500}} />
      </div>
    );
  }
}

SpaceWidget.propTypes = {
  token: PropTypes.string.isRequired
};

export default SpaceWidget;
