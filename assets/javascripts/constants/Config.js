export const PROTOCOL = 'http'

export let API_DOMAIN = ''

switch (process.env.NODE_ENV) {
case 'development':
  API_DOMAIN = `${PROTOCOL}://localhost:3000`
  break
case 'production':
  API_DOMAIN = `${PROTOCOL}://api.ghost-go.com`
  break
}
