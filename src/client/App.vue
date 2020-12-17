<template>
<v-app>
  <v-app-bar app dense dark>
    <v-tabs color="#fff" class="my-navbar" active-class="active-tab" v-if="$store.state.user.isAdmin">
      <v-tab :to="{ name: 'Players' }">Игроки</v-tab>
      <v-tab :to="{ name: 'Teams' }">Команды</v-tab>
      <v-tab :to="{ name: 'Tournaments' }">Турниры</v-tab>
      <v-tab :to="{ name: 'Settings' }">Настройки</v-tab>
    </v-tabs>
    <v-toolbar-title v-else>Tournaments</v-toolbar-title>
  </v-app-bar>

  <v-main id="appMain">
    <v-container>
      <router-view v-if="$store.state.user" />
    </v-container>
  </v-main>
</v-app>
</template>

<style>
  .my-navbar .v-tabs-slider {
    background-color: #FF0000;
  }

  .v-slide-group__prev--disabled, .v-slide-group__next--disabled {
    display: none !important;
  }

  .app-footer {
    text-align: center;
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
