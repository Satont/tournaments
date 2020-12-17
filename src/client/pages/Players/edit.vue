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
          <v-autocomplete v-model="form.teams" :items="userTeams" chips small-chips label="СОСТОИТ В КОМАНДЕ" multiple></v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { Role } from 'discord.js'
import { mdiContentSave } from '@mdi/js'

export default Vue.extend({
  data: () => ({
    form: {
      tag: '',
      activision: '',
      roles: [],
      teams: [],
    },
    userTeams: [],
    mdiContentSave
  }),
  async mounted() {
    const { data } = await axios.get(`/api/players/${this.$route.params.id}`)

    this.form.activision = data.activision
    this.form.tag = data.discord.tag
    this.form.roles = data.discord.roles.map(role => role.id)
    this.form.teams = data.teams.map(t => t.id)
    this.userTeams = data.teams.map(t => ({ text: t.name, value: t.id }))
  },
  methods: {
    remove (item) {
      this.chips = this.chips.filter(c => c !== item)
    },
    async save() {
      console.log('qwe')
    },
  },
  computed: {
    rolesForSelection() {
      const list = this.$store.state.roles
        .filter(r => this.$store.state.settings.roles.some(rr => rr.id === r.id))
        .map((role: Role) => ({
          text: role.name,
          value: role.id,
        }))

      return list
    },
  }
})
</script>
