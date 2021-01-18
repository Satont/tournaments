<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Показать команды
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-list dense>
            <v-subheader>Команды участники</v-subheader>
            <v-list-item-group color="primary">
            <v-list-item v-for="item of list" :key="item.id" @click="$router.push({ name: 'TeamsEdit', params: { id: item.id } })">
              {{ item.name }}
            </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import 'reflect-metadata'
import axios from 'axios'
import { mdiContentSave } from '@mdi/js'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop() readonly editable: boolean
  @Prop() readonly list: Array<{ id: number, name: string }>
  dialog = false
}
</script>
