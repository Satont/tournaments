<template>
  <v-data-table
    :headers="headers"
    :items="$store.state.tournaments.list"
    :loading="!$store.state.tournaments.loaded"
    loading-text="Загрузка..."
    sort-by="isRunned"
    :sort-desc="true"
    class="elevation-1"
    :footer-props="{
      'items-per-page-options': [ 5, 10, 15, 25, 40, 50, 100, 200, 250, 300, 400, 500 ],
    }"
  >
    <template v-slot:[`item.teams`]="{ item }">
      {{ item.teams.length }}
    </template>

    <template v-slot:[`item.status`]="{ item }">
      <span v-if="item.isRunned">Запущен</span>
      <span v-else>Не запущен</span>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-btn icon @click="$router.push({ name: 'TournamentsEdit', params: { id: item.id } })">
        <v-icon>{{ icons.info }}</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import axios from 'axios'
import { mdiInformation  } from '@mdi/js'
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class extends Vue {
  headers = [
    { text: 'Название', value: 'name', sortable: true },
    { text: 'Команд', value: 'teams', sortable: false },
    { text: 'Статус', value: 'status', sortable: false },
    { text: 'Действия', value: 'actions', sortable: false },
  ]
  icons = {
    info: mdiInformation ,
  }
}
</script>
