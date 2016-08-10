import Auth0Lock from 'auth0-lock'
import * as config from '../constants/Config'

export default class LinkAccountService {
  constructor(auth, userId) {
    this.auth = auth
    let merged = {}
    Object.assign(merged, config.AUTH0_CONFIG, {
      auth: {
        params: {state: 'linking'}
      },
      allowedConnections: ['facebook', 'google-oauth2'],
      languageDictionary: { // allows to override dictionary entries
        title: 'Link with:'
      }
    })
    this.lock = new Auth0Lock(auth.clientId, auth.domain, merged)
    this.link = this.link.bind(this)
  }

  link(){
    // Call the show method to display the authentication window.
    this.lock.show()
  }
}
