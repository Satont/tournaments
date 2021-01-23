<template>
 <div>
  <div class="d-flex">
    <h2 class="mr-auto">Турнир {{ form.name }}</h2>
    <v-btn @click="save" color="teal" class="ml-auto">Сохранить</v-btn>
  </div>
  <v-form>
    <v-container>
      <v-row>
        <v-col md="2">
          <v-text-field v-model="form.name" label="Название турнира" required />
        </v-col>

        <v-col md="2">
          <v-text-field v-model="form.type" label="Тип турнира" required />
        </v-col>

        <v-col md="2" v-if="form.id">
          <v-autocomplete v-model="form.teams" :items="teams" :menu-props="{ maxHeight: '400' }" label="Команды" multiple persistent-hint />
        </v-col>

        <v-col md="2">
          <v-autocomplete 
            v-model="form.channel" 
            :items="$store.state.channels.list.map(c => ({ text: c.name, value: c.id }))" 
            :menu-props="{ maxHeight: '400' }" 
            label="Канал" 
            persistent-hint 
          />
        </v-col>

        <v-col md="2" v-if="form.id">
          <v-checkbox v-model="form.isRunned" label="Статус" :color="form.isRunned ? 'teal' : 'danger'">
            <template v-slot:label>
              <div :class="form.isRunned ? 'teal--text' : 'red--text text--lighten-2'">
                {{ form.isRunned ? "Запущен" : "Завершён" }}
              </div>
            </template>
          </v-checkbox>
        </v-col>

      </v-row>
      <v-row v-if="this.$route.params.id !== 'new'">
        <v-col>
          <Comments :tournamentId="Number(this.$route.params.id)" />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</div>
</template>

<script lang="ts">
import axios from 'axios'
import { mdiContentSave } from '@mdi/js'
import { Vue, Component } from 'vue-property-decorator'
import Comments from './comments.vue'

@Component({
  components: {
    Comments,
  }
})
export default class extends Vue {
  form = {} as any
  icons = {
    save: mdiContentSave,
  }
  teams = []

  async mounted() {
    if (this.$route.params.id === 'new') return
    const { data } = await axios.get(`/api/tournaments/${this.$route.params.id}`)

    this.form = data
    this.teams = data.teams.map(t => ({ text: t.team.name, value: t.id }))
    this.form.teams = this.form.teams.map(t => t.id)
  }

  async save() {
    const [method, url] = this.$route.params.id !== 'new' 
      ? ['patch', `/api/tournaments/${this.$route.params.id}`]
      : ['post', `/api/tournaments`]
  
    await axios[method](url, this.form)
    this.$store.dispatch('loadTournaments')
  }
}
</script>
