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
          <v-btn
            class="mx-2"
            small
            depressed
            rounded
            @click="$router.push({
              name: 'TeamsEdit',
              params: { id: team.id }
            })"
          >
            {{ team.name }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
    </template>

     <template v-slot:[`item.teams.tournaments`]="{ item }">
      <v-slide-group multiple show-arrows>
        <v-slide-item v-for="tournament in getTournamentsFromItem(item)" :key="tournament.id">
          <v-btn
            class="mx-2"
            small
            depressed
            rounded
             @click="$router.push({
              name: 'TournamentsEdit',
              params: { id: tournament.id }
            })"
          >
          {{ tournament.name }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
    </template>

     <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="$router.push({
          name: 'PlayersEdit',
          params: { id: item.id }
        })"
      >
        {{ mdiPencil }}
      </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { mdiPencil } from '@mdi/js'

export default Vue.extend({
  data: () => ({
    headers: [
      { text: 'Discord', value: 'discord.tag' },
      { text: 'Activision ID', value: 'activision' },
      { text: 'Состоит в команде', value: 'teams' },
      { text: 'Участник турнира', value: 'teams.tournaments' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    players: [],
    mdiPencil,
  }),
  async mounted() {
    const { data: players } = await axios.get('/api/players')
    this.players = players
  },
  methods: {
    getTournamentsFromItem(item) {
      const result = item.teams
        .flatMap(i => i.tournaments)
        .filter(t => t.isRunned)

      return result
    }
  }
})
</script>
