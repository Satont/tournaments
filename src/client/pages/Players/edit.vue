<template>
<div>
  <h2>Игрок {{ form.tag }}</h2>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="2">
          <v-text-field v-model="form.tag" label="DISCORD" required />
        </v-col>

        <v-col cols="12" md="2">
          <v-text-field v-model="form.activision" label="ACTIVISIONID" required />
        </v-col>

        <v-col cols="12" md="4">
          <v-autocomplete v-model="form.roles" :items="rolesForSelection" chips small-chips label="РОЛЬ В DICORD (KDA)" multiple></v-autocomplete>
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

export default Vue.extend({
  data: () => ({
    form: {
      tag: '',
      activision: '',
      roles: [],
    },
  }),
  async mounted() {
    const { data } = await axios.get(`/api/players/${this.$route.params.id}`)

    this.form.activision = data.activision
    this.form.tag = data.discord.tag
    this.form.roles = data.discord.roles.map(role => role.id)
  },
  methods: {
    remove (item) {
      this.chips = this.chips.filter(c => c !== item)
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
