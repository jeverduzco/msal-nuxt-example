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
              light
              flat
            >
              <img id="image404" src="https://storage.verduzco.dev/website/error/error.svg" alt="Error 404">
              <v-divider />
              <v-card-actions>
                <v-btn text small block to="/" title="Regresar al Inicio">
                  IR AL INICIO
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['error'],
  layout: 'blog' // you can set a custom layout for the error page
}
</script>

<style scoped>
#image404 {
  height: 200px;
  margin: 25px;
}
#content {
  max-width: 1137px !important;
}
</style>
