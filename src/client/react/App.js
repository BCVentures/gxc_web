import React, { Component } from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
ReactGA.initialize('UA-113888809-1');
export default class App extends Component {


  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
