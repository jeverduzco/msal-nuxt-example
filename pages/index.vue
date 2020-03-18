<template>
  <div>
    <v-container
      id="content"
      grid-list-xl
    >
      <v-layout
        wrap
        column
        justify-center
        align-center
        min-width="100%"
      >
        <v-flex>
          <div class="text-xs-center">
            <h1>😘</h1>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: this.$i18n.t('title'),
      description: this.$i18n.t('description'),
      ampLoadTimeout: 300,
      action: '',
      textSnack: '',
      snackbar: false,
      snackIcon: ''
    }
  },
  computed: {
    locale() {
      return this.$i18n.locale
    },
    seoLocale() {
      if (this.$i18n.locale === 'es') {
        return 'es-MX'
      } else {
        return 'en-US'
      }
    },
    seoUrl() {
      if (this.$i18n.locale === 'es') {
        return 'https://verduzco.dev/'
      } else {
        return 'https://verduzco.dev/en/'
      }
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.seoLocale
      },
      title: this.title,
      link: [
        {
          rel: 'canonical',
          href: this.seoUrl
        }
      ],
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: this.description
        },
        {
          property: 'og:title',
          content: this.title
        },
        {
          property: 'og:description',
          content: this.description
        },
        {
          property: 'og:image',
          content:
            'https://storage.verduzco.dev/website/main/verduzco-de-op-image.png'
        },
        {
          property: 'og:locale',
          content: this.seoLocale
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:url',
          content: this.seoUrl
        },
        {
          property: 'og:site_name',
          content: 'Jesús Verduzco | DevOps Engineer & Entrepreneur'
        },
        {
          property: 'og:image:width',
          content: '1200'
        },
        {
          property: 'og:image:width',
          content: '630'
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:description',
          content: this.title
        },
        {
          name: 'twitter:title',
          content: this.description
        },
        {
          name: 'twitter:image',
          content:
            'https://storage.verduzco.dev/website/main/verduzco-de-op-image.png'
        },
        {
          name: 'twitter:creator',
          content: '@verduzco_dev'
        }
      ]
    }
  }
}
</script>
<style scoped>
.blog-post-title {
  text-align: center !important;
  display: block !important;
  word-break: normal;
  -ms-word-break: normal;
}
#content {
  max-width: 1137px !important;
  margin-top: 39px;
}
a {
  text-decoration: none;
  color: inherit;
}
.site-name {
  text-align: center !important;
  display: block !important;
}
.site-name h1 {
  font-size: 18pt;
}
@media screen and (max-width: 600px) {
  .blog-post-meta-info {
    min-width: 100% !important;
  }
  .blog-post-meta {
    min-width: 100%;
    padding-right: 16px;
  }
}
</style>
