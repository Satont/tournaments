<template>
  <v-card max-width="500">
    <v-subheader>Tiers</v-subheader>
    <v-card-text>
      <v-card elevation="30" outlined class="mx-auto pa-6" v-if="!form.roles.length">
        Пусто
      </v-card>
      <v-list>
        <v-list-item v-for="(item, index) in form.roles" v-bind:key="item.id">
          <v-list-item-content>
            <v-select :items="rolesForSelection" v-model.trim="form.roles[index].id" label="Роль"></v-select>
            <v-text-field v-model.number="form.roles[index].kda" label="KDA" type="number"></v-text-field>
          </v-list-item-content>
          <v-btn color="red lighten-1" elevation="3" dark absolute bottom right fab x-small @click="deleteRole(item)"><v-icon>{{ mdiTrashCan }}</v-icon></v-btn>
        </v-list-item>
      </v-list>
    </v-card-text>
    <!-- <v-btn color="cyan" elevation="3" dark absolute bottom left fab small @click="addNewRole()"><v-icon>{{ mdiPlus }}</v-icon></v-btn>
    <v-btn color="success" elevation="3" dark absolute bottom right fab small @click="save()"><v-icon>{{ mdiContentSave }}</v-icon></v-btn> -->
    <v-card-actions>
      <v-btn color="cyan" fab elevation="3" small @click="addNewRole()"><v-icon>{{ mdiPlus }}</v-icon></v-btn>
      <v-spacer></v-spacer>
      <v-btn color="success" fab elevation="3" small @click="save()"><v-icon>{{ mdiContentSave }}</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { mdiPlus, mdiContentSave, mdiTrashCan } from '@mdi/js'
import { Role } from 'discord.js'

export default Vue.extend({
  data: () => ({
    form: {
      roles: [] as Role[],
    },
    mdiPlus,
    mdiContentSave,
    mdiTrashCan,
  }),
  methods: {
    addNewRole() {
      this.form.roles.push({
        id: '0',
        kda: 0,
      })
    },
    deleteRole(role) {
      this.form.roles = this.form.roles.filter(r => r !== role)
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
      const list = this.$store.state.roles.filter(r => r.name !== '@everyone').map((role: Role) => ({
        text: role.name,
        value: role.id,
        disabled: this.form.roles.some(r => r.id === role.id)
      }))

      return list
    },
  }
})
</script>
