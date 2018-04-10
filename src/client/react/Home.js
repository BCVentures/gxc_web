import React, {Component} from 'react';
import {Layout, Menu, Select, Input, Icon, Row, Col, message} from 'antd';
import {translate} from 'react-i18next';
import {Link} from "react-router";
import {Drawer, List} from 'antd-mobile';
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';
import ReactGA from "react-ga";
import Fade from 'react-reveal/Fade';
import {imageRequire} from '../../utils/universalRequire';
import LogoAnimation from './component/LogoAnimation';
import SubscribePhoto from './component/SubscribeFooter';
import i18n from "../../crossover/i18n/i18n";
import {subscribe} from "../../crossover/api/subscribeApi";
import {Flip} from "react-reveal";


@translate(['main', 'member', 'error'], {wait: true})
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
    this.sidebarOpen = !this.sidebarOpen;
  };

  downloadWhitepaper = (lang) => {
    message.info(this.props.t("error:whitepaperDownload"));
  };

  render() {
    const Search = Input.Search;
    const {Header, Footer, Content} = Layout;
    const Option = Select.Option;
    const t = this.t;
    const languages = [
      {label: "English", whitePaperLink: "#", code: "english"},
      {label: "日本語", whitePaperLink: "#", code: "japanese"},
      {label: "한국어", whitePaperLink: "#", code: "korean"},
      {label: "中國語", whitePaperLink: "#", code: "chinese"},
    ];
    const whitepapers = [];
    const memberNames = ["kwk", "yjh", "nss", "bhs", "cyw", "pje", "lhh", "asb"];
    const members = memberNames.map(memberName => {
      return {
        name: t(`member:${memberName}:name`),
        photo: `photo_${memberName}.png`,
        role: t(`member:${memberName}:role`),
        description: t(`member:${memberName}:description`),
      };
    });
    const advisorNames = ["ckh", "lys", "kjh", "kdi", "cjm", "myw"];
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
              style={{lineHeight: '64px'}}
            >
              <Menu.Item key="1"><a className="nav-link" href="#whitepaper">{t('Whitepaper')}</a></Menu.Item>
              <Menu.Item key="2"><a className="nav-link" href="#team">Team</a></Menu.Item>
              <Menu.Item key="3"><a className="nav-link" href="#roadmap">Roadmap</a></Menu.Item>
              <Menu.Item className="lang-select">
                <Select defaultValue={i18n.language} style={{width: 120}}
                        onChange={this.handleChangeLang.bind(this)}>
                  <Option value="KR">KR</Option>
                </Select>
              </Menu.Item>
            </Menu>
            <Icon className="only-mobile" type="menu-fold" onClick={this.openMobileSidebar}
                  style={{display: "none"}}/>
          </div>
        </Header>
        <Content className="" id="main-content">

          <Content className="main only-desktop">
            <video autoPlay preload>
              <source src="/static/images/GXC_Video.mov" type="video/mp4"/>
            </video>
          </Content>
          <Content className="main main-bg only-mobile">
            <div className="overlay"/>
            <div className="contents">
              <h1 className="title">{t('main:title')}<br/>{t('main:subtitle')}</h1>
              <h4 className="description">{t('main:description')}</h4>
            </div>
          </Content>
          <Content className="advantages section-type-1">
            <Fade duration={2000}>
            </Fade>
            <Row>
              <h1 className="title">GXC</h1>
              <Col xs={24} className="ecosystem">
                <Fade duration={2000}>
                  <img src={imageRequire('gxc_ecosystem.png')} alt="gxc_ecosystem"/>
                </Fade>
              </Col>
            </Row>
            <Row>
              <h1 className="title">{t("main:benefits:title")}</h1>
              <Col xs={24} sm={8} md={6} className="reward">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img src={imageRequire('pictogram_reward.png')} alt="pictorgram_reward"/>
                    <div className="texts">
                      <h2 className="title">{t('main:reward:title')}</h2>
                      <h3 className="description">{t('main:reward:description')}</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="p2p right">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img src={imageRequire('pictogram_p2p.png')} alt="pictorgram_p2p"/>
                    <div className="right texts">
                      <h2 className="title">{t('main:p2p:title')}</h2>
                      <h3 className="description">{t('main:p2p:description')}</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img className="right" src={imageRequire('pictogram_commission.png')} alt="commission"/>
                    <div className="texts">
                      <h2 className="title">{t('main:commission:title')}</h2>
                      <h3 className="description">{t('main:commission:description')}</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img className="right" src={imageRequire('pictogram_platformfees.png')} alt="commission"/>
                    <div className="texts">
                      <h2 className="title">{t('main:commission:title')}</h2>
                      <h3 className="description">{t('main:commission:description')}</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
            </Row>
          </Content>

          <Content className="section-type-2 products dex" id="product">
            <h1 className="title">{t('main:products.title')}</h1>
            <Fade cascade duration={2000}>
              <Row className="product">
                <Col md={12} sm={24} className="image">
                  <img src={imageRequire('dex.png')} className="dex" alt="dex"/>
                </Col>
                <Col md={12} sm={24} className="description">
                  <div className="sub-title">DEX</div>
                  <p>GXC is the future of the gaming industry that is happening right now.<br></br>
                    We are creating a new gaming economy and giving every gamer the power<br></br>
                    to turn virtual items into real assets and take their passion for gaming.<br></br>
                    We’re all set to navigate the uncharted waters of in-game items trading and<br></br>
                    we invite you to embark on this journey with us</p>
                </Col>
              </Row>
            </Fade>
          </Content>
          <Content className="section-type-2 products wallet" id="product">
            <Fade cascade duration={2000}>
              <Row className="wallet">
                <Col md={12} sm={24} className="description">
                  <div className="sub-title">SDK Toolbox</div>
                  <p>GXC is the future of the gaming industry that is happening right now.<br></br>
                    We are creating a new gaming economy and giving every gamer the power<br></br>
                    to turn virtual items into real assets and take their passion for gaming.<br></br>
                    We’re all set to navigate the uncharted waters of in-game items trading and<br></br>
                    we invite you to embark on this journey with us</p>
                </Col>
                <Col md={12} sm={24} className="image">
                  <img className="macbook" src={imageRequire('wallet.png')} alt="macbook"/>
                </Col>
              </Row>
            </Fade>
          </Content>
          <Content className="section-type-2 products dex" id="product">
            <Fade cascade duration={2000}>
              <Row className="product">
                <Col md={12} sm={24} className="image">
                  <img src={imageRequire('block_explorer.png')} className="block_explorer" alt="block_explorer"/>
                </Col>
                <Col md={12} sm={24} className="description">
                  <div className="sub-title">GXC Block Explorer</div>
                  <p>GXC is the future of the gaming industry that is happening right now.<br></br>
                    We are creating a new gaming economy and giving every gamer the power<br></br>
                    to turn virtual items into real assets and take their passion for gaming.<br></br>
                    We’re all set to navigate the uncharted waters of in-game items trading and<br></br>
                    we invite you to embark on this journey with us</p>
                </Col>
              </Row>
            </Fade>
          </Content>
          <Content className="section-type-2 products wallet" id="product">
            <Fade cascade duration={2000}>
              <Row className="wallet">
                <Col md={12} sm={24} className="description">
                  <div className="sub-title">SDK Toolbox</div>
                  <p>GXC is the future of the gaming industry that is happening right now.<br></br>
                    We are creating a new gaming economy and giving every gamer the power<br></br>
                    to turn virtual items into real assets and take their passion for gaming.<br></br>
                    We’re all set to navigate the uncharted waters of in-game items trading and<br></br>
                    we invite you to embark on this journey with us</p>
                </Col>
                <Col md={12} sm={24} className="image">
                  <img className="macbook" src={imageRequire('macbook.png')} alt="macbook"/>
                </Col>
              </Row>
            </Fade>
          </Content>

          <Content className="advantages section-type-1">
            <Row>
              <h1 className="title">Parteners</h1>
              <Col xs={24} sm={12} md={8} className="reward">
                <Fade duration={2000}>
                  <div className="container-fluid2">
                    <img src={imageRequire('logo_xlgames.png')} alt="logo_xlgames"/>
                    <div className="texts">
                      <h2 className="title">XL Games</h2>
                      <h3 className="description">XLGames is the world’s premier publisher
                        and developer of massively online games.
                        Established in 1997 in Korea,
                        XLGames quickly became the leader
                        in online games with the blockchain.</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={12} md={8} className="p2p right">
                <Fade duration={2000}>
                  <div className="container-fluid2">
                    <img src={imageRequire('logo_entermate.png')} alt="logo_entermate"/>
                    <div className="right texts">
                      <h2 className="title">Entermate</h2>
                      <h3 className="description">XLGames is the world’s premier publisher
                        and developer of massively online games.
                        Established in 1997 in Korea,
                        XLGames quickly became the leader
                        in online games with the blockchain</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={12} md={8} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid2">
                    <img className="right" src={imageRequire('logo_supercat.png')} alt="logo_supercat"/>
                    <div className="texts">
                      <h2 className="title">Supercat</h2>
                      <h3 className="description">XLGames is the world’s premier publisher
                        and developer of massively online games.
                        Established in 1997 in Korea,
                        XLGames quickly became the leader
                        in online games with the blockchain</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={12} md={8} className="reward">
                <Fade duration={2000}>
                  <div className="container-fluid2">
                    <img src={imageRequire('logo_superplanet.png')} alt="logo_superplanet"/>
                    <div className="texts">
                      <h2 className="title">Superplanet</h2>
                      <h3 className="description">XLGames is the world’s premier publisher
                        and developer of massively online games.
                        Established in 1997 in Korea,
                        XLGames quickly became the leader
                        in online games with the blockchain</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={12} md={8} className="p2p right">
                <Fade duration={2000}>
                  <div className="container-fluid2">
                    <img src={imageRequire('logo_cointong.png')} alt="logo_cointong"/>
                    <div className="right texts">
                      <h2 className="title">Cointong</h2>
                      <h3 className="description">XLGames is the world’s premier publisher
                        and developer of massively online games.
                        Established in 1997 in Korea,
                        XLGames quickly became the leader
                        in online games with the blockchain</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={12} md={8} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid2">
                    <img className="right" src={imageRequire('logo_seum.png')} alt="logo_seum"/>
                    <div className="texts">
                      <h2 className="title">SEUM</h2>
                      <h3 className="description">XLGames is the world’s premier publisher
                        and developer of massively online games.
                        Established in 1997 in Korea,
                        XLGames quickly became the leader
                        in online games with the blockchain</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={12} md={8} className="reward">
                <Fade duration={2000}>
                  <div className="container-fluid2">
                    <img src={imageRequire('logo_hyperithm.png')} alt="logo_hyperithm"/>
                    <div className="texts">
                      <h2 className="title">Hyperithm</h2>
                      <h3 className="description">XLGames is the world’s premier publisher
                        and developer of massively online games.
                        Established in 1997 in Korea,
                        XLGames quickly became the leader
                        in online games with the blockchain</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={12} md={8} className="p2p right">
                <Fade duration={2000}>
                  <div className="container-fluid2">
                    <img src={imageRequire('logo_besuccess.png')} alt="logo_besuccess"/>
                    <div className="right texts">
                      <h2 className="title">beSUCCESS</h2>
                      <h3 className="description">XLGames is the world’s premier publisher
                        and developer of massively online games.
                        Established in 1997 in Korea,
                        XLGames quickly became the leader
                        in online games with the blockchain</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={12} md={8} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid2">
                    <img className="right" src={imageRequire('logo_pays.png')} alt="logo_pays"/>
                    <div className="texts">
                      <h2 className="title">Pays</h2>
                      <h3 className="description">XLGames is the world’s premier publisher
                        and developer of massively online games.
                        Established in 1997 in Korea,
                        XLGames quickly became the leader
                        in online games with the blockchain</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
            </Row>
          </Content>
          <Content className="whitepaper" id="whitepaper">
            <Fade cascade duration={2000}>
              <h1 className="title">{t('main:whitepaper.title')}</h1>
              <img src={imageRequire('logo_white.svg')} className="logo" alt="logo"/>
              <h3 className="description">Game X Coin aims to connect currencies between games via the GXC, the main
                currency.
                <p>GXC provides a more valuable system for game developers and gamers based on the blockchain.</p></h3>
              <div className="links">
                {/* languages.map((language, index) => {
                  return (<Link
                    key={index}
                    onClick={this.downloadWhitepaper.bind(this, language.whitePaperLink)}
                    to={language[1]}
                    className={`link-to-whitepaper ${language.code}`}
                  >{language.label}</Link>);
                }) */}
              </div>
              <Col className="p2p right">
                <img className="right" src={imageRequire('whitepaper_english.png')} alt="whitepaper_english"/>
                <img className="right" src={imageRequire('whitepaper_japanese.png')} alt="whitepaper_japanese"/>
                <img className="right" src={imageRequire('whitepaper_korean.png')} alt="whitepaper_korean"/>
                <img className="right" src={imageRequire('whitepaper_chinese.png')} alt="whitepaper_chinese"/>
              </Col>
            </Fade>
          </Content>
          <Content className="advantages section-type-1">
            <h1 className="title">Team</h1>
            <Row>
              <Col xs={24} sm={8} md={6} className="p2p right">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img src={imageRequire('photo_kwk.png')} alt="photo_kwk"/>
                    <div className="right texts">
                      <h2 className="title">Woongkyum Kim</h2>
                      <h3 className="description">CEO, Founder<p>CEO at Whooper
                        20+ s/w engineer
                        (payment/game)
                        Yonsei University
                        Dept of Computer Science</p></h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="p2p right">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img src={imageRequire('photo_yjh.png')} alt="photo_yjh"/>
                    <div className="right texts">
                      <h2 className="title">Jinhwan Yang</h2>
                      <h3 className="description">CTO<p>Mentor at Decipher
                        CTO at Qpick
                        CTO at Profound
                        Seoul National University
                        Dept of BA / CS</p></h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img className="right" src={imageRequire('photo_jay.png')} alt="photo_jay"/>
                    <div className="texts">
                      <h2 className="title">Jay Heo</h2>
                      <h3 className="description">COO<p>Playnery, CEO
                        Nsurfin, CEO
                        Gala-Net, Senior Director
                        Yonsei University
                        Dept of Political Science</p></h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img className="right" src={imageRequire('photo_nss.png')} alt="photo_nss"/>
                    <div className="texts">
                      <h2 className="title">Samuel Nam</h2>
                      <h3 className="description">Community Director<p>Lead Marketer at Netmarble
                        Marketer at Yodo1 Games
                        Analyst at Cisco Systems
                        University of Michigan
                        Ross School of Business</p></h3>
                    </div>
                  </div>
                </Fade>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={8} md={6} className="p2p right">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img src={imageRequire('photo_bhs.png')} alt="photo_bhs"/>
                    <div className="right texts">
                      <h2 className="title">Hyunseok Bang</h2>
                      <h3 className="description">CCO<p>Designer at beSUCCESS
                        Planning Executive at Qpick
                        CCO at Profound
                        Seoultech
                        Dept of Visual Design</p></h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="p2p right">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img src={imageRequire('photo_cyw.png')} alt="photo_cyw"/>
                    <div className="right texts">
                      <h2 className="title">Yeonwoo Chu</h2>
                      <h3 className="description">CPO<p>CEO at CORO Studio
                        Leader Developer at Mobion
                        Leader Developer at Irugo
                        University of Seoul
                        Dept of Civil Engineering</p></h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img className="right" src={imageRequire('photo_pje.png')} alt="photo_pje"/>
                    <div className="texts">
                      <h2 className="title">Jieun Park</h2>
                      <h3 className="description">Management Support Director<p>COO at Whooper
                        Launched multiple fintech and
                        mobile services
                        Sookmyung Womans University
                        Dept of Communication & Media</p></h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img className="right" src={imageRequire('photo_lhh.png')} alt="photo_lhh"/>
                    <div className="texts">
                      <h2 className="title">Hwanhee Lee</h2>
                      <h3 className="description">Developer<p>Developer at Asadal
                        Developer at Gabia
                        CTO at Republic Dot
                        Myungji University
                        Dept of Computer Science</p></h3>
                    </div>
                  </div>
                </Fade>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={8} md={6} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img className="right" src={imageRequire('photo_asb.png')} alt="photo_asb"/>
                    <div className="texts">
                      <h2 className="title">Richard Ahn</h2>
                      <h3 className="description">Developer<p>
                        Developer at NextOpt
                        Myungji University
                        Dept of Computer Science</p></h3>
                    </div>
                  </div>
                </Fade>
              </Col>
            </Row>
          </Content>
          <Content className="advantages section-type-1">
            <h1 className="title">Advisor</h1>
            <Row>
              <Col xs={24} sm={8} md={6} className="p2p right">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img src={imageRequire('photo_ckh.png')} alt="photo_ckh"/>
                    <div className="right texts">
                      <h2 className="title">Kwanho Choi</h2>
                      <h3 className="description">CEO at Neowiz Games
                        CEO at GameON
                        Chairman of the Korean game
                        industry association</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="p2p right">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img src={imageRequire('photo_lcs.png')} alt="photo_lcs"/>
                    <div className="right texts">
                      <h2 className="title">Changsu Lee</h2>
                      <h3 className="description">SVP at Tapjoy CEO at 5Rocks CTO at Abla Company</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img className="right" src={imageRequire('photo_kdy.png')} alt="photo_kdy"/>
                    <div className="texts">
                      <h2 className="title">Doyon Kim</h2>
                      <h3 className="description">SVP at Celcom Planet CEO at Camp Mobile VP at YD Online</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img className="right" src={imageRequire('photo_mm.png')} alt="photo_mm"/>
                    <div className="texts">
                      <h2 className="title">Mary Min</h2>
                      <h3 className="description">Senior Gaming BD Manager for
                        Unity’s strategic partnership team
                        VP at SEWORKS
                        CEO at Second Wave Games</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={8} md={6} className="p2p right">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img src={imageRequire('photo_lys.png')} alt="photo_lys"/>
                    <div className="right texts">
                      <h2 className="title">Yongsoo Lee</h2>
                      <h3 className="description">Global marketing expert
                        Director at Leoburnett
                        Marketer at Johnson & Johnson,
                        Walt Disney</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="p2p right">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img src={imageRequire('photo_kdi.png')} alt="photo_kdi"/>
                    <div className="right texts">
                      <h2 className="title">Dooil Kim</h2>
                      <h3 className="description">CEO at ChinaLab
                        CEO at Neowin Games
                        Expert for Chinese game market</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img className="right" src={imageRequire('photo_kjo.png')} alt="photo_kjo"/>
                    <div className="texts">
                      <h2 className="title">Jongho Kim</h2>
                      <h3 className="description">Director at Payletter
                        Director at Aegis Hyosung
                        Sogang Universiy
                      </h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img className="right" src={imageRequire('photo_myw.png')} alt="photo_myw"/>
                    <div className="texts">
                      <h2 className="title">Yongwon Moon</h2>
                      <h3 className="description">Director at Coop Marketing
                        Marketing Leader at Ebay Korea
                        Hanyang University
                        Dept of Business Administration
                      </h3>
                    </div>
                  </div>
                </Fade>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={8} md={6} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img className="right" src={imageRequire('photo_kcw.png')} alt="photo_kcw"/>
                    <div className="texts">
                      <h2 className="title">Chulhwan Kim</h2>
                      <h3 className="description">CEO at Largosoft
                        Mobile security expert </h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img className="right" src={imageRequire('photo_cjm.png')} alt="photo_cjm"/>
                    <div className="texts">
                      <h2 className="title">Jaemin Choi</h2>
                      <h3 className="description">Tax Accountant of Jasung
                        Seoul National Univeristy
                        Dept of Marine Engineering
                        Expert for cryptocurrency tax issues</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
            </Row>
          </Content>
          <Content className="advantages2 section-type-1 only-mobile">
            <Row>
              <h1 className="title">Roadmap</h1>
              <Col xs={24} className="ecosystem">
                <Fade duration={2000}>
                  <img src={imageRequire('roadmap_desktop2.png')} alt="roadmap_desktop2"/>
                </Fade>
              </Col>
            </Row>
          </Content>
          <Content className="subscribe section-type-1 ">
            <h1 className="title">{t('main:subscribe:title')}</h1><br/>
            <h3 className="description">Enter your email address to get the GXC news.</h3>
            <Search type="email" placeholder="E-Mail Address" enterButton="Subscribe"
                    onChange={e => this.subscribeEmail = e.target.value} value={this.subscribeEmail}
                    onSearch={this.onEnterEmail.bind(this)}/>
          </Content>
        </Content>
        <SubscribePhoto/>
        <Footer style={{textAlign: 'center', background: "#414141", color: "white"}}>
          <img src={imageRequire('logo.svg')} alt="logo" className="logo"/>
          <img src={imageRequire('gxc_white.svg')} alt="gxc" className="gxc"/>
          <div className="email">
            <Link to="mailto:support@bcventures.io">support@bcventures.io</Link>
          </div>
          <Content className="social" style={{display: 'none'}}>
            <Link className="facebook"/>
            <Link className="facebook"/>
          </Content>
          <div className="copyright">© Blockchain Ventures 2018</div>
        </Footer>
      </Layout>
    );
  }
}

