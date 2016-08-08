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
