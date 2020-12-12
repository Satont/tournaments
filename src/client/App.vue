<template>
<v-app>
  <v-app-bar app dense dark>
    <v-tabs>
      <v-tab to="Players">Игроки</v-tab>
    </v-tabs>
  </v-app-bar>

  <v-main>
    <v-container>
      <router-view />
    </v-container>
  </v-main>
</v-app>
</template>

<style scoped>
  .md-app {
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>

<script>
export default {
  name: 'Reveal',
  data: () => ({
    menuVisible: false
  }),
}
</script>
