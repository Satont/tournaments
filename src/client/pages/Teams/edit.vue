<template>
  <div>
  <h2>Команда {{ form.name }}</h2> <v-btn @click="save">Save</v-btn>
  <v-form>
    <v-container>
      <v-row>
        <v-col md="2">
          <v-text-field v-model="form.name" label="НАЗВАНИЕ КОМАНДЫ" required />
        </v-col>

        <v-col md="4">
          <v-autocomplete
            v-model="form.players"
            :items="originalTeam.players.map(p => ({ text: p.discord.tag, value: p.id }))"
            chips
            small-chips
            label="СОСТАВ"
            multiple
          />
        </v-col>

        <v-col md="4">
          <v-autocomplete
            v-model="form.tournaments"
            :items="tournaments"
            chips
            small-chips
            label="УЧАСТНИК ТУРНИРА"
            multiple
          />
        </v-col>

         <v-col md="4">
          <v-autocomplete
            v-model="form.captain"
            :items="originalTeam.players.map(p => ({ text: p.discord.tag, value: p.id }))"
            label="КАПИТАН КОМАНДЫ"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</div>
</template>

<script lang="ts">
import axios from 'axios'
import { mdiPencil } from '@mdi/js'
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Player } from '../../../entities/Player'
import { User } from 'discord.js'

@Component
export default class extends Vue {
  form = {
    name: '',
    players: [],
    tournaments: [],
    captain: 0,
  }
  originalTeam = {
    players: [],
    tournaments: [],
  }

  async mounted() {
    const { data } = await axios.get(`/api/teams/${this.$route.params.id}`)

    this.form.name = data.name
    this.form.players = data.players.map(p => ({ text: p.discord.tag, value: p.id }))
    this.form.tournaments = data.tournaments.map(t => ({ text: t.name, value: t.id }))
    this.form.captain = data.captain.id

    this.originalTeam = data
  }

  save() {

  }

  get tournaments() {
    return [
      ...this.originalTeam.tournaments.map(t => ({ text: t.name, value: t.id })),
      ...this.$store.state.tournaments.list.map(t => ({ text: t.name, value: t.id }))
    ]
  }
}
</script>
