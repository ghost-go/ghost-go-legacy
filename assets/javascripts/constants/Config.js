export const PROTOCOL = 'http'

export let API_DOMAIN = ''
export let APP_DOMAIN = ''

switch (process.env.NODE_ENV) {
case 'development':
  API_DOMAIN = `${PROTOCOL}://localhost:3000`
  APP_DOMAIN = `${PROTOCOL}://localhost:5000`
  break
case 'production':
  API_DOMAIN = `${PROTOCOL}://api.ghost-go.com`
  APP_DOMAIN = `${PROTOCOL}://www.ghost-go.com`
  break
}

export const AUTH0_CONFIG = {
  languageDictionary: {
    title: ''
  },
  theme: {
    primaryColor: 'black',
    logo: 'http://s3-ap-northeast-1.amazonaws.com/ghost-go/logo2x.png'
  }
}
