<template>
<v-app>
  <v-app-bar app dense dark>
    <v-tabs color="#fff" active-class="active-tab">
      <v-tab :to="{ name: 'Players' }">Игроки</v-tab>
      <v-tab :to="{ name: 'Teams' }">Команды</v-tab>
      <v-tab :to="{ name: 'Tournaments' }">Турниры</v-tab>
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

</style>

<script>
export default {
  name: 'Reveal',
  data: () => ({
    menuVisible: false
  }),
}
</script>
