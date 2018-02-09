import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';


i18n
  .use(LanguageDetector)
  .use(reactI18nextModule) // if not using I18nextProvider
  .init({
    fallbackLng: 'ko',
    debug: true,

    interpolation: {
      // escapeValue: false, // not needed for react!!
    },
    resources: {
      en: {
        main: {
          title: 'Gamecoin Exchange',
          description: 'By connecting the game with the blockchain, Break the wall between games',
          introTitle: '블록체인과 게임을 연결하여 게임 간의 벽을 허문다',
          introDescription: 'Gamecoin Exchange는 게임 간 화폐들을 기축통화인 GXC를 통해 연결하는 것을 목적으로 둡니다.\n' +
          'GXC는 블록체인을 기반으로 게임 개발사, 게이머에게 보다 가치있는 시스템을 제공합니다.',
        },
      },

      "ko-KR": {
        main: {
          title: 'Game X Coin',
          description: 'By connecting the game with the blockchain, Break the wall between games',
          introTitle: '블록체인과 게임을 연결하여\n게임 간의 벽을 허문다',
          introDescription: 'Game X Coin는 게임 간 화폐들을 기축통화인 GXC를 통해 연결하는 것을 목적으로 둡니다.\n' +
          'GXC는 블록체인을 기반으로 게임 개발사, 게이머에게 보다 가치있는 시스템을 제공합니다.',
          reward: {
            title: 'Reward',
            description: '기존에는 게임을 플레이 하다가 그만 두게 되면 게임에서 습득한 보상을 \n' +
            '모두 포기해야했습니다. 하지만 GXC를 통해 어떠한 게임을 플레이 하든 \n' +
            '게이머는 각기 다른 게임에서 얻은 보상을 온전히 자신의 것으로 소유할 수 있습니다.',

          },
          p2p: {
            title: 'P2P',
            description: '게이머들은 게임 플레이를 하는 동안 같은 게임을 즐기는 다른 게이머와\n' +
            '거래가 빈번하게 발생합니다. 이는 블록체인의 스마트 컨트랙트를 활용하면\n' +
            '타 거래소를 통해 지출되던 수수료를 아낄 수 있고, 하나의 계약서와 같은 형태로 \n' +
            '게임 내에서 자유롭게 활용할 수 있습니다.',
          },
          commission: {
            title: 'Commission',
            description: '개발사가 플랫폼에 지불해야 하는 수수료는 30%로 구조화 되어있습니다.\n' +
            '이는 플랫폼이 독과점 형태로 이루어졌기 때문입니다.\n' +
            'GXC는 탈 중앙화를 통해 게임 개발사들이 부담없이 게이머와 연결될 수 있도록\n' +
            '결제 수수료를 획기적으로 낮추고 수수료의 일부를 개발사와 수익을 나눌 것입니다.',
          },
          member: {
            title: "About Team",
          },
          advisor: {
            title: "Advisor",
          },
          whitepaper: {
            title: "WHITEPAPER",
            description: "GXC가 필요한 이유에 대해서 백서에 서술하였습니다.\n" +
            "또한 GXC에서 사용될 암호화 토큰, GXC (Game X Coin) 의 토큰 메커니즘에 대해서 서술하였습니다.",
          },
          roadmap: {
            title: "Roadmap",
          },
          partner: {
            title: "Partners",
          },
          subscribe: {
            title: "Subscribe",
            description: "이메일 주소를 입력하시면 GXC 관련 소식을 가장 빠르게 전해드립니다.",
          },
        },
        error: {
          whitepaperDownload: "백서는 현재 준비중입니다.",
        },
        member: {
          kwk: {
            name: "Woongkyum Kim",
            role: "Chief Executive Officer",
            description: "김웅겸은 연세대학교 컴퓨터과학과를 졸업하고, 1999년부터 대용량 서버 프로그래밍 및 게임 프로그래밍을 위주로 \n" +
            "개발경험을 쌓아왔다. 2010년 결제 소프트웨어 기업인 후퍼(주)를 창업한 뒤, 한국의 대표적인 전자금융전문기업인 \n" +
            "나이스정보통신과 “페이앳\"이란 모바일 결제 서비스를 해오고 있으며, 이 결제 서비스는 1년에 3,000억이 넘는\n" +
            "승인액을  달성하는 중이며, 지금도 성장하고 있다. 핀테크에 종사하며 2016년부터 블록체인에 지대한 관심을 두었고, \n" +
            "예전에 게임을 개발했던 경험과 게이머로서의 니즈에 의해서 GXC 프로젝트를 기획하고 시작하게 되었다.",
          },
          pje: {
            name: "Jieun Park",
            role: "Chief Operating Officer",
            description: "박지은은 숙명여자대학교에서 정보방송학을 전공하였다." +
            "김웅겸 대표와 공동 창업을 하여 10년간 운영이사의 역할을 해오고 있으며, 수 백명의 인력채용을 담당한 경험이 있고" +
            "100여개가 넘는 프로젝트의 매니징을 성공적으로 담당해왔다. 자금 운용, 인력 운용, 프로젝트 관리에 있어서 " +
            "전문가이며, 회사 내 분쟁 해결과 일하기 좋은 회사를 만들기 위해 노력해오고 있다.",
          },
          yjh: {
            name: "Jinhwan Yang",
            role: "Chief Technology Officer",
            description: "양진환은 블록체인벤처스의 CTO로서 서울대학교 경영학과 및 컴퓨터공학과를 복수전공으로 졸업한 개발자이다. " +
            "IT기업 Mozzet에서 웹 Lead Developer, 해외직구 검색엔진 Qpick에서 CTO,  비즈니스 컨설턴트 마켓플레이스" +
            "Profound에서 CTO로 활동하였다. 다방면에서 10년이 넘는 기간동안 Server, Architecture, User Interface 등을" +
            "설계, 제작하였으며 17년부터 블록체인에 관심을 가져 리서치, 개발을 개인적으로 진행하다 팀에 합류하게 되었다.",
          },
          bhs: {
            name: "Hyunseok Bang",
            role: "Chief Createive Officer",
            description: "방현석은 20대 때부터 벤처에 뜻을 두어 서울과학기술대학교 시각디자인학과 재학생 시절부터 휴학을 하고 사업의 길에 뛰어들었다. 2011년 스타트업 미디어 beSUCCESS 창업 디자이너 멤버로 들어간 것을 시작으로 2012년에는 아시아 최대 스타트업 컨퍼런스 beLAUNCH 총괄 디자인하였다. beSUCCESS는 현재 한국의 대표적인 스타트업 미디어로 자리잡고 있다. 2012년에는 성장해가는 해외직구 시장의 가능성을 보고 해외직구 검색엔진 Qpick 기획이사로 참여하였으며, 이 후 사람과 사람을 연결해주는 산업에 관심을 갖게되어 비즈니스 컨설턴트 마켓플레이스 Profound에 CCO로 재임하며 수 많은 프로젝트에 기획자 겸 디자이너로서 참여하였다. 2017년에는 블록체인 기술에 매료, 앞으로 미래를 이끌어갈 산업이란 확신이 들어 팀에 참여하게 되었다.",
          },
          cyw: {
            name: "Yeonwoo Chu",
            role: "Chief Partnership Officer",
            description: "추연우는 서울시립대학교 토목공학과를 졸업한 개발자이자 경영자이다. 2002년부터 아키텍쳐 설계 및 게임 서버 프로그래밍으로 개발경력을 쌓아왔으며, PC 온라인, 콘솔 , 모바일등 다양한 플랫폼의 게임 개발 경험을 가지고 있다. IT기업 어니언텍21 게임사업본부장, 타겟팅 마케팅 기업 모비온 Lead Developer, 모바일 개발사 이루고 CTO, 소프트웨어 개발사 코로스튜디오 CEO 등 개발 및 경영 15년 차 경력을 보유하고 있다. 2016년 금융권 개발프로젝트를 통해 블록체인을 처음 접했으며, 2017년 매력적인 블록체인 기술 팀인 블록체인벤처스에 합류하게 되었다.",
          },
          lhh: {
            name: "Hwanhee Lee",
            role: "Blockchain Developer",
            description: "이환희는 블록체인벤처스의 개발자로서 명지대학교 소프트웨어공학 연구실에 있었으며, 컴퓨터공학과를 졸업했다. 개발 경력 개발 10년 차 경력을 보유하고 있다. 아사달에서 정부 프로젝트에 참여했으며,  한국 최대 웹호스팅 기업 가비아에서 근무하며, 데몬과 서버, 웹 개발을 했다. 커뮤니티 기업 리퍼블릭닷에서 CTO로 백만명이 넘는 커뮤니티 서비스를 개발 및 운영하였다. 개발자들을 위한 소규모 개발 프로젝트 그룹인 인디벨로퍼를 운영하고 있다. 또한 Pacy라는 팀에서 블록체인과 공유경제 모델을 통해 일 관련 협동 조합에 대한 프로젝트를 진행한 바 있다.",
          },
          ckh: {
            name: "Kwanho Choi",
            description: "XLGames 대표이사네오위즈 게임즈 대표이사\n네오위즈 인터넷 대표이사\n네오위즈 아이엔에스 대표이사\n게임온 대표이사\n한국게임산업협회 회장",
          },
          kjh: {
            name: "Jongho Kim",
            description: "페이레터 결제사업본부 이사\n이지스 효성 결제 사업 경력\n서강대학교 수학과 졸업\n서강대학교 신문방송학 석사 졸업",
          },
          kdi: {
            name: "Dooil Kim",
            description: "ChinaLab 대표이사\n네오윈게임즈 대표이사\n웹젠 MU의 중국 초대형 IP 계약 경험\n중국 진출 및 중국 게임업체 제휴 자문",
          },
          cjm: {
            name: "Jaemin Choi",
            description: "세무법인 자성 대표 세무사\n현대중공업 전문연구요원\n프리챌 근무\n서울대학교 조선해양공학과 졸업\n서울대학교 조선해양공학과 석사 졸업",
          },
          myw: {
            name: "Yongwon Moon",
            description: "쿠프마케팅 전략기획 이사\nEbay E-커머스 사업부\nGXC - E커머스 사업 연결 자문\n한양대학교 경영학과 졸업",
          },
        },
      },
    },
    // react i18next special options (optional)
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default',
    },
  });


export default i18n;
