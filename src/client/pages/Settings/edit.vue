<template>
<v-row>
  <v-col md="2">
    <v-card
      elevation="12"
      width="256"
    >
      <v-navigation-drawer permanent floating left>
        <v-list dense rounded>
          <v-list-item link>
            <v-list-item-content>
              Tiers
            </v-list-item-content>
            <v-divider vertical />
            <v-btn color="cyan" fab icon elevation="3" class="ml-2 mr-2" x-small @click="addNewRole()"><v-icon>{{ icons.mdiPlus }}</v-icon></v-btn>
            <v-btn color="success" fab icon elevation="3" x-small @click="save()"><v-icon>{{ icons.mdiContentSave }}</v-icon></v-btn>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>
              Admins
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-col>
  <v-col md="2" v-for="(item, index) in form.roles" v-bind:key="item.id">
    <v-card max-width="300">
      <v-subheader>{{ getRolesCardName(item.id) }}</v-subheader>
      <v-card-text>
        <v-select :items="rolesForSelection" v-model.trim="form.roles[index].id" label="Роль"></v-select>
        <v-text-field v-model.number="form.roles[index].kda" label="KDA" type="number"></v-text-field>
      </v-card-text>
      <v-btn color="red lighten-1" fab absolute bottom right elevation="3" x-small @click="deleteRole(item)"><v-icon>{{ icons.mdiTrashCan }}</v-icon></v-btn>
    </v-card>
  </v-col>
</v-row>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import axios from 'axios'
import { mdiPlus, mdiContentSave, mdiTrashCan } from '@mdi/js'
import { Role } from 'discord.js'

@Component
export default class extends Vue {
  form = {
    roles: this.$store.state.settings.roles,
  }
  icons = {
    mdiPlus,
    mdiContentSave,
    mdiTrashCan
  }

  addNewRole() {
    this.form.roles.push({
      id: '0',
      kda: 0,
    })
  }

  deleteRole(role) {
    this.form.roles = this.form.roles.filter(r => r !== role)
  }

  async save() {
    await axios.post('/api/settings', this.form)
    this.$store.dispatch('loadSettings')
  }

  get rolesForSelection() {
    const list = this.$store.state.roles.filter(r => r.name !== '@everyone').map((role: Role) => ({
      text: role.name,
      value: role.id,
      disabled: this.form.roles.some(r => r.id === role.id)
    }))

    return list
  }

  getRolesCardName(id) {
    return this.rolesForSelection.find(r => r.value === id)?.text ?? 'Не выбрано'
  }
}
</script>
