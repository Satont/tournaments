<template>
<div>
  <div class="d-flex">
    <h2 class="mr-auto">Игрок {{ form.tag }}</h2>
    <v-btn @click="save" color="teal" class="ml-auto">Сохранить</v-btn>
  </div>
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
            :items="teams"
            :loading="!$store.state.teams.loaded"
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
import { settings } from 'cluster'

@Component
export default class extends Vue {
  form = {
    tag: '',
    activision: '',
    roles: [],
    teams: [],
  }
  originalTeams = []
  teams = []
  teamsLoading = false
  icons = {
    save: mdiContentSave,
  }

  async mounted() {
    const { data } = await axios.get(`/api/players/${this.$route.params.id}`)

    this.form.activision = data.activision
    this.form.tag = data.discord.tag
    this.form.roles = data.discord.roles.map(t => ({ text: t.name, value: t.id }))
    this.form.teams = data.teams.map(t => t.id)
    this.originalTeams = data.teams.map(t => ({ text: t.name, value: t.id }))
    this.teams = this.originalTeams
  }

  async save() {
    await axios.post(`/api/players/${this.$route.params.id}`, this.form)
    this.$store.dispatch('loadTeams')
  }

  async loadTeams() {
    this.teams = [
      ...this.originalTeams,
      ...this.$store.state.teams.list.map(t => ({ text: t.name, value: t.id }))
    ]
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
