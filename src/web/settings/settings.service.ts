import { Injectable } from '@nestjs/common'
import { getRepository } from 'typeorm'
import { DiscordClient } from '../../bot'
import { Settings } from '../../entities/Settings'
import { SettingsDto } from './settings.dto'

@Injectable()
export class SettingsService {
  private readonly repository = getRepository(Settings)

  async list() {
    const roles = (await this.repository.findOne({ space: 'general', name: 'roles' }))?.value ?? []

    return {
      roles,
    }
  }

  async edit(body: SettingsDto) {
    const rolesQuery = { space: 'general', name: 'roles' }
    const roles = await this.repository.findOne(rolesQuery) || this.repository.create(rolesQuery)

    for (const role of roles.value || []) {
      if (!body.roles.find(r => r.id === role.id)) {
        const discordRole = await DiscordClient.guilds.cache.first().roles.fetch(role.id)
        discordRole.members.forEach(m => m.roles.remove(discordRole.id))
      }
    }

    roles.value = body.roles
    roles.save()

    return body
  }
}
