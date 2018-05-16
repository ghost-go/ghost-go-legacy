import { EventEmitter } from 'events';
import Auth0Lock from 'auth0-lock';
import auth0 from 'auth0-js';
import * as config from '../common/Config';

export default class AuthService extends EventEmitter {
  auth0 = new auth0.WebAuth({
    domain: 'ghostgo.auth0.com',
    clientID: 'GydWO2877MMcpteCqgQEWSFGqtQOCiP5',
    redirectUri: `${config.APP_DOMAIN}/problems`,
    audience: 'https://ghostgo.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid',
  });

  constructor(clientId, domain) {
    // Configure Auth0
    super();
    this.domain = domain;
    this.lock = new Auth0Lock(clientId, domain, config.AUTH0_CONFIG);
    // Add callback for lock `authenticated` event
    // this.doAuthentication = this.doAuthentication.bind(this);
    // this.lock.on('authenticated', this.doAuthentication);
    // binds login functions to keep this context
    // this.lock.on('authorization_error', (error) => {
    //   eslint-disable-next-line
    //   console.log('Authentication Error', error);
    // });
    // this.login = this.login.bind(this);
    // this.logout = this.logout.bind(this);
    // this.handleAuthentication = this.handleAuthentication.bind(this);
    // this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.log(err);
      }
    });
  }

  // setSession(authResult) {
  //   // Set the time that the Access Token will expire at
  //   let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
  //   localStorage.setItem('access_token', authResult.accessToken);
  //   localStorage.setItem('id_token', authResult.idToken);
  //   localStorage.setItem('expires_at', expiresAt);
  //   // navigate to the home route
  //   history.replace('/home');
  // }

  // logout() {
  //   // Clear Access Token and ID Token from local storage
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('id_token');
  //   localStorage.removeItem('expires_at');
  //   // navigate to the home route
  //   history.replace('/home');
  // }

  // isAuthenticated() {
  //   // Check whether the current time is past the
  //   // Access Token's expiry time
  //   let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  //   return new Date().getTime() < expiresAt;
  // }

  doAuthentication(authResult) {
    if (!authResult.accessToken) return;
    this.setToken(authResult.accessToken);
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
    this.auth0.authorize();
    // this.lock.show();
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken();
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

  setToken(idToken) {
    this.token = idToken;
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return this.token || localStorage.getItem('id_token');
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
