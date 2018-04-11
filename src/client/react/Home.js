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
              <Col xs={24} sm={24} md={24}>
                <Fade duration={2000}>
                  <div className="gxc_description">
                    <p> Game X Coin (GXC) is a cryptocurrency used universally among games on all platforms. Gamers can tokenize their in-game currency and trade them for any other game’s currency without censorship or friction.</p>
                    </div>
                </Fade>
              </Col>
            </Row>
            <Row>
              <h1 className="title benefits">GXC Benefits</h1>
              <Col xs={24} sm={8} md={6} className="reward">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img className="benefits_image" src={imageRequire('borderless_economy.png')} alt="pictorgram_reward"/>
                    <div className="texts">
                      <h2 className="benefits_title">Borderless  <br /> Economy</h2>
                      <h3 className="description">Gamers are able to transfer their in-game wealth from an existing to a new game freely.</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="p2p right">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img className="benefits_image" src={imageRequire('red_graph.png')} alt="pictorgram_p2p"/>
                    <div className="right texts">
                      <h2 className="benefits_title">New Player <br /> Acquisition</h2>
                      <h3 className="description">Games can gain exposure to millions of players who play other GXC powered games.</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img className="benefits_image" src={imageRequire('trade.png')} alt="commission"/>
                    <div className="texts">
                      <h2 className="benefits_title">Frictionless <br /> Trade</h2>
                      <h3 className="description">With the decentralized exchange, item/token trades are frictionless and low in cost.</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img className="benefits_image" src={imageRequire('fees.png')} alt="commission"/>
                    <div className="texts">
                      <h2 className="benefits_title">Reduced <br /> Platform Fees</h2>
                      <h3 className="description"> Game developers can choose GXC as the method of payment and minimize high platform fees.</h3>
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
                  <img src={imageRequire('dex.png')} className="macbook" alt="dex"/>
                </Col>
                <Col md={12} sm={24} className="description">
                  <div className="sub-title">DEX</div>
                  <p>Through GXC’s decentralized exchange, players can liquidate their in-game assets into other cryptocurrencies such as Bitcoin or exchange them for another game’s. Utilizing smart contracts, DEX removes any intermediaries required during transactions allowing <br /> 1) reduced transaction cost <br /> 2) validation of exchanged goods and the transaction <br />3) removal of fraud. </p>
                </Col>
              </Row>
            </Fade>
          </Content>
          <Content className="section-type-2 products wallet" id="product">
            <Fade cascade duration={2000}>
              <Row className="wallet">
                <Col md={12} sm={24} className="description">
                  <div className="sub-title">Wallet</div>
                  <p>The GXC wallet stores GXC coins and tokens issued by games participating in the GXC platform. Aside from the storage feature, the wallet features voting functionality to elect block producers, trade functionality to trade coins and tokens via DEX, and payment gateway functionality to use tokens to purchase in-game assets -- all with just touch of a button.</p>
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
                  <img src={imageRequire('block_explorer.png')} className="macbook" alt="block_explorer"/>
                </Col>
                <Col md={12} sm={24} className="description">
                  <div className="sub-title">Block Explorer</div>
                  <p>All transactions and account status are viewable via the block explorer with full transparency. This includes both  GXC coin transactions as well as game token transactions. Additionally, gamers are able to view total circulating supply of all game tokens, their escrow values, and current market values.</p>
                </Col>
              </Row>
            </Fade>
          </Content>
          <Content className="section-type-2 products wallet" id="product">
            <Fade cascade duration={2000}>
              <Row className="wallet">
                <Col md={12} sm={24} className="description">
                  <div className="sub-title">SDK Toolbox</div>
                  <p>SDK is provided for most operating systems, languages, and development tools including Cocos, Unity, C++, C#, and Java. Game developers can use the SDK of their choice to easily and seamlessly implement functions like wallet synchronization, balance check, grant permissions, and exchange tokens. </p>
                </Col>
                <Col md={12} sm={24} className="image">
                  <img className="macbook" src={imageRequire('macbook.png')} alt="macbook"/>
                </Col>
              </Row>
            </Fade>
          </Content>

          <Content className="advantages section-type-1">
            <Row>
              <h1 className="title parteners">Parteners</h1>
              <Col xs={24} sm={12} md={8} className="reward">
                <Fade duration={2000}>
                  <div className="container-fluid2">
                    <img src={imageRequire('logo_xlgames.png')} alt="logo_xlgames"/>
                    <div className="texts">
                      <h2 className="title">XL Games</h2>
                      <h3 className="description">XLGAMES is a game studio specializing in MMORPGs. The company was founded by Jae-kyung Song, co-founder of Nexon and developer of the Kingdom of the Wind and Lineage.</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={12} md={8} className="reward">
                <Fade duration={2000}>
                  <div className="container-fluid2">
                    <img src={imageRequire('logo_superplanet.png')} alt="logo_superplanet"/>
                    <div className="texts">
                      <h2 className="title">Superplanet</h2>
                      <h3 className="description">Super Planet is a mobile game studio behind wildly popular games like Hero Maker with Naver Webtoon (Editor’s pick on Google Play ) and Guardians of the Video Game with Naver Webtoon (top 15 grossing in South Korea).</h3>
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
                      <h3 className="description">Cointong is a cryptocurrency exchange launched by Tomato Group. Tomato Group runs News Tomato, a South Korea’s very first stocks and economy new channel, Tomato TV, and Stocktong, South Korea’s #1 stocks application.</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
            </Row>
            <Row>

              <Col xs={24} sm={12} md={8} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid2">
                    <img className="right" src={imageRequire('logo_seum.png')} alt="logo_seum"/>
                    <div className="texts">
                      <h2 className="title">SEUM</h2>
                      <h3 className="description">SEUM is a law firm known for its specialty in cryptocurrencies. SEUM participated as legal advisor in various projects such as Medibloc.</h3>
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
                      <h3 className="description">Hyperithm is a fund management company specializing in cryptocurrency with offies in Tokyo and Seoul. As part of its private/pre-ICO investment work, Hyperithm utilizes global networks including Korea and Japan to advise ICO projects with highest potential.</h3>
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
                      <h3 className="description">beSUCCESS is South Korea’s most representative tech and startup media first published in 2011. beSUCCESS holds beLAUNCH, a conference for startups, and beLAUNCH, Asia’s largest conference for startups.</h3>
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
                      <h3 className="description">Pay’s offers issuing services for digital gift certificates, gift cards, and payment brokerage. Pay’s offers brand payment brokerage for simple payment services to allow easier access to fintech services.</h3>
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
              <h3 className="description">Read our white paper for more information on our ambitions to turn the gaming ecosystem upside down.
                </h3>
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
          <Content className="advantages section-type-1" id="team">
            <h1 className="title">Team</h1>
            <Row id="teams">
              <Col xs={24} sm={8} md={6} className="p2p right">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img src={imageRequire('photo_kwk.png')} alt="photo_kwk"/>
                    <div className="right texts">
                      <h2 className="title">Woongkyum Kim </h2>
                      <h3 className="description">CEO, Founder<p>CEO at Whooper <br /> 20+ s/w engineer (payment/game) <br /> Yonsei University <br /> Dept of Computer Science</p></h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="p2p right">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <a href="https://www.linkedin.com/in/jinhwan-yang-258653107/"><img src={imageRequire('photo_yjh.png')} alt="photo_yjh"/></a>
                    <div className="right texts">
                      <h2 className="title">Jinhwan Yang</h2>
                      <h3 className="description">CTO<p>Mentor at Decipher <br /> CTO at Qpick <br /> CTO at Profound <br /> Seoul National University <br /> Dept of BA / CS</p></h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <a href="https://www.linkedin.com/in/jayheo/" ><img className="right" src={imageRequire('photo_jay.png')} alt="photo_jay" usemap="#Map" /></a>
                    <div className="texts">
                      <h2 className="title">Jay Heo</h2>
                      <h3 className="description">COO<p>Playnery, CEO  <br /> Nsurfin, CEO  <br /> Gala-Net, Senior Director <br /> Yonsei University <br /> Dept of Political Science</p></h3>
                    </div>
                  </div>
                </Fade>
              </Col>
              <Col xs={24} sm={8} md={6} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <a href = "https://www.linkedin.com/in/namsamuel/"><img className="right" src={imageRequire('photo_nss.png')} alt="photo_nss"/></a>
                    <div className="texts">
                      <h2 className="title">Samuel Nam</h2>
                      <h3 className="description">Community Director<p>Lead Marketer at Netmarble <br /> Marketer at Yodo1 Games <br /> Analyst at Cisco Systems <br /> University of Michigan <br /> Ross School of Business</p></h3>
                    </div>
                  </div>
                </Fade>
              </Col>
            </Row>
            <Row id="teams">
              <Col xs={24} sm={8} md={6} className="p2p right">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <img src={imageRequire('photo_bhs.png')} alt="photo_bhs"/>
                    <div className="right texts">
                      <h2 className="title">Hyunseok Bang</h2>
                      <h3 className="description">CCO<p>Designer at beSUCCESS <br /> Planning Executive at Qpick <br /> CCO at Profound  <br /> Seoultech  <br /> Dept of Visual Design</p></h3>
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
                      <h3 className="description">CPO<p>CEO at CORO Studio <br /> Leader Developer at Mobion <br /> Leader Developer at Irugo <br /> University of Seoul <br /> Dept of Civil Engineering</p></h3>
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
                      <h3 className="description">Management Support Director<p>COO at Whooper <br /> Launched multiple fintech and <br /> mobile services <br /> Sookmyung Womans University <br /> Dept of Communication & Media</p></h3>
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
                      <h3 className="description">Developer<p>Developer at Asadal <br /> Developer at Gabia <br /> CTO at Republic Dot <br /> Myongji University <br /> Dept of Computer Science</p></h3>
                    </div>
                  </div>
                </Fade>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={8} md={6} className="commission left">
                <Fade duration={2000}>
                  <div className="container-fluid">
                    <a href="https://www.linkedin.com/in/sungbin-ahn-32a4a7146/"><img className="right" src={imageRequire('photo_asb.png')} alt="photo_asb"/></a>
                    <div className="texts">
                      <h2 className="title">Richard Ahn</h2>
                      <h3 className="description">Developer<p>Developer at NextOpt  <br /> Myongji University <br /> Dept of Computer Science</p></h3>
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
                      <h3 className="description">CEO at Neowiz Games <br /> CEO at GameON <br /> Chairman of the Korean game <br /> industry association</h3>
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
                      <h3 className="description">SVP at Tapjoy <br />  CEO at 5Rocks <br />  CTO at Abla Company</h3>
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
                      <h3 className="description">SVP at Celcom Planet <br /> CEO at Camp Mobile <br /> VP at YD Online</h3>
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
                      <h3 className="description">Senior Gaming BD Manager for <br /> Unity’s strategic partnership team <br /> VP at SEWORKS <br /> CEO at Second Wave Games</h3>
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
                      <h3 className="description">Global marketing expert <br /> Director at Leoburnett <br /> Marketer at Johnson & Johnson, <br /> Walt Disney</h3>
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
                      <h3 className="description">CEO at ChinaLab <br /> CEO at Neowin Games <br /> Expert for Chinese game market</h3>
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
                      <h3 className="description">Director at Payletter <br /> Director at Aegis Hyosung <br /> Sogang Universiy
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
                      <h3 className="description">Director at Coop Marketing <br /> Marketing Leader at Ebay Korea <br /> Hanyang University <br /> Dept of Business Administration
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
                      <h3 className="description">CEO at Largosoft <br /> Mobile security expert </h3>
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
                      <h3 className="description">Tax Accountant of Jasung <br /> Seoul National Univeristy <br /> Dept of Marine Engineering <br />Cryptocurrency tax issue expert</h3>
                    </div>
                  </div>
                </Fade>
              </Col>
            </Row>
          </Content>
          <Content className="advantages2 section-type-1 only-desktop " id="roadmap">
            <Row>
              <h1 className="title">Roadmap</h1>
              <Fade duration={2000}>
              <Row className='roadmap_wrapping'>
              <Col md={8}>
              <div className='roadmap1-1'>Develop GXC proof of  concept</div>
              <div className='roadmap1-2'>Publish technical white paper<br /> Launch alpha testnet<br />Public coin sale</div>
              <div className='roadmap1-3'>Launch mainnet with <br /> 3participating dGames</div>
              <div className='roadmap1-4'>Launch GXC DEX</div>
              <div className='roadmap1-5'>Launch 30 dGames <br /> Launch in-game purchase services</div>
              </Col>
              <Col md={8} className="roadmaps_desktop">
              <img className='roadmap_desktop' src={imageRequire('roadmap_desktop.png')} alt="roadmap_mobile2"/>
              </Col>
              <Col md={8}>
              <div className='roadmap2-1'>Publish white paper<br />Private coin sale</div>
              <div className='roadmap2-2'>Launch second beta testnet<br /> Develop wallet system</div>
              <div className='roadmap2-3'>Launch GXC DEX alpha version <br /> Launch mainet GXC wallet</div>
              <div className='roadmap2-4'>Launch dGame Community Service <br /> Launch GXC SDK</div>
              </Col>
              </Row>
              </Fade>
            </Row>
          </Content>
          <Content>
          </Content>
          <Content className="advantages2 section-type-1 only-mobile mobile-road">
            <Row>
              <h1 className="title">Roadmap</h1>
              <Col xs={24} className="ecosystem">
                <Fade duration={2000}>
                  <img className='roadmap_mobile' src={imageRequire('roadmap_mobile2.png')} alt="roadmap_mobile2"/>
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

