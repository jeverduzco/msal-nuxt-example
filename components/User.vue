<template>
  <client-only>
    <v-btn
      
      icon
      @click="login"
    >
      <v-icon>perm_identity</v-icon>
    </v-btn>
    <v-btn
      icon
      @click="login"
    >
      <v-icon>how_to_reg</v-icon>
    </v-btn>
  </client-only>
</template>
<script>
export default {
  computed: {
    user: function() {
      return this.$AuthService.getUser()
    }
  },
  methods: {
    login() {
      this.$AuthService.login()
    },
    logout() {
      this.$AuthService.logout()
    }
  }
}
</script>
