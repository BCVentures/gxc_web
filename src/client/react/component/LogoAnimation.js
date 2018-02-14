import React, { Component } from 'react';
import { imageRequire } from '../../../utils/universalRequire';

export default class LogoAnimation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    setTimeout(() => {
      this.setState({ active: true });
    }, 2000);
  }

  render() {
    const { active } = this.state;
    return (
      <div id="logo" className={active ? 'active' : ''}>
        <div className="logo">
          <div className="box" id="blue" />
          <div className="box" id="green" />
          <div className="box" id="red">
            <div className="box" id="yellow" />
          </div>
        </div>
        <div className="logo-title">
          <img src={imageRequire('gxc.svg')} alt="gxc" className="gxc" />
        </div>
      </div>
    );
  }
}
