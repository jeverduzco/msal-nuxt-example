<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      width="256"
      :class="[ drawer ? 'active-drawer' : 'none' ]"
    >
      <div class="text-center">
        <v-menu
          bottom
          origin="center center"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              class="menu-button"
              :title="$t('titles.language')"
              icon
              v-on="on"
            >
              <v-icon>translate</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="locale in $i18n.locales"
              :key="locale.code"
              :to="switchLocalePath(locale.code)"
            >
              <v-list-item-title>{{ locale.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          icon
          class="menu-button"
          :title="$t('titles.invertColors')"
          @click="changeThemeManual"
        >
          <v-icon>invert_colors</v-icon>
        </v-btn>
        <client-only>
          <v-btn
            v-if="user == null"
            class="menu-button"
            icon
            :title="$t('titles.signin')"
            @click="login"
          >
            <v-icon>perm_identity</v-icon>
          </v-btn>
          <v-menu
            v-if="user !== null"
            bottom
            origin="center center"
            transition="scale-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                class="menu-button"
                :title="$t('titles.signout')"
                v-on="on"
              >
                <v-icon>how_to_reg</v-icon>
              </v-btn>
            </template>
            <v-list>
              <span id="username">{{ user.name }}</span>
              <v-divider id="usernamed" />
              <v-list-item
                @click="logout"
              >
                <v-list-item-title>{{ $t('titles.signout') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </client-only>
      </div>
      <v-divider />
      <v-list shaped>
        <v-list-item
          :to="localePath('index')"
          :color="themeColor"
          nuxt
          exact
        >
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('menu.home')" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      flat
      app
    >
      <v-app-bar-nav-icon id="drawer-button" large :title="$t('titles.menu')" @click="drawer = !drawer" />
      <nuxt-link id="logo" :to="localePath('index')" :title="$t('titles.goToHome')">
        <img v-show="!this.$vuetify.theme.dark" id="logo" src="https://storage.verduzco.dev/website/main/logo-jesus-verduzco-dev-negro.svg" :alt="title">
        <img v-show="this.$vuetify.theme.dark" id="logo" src="https://storage.verduzco.dev/website/main/logo-jesus-verduzco-dev-blanco.svg" :alt="title">
      </nuxt-link>
      <v-spacer />
      <v-progress-linear
        :active="userLoading"
        :indeterminate="userLoading"
        absolute
        bottom
        color="accent"
      />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      absolute
      app
      height="auto"
      :class="[ drawer ? 'footer-drawer-active' : 'none' ]"
    >
      <v-card
        class="flex"
        flat
        tile
        color="transparent"
      >
        <p class="text-center">
          &copy; {{ date }} VERDUZCO.DEV
        </p>
      </v-card>
      <client-only>
        <cookie-law
          theme="dark-lime"
          :button-text="$t('messages.acept')"
          :class="[ drawer ? 'footer-drawer-active' : 'none' ]"
        >
          <div slot="message">
            {{ $t('layouts.privacyPolicyP') }}
            <a :href="activeLocale === 'es' ? 'https://help.verduzco.dev/politica-de-privacidad' : 'https://help.verduzco.dev/en/privacy-policy'" target="_blank">
              {{ $t('layouts.privacyPolicy') }}
            </a>
          </div>
        </cookie-law>
      </client-only>
    </v-footer>
    <client-only>
      <v-snackbar
        v-if="getUser != null"
        v-model="conected"
        color="success"
        button
      >
        <span>{{ $t('messages.hello') + ', ' }} {{ getUser.name }}</span>
        <v-icon dark>
          account_circle
        </v-icon>
      </v-snackbar>
    </client-only>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      drawer: null,
      date: new Date().getFullYear(),
      conected: false,
      userLoading: false,
      title: 'Veinve'
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    getUser: function() {
      if (process.browser) {
        return this.$AuthService.getAccount()
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    privacyLinks() {
      if (!this.$vuetify.theme.dark) {
        return 'privacyLinksL'
      } else {
        return 'privacyLinksD'
      }
    },
    themeColor() {
      if (!this.$vuetify.theme.dark) {
        return 'black'
      } else {
        return 'light'
      }
    },
    activeLocale() {
      return this.$i18n.locale
    },
    ...mapGetters({
      user: 'user/user'
    })
  },
  beforeMount() {
    this.setUser()
    this.changeTheme()
  },
  methods: {
    changeThemeManual() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    changeTheme() {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.$vuetify.theme.dark = true
      }
    },
    setUser() {
      if (process.browser) {
        if (this.getUser === null) {
          this.$store.commit('user/setUser', null)
        } else {
          this.$store.commit('user/setUser', this.getUser)
        }
      }
    },
    login() {
      const url = window.location.pathname
      if (url !== '/auth' && this.$i18n.locale === 'es') {
        this.$router.push('/auth')
      } else if (url !== '/auth' && this.$i18n.locale === 'en') {
        this.$router.push('/en/auth')
      } else {
        this.$AuthService.login()
      }
    },
    logout() {
      this.$AuthService.logout()
    }
  }
}
</script>
<style scoped>
.privacyLinksL {
  color: black;
  text-decoration: none;
}
.privacyLinksD {
  color: white;
  text-decoration: none;
}
#username {
  padding: 15px;
}
#logo {
  height: 24px;
  width: auto;
}
#usernamed {
  margin-top: 10px;
}
#search-content {
  max-width: 1137px !important;
  margin-top: 10px;
}
.menu-button {
  margin: 5px;
}
#drawer-button {
  margin-left: 2px;
  margin-right: 13px;
}
@media only screen and (min-width: 1264px) {
  .active-drawer {
    max-height: 100% !important;
  }
  .footer-drawer-active {
    width: calc(100% - 256px);
    margin-left: 256px;
  }
}
@media screen and (max-width: 960px) {
  #redesf {
    text-align: center !important;
    display: block !important;
  }
}
</style>
