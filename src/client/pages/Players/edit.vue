<template>
<div>
  <h2>Игрок {{ form.tag }}</h2>
  <v-form>
    <v-container>
      <v-row>
        <v-col md="2">
          <v-text-field v-model="form.tag" label="DISCORD" required />
        </v-col>

        <v-col md="2">
          <v-text-field v-model="form.activision" label="ACTIVISIONID" required />
        </v-col>

        <v-col md="4">
          <v-autocomplete v-model="form.roles" :items="rolesForSelection" chips small-chips label="РОЛЬ В DICORD (KDA)" multiple></v-autocomplete>
        </v-col>

        <v-col md="4">
          <v-autocomplete
            ref="teamsSelector"
            v-model="form.teams"
            :items="userTeams"
            :loading="teamsLoading"
            chips
            small-chips
            label="СОСТОИТ В КОМАНДЕ"
            multiple
            @focus="loadTeams"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</div>
</template>

<script lang="ts">
import axios from 'axios'
import { Role } from 'discord.js'
import { mdiContentSave } from '@mdi/js'

import { Vue, Component } from 'vue-property-decorator'

@Component
export default class extends Vue {
  form = {
    tag: '',
    activision: '',
    roles: [],
    teams: [],
  }
  userTeams = []
  mdiContentSave
  teamsLoading = false

  async mounted() {
    const { data } = await axios.get(`/api/players/${this.$route.params.id}`)

    this.form.activision = data.activision
    this.form.tag = data.discord.tag
    this.form.roles = data.discord.roles.map(role => role.id)
    this.form.teams = data.teams.map(t => t.id)
    this.userTeams = data.teams.map(t => ({ text: t.name, value: t.id }))
  }

  async save() {
    console.log('qwe')
  }

  async loadTeams() {
    this.teamsLoading = true

    if (!this.$store.state.teams.length) {
      const { data } = await axios.get('/api/teams')
      this.$store.commit('set.teams', data)
    }

    this.userTeams = [
      ...this.userTeams,
      ...this.$store.state.teams.filter(team => this.userTeams.some(t => t.id !== team.id)).map(t => ({ text: t.name, value: t.id }))
    ]

    this.teamsLoading = false
  }

  get rolesForSelection() {
    const list = this.$store.state.roles
      .filter(r => this.$store.state.settings.roles.some(rr => rr.id === r.id))
      .map((role: Role) => ({
        text: role.name,
        value: role.id,
      }))

    return list
  }
}
</script>
