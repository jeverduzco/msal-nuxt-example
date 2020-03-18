import AuthService from '../msal/msal'
import Vue from 'vue'

Vue.prototype.$AuthService = new AuthService()
