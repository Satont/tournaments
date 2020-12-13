<template>
<div>
  <h2>Игрок {{ form.discord.tag }}</h2>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="2">
          <v-text-field v-model="form.discord.tag" label="DISCORD" required />
        </v-col>

        <v-col cols="12" md="2">
          <v-text-field v-model="form.activision" label="ACTIVISIONID" required />
        </v-col>

        <v-col cols="12" md="4">
         <v-autocomplete
            v-model="items"
            :items="chips"
            chips
            small-chips
            label="РОЛЬ В DICORD (KDA)"
            multiple
          ></v-autocomplete>
        </v-col>

         <v-col cols="12" md="4">
         <v-autocomplete
            v-model="items"
            :items="chips"
            chips
            small-chips
            label="СОСТОИТ В КОМАНДЕ"
            multiple
          ></v-autocomplete>
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
    chips: ['test1', 'test2'],
    items: [],
  }),
  async mounted() {
    const { data } = await axios.get(`/api/players/${this.$route.params.id}`)
    this.form = data
  },
  methods: {
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },
  },
})
</script>
