import React, { Component } from 'react';
import { Layout, Menu, Select, Input, Icon, Row, Col, message } from 'antd';
import { translate } from 'react-i18next';
import { Link } from "react-router";
import { Drawer, List } from 'antd-mobile';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import ReactGA from "react-ga";
import Fade from 'react-reveal/Fade';
import { imageRequire } from '../../utils/universalRequire';
import LogoAnimation from './component/LogoAnimation';
import i18n from "../../crossover/i18n/i18n";
import { subscribe } from "../../crossover/api/subscribeApi";
import { Flip } from "react-reveal";


@translate(['main', 'member', 'error'], { wait: true })
@observer
export default class Home extends Component {
  @observable sidebarOpen = false;
  @observable subscribeEmail = "";

  @observable
  handleChangeLang(lang) {
    i18n.changeLanguage(lang);
  }

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  t = (key) => {
    const str = this.props.t(key);
    if (str.indexOf("\n") < 0) return str;
    return str.split("\n")
      .map((item, index) => <p key={index}>{item}</p>);
  };

  renderMember = (member) => {

    return (
      <Fade duration={1500}>
        <li className="member" key={member.name}>
          <div className="image-box">
            <img src={imageRequire(member.photo)} className="photo" alt={member.name}/>
          </div>
          <div className="texts">
            <h2 className="name">
              {member.name}
            </h2>
            <h5 className="role">
              {member.role}
            </h5>
            <h5 className="description">
              {member.description}
            </h5>
          </div>
        </li>
      </Fade>
    );
  };

  renderAdvisor = (member) => {
    return (

      <Col xs={24} sm={12} className="advisor" key={member.name}>
        <Fade duration={1500}>
          <img src={imageRequire(member.photo)} className="photo" alt={member.name}/>
          <div className="texts">
            <h2 className="name">
              {member.name}
            </h2>
            <h5 className="description">
              {member.description}
            </h5>
          </div>
        </Fade>
      </Col>
    );
  };

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email)
      .toLowerCase());
  }

  async onEnterEmail(email) {
    if (!this.validateEmail((email))) return message.error("이메일 형식이 잘못되었습니다.");
    try {
      await subscribe(email);
      this.subscribeEmail = "";
      message.info("성공적으로 구독에 성공하셨습니다.");
    } catch (e) {
      message.error("등록 중 에러가 발생했습니다. 다시 시도해주세요.");
      console.log(e);
    }


  };

  openMobileSidebar = () => {
    console.log(this.sidebarOpen);
    this.sidebarOpen = !this.sidebarOpen;
  };

  downloadWhitepaper = (lang) => {
    message.info(this.props.t("error:whitepaperDownload"));
  };

  render() {
    console.log('render...');
    const Search = Input.Search;
    const { Header, Footer, Content } = Layout;
    const Option = Select.Option;
    const t = this.t;
    const languages = [
      { label: "English", whitePaperLink: "#", code: "english" },
      { label: "日本語", whitePaperLink: "#", code: "japanese" },
      { label: "한국어", whitePaperLink: "#", code: "korean" },
      { label: "中國語", whitePaperLink: "#", code: "chinese" },
    ];
    const whitepapers = [];
    const memberNames = ["kwk", "yjh", "bhs", "cyw", "pje", "lhh"];
    const members = memberNames.map(memberName => {
      return {
        name: t(`member:${memberName}:name`),
        photo: `photo_${memberName}.png`,
        role: t(`member:${memberName}:role`),
        description: t(`member:${memberName}:description`),
      };
    });
    const advisorNames = ["ckh", "kjh", "kdi", "cjm", "myw"];
    const advisors = advisorNames.map(name => {
      return {
        name: t(`member:${name}:name`),
        photo: `photo_${name}.png`,
        description: this.t(`member:${name}:description`),
      };
    });

    const sidebar = (<List>
      {[0, 1, 2, 3, 4, 5].map((i, index) => {
        if (index === 0) {
          return (<List.Item
            key={i}
            thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            multipleLine
          >Category</List.Item>);
        }
        return (<List.Item
          key={i}
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
        >Category{index}</List.Item>);
      })}
    </List>);
    const roadmaps = [
      ["Whitepaper publish", "GXC Private Sale"],
      ["GXC Public Sale", "Testnet Develop start", "EOS Testnet token generator"],
      ["Alpha Testnet Release", "GXC Web Wallet"],
      ["GXC DEX Launch", "GXC Mobile Wallet"],
      ["Coming soon"],
      ["Coming soon"],
      ["Coming soon"],
      ["Coming soon"],
    ];
    return (

      <Layout className="layout" id="main">
        <Header className="header">
          <div className="header-inner">
            <div className="logo-box">
              <a className="" href="/">
                <img src={imageRequire('logo.svg')} alt="logo" className="logo"/>
                <span><img src={imageRequire('gxc.svg')} alt="gxc" className="gxc"/></span>
              </a>
            </div>
            <Menu
              theme="white"
              mode="horizontal"
              className="only-desktop"
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1"><a className="nav-link" href="#whitepaper">{t('Whitepaper')}</a></Menu.Item>
              <Menu.Item key="2"><a className="nav-link" href="#team">Team</a></Menu.Item>
              <Menu.Item key="3"><a className="nav-link" href="#roadmap">Roadmap</a></Menu.Item>
              <Menu.Item className="lang-select">
                <Select defaultValue={i18n.language} style={{ width: 120 }}
                        onChange={this.handleChangeLang.bind(this)}>
                  <Option value="KR">KR</Option>
                </Select>
              </Menu.Item>
            </Menu>
            <Icon className="only-mobile" type="menu-fold" onClick={this.openMobileSidebar}
                  style={{ display: "none" }}/>
          </div>
        </Header>
        <Content className="" id="main-content">

          <Content className="main-bg">
            <h1 className="title">{t('main:title')}</h1>
            <h4 className="description">{t('main:description')}</h4>

            <div className="left-pattern"/>
            <div className="center"/>
            <div className="right-pattern only-desktop"/>
          </Content>

          <Fade duration={2000}>
            <Content className="intro">
              <LogoAnimation/>
              <h2 className="title">{t('main:introTitle')}</h2>
              <h4 className="description">{t('main:introDescription')}</h4>
            </Content>
          </Fade>

          <Content className="advantages">

            <div className="reward">
              <Fade duration={2000}>
                <div className="container-fluid">
                  <div className="texts">
                    <h2 className="title">{t('main:reward:title')}</h2>
                    <h3 className="description">{t('main:reward:description')}</h3>
                  </div>
                  <img className="right" src={imageRequire('pictogram_reward.png')} alt="pictorgram_reward"/>
                </div>
              </Fade>
            </div>
            <div className="p2p right">
              <Fade duration={2000}>
                <div className="container-fluid">
                  <img src={imageRequire('pictogram_p2p.png')} alt="pictorgram_p2p"/>
                  <div className="right texts">
                    <h2 className="title">{t('main:p2p:title')}</h2>
                    <h3 className="description">{t('main:p2p:description')}</h3>
                  </div>
                </div>
              </Fade>
            </div>

            <div className="commission left">
              <Fade duration={2000}>
                <div className="container-fluid">
                  <div className="texts">
                    <h2 className="title">{t('main:commission:title')}</h2>
                    <h3 className="description">{t('main:commission:description')}</h3>
                  </div>
                  <img className="right" src={imageRequire('pictogram_commission.png')} alt="commission"/>
                </div>
              </Fade>`
            </div>
          </Content>

          <Content className="whitepaper" id="whitepaper">
            <Fade cascade duration={2000}>
              <img src={imageRequire('logo_white.svg')} className="logo" alt="logo"/>
              <h1 className="title">{t('main:whitepaper.title')}</h1>
              <h3 className="description">{this.t('main:whitepaper.description')}</h3>
              <div className="links">
                {languages.map((language, index) => {
                  return (<Link
                    key={index}
                    onClick={this.downloadWhitepaper.bind(this, language.whitePaperLink)}
                    to={language[1]}
                    className={`link-to-whitepaper ${language.code}`}
                  >{language.label}</Link>);
                })}
              </div>
            </Fade>
          </Content>
          <Content className="members section-type-1" id="team">
            <h1 className="title">{t("main:member:title")}</h1>
            <ul>
              {members.map(member => this.renderMember(member))}
            </ul>
          </Content>
          <Content className="advisors section-type-1">
            <h1 className="title">{t("main:advisor:title")}</h1>
            <div className="container-fluid">
              <Row gutter={32}>
                {advisors.map(member => this.renderAdvisor(member))}
              </Row>
            </div>
          </Content>
          <Content className="roadmap section-type-1 container-fluid" id="roadmap">
            <h1 className="title">{t("main:roadmap:title")}</h1>
            <div className="content">
              {roadmaps.map((roadmap, key) => {
                return (
                  <Row gutter={16} key={key}>
                    <Col className="quarter" span={6} offset={key % 2 === 0 ? 3 : 16}>
                      <ul className="title">
                        {roadmap.map((e, index) => {
                          return <li key={index}>{e}</li>;
                        })}
                      </ul>
                    </Col>
                  </Row>
                );
              })}
            </div>
          </Content>

          <Content className="partners section-type-1">
            <h1 className="title">{t("main:partner:title")}</h1>
            <ul className="container-fluid">
              <Fade cascade>
                <li key="xlgames" className="xlgames">
                  <img src={imageRequire("logo_xlgames.png")} alt="logo_xlgames"/>
                </li>
                <li key="superplanet">
                  <img src={imageRequire("logo_superplanet.png")} alt="logo_superplanet"/>
                </li>
                <li key="cointong">
                  <img src={imageRequire("logo_cointong.png")} alt="logo_cointong"/>
                </li>
                <li key="besuccess">
                  <img src={imageRequire("logo_besuccess.png")} alt="logo_besuccess"/>
                </li>
                <li key="hyperithm">
                  <img src={imageRequire("logo_hyperithm.png")} alt="logo_hyperithm"/>
                </li>
                <li key="pays">
                  <img src={imageRequire("logo_pays.png")} alt="logo_pays"/>
                </li>
              </Fade>
            </ul>
          </Content>
          <Content className="subscribe section-type-1">
            <h1 className="title">{t('main:subscribe:title')}</h1>
            <h3 className="description">{t('main:subscribe:description')}</h3>
            <Search type="email" placeholder="E-Mail Address" enterButton="Subscribe"
                    onChange={e => this.subscribeEmail = e.target.value} value={this.subscribeEmail}
                    onSearch={this.onEnterEmail.bind(this)}/>
          </Content>
        </Content>
        <Footer style={{ textAlign: 'center', background: "#414141", color: "white" }}>
          <img src={imageRequire('logo.svg')} alt="logo" className="logo"/>
          <img src={imageRequire('gxc_white.svg')} alt="gxc" className="gxc"/>
          <div className="email">
            <Link to="mailto:support@bcventures.io">support@bcventures.io</Link>
          </div>
          <Content className="social" style={{ display: 'none' }}>
            <Link className="facebook"/>
            <Link className="facebook"/>
          </Content>
          <div className="copyright">© Blockchain Ventures 2018</div>
        </Footer>
      </Layout>
    );
  }
}

