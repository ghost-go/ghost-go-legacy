let protocol = 'http';
let apiDomain = '';
let appDomain = '';
let audience = '';
export const ENV = process.env.NODE_ENV;
export const { TOTAL_VERSION } = process.env;

switch (ENV) {
  case 'development':
    protocol = 'http';
    apiDomain = `${protocol}://localhost:3000`;
    appDomain = `${protocol}://localhost:5000`;
    audience = 'ghostgo-development';
    break;
  case 'production':
    protocol = 'https';
    apiDomain = `${protocol}://api.ghost-go.com`;
    appDomain = `${protocol}://www.ghost-go.com`;
    audience = 'ghostgo';
    break;
  default:
}

export const AUTH0_CONFIG = {
  auth: {
    redirectUrl: 'http://localhost:3000/callback',
    responseType: 'code',
    params: {
      scope: 'openid email', // Learn about scopes: https://auth0.com/docs/scopes
    },
  },
  oidcConformant: true,
  allowShowPassword: true,
  usernameStyle: 'email',
  defaultDatabaseConnection: 'acme',
  prefill: {
    email: 'johnfoo@gmail.com',
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
const AUDIENCE = audience;
export { PROTOCOL, API_DOMAIN, APP_DOMAIN, AUDIENCE };
