import { Injectable } from '@nestjs/common'
import { getRepository } from 'typeorm'
import { Settings } from '../../entities/Settings'
import { SettingsDto } from './settings.dto'

@Injectable()
export class SettingsService {
  private readonly repository = getRepository(Settings)

  async list() {
    const roles = await (await this.repository.findOne({ space: 'general', name: 'roles' })).value

    return {
      roles,
    }
  }

  async edit(body: SettingsDto) {
    const rolesQuery = { space: 'general', name: 'roles' }
    const roles = await this.repository.findOne(rolesQuery) || this.repository.create(rolesQuery)
    roles.value = body.roles
    roles.save()

    return body
  }
}
