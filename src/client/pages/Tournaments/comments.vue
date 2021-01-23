<template>
  <div>
    <v-form>
      <v-text-field label="Добавить комментарий" v-model="newComment">
        <v-icon slot="append" @click="addComment">{{ icons.mdiSend }}</v-icon>
      </v-text-field>
    </v-form>
    <v-card max-height="500">
      <v-list v-if="comments.length">
        <v-list-item v-for="comment of comments" v-bind:key="comment.id">
          <v-list-item-content>
            <v-list-item-subtitle>{{ comment.author.tag }}; {{ dayjs(comment.createdAt).format('DD-MM-YYYY HH:mm') }}</v-list-item-subtitle>
            <v-list-item-title>{{ comment.text }} </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="deleteComment(comment.id)"><v-icon>{{ icons.mdiDelete }}</v-icon></v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item >
          <v-list-item-content>
            <v-list-item-title>Комментариев пока нет.</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import axios from 'axios'
import { mdiSend, mdiDelete  } from '@mdi/js'
import { Vue, Component, Prop } from 'vue-property-decorator'
import dayjs from 'dayjs'

@Component
export default class extends Vue {
  @Prop() readonly tournamentId: number

  icons = {
    mdiSend,
    mdiDelete,
  }
  newComment = ''
  comments = []
  dayjs = dayjs

  async mounted() {
    const { data } = await axios.get(`api/tournaments/${this.tournamentId}/comments`)

    this.comments = data
  }

  async addComment() {
    const { data } = await axios.post(`api/tournaments/${this.tournamentId}/comments`, { 
      tournamentId: this.tournamentId,
      text: this.newComment,
    })

    this.newComment = null
    this.comments.unshift(data)
  }

  async deleteComment(id: number) {
    await axios.delete(`api/tournaments/${this.tournamentId}/comments/${id}`)

    this.comments = this.comments.filter(c => c.id !== id)
  }
}
</script>
