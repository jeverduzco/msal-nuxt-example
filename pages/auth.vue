<template>
  <div>
    <v-container
      id="content"
      grid-list-xl
    >
      <v-layout
        wrap
        row
        justify-center
        align-center
        min-width="100%"
      >
        <v-flex>
          <div class="text-center">
            <v-card
              flat
            >
              <v-avatar
                v-if="!this.$vuetify.theme.dark"
                id="logo"
                size="100"
              >
                <img src="https://storage.verduzco.dev/website/auth/logo-login-negro.png" alt="Logo VERDUZCO.DEV">
              </v-avatar>
              <v-avatar
                v-if="this.$vuetify.theme.dark"
                id="logo-dark"
                size="100"
              >
                <img src="https://storage.verduzco.dev/website/auth/logo-login-blanco.png" alt="Logo VERDUZCO.DEV">
              </v-avatar>
              <v-card-title
                id="title"
                class="headline"
              >
                {{ $t('auth.pageTitle') }}
              </v-card-title>
              <v-card-text>
                <p>
                  {{ $t('auth.paragraph') }}
                </p>
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-btn
                  text
                  color="primary"
                  :loading="loading"
                  big
                  block
                  :title="$t('titles.signin')"
                  @click="login"
                >
                  {{ $t('titles.signin') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog
      v-model="forgot"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{ $t('auth.ops') }}
        </v-card-title>
        <v-card-text>
          <div class="text-center">
            <p id="fogotP">
              {{ $t('auth.forgot') }}
            </p>
          </div>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="warning"
            text
            @click="cancelForgot()"
          >
            {{ $t('auth.noForgot') }}
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="forgotPassword()"
          >
            {{ $t('auth.yesForgot') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: '',
      title: this.$i18n.t('auth.title'),
      description: this.$i18n.t('auth.title'),
      dialog: false,
      loading: false,
      forgot: false
    }
  },
  computed: {
    // Get user from msal
    user() {
      return this.$AuthService.getAccount()
    }
  },
  mounted() {
    this.redirectUser()
    this.handlefogotError()
  },
  methods: {
    // Delete msal storage keys
    cancelForgot() {
      const msalKeys = []
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).substring(0, 5) === 'msal.') {
          msalKeys.push(localStorage.key(i))
        }
      }
      for (let i = 0; i < msalKeys.length; i++) {
        localStorage.removeItem(msalKeys[i])
      }
      this.forgot = false
    },
    // Catch msal error from storage
    handlefogotError() {
      const error = localStorage.getItem('msal.login.error')
      if (error) {
        if (this.user === null) {
          if (error.indexOf('AADB2C90118') > -1) {
            this.forgot = true
          }
        }
      }
    },
    // Call forgot password method
    forgotPassword() {
      this.$AuthService.forgotPassword()
    },
    // Login method
    login() {
      if (this.user === null) {
        this.$AuthService.loginRe()
        this.loading = true
      } else if (this.$i18n.locale === 'es') {
        this.$router.push('/')
      } else {
        this.$router.push('/en')
      }
    },
    // Redirect user method
    redirectUser() {
      if (this.user != null && this.$i18n.locale === 'es') {
        this.$router.push('/')
      } else if (this.user != null && this.$i18n.locale === 'en') {
        this.$router.push('/en')
      }
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: this.description
        },
        {
          property: 'robots',
          content: 'noindex'
        }
      ]
    }
  }
}
</script>


<style scoped>
#title {
  text-align: center !important;
  display: block !important;
}
#logo {
  margin-top: -50px;
  border-radius: 60px;
  background-color: white;
}
#logo img {
  padding: 10px;
}
#logo-dark {
  margin-top: -50px;
  border-radius: 60px;
  background-color: #424242;
}
#logo-dark img {
  padding: 10px;
}
#content {
  max-width: 1137px !important;
  margin-top: 50px;
}
#account-help {
  padding-top: 30px;
}
#edgeAlert {
  margin-top: 20px;
}
#fogotP {
  margin-top: 15px;
}
</style>
