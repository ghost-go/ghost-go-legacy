/* global process:true */
export let PROTOCOL = 'http';

export let API_DOMAIN = '';
export let APP_DOMAIN = '';
export const ENV = process.env.NODE_ENV;

switch (ENV) {
  case 'development':
    PROTOCOL = 'http';
    API_DOMAIN = `${PROTOCOL}://localhost:3000`;
    APP_DOMAIN = `${PROTOCOL}://localhost:5000`;
    break;
  case 'production':
    PROTOCOL = 'https';
    API_DOMAIN = `${PROTOCOL}://api.ghost-go.com`;
    APP_DOMAIN = `${PROTOCOL}://www.ghost-go.com`;
    break;
}

export const AUTH0_CONFIG = {
  auth: {
    redirectUrl: APP_DOMAIN,
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
    logo: `${PROTOCOL}://s3-ap-northeast-1.amazonaws.com/ghost-go/logo2x.png`,
  },
};

export const API_VERSION = 'v1';
