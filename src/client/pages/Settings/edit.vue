<template>
  <v-card max-width="500" class="pb-6">
    <v-subheader>Tiers</v-subheader>
    <v-card-text>
      <v-card elevation="30" outlined class="mx-auto pa-6" v-if="!form.roles.length">
        Пусто
      </v-card>
      <div v-for="(item, index) in form.roles" v-bind:key="item.id">
        <v-select :items="rolesForSelection" v-model.trim="form.roles[index].id" item-value="id" item-text="name" label="Роль"></v-select>
        <v-text-field v-model.number="form.roles[index].kda" label="KDA" type="number"></v-text-field>
        <v-divider></v-divider>
      </div>
    </v-card-text>
    <!-- <v-card-actions>
      <v-btn color="cyan" @click="addNewRole()">Добавить</v-btn>
      <v-btn color="success" @click="save()">Сохранить</v-btn>
    </v-card-actions> -->
    <v-btn color="cyan" elevation="3" dark absolute bottom left fab small @click="addNewRole()"><v-icon>{{ mdiPlus }}</v-icon></v-btn>
    <v-btn color="success" elevation="3" dark absolute bottom right fab small @click="save()"><v-icon>{{ mdiContentSave }}</v-icon></v-btn>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { mdiPlus, mdiContentSave } from '@mdi/js'

export default Vue.extend({
  data: () => ({
    form: {
      roles: [],
    },
    mdiPlus,
    mdiContentSave,
  }),
  methods: {
    addNewRole() {
      this.form.roles.push({
        id: '0',
        kda: 0,
      })
    },
    async save() {
      await axios.post('/api/settings', this.form)
    }
  },
  async mounted() {
    const { data } = await axios.get('/api/settings')
    this.form.roles = data.roles
  },
  computed: {
    rolesForSelection() {
      return this.$store.state.roles.filter(r => r.name !== '@everyone')
    }
  }
})
</script>
