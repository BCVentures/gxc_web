import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';


i18n
// .use(XHR)
  .use(LanguageDetector)
  .use(reactI18nextModule) // if not using I18nextProvider
  .init({
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    resources: {
      en: {
        main: {
          title: 'Gamecoin Exchange',
          description: 'By connecting the game with the blockchain,<br/>Break the wall between games',
          introTitle: '블록체인과 게임을 연결하여 게임 간의 벽을 허문다',
          introDescription: 'Gamecoin Exchange는 게임 간 화폐들을 기축통화인 GXC를 통해 연결하는 것을 목적으로 둡니다.\n' +
          'GXC는 블록체인을 기반으로 게임 개발사, 게이머에게 보다 가치있는 시스템을 제공합니다.',
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
