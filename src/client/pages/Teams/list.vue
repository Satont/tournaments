<template>
  <v-data-table
    :headers="headers"
    :items="$store.state.teams.list"
    :loading="!$store.state.teams.loaded"
    loading-text="Загрузка..."
    class="elevation-1"
    :footer-props="{
      'items-per-page-options': [ 5, 10, 15, 25, 40, 50, 100, 200, 250, 300, 400, 500 ],
    }"
  >

    <template v-slot:[`item.cap`]="{ item }">
      <v-btn
        class="mx-2"
        small
        depressed
        rounded
        @click="$router.push({
          name: 'PlayersEdit',
          params: { id: item.captain.id }
          })"
      >
          {{ item.captain.discord.tag }}
      </v-btn>
    </template>

    <template v-slot:[`item.tournaments`]="{ item }">
      <v-sheet max-width="350">
        <v-slide-group multiple show-arrows>
          <v-slide-item v-for="tournament in item.tournaments.filter(t => t.isRunned)" :key="tournament.id">
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
      </v-sheet>
    </template>

     <template v-slot:[`item.players`]="{ item }">
      <v-sheet max-width="350">
        <v-slide-group multiple show-arrows>
          <v-slide-item v-for="player in item.players" :key="player.id">
            <v-btn
              class="mx-2"
              small
              depressed
              rounded
              @click="$router.push({
                name: 'PlayersEdit',
                params: { id: player.id }
              })"
            >
            {{ player.discord.tag }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="$router.push({
          name: 'TeamsEdit',
          params: { id: item.id }
        })"
      >
        {{ icons.pencil }}
      </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import axios from 'axios'
import { mdiPencil } from '@mdi/js'
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class extends Vue {
  options: any = {}
  total = 0

  headers = [
    { text: 'Название команды', value: 'name', sortable: true },
    { text: 'Капитан команды', value: 'cap', sortable: false },
    { text: 'Состав команды', value: 'players', sortable: false },
    { text: 'Участник турнира', value: 'tournaments', sortable: false },
    { text: 'Действия', value: 'actions', sortable: false },
  ]
  teams = []
  icons = {
    pencil: mdiPencil,
  }
}
</script>
