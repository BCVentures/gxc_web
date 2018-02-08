import React, { Component } from 'react';
import { Layout, Menu, Select, Input, Icon, Row, Col, message } from 'antd';
import { translate } from 'react-i18next';
import { Link } from "react-router";
import { Drawer, List } from 'antd-mobile';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { imageRequire } from '../../utils/universalRequire';
import i18n from '../../crossover/i18n/i18n';


@translate(['main', 'member', 'error'], { wait: true })
@observer
export default class Home extends Component {
  @observable sidebarOpen = false;

  handleChangeLang(lang) {
    i18n.changeLanguage(lang);
  }

  t = (key) => {
    const str = this.props.t(key);
    if (str.indexOf("\n") < 0) return str;
    return str.split("\n")
      .map((item, index) => <p key={index}>{item}</p>)
  }

  renderMember = (member) => {

    return (
      <li className="member" key={member.name}>
        <img src={imageRequire(member.photo)} className="photo" alt={member.name} />
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
    );
  };

  renderAdvisor = (member) => {
    return (
      <Col xs={24} sm={12} className="advisor" key={member.name}>
        <img src={imageRequire(member.photo)} className="photo" alt={member.name} />
        <div className="texts">
          <h2 className="name">
            {member.name}
          </h2>
          <h5 className="description">
            {member.description}
          </h5>
        </div>
      </Col>
    );
  };

  onEnterEmail = (email) => {
    message.info("준비중입니다.");
  }

  openMobileSidebar = () => {
    console.log(this.sidebarOpen);
    this.sidebarOpen = !this.sidebarOpen;
  };

  downloadWhitepaper = (lang) => {
    message.info(this.props.t("error:whitepaperDownload"));
  }

  render() {
    const Search = Input.Search;
    const { Header, Footer, Content } = Layout;
    const t = this.t;
    const whitepapers = [
      ["English", "#", "english"],
      ["日本語", "#", "japanese"],
      ["한국어", "#", "korean"],
      ["中國語", "#", "chinese"],
    ];
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
          <div className="logo-box">
            <a className="" href="/">
              <img src={imageRequire('logo.svg')} alt="logo" className="logo" />
              <span><img src={imageRequire('gxc.svg')} alt="gxc" className="gxc" /></span>
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
            <Menu.Item key="5"><a className="nav-link" href="#contact" style={{display: "none"}}>Token Sale</a></Menu.Item>
            <Menu.Item key="4"><a className="nav-link" href="#contact" style={{display: "none"}}>News</a></Menu.Item>
            <Menu.Item>
              <Select defaultValue={i18n.language.toUpperCase()} style={{ width: 120 }} onChange={this.handleChangeLang.bind(this)}>
                <Option value="ko-KR">KR</Option>
              </Select>
            </Menu.Item>
          </Menu>
          <Icon className="only-mobile" type="menu-fold" onClick={this.openMobileSidebar} style={{ display: "none" }} />
        </Header>
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          enableDragHandle
          contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
          sidebar={sidebar}
          open={this.sidebarOpen}
          onOpenChange={e => this.sidebarOpen = false}
        >
          Click upper-left corner
        </Drawer>
        <Content className="">
          <Content className="main-bg">
            <h1 className="title">{t('main:title')}</h1>
            <h4 className="description">{t('main:description')}</h4>

            <div className="left-pattern only-desktop" />
            <div className="center" />
            <div className="right-pattern only-desktop" />
          </Content>
          <Content className="intro">
            <img src={imageRequire('logo.svg')} alt="logo" className="logo" />
            <img src={imageRequire('gxc.svg')} alt="gxc" className="gxc" />
            <div className="title">{t('main:introTitle')}</div>
            <div className="description">{t('main:introDescription')}</div>
          </Content>
          <Content className="advantages">
            <div className="reward">
              <div className="container-fluid">
                <div className="texts">
                  <h2 className="title">{t('main:reward:title')}</h2>
                  <h4 className="description">{t('main:reward:description')}</h4>
                </div>
                <img className="right" src={imageRequire('pictogram_reward.png')} alt="pictorgram_reward" />
              </div>
            </div>
            <div className="p2p right">
              <div className="container-fluid">
                <img src={imageRequire('pictogram_p2p.png')} alt="pictorgram_p2p" />
                <div className="right texts">
                  <h2 className="title">{t('main:p2p:title')}</h2>
                  <h4 className="description">{t('main:p2p:description')}</h4>
                </div>
              </div>
            </div>
            <div className="commission left">
              <div className="container-fluid">
                <div className="texts">
                  <h2 className="title">{t('main:commission:title')}</h2>
                  <h4 className="description">{t('main:commission:description')}</h4>
                </div>
                <img className="right" src={imageRequire('pictogram_commission.png')} alt="commission" />
              </div>
            </div>
          </Content>
          <Content className="whitepaper" id="whitepaper">
            <img src={imageRequire('logo_white.svg')} className="logo" alt="logo" />
            <h1 className="title">{t('main:whitepaper.title')}</h1>
            <h3 className="description">{this.t('main:whitepaper.description')}</h3>
            <div className="links">
              {whitepapers.map((whitepaper, index) => {
                return (<Link
                  key={index}
                  onClick={this.downloadWhitepaper.bind(this, whitepaper[2])}
                  to={whitepaper[1]}
                  className={`link-to-whitepaper ${whitepaper[2]}`}
                >{whitepaper[0]}</Link>);
              })}
            </div>
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
                    <Col className="quarter" span={6} offset={key % 2 === 0 ? 3 : 16} >
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
              <li key="xlgames">
                <img src={imageRequire("logo_xlgames.png")} alt="logo_xlgames" />
              </li>
              <li key="superplanet">
                <img src={imageRequire("logo_superplanet.png")} alt="logo_superplanet" />
              </li>
              <li key="pays">
                <img src={imageRequire("logo_pays.png")} alt="logo_pays" />
              </li>
              <li key="cointong">
                <img src={imageRequire("logo_cointong.png")} alt="logo_cointong" />
              </li>
            </ul>
          </Content>
          <Content className="subscribe section-type-1">
            <h1 className="title">{t('main:subscribe:title')}</h1>
            <h3 className="description">{t('main:subscribe:description')}</h3>
            <Search type="email" placeholder="E-Mail Address" enterButton="Subscribe" onSearch={this.onEnterEmail}/>
          </Content>
        </Content>
        <Footer style={{ textAlign: 'center', background: "#001529", color: "white" }}>
          <img src={imageRequire('logo.svg')} alt="logo" className="logo" />
          <img src={imageRequire('gxc.svg')} alt="gxc" className="gxc" />
          <div className="email">
            <Link to="mailto:support@bcventures.io">support@bcventures.io</Link>
          </div>
          <Content className="social" style={{ display: 'none' }}>
            <Link className="facebook" />
            <Link className="facebook" />
          </Content>
          <div className="copyright">© Blockchain Ventures 2018</div>
        </Footer>
      </Layout>
    );
  }
}

