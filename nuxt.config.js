// eslint-disable-next-line nuxt/no-cjs-in-config

// eslint-disable-next-line nuxt/no-cjs-in-config
module.exports = {
  mode: 'universal',
  server: {
    port: 3000, // default: 3000
    host: 'localhost' // default: localhost
  },
  buildModules: [
    [
      '@nuxtjs/vuetify',
      {
        treeShake: true,
        theme: {
          dark: false,
          themes: {
            dark: {
              primary: '#03a9f4',
              secondary: '#00bcd4',
              accent: '#009688',
              error: '#f44336',
              warning: '#ff5722',
              info: '#ffc107',
              success: '#4caf50'
            },
            light: {
              primary: '#03a9f4',
              secondary: '#00bcd4',
              accent: '#009688',
              error: '#f44336',
              warning: '#ff5722',
              info: '#ffc107',
              success: '#4caf50'
            }
          }
        }
      }
    ]
  ],

  /*
  ** Headers of the page
  */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'shortcut icon',
        href:
          'https://storage.verduzco.dev/website/static/icons/icon-128x128.png'
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/x-icon',
        href:
          'https://storage.verduzco.dev/website/static/icons/icon-192x192.png'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#66BB6A' },

  /*
  ** Global CSS
  */
  css: ['~/assets/main.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '@/plugins/vuetify',
    { src: '~plugins/vue-cookie-law.js', ssr: false },
    { src: '~plugins/auth.js', ssr: false }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/robots',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            name: 'Español',
            code: 'es',
            iso: 'es-MX',
            file: 'es-MX.js'
          },
          {
            name: 'English',
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js'
          }
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'es'
      }
    ]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
