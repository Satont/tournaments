import { Injectable } from '@nestjs/common'
import { DiscordClient } from '../../bot'

@Injectable()
export class RolesService {
  getRoles() {
    return DiscordClient.guilds.cache.first().roles.cache.array()
  }
}
