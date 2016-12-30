export let PROTOCOL = ''

export let API_DOMAIN = ''
export let APP_DOMAIN = ''

switch (process.env.NODE_ENV) {
case 'development':
  API_DOMAIN = `${PROTOCOL}://localhost:3000`
  APP_DOMAIN = `${PROTOCOL}://localhost:5000`
  PROTOCOL = 'http'
  break
case 'production':
  API_DOMAIN = `${PROTOCOL}://api.ghost-go.com`
  APP_DOMAIN = `${PROTOCOL}://www.ghost-go.com`
  PROTOCOL = 'https'
  break
}

export const AUTH0_CONFIG = {
  auth: {
    redirectUrl: APP_DOMAIN,
    responseType: 'token',
    authParams: {
      scope: 'openid profile'
    }
  },
  languageDictionary: {
    title: ''
  },
  theme: {
    primaryColor: 'black',
    logo: `${PROTOCOL}://s3-ap-northeast-1.amazonaws.com/ghost-go/logo2x.png`
  }
}

export const API_VERSION = 'v1'
