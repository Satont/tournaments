import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { DiscordClient } from '../../bot'

@Injectable()
export class AuthService {
  async findUserFromDiscordId(discordId: string) {
    const guild = DiscordClient.guilds.cache.first()
    const member = await guild.members.fetch(discordId)
    const user = {
      isOwner: guild.ownerID === member.id,
      isAdmin: member.hasPermission('ADMINISTRATOR'),
      ...member.user.toJSON(),
    }

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
