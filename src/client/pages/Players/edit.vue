<template>
<div>
  <h2>Игрок {{ form.discord.tag }}</h2>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="form.discord.tag" label="DISCORD" required />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="form.activision" label="ACTIVISIONID" required />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  data: () => ({
    form: {
      discord: {
        tag: '',
      },
    },
    valid: false,
  }),
  async mounted() {
    const { data } = await axios.get(`/api/players/${this.$route.params.id}`)
    this.form = data
  },
})
</script>
