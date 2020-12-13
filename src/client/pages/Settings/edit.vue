<template>
  <v-card max-width="500">
    <v-subheader>Tiers</v-subheader>
    <v-card-text>
      <v-text-field placeholder="qweqw"></v-text-field>
      <v-select :items="roles.filter(r => r.name !== '@everyone').map(r => r.name)" label="Роль"></v-select>
      <v-divider></v-divider>
      <v-text-field placeholder="qweqw"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success">
        Добавить
      </v-btn>
    </v-card-actions>
    {{ form.roles }}
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  data: () => ({
    roles: [],
    form: {
      roles: [],
    }
  }),
  async created() {
    const [roles] = await Promise.all([
      axios.get('/api/roles')
    ])

    this.roles = roles.data
  },
})
</script>
