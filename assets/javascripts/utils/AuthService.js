import { EventEmitter } from 'events'
import Auth0Lock from 'auth0-lock'
import * as config from '../constants/Config'

const options = {
  redirect: true,
  languageDictionary: {
    title: ''
  },
  theme: {
    primaryColor: 'black',
    logo: 'http://s3-ap-northeast-1.amazonaws.com/ghost-go/logo2x.png'
  }
}

export default class AuthService extends EventEmitter  {
  constructor(clientId, domain) {
    // Configure Auth0
    super()
    this.lock = new Auth0Lock(clientId, domain, config.AUTH0_CONFIG)
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.lock.on('authorization_error', this._authorizationError.bind(this))
    this.login = this.login.bind(this)
    this.clientId = __AUTH0_CLIENT_ID__
    this.domain = __AUTH0_DOMAIN__
  }

  _doAuthentication(authResult){
    authResult.state = authResult.state || ''
    if (authResult.state.includes('linking')){
      this.linkAccount(authResult.idToken)
    } else {
      // Saves the user token
      this.setToken(authResult.idToken)
      // Async loads the user profile data
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          console.log('Error loading the Profile', error)
        } else {
          this.setProfile(profile)
        }
      })
    }
  }

  _authorizationError(error){
    // Unexpected authentication error
    console.log('Authentication Error', error)
  }

  login(callbackURL) {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setProfile(profile){
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile(){
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
  }

  updateProfile(userId, data){
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken() //setting authorization header
    }
    // making the PATCH http request to auth0 api
    return fetch(`https://${this.domain}/api/v2/users/${userId}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(newProfile => this.setProfile(newProfile)) //updating current profile
  }

}
