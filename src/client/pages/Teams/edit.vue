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
          <v-autocomplete v-model="form.players" :items="originalTeam.players.map(p => ({ text: p.discord.tag, value: p.id }))" chips small-chips label="СОСТАВ" multiple></v-autocomplete>
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
  }
  originalTeam = {
    players: [],
  }

  async mounted() {
    const { data } = await axios.get(`/api/teams/${this.$route.params.id}`)

    this.form.name = data.name
    this.form.players = data.players.map(p => ({ text: p.discord.tag, value: p.id }))
    this.originalTeam = data
  }

  save() {

  }
}
</script>
