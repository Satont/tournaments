<template>
  <v-data-table
    :headers="headers"
    :items="players"
    :items-per-page="20"
    class="elevation-1"
  >
    <template v-slot:[`item.teams`]="{ item }">
      <v-slide-group multiple show-arrows>
        <v-slide-item v-for="team in item.teams" :key="team.id">
          <v-btn class="mx-2" small depressed rounded>{{ team.name }}</v-btn>
        </v-slide-item>
      </v-slide-group>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  data: () => ({
    headers: [
      { text: 'Discord', value: 'discord.tag' },
      { text: 'Activision ID', value: 'activision' },
      { text: 'Состоит в команде', value: 'teams' }
    ],
    players: [],
  }),
  async mounted() {
    const { data: players } = await axios.get('/api/players')
    this.players = players
  },
})
</script>
