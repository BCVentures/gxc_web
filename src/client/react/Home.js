import React, { Component } from 'react';
import isMobile from "ismobilejs";
import Particles from 'react-particles-js';
import { imageRequire } from '../../utils/universalRequire';
import { Layout, Menu, Select } from 'antd';
import { FormattedMessage } from "react-intl";


const { Header, Footer, Content } = Layout;


export default class Home extends Component {
  handleChangeLang(lang) {
    i18n.changeLanguage(lang)
  }
  render() {

    return (
      <Layout className="layout" id="main">
        <Header className="header">
          <div className="logo-box">
            <a className="" href="/">
              <img src={imageRequire('logo.svg')} alt="logo" className="logo"/>
              <span><img src={imageRequire('gxc.svg')} alt="gxc" className="gxc"/></span>
            </a>
          </div>
          <Menu
            theme="white"
            mode="horizontal"
            className="desktop-menu"
            style={{ lineHeight: '64px' }}>
            <Menu.Item key="1"><a className="nav-link" href="#">Whitepaper</a></Menu.Item>
            <Menu.Item key="2"><a className="nav-link" href="#about">Team</a></Menu.Item>
            <Menu.Item key="3"><a className="nav-link" href="#team">Roadmap</a></Menu.Item>
            <Menu.Item key="5"><a className="nav-link" href="#contact">Token Sale</a></Menu.Item>
            <Menu.Item key="4"><a className="nav-link" href="#contact">News</a></Menu.Item>
            <Menu.Item>
              <Select defaultValue={i18n.language} style={{ width: 120 }} onChange={this.handleChangeLang.bind(this)}>
                <Option value="EN">EN</Option>
                <Option value="KR">KR</Option>
              </Select>
            </Menu.Item>
          </Menu>
        </Header>
        <Content className="">
          <Content className="main-bg">
            <FormattedMessage
  id="Tooltip.fees"
/>
        </Content>
          </Content>
        <Footer style={{ textAlign: 'center', background: "#001529", color: "white" }}>

        </Footer>
      </Layout>
    );
  }
}

