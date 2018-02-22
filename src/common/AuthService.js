import { EventEmitter } from 'events';
import Auth0Lock from 'auth0-lock';
import * as config from '../common/Config';

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    // Configure Auth0
    super();
    this.domain = domain;
    this.lock = new Auth0Lock(clientId, domain, config.AUTH0_CONFIG);
    // Add callback for lock `authenticated` event
    this.doAuthentication = this.doAuthentication.bind(this);
    this.lock.on('authenticated', this.doAuthentication);
    // binds login functions to keep this context
    this.lock.on('authorization_error', (error) => {
      // eslint-disable-next-line
      console.log('Authentication Error', error);
    });
    this.login = this.login.bind(this);
  }

  doAuthentication(authResult) {
    if (!authResult.accessToken) return;
    AuthService.setToken(authResult.accessToken);
    // Async loads the user profile data
    this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
      if (error) {
        // eslint-disable-next-line
        console.log('Error loading the Profile', error);
      } else {
        this.setProfile(profile);
      }
    });
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  static loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!AuthService.getToken();
  }

  setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile));
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile);
  }

  static getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {};
  }

  static setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
  }

  static getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  static logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }

  updateProfile(userId, data) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`, // setting authorization header
    };
    // making the PATCH http request to auth0 api
    return fetch(`https://${this.domain}/api/v2/users/${userId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    }).then(response => response.json()).then(newProfile => this.setProfile(newProfile));
  }
}
