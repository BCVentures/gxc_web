import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import { imageRequire } from '../../utils/universalRequire';
import { Layout, Row, Col, Menu } from 'antd';

const { Header } = Layout;
// for the server return a reference to the
// path for this image. Otherwise, deal with
// it as a normal webpack import

export default class App extends Component {


  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};
