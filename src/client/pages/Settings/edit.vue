<template>
  <v-card max-width="500">
    <v-subheader>Tiers</v-subheader>
    <v-card-text>
      <div v-for="(item, index) in form.roles" v-bind:key="item.id">
        <v-select :items="rolesForSelection" v-model.trim="form.roles[index].id" item-value="id" item-text="name" label="Роль"></v-select>
        <v-text-field v-model.number="form.roles[index].kda" label="KDA" type="number"></v-text-field>
        <v-divider></v-divider>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="cyan" @click="addNewRole()">Добавить</v-btn>
      <v-btn color="success" @click="save()">Сохранить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  data: () => ({
    form: {
      roles: [],
    }
  }),
  methods: {
    addNewRole() {
      this.form.roles.push({
        id: '0',
        kda: 0,
      })
    },
    async save() {
      console.log(this.form)
    }
  },
  computed: {
    rolesForSelection() {
      return this.$store.state.roles.filter(r => r.name !== '@everyone')
    }
  }
})
</script>
