<template>
  <v-data-table
    :headers="headers"
    :items="players"
    :options.sync="options"
    :server-items-length="total"
    :loading="loading"
    loading-text="Загрузка..."
    class="elevation-1"
    :footer-props="{
      'items-per-page-options': [ 5, 10, 15, 25, 40, 50, 100, 200, 250, 300, 400, 500 ],
    }"
  >

    <template v-slot:[`item.roles`]="{ item }">
      <v-sheet max-width="200">
        <v-slide-group multiple show-arrows>
          <v-slide-item v-for="role in getUserDiscordRoles(item)" :key="role.id">
            <v-btn
              class="mx-2"
              small
              depressed
              rounded
            >
              {{ role.name }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </template>


    <template v-slot:[`item.teams`]="{ item }">
      <v-sheet max-width="200">
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
      </v-sheet>
    </template>

    <template v-slot:[`item.teams.tournaments`]="{ item }">
      <v-sheet max-width="200">
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
      </v-sheet>
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
  loading = true
  total = 0

  headers = [
    { text: 'Discord', value: 'discord.tag', sortable: false },
    { text: 'Activision ID', value: 'activision', sortable: false },
    { text: 'Состоит в команде', value: 'teams', sortable: false },
    { text: 'Роль в Discord', value: 'roles', sortable: false },
    { text: 'Участник турнира', value: 'teams.tournaments', sortable: false },
    { text: 'Действия', value: 'actions', sortable: false },
  ]
  players = []
  icons = {
    pencil: mdiPencil,
  }

  @Watch('options')
  onOptionsChange() {
    this.getList()
  }

  async mounted() {
    this.getList()
  }

  async getList() {
    const { data: { players, total } } = await axios.get('/api/players', {
      params: this.options,
    })

    this.players = players
    this.total = total

    this.loading = false
  }

  getTournamentsFromItem(item) {
    const result = item.teams
      .flatMap(i => i.tournaments)
      .filter(t => t.tournament.isRunned)
      .map(t => t.tournament)

    return result
  }

  getUserDiscordRoles(user) {
    return user.discord.roles.filter(discordRole => this.$store.state.settings.roles?.some(role => role.id === discordRole.id))
  }
}
</script>
