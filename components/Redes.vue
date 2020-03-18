<template>
  <div>
    <v-btn
      href="https://twitter.com/verduzco_dev"
      target="_blank"
      rel="noopener"
      :title="$t('titles.followOnTwitter')"
      class="mx-3"
      icon
    >
      <v-icon size="24px">
        fab fa-twitter
      </v-icon>
    </v-btn>
    <v-btn
      href="https://mx.linkedin.com/in/verduzco-dev"
      target="_blank"
      rel="noopener"
      :title="$t('titles.followOnLinkedIn')"
      class="mx-3"
      icon
    >
      <v-icon size="24px">
        fab fa-linkedin
      </v-icon>
    </v-btn>
    <v-btn
      href="https://github.com/jeverduzco"
      target="_blank"
      rel="noopener"
      :title="$t('titles.followOnGitHub')"
      class="mx-3"
      icon
    >
      <v-icon size="24px">
        fab fa-github
      </v-icon>
    </v-btn>
  </div>
</template>
