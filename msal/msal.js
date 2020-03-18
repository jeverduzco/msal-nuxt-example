import * as Msal from 'msal'

export default class AuthService {
  constructor() {
    // Msal config
    this.applicationConfig = {
      auth: {
        // your client id
        clientId: '',
        redirectUri: 'http://localhost:3000/auth',
        // your login flow
        authority: '',
        validateAuthority: false
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true
      }
    }
    this.auth = new Msal.UserAgentApplication(this.applicationConfig)
    // eslint-disable-next-line handle-callback-err
    const authCallback = function(error, response) {}
    this.auth.handleRedirectCallback(authCallback)
  }

  loginRe() {
    const vm = this
    const loginRequest = {
      // your api scope
      scopes: ['']
    }
    return vm.auth.loginRedirect(loginRequest)
  }

  forgotPassword() {
    const vm = this
    const forgotRequest = {
      // your forgot password flow
      authority: ''
    }
    return vm.auth.loginRedirect(forgotRequest)
  }

  getToken() {
    const accessTokenRequest = {
      // your login flow
      authority: '',
      // your api scope
      scopes: ['']
    }
    return this.auth.acquireTokenSilent(accessTokenRequest)
  }

  logout() {
    this.auth._user = null
    this.auth.logout()
  }

  getAccount() {
    const account = this.auth.getAccount()
    if (!account) {
      return null
    } else {
      return account
    }
  }
}
