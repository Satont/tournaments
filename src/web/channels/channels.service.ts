import { Injectable } from '@nestjs/common'
import { DiscordClient } from '../../bot'

@Injectable()
export class ChannelsService {
  getChannels() {
    return DiscordClient.guilds.cache.first().channels.cache.filter(channel => channel.type !== 'voice' && channel.type !== 'category')
  }
}
