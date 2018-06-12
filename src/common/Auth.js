import createHistory from 'history/createBrowserHistory';
import auth0 from 'auth0-js';
import * as config from '../common/Config';

export default class Auth {
  history = createHistory({
    forceRefresh: true,
  });
  auth0 = new auth0.WebAuth({
    domain: 'ghostgo.auth0.com',
    clientID: 'GydWO2877MMcpteCqgQEWSFGqtQOCiP5',
    redirectUri: `${config.APP_DOMAIN}/callback`,
    audience: 'https://ghostgo.auth0.com/api/v2/',
    responseType: 'token id_token',
    scope: 'openid profile',
  });

  userProfile;

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.history.replace('/problems');
      } else if (err) {
        this.history.replace('/problems');
        // eslint-disable-next-line no-console
        console.log(err);
        // eslint-disable-next-line no-alert
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      }
    });
    // navigate to the home route
    this.history.replace('/problems');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // localStorage.removeItem('profile');
    // navigate to the home route
    this.history.replace('/problems');
  }

  static getProfile() {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : null;
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // throw new Error('No Access Token found');
      console.log('No Access Token found');
    }
    return accessToken;
  }

  getProfile(cb) {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          this.userProfile = profile;
        }
        cb(err, profile);
      });
    }
  }

  static isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
