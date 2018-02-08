import React, { Component } from 'react';
import { Layout, Menu, Select, Input, Icon, Row, Col } from 'antd';
import { translate } from 'react-i18next';
import { Link } from "react-router";
import { Drawer, List } from 'antd-mobile';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { imageRequire } from '../../utils/universalRequire';
import i18n from '../../crossover/i18n/i18n';


@translate(['main', 'member'], { wait: true })
@observer
export default class Home extends Component {
  @observable sidebarOpen = false;

  handleChangeLang(lang) {
    i18n.changeLanguage(lang);
  }

  t = (key) => {
    const str = this.props.t(key);
    return <p>
      {str.split("\n")
      .map(e => <p>{e}</p>)}
    </p>;
    // let this.props.t()
  }

  renderMember = (member) => {
    return (
      <li className="member">
        <img src={imageRequire(member.photo)} className="photo" alt={member.name}/>
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
      <Col span={12} className="advisor" xs={24}>
        <img src={imageRequire(member.photo)} className="photo" />
        <div className="texts">
          <h2 className="name">
            {member.name}
          </h2>
        </div>
          <h5 className="description">
            {member.description}
          </h5>
      </Col>
    );
  };

  openMobileSidebar = () => {
    console.log(this.sidebarOpen);
    this.sidebarOpen = !this.sidebarOpen;
  };

  render() {
    const Search = Input.Search;
    const { Header, Footer, Content } = Layout;
    const t = this.props.t;
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
    const advisorNames = ["ckh"];
    const advisors = advisorNames.map(name => {
      return {
        name: t(`member:${name}:name`),
        photo: `photo_${name}.png`,
        description: t(`member:${name}:description`),
      };
    });

    const sidebar = (<List>
      {[0, 1, 2, 3, 4, 5].map((i, index) => {
        if (index === 0) {
          return (<List.Item
            key={ i }
            thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            multipleLine
          >Category</List.Item>);
        }
        return (<List.Item
          key={ i }
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
            <Menu.Item key="1"><a className="nav-link" href="#">{t('Whitepaper')}</a></Menu.Item>
            <Menu.Item key="2"><a className="nav-link" href="#about">Team</a></Menu.Item>
            <Menu.Item key="3"><a className="nav-link" href="#team">Roadmap</a></Menu.Item>
            <Menu.Item key="5"><a className="nav-link" href="#contact">Token Sale</a></Menu.Item>
            <Menu.Item key="4"><a className="nav-link" href="#contact">News</a></Menu.Item>
            <Menu.Item>
              <Select defaultValue={i18n.language} style={{ width: 120 }} onChange={this.handleChangeLang.bind(this)}>
                <Option value="en">EN</Option>
                <Option value="kr">KR</Option>
              </Select>
            </Menu.Item>
          </Menu>
          <Icon className="only-mobile" type="menu-fold" onClick={this.openMobileSidebar} style={{display: "none"}} />
        </Header>
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          enableDragHandle
          contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
          sidebar={sidebar}
          open={this.sidebarOpen}
          onOpenChange={() => this.sidebarOpen = false}
        >
          Click upper-left corner
        </Drawer>
        <Content className="">
          <Content className="main-bg">
            <h1 className="title">{t('main:title')}</h1>
            <h4 className="description" dangerouslySetInnerHTML={{ __html: t('main:description') }} />

            <div className="left-pattern only-desktop" />
            <div className="center" />
            <div className="right-pattern only-desktop" />
          </Content>
          <Content className="intro">
            <img src={imageRequire('logo.svg')} alt="logo" className="logo" />
            <img src={imageRequire('gxc.svg')} alt="gxc" className="gxc" />
            <div className="title" dangerouslySetInnerHTML={{ __html: t('main:introTitle') }} />
            <div className="description" dangerouslySetInnerHTML={{ __html: t('main:introDescription') }} />
          </Content>
          <Content className="advantages">
            <div className="reward">
              <div className="container-fluid">
                <div className="texts">
                  <h2 className="title">{t('main:rewardTitle')}</h2>
                  <h4 className="description" dangerouslySetInnerHTML={{ __html: t('main:rewardDescription') }} />
                </div>
                <img className="right" src={imageRequire('pictogram_reward.png')} />
              </div>


            </div>
            <div className="p2p right">
              <div className="container-fluid">
                <img src={imageRequire('pictogram_p2p.png')} />
                <div className="right texts">
                  <h2 className="title">{t('main:p2p:title')}</h2>
                  <h4 className="description" dangerouslySetInnerHTML={{ __html: t('main:p2p:description') }} />
                </div>
              </div>
            </div>
            <div className="commission left">

              <div className="container-fluid">
                <div className="texts">
                  <h2 className="title">{t('main:commission:title')}</h2>
                  <h4 className="description" dangerouslySetInnerHTML={{ __html: t('main:commission:description') }} />
                </div>
                <img className="right" src={imageRequire('pictogram_commission.png')} alt="commission"/>
              </div>

            </div>
          </Content>
          <Content className="whitepaper">
            <img src={imageRequire('logo_white.svg')} className="logo" alt="logo" />
            <h1 className="title">{t('main:whitepaper.title')}</h1>
            <h3 className="description">{this.t('main:whitepaper.description')}</h3>
            <div className="links">
              {whitepapers.map(whitepaper => {
                return (<Link
                  to={whitepaper[1]}
                  className={`link-to-whitepaper ${whitepaper[2]}`}
                >{whitepaper[0]}</Link>);
              })}
            </div>
          </Content>
          <Content className="members section-type-1">
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
          <Content className="roadmap section-type-1 container-fluid">
            <h1 className="title">{t("main:roadmap:title")}</h1>
            <div className="content">
              {roadmaps.map((roadmap, key) => {
                return (
                  <Row gutter={16} key={key}>
                    <Col className="quarter" span={6} offset={key % 2 === 0 ? 3 : 16}>
                      <ul className="title">
                        {roadmap.map((e, key2) => {
                          return <li key={key2}>{e}</li>;
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
              <li>
                <img src={imageRequire("logo_xlgames.png")} alt="logo_xlgames"/>
              </li>
              <li>
                <img src={imageRequire("logo_superplanet.png")} alt="logo_superplanet" />
              </li>
              <li>
                <img src={imageRequire("logo_pays.png")} alt="logo_pays"/>
              </li>
            </ul>
          </Content>
          <Content className="subscribe section-type-1">
            <h1 className="title">{t('main:subscribe:title')}</h1>
            <h3 className="description">{t('main:subscribe:description')}</h3>
            <Search type="email" placeholder="E-Mail Address" enterButton="Subscribe" />
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

