let protocol = 'http';
let apiDomain = '';
let appDomain = '';
export const ENV = process.env.NODE_ENV;

switch (ENV) {
  case 'development':
    protocol = 'http';
    apiDomain = `${protocol}://localhost:3000`;
    appDomain = `${protocol}://localhost:5000`;
    break;
  case 'production':
    protocol = 'https';
    apiDomain = `${protocol}://api.ghost-go.com`;
    appDomain = `${protocol}://www.ghost-go.com`;
    break;
  default:
}

export const AUTH0_CONFIG = {
  auth: {
    redirectUrl: appDomain,
    responseType: 'token',
    authParams: {
      scope: 'openid profile',
    },
  },
  languageDictionary: {
    title: '',
  },
  theme: {
    primaryColor: 'black',
    logo: `${protocol}://s3-ap-northeast-1.amazonaws.com/ghost-go/logo2x.png`,
  },
};

export const API_VERSION = 'v1';
const PROTOCOL = protocol;
const API_DOMAIN = apiDomain;
const APP_DOMAIN = appDomain;
export { PROTOCOL, API_DOMAIN, APP_DOMAIN };

export const THEME = {
  flatTheme: {
    board: ['/flat-theme/board.png'],
    black: ['/flat-theme/black.svg'],
    white: ['/flat-theme/white.svg'],
  },
  photorealisticTheme: {
    board: ['/photorealistic-theme/board.png'],
    black: ['/photorealistic-theme/black.png'],
    white: ['/photorealistic-theme/white.png'],
  },
  shellStone: {
    board: ['/shell-stone/board.png'],
    black: ['/shell-stone/black.png'],
    white: [
      '/shell-stone/white0.png',
      '/shell-stone/white1.png',
      '/shell-stone/white2.png',
      '/shell-stone/white3.png',
      '/shell-stone/white4.png',
    ],
  },
  slateAndShell: {
    board: ['/slate-and-shell-theme/board.png'],
    black: [
      '/slate-and-shell-theme/slate1.png',
      '/slate-and-shell-theme/slate2.png',
      '/slate-and-shell-theme/slate3.png',
      '/slate-and-shell-theme/slate4.png',
      '/slate-and-shell-theme/slate5.png',
    ],
    white: [
      '/slate-and-shell-theme/shell1.png',
      '/slate-and-shell-theme/shell2.png',
      '/slate-and-shell-theme/shell3.png',
      '/slate-and-shell-theme/shell4.png',
      '/slate-and-shell-theme/shell5.png',
    ],
  },
  subduedTheme: {
    board: ['/subdued-theme/board.png'],
    black: ['/subdued-theme/black.png'],
    white: ['/subdued-theme/white.png'],
  },
  walnutTheme: {
    board: ['/walnut-theme/board.png'],
    black: ['/walnut-theme/black.png'],
    white: ['/walnut-theme/white.png'],
  },
};
