<template>
<v-app>
  <v-app-bar app dense dark>
    <v-tabs color="#fff" class="my-navbar" active-class="active-tab">
      <v-tab :to="{ name: 'Players' }">Игроки</v-tab>
      <v-tab :to="{ name: 'Teams' }">Команды</v-tab>
      <v-tab :to="{ name: 'Tournaments' }">Турниры</v-tab>
      <v-tab :to="{ name: 'Settings' }">Настройки</v-tab>
    </v-tabs>
  </v-app-bar>

  <v-main>
    <v-container>
      <router-view />
    </v-container>
  </v-main>
</v-app>
</template>

<style>
  /* .active-tab:before {
    background-color: #000;
  } */
  .my-navbar .v-tabs-slider {
    background-color: #FF0000;
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
