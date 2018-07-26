import auth0 from 'auth0-js';
import * as config from './Config';
import history from './History';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'ghostgo.auth0.com',
    clientID: 'GydWO2877MMcpteCqgQEWSFGqtQOCiP5',
    redirectUri: `${config.APP_DOMAIN}/callback`,
    audience: config.AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid profile',
  });

  userProfile;
  tokenRenewalTimeout;

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.history = history;
    this.scheduleRenewal();
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

    // schedule a token renewal
    this.scheduleRenewal();

    // this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
    //   if (profile) {
    //     localStorage.setItem('profile', JSON.stringify(profile));
    //     this.userProfile = profile;
    //   }
    // });
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
    clearTimeout(this.tokenRenewalTimeout);
    this.userProfile = null;
    this.history.replace('/problems');
  }

  // static getProfile() {
  //   const profile = localStorage.getItem('profile');
  //   return profile ? JSON.parse(localStorage.profile) : null;
  // }

  // eslint-disable-next-line class-methods-use-this
  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No Access Token found');
    }
    return accessToken;
  }

  getProfile(cb) {
    const accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  renewToken() {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(`Could not get a new token (${err.error}: ${err.error_description}).`);
      } else {
        this.setSession(result);
        // eslint-disable-next-line no-console
        console.log('Successfully renewed auth!');
      }
    });
  }

  scheduleRenewal() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    const delay = expiresAt - Date.now();
    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewToken();
      }, delay);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
